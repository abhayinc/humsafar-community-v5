import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder({
  projectId: 'fghdctku',
  dataset: 'production',
});

/**
 * Generates an optimized Sanity image URL with default quality and format settings.
 * @param {object} source - The Sanity image source object
 * @param {number} [width] - Optional width constraint
 * @returns {string} Optimized URL
 */
export function urlFor(source) {
  if (!source) return '';
  return builder.image(source).auto('format').quality(75).url();
}

/**
 * Returns a builder instance for more complex transformations.
 */
export function imageBuilder(source) {
  return builder.image(source);
}
