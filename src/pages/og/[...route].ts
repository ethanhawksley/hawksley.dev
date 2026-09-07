import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import type { APIRoute } from 'astro';
import {
  getSortedPosts,
  getSortedSecondMaintainer,
} from '../../utils/content-helpers';

const VERSION = 'v7';
const CACHE_DIR = path.join(process.cwd(), 'node_modules/.astro/og-cache');

let bgBase64: string | null = null;
let coverBase64: string | null = null;
let fontBold: Buffer | null = null;
let fontRegular: Buffer | null = null;

interface PageProps {
  title: string;
  description?: string;
  showCover?: boolean;
}

export async function getStaticPaths() {
  const allPosts = await getSortedPosts();
  const allChapters = await getSortedSecondMaintainer();

  const blogPaths = allPosts.map((post) => ({
    params: { route: `blog/${post.id}.jpg` },
    props: {
      page: {
        title: post.data.title,
        description: post.data.description,
      },
    },
  }));

  const chapterPaths = allChapters.map((chapter) => ({
    params: { route: `the-second-maintainer/${chapter.id}.jpg` },
    props: {
      page: {
        title: `${chapter.data.index}: ${chapter.data.title}`,
        description: 'The Second Maintainer: Inside the XZ Utils Backdoor',
        showCover: true,
      },
    },
  }));

  const staticPaths = [
    {
      params: { route: 'home.jpg' },
      props: {
        page: {
          title: 'Ethan Hawksley',
          description:
            'Computer Science student at the University of Warwick and author of The Second Maintainer.',
        },
      },
    },
    {
      params: { route: 'blog.jpg' },
      props: {
        page: {
          title: 'Blog',
          description:
            'Articles primarily on tech, but also whatever grabs my attention.',
        },
      },
    },
    {
      params: { route: 'elsewhere.jpg' },
      props: {
        page: {
          title: 'Elsewhere',
          description:
            'Online profiles and platforms where you can find me around the web.',
        },
      },
    },
  ];

  return [...staticPaths, ...blogPaths, ...chapterPaths];
}

export const GET: APIRoute = async ({ props }) => {
  const page = props.page as PageProps;
  const { title, description = '', showCover = false } = page;

  const hash = createHash('sha256')
    .update(VERSION)
    .update(title)
    .update(description)
    .update(showCover ? 'cover' : 'nocover')
    .digest('hex');
  const cacheFilePath = path.join(CACHE_DIR, `${hash}.jpg`);

  try {
    await mkdir(CACHE_DIR, { recursive: true });
    if (existsSync(cacheFilePath)) {
      const cachedImage = await readFile(cacheFilePath);
      return new Response(new Uint8Array(cachedImage), {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
    }
  } catch (error) {
    console.warn('Cache read error:', error);
  }

  if (!bgBase64 || !coverBase64 || !fontBold || !fontRegular) {
    const bgBuffer = readFileSync(
      path.join(process.cwd(), 'src/assets/og-background.png'),
    );
    bgBase64 = `data:image/png;base64,${bgBuffer.toString('base64')}`;

    const coverBuffer = readFileSync(
      path.join(process.cwd(), 'src/assets/the-second-maintainer.png'),
    );
    coverBase64 = `data:image/png;base64,${coverBuffer.toString('base64')}`;

    fontBold = readFileSync(
      path.join(process.cwd(), 'src/assets/ibm-plex-sans-bold.ttf'),
    );
    fontRegular = readFileSync(
      path.join(process.cwd(), 'src/assets/ibm-plex-sans-regular.ttf'),
    );
  }

  const backgroundNode = {
    type: 'img',
    props: {
      src: bgBase64,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1200px',
        height: '630px',
      },
    },
  };

  const titleNode = {
    type: 'div',
    props: {
      style: {
        fontSize: 50,
        fontWeight: 700,
        color: '#ffffff',
        lineHeight: 1.3,
        textWrap: 'balance',
        fontFamily: 'IBM Plex Sans',
      },
      children: title,
    },
  };

  const descriptionNode = description
    ? {
        type: 'div',
        props: {
          style: {
            fontSize: 30,
            color: '#a1a1aa',
            marginTop: 24,
            lineHeight: 1.5,
            textWrap: 'balance',
            fontFamily: 'IBM Plex Sans',
          },
          children: description,
        },
      }
    : null;

  const contentNode = {
    type: 'div',
    props: {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        boxSizing: 'border-box',
      },
      children: [titleNode, descriptionNode].filter(Boolean),
    },
  };

  const coverNode =
    showCover && coverBase64
      ? {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 59,
              right: 105,
              width: 320,
              height: 512,
              display: 'flex',
              border: '2px solid #2a2a2a',
              backgroundColor: '#191919',
            },
            children: [
              {
                type: 'img',
                props: {
                  src: coverBase64,
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                },
              },
            ],
          },
        }
      : null;

  const rootContainerNode = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        position: 'relative',
      },
      children: [backgroundNode, contentNode, coverNode].filter(Boolean),
    },
  };

  const svg = await satori(rootContainerNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'IBM Plex Sans',
        data: fontBold,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'IBM Plex Sans',
        data: fontRegular,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const png = new Resvg(svg).render().asPng();

  const jpeg = await sharp(png)
    .jpeg({
      quality: 90,
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
      progressive: true,
      optimiseScans: true,
    })
    .toBuffer();

  try {
    await writeFile(cacheFilePath, jpeg);
  } catch (error) {
    console.warn('Cache write error:', error);
  }

  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
};
