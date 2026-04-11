const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'fghdctku',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function test() {
  console.log('--- SANITY DIAGNOSTIC ---');
  try {
    const tours = await client.fetch(`*[_type == "tour"]{title, "slug": slug.current, bestseller}`);
    console.log('Tours Found:', tours.length);
    tours.forEach(t => {
      console.log(`- "${t.title}" | Slug: ${t.slug || 'MISSING'} | Bestseller: ${t.bestseller ? 'YES' : 'NO'}`);
    });

  } catch (err) {
    console.error('Diagnostic failed:', err);
  }
}

test();
