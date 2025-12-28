'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// Temporarily disable image resizing due to version conflicts
// import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Type,
  Palette,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui'
import { useState } from 'react'
import { authUtils } from '@/utils/auth'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing...'
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      // Image.configure({
      //   HTMLAttributes: {
      //     class: 'max-w-full h-auto rounded-lg',
      //   },
      // }), // Disabled due to version conflicts
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent-400 hover:text-accent-300 underline',
        },
      }),
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  const addLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkDialog(false)
    }
  }

  const addImage = () => {
    if (imageUrl && editor) {
      // Basic image insertion as HTML
      editor.chain().focus().insertContent(`<img src="${imageUrl}" alt="image" style="max-width: 100%; height: auto;" />`).run()
      setImageUrl('')
      setShowImageDialog(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (response.ok) {
        const data = await response.json()
        // Auto-insert the uploaded image
        if (editor) {
          editor.chain().focus().insertContent(`<img src="${data.url}" alt="${data.original_filename}" style="max-width: 100%; height: auto;" />`).run()
          setShowImageDialog(false)
        }
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeLink = () => {
    if (editor) {
      editor.chain().focus().unsetLink().run()
    }
  }

  if (!editor) {
    return <div>Loading editor...</div>
  }

  const ToolbarButton: React.FC<{
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }> = ({ onClick, isActive, disabled, children, title }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-slate-600 transition-colors ${
        isActive ? 'bg-accent-500/20 text-accent-400' : 'text-slate-300 hover:text-slate-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-slate-600 rounded-lg bg-slate-800">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-1 p-3 border-b border-slate-600">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-3 border-r border-slate-600">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-3 border-r border-slate-600">
          <select
            value=""
            onChange={(e) => {
              const level = parseInt(e.target.value)
              if (level) {
                editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
              } else {
                editor.chain().focus().setParagraph().run()
              }
            }}
            className="bg-slate-700 text-slate-200 text-sm border border-slate-600 rounded px-2 py-1"
          >
            <option value="">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
          </select>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-3 border-r border-slate-600">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Link & Image */}
        <div className="flex items-center gap-1 pr-3 border-r border-slate-600">
          <ToolbarButton
            onClick={() => setShowLinkDialog(true)}
            isActive={editor.isActive('link')}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => setShowImageDialog(true)}
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <EditorContent 
          editor={editor} 
          className="prose prose-slate prose-lg max-w-none min-h-[400px] focus-within:ring-2 focus-within:ring-accent-400"
        />
        {!content && (
          <div className="absolute top-4 left-4 text-slate-500 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 w-96">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Add Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-slate-200 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <Button onClick={addLink} size="sm">
                Add Link
              </Button>
              <Button onClick={() => setShowLinkDialog(false)} variant="ghost" size="sm">
                Cancel
              </Button>
              {editor.isActive('link') && (
                <Button onClick={removeLink} variant="destructive" size="sm">
                  Remove Link
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 w-96">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Add Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-slate-200 mb-4"
              autoFocus
            />
            
            <div className="flex gap-3 mb-4">
              <Button onClick={addImage} size="sm" disabled={!imageUrl}>
                Add Image from URL
              </Button>
              <Button onClick={() => setShowImageDialog(false)} variant="ghost" size="sm">
                Cancel
              </Button>
            </div>
            
            <div className="border-t border-slate-600 pt-4">
              <h4 className="text-sm text-slate-300 mb-3">Or upload an image:</h4>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <div className={`flex items-center justify-center w-full p-3 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Upload className="w-5 h-5 mr-2 text-slate-400" />
                  <span className="text-slate-400">
                    {isUploading ? 'Uploading...' : 'Choose image file'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RichTextEditor