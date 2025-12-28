/**
 * Formatting utilities for standardized data display
 */

// Category type definitions
interface CategoryObject {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

type CategoryType = string | CategoryObject | null | undefined;

/**
 * Safely extracts category name from various category formats
 * Handles both string categories and category objects from backend
 */
export function getCategoryName(category: CategoryType): string {
  if (!category) return 'Uncategorized';
  
  // If it's already a string, return it
  if (typeof category === 'string') return category;
  
  // If it's an object with name property, return the name
  if (typeof category === 'object' && category.name) return category.name;
  
  // Fallback
  return 'Uncategorized';
}

/**
 * Safely extracts category slug from various category formats
 */
export function getCategorySlug(category: CategoryType): string {
  if (!category) return 'uncategorized';
  
  // If it's a string, assume it's already a slug
  if (typeof category === 'string') return category.toLowerCase().replace(/\s+/g, '-');
  
  // If it's an object with slug property, return the slug
  if (typeof category === 'object' && category.slug) return category.slug;
  
  // Fallback
  return 'uncategorized';
}

/**
 * Safely extracts category ID from various category formats
 */
export function getCategoryId(category: CategoryType): number | null {
  if (!category) return null;
  
  // If it's an object with id property, return the id
  if (typeof category === 'object' && category.id) return category.id;
  
  return null;
}

/**
 * Formats date strings consistently across the application
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Formats date for form inputs (YYYY-MM-DD)
 */
export function formatDateForInput(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}