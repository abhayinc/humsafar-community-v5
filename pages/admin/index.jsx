import { NextStudio } from 'next-sanity/studio';
import config from '../../sanity.config';
import Head from 'next/head';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>CMS Studio - Humsafar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </Head>
      <div style={{ height: '100vh', width: '100vw' }}>
        <NextStudio config={config} />
      </div>
    </>
  );
}
