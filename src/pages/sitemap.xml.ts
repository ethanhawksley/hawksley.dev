import {
  getSortedPosts,
  getSortedSecondMaintainer,
} from '../utils/content-helpers';

import type { APIContext } from 'astro';

interface SitemapPage {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
  images?: string[];
}

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString();
  const allPosts = await getSortedPosts();
  const allChapters = await getSortedSecondMaintainer();

  const blogLastPublished = allPosts[0].data.pubDate
    .toISOString()
    .split('T')[0];

  const staticPages: SitemapPage[] = [
    {
      url: '',
      priority: 1.0,
      changefreq: 'monthly',
      lastmod: blogLastPublished,
      images: ['https://hawksley.dev/ethan-hawksley.jpg'],
    },
    {
      url: 'blog',
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: blogLastPublished,
    },
    {
      url: 'the-second-maintainer',
      priority: 0.9,
      changefreq: 'monthly',
      images: [
        'https://hawksley.dev/the-second-maintainer/the-second-maintainer.jpg',
      ],
    },
    { url: 'elsewhere', priority: 0.8, changefreq: 'monthly' },
  ];

  const postPages: SitemapPage[] = allPosts.map((post) => {
    const lastMod = post.data.modDate || post.data.pubDate;
    return {
      url: `blog/${post.id}`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: lastMod.toISOString().split('T')[0],
    };
  });

  const chapterPages: SitemapPage[] = allChapters.map((chapter) => ({
    url: `the-second-maintainer/${chapter.id}`,
    priority: 0.7,
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...postPages, ...chapterPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map((page) => {
      let loc = page.url.startsWith('http')
        ? page.url
        : new URL(page.url, siteUrl).toString();

      const lastmodTag = page.lastmod
        ? `\n    <lastmod>${page.lastmod}</lastmod>`
        : '';

      const imagesTag = page.images
        ? page.images
            .map(
              (imgUrl) =>
                `\n    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n    </image:image>`,
            )
            .join('')
        : '';

      return `<url>
    <loc>${loc}</loc>${imagesTag}${lastmodTag}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n  ')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
