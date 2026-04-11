export default {
  name: 'banner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    { name: 'title', title: 'Main Title', type: 'string' },
    { name: 'hi', title: 'Highlighted Word', type: 'string' },
    { name: 'sub', title: 'Subtitle', type: 'text' },
    { name: 'tag', title: 'Tagline', type: 'string' },
    { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
  ]
}
