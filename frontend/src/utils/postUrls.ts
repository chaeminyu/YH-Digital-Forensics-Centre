import { Post } from '@/types'

/**
 * Generate the correct URL for a post based on its category
 * @param post - The post object containing category and slug information
 * @returns The full URL path for the post
 */
export function getPostUrl(post: Post): string {
  if (!post.category || !post.category.slug) {
    // Fallback to generic posts URL if no category
    return `/posts/${post.slug}`
  }

  const categorySlug = post.category.slug

  // Map category slugs to their URL structure
  switch (categorySlug) {
    case 'general-forensics':
      return `/digital-forensic/general-forensics/${post.slug}`
    case 'evidence-forensics':
      return `/digital-forensic/evidence-forensics/${post.slug}`
    case 'digital-crime':
      return `/digital-forensic/digital-crime/${post.slug}`
    case 'press':
      return `/press/${post.slug}`
    case 'training':
      return `/training/${post.slug}`
    case 'digital-forensic':
      // Main digital-forensic category
      return `/digital-forensic/${post.slug}`
    default:
      // Fallback for unknown categories
      return `/posts/${post.slug}`
  }
}

/**
 * Generate category-based URL structure for admin preview
 * @param category - Main category slug
 * @param subcategory - Subcategory slug (optional)
 * @param slug - Post slug
 * @returns The full URL path for the post
 */
export function generatePostUrl(category: string, subcategory?: string, slug?: string): string {
  const postSlug = slug || 'your-slug-here'
  
  if (category === 'digital-forensic' && subcategory) {
    return `/digital-forensic/${subcategory}/${postSlug}`
  } else if (category === 'press') {
    return `/press/${postSlug}`
  } else if (category === 'training') {
    return `/training/${postSlug}`
  } else {
    // Fallback
    return `/posts/${postSlug}`
  }
}