import fs from 'node:fs/promises';
import path from 'node:path';

import { getSortedPosts } from '../../../utils/content-helpers';

import type { APIContext, GetStaticPaths } from 'astro';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export const getStaticPaths = (async () => {
  const allPosts = await getSortedPosts();
  const validBlogSlugs = new Set(allPosts.map((post) => post.id));

  const mediaFiles = import.meta.glob(
    '/src/content/blog/**/*.{jpg,jpeg,png,webp,gif,svg,avif}',
  );

  const pathsToGenerate = [];

  for (const filepath of Object.keys(mediaFiles)) {
    const match = filepath.match(/^\/src\/content\/blog\/([^/]+)\/(.+)$/);
    if (!match) continue;

    const id = match[1];
    const filename = match[2];

    if (validBlogSlugs.has(id)) {
      pathsToGenerate.push({
        params: { id, filename },
        props: { filepath },
      });
    }
  }

  return pathsToGenerate;
}) satisfies GetStaticPaths;

export async function GET({ props }: APIContext) {
  const { filepath } = props;
  const fullPath = path.join(process.cwd(), filepath);

  const mediaBuffer = await fs.readFile(fullPath);
  const extension = path.extname(filepath).toLowerCase();
  const contentType = MIME_TYPES[extension] || 'application/octet-stream';

  return new Response(mediaBuffer, {
    headers: {
      'Content-Type': contentType,
    },
  });
}
