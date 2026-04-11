export default {
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Blog Title', type: 'string' },
    { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'publishedAt', title: 'Published Date', type: 'date' },
    { name: 'updatedAt', title: 'Updated Date', type: 'date' },
    { name: 'readTime', title: 'Read Time (Minutes)', type: 'number' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'content', title: 'Content Blocks', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'faq' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
    { name: 'seoDesc', title: 'SEO Description', type: 'text', group: 'seo' },
    { name: 'keywords', title: 'SEO Keywords', type: 'string', group: 'seo' },
    { name: 'directAnswer', title: 'AEO Direct Answer Summary', type: 'text', group: 'seo' }
  ],
  groups: [
    { name: 'seo', title: 'SEO / AEO Optimization' }
  ]
}
