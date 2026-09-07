import { getSortedPosts, getSortedSecondMaintainer } from './content-helpers';

export const NON_CONTENT_URLS = [
  'https://hawksley.dev/sitemap.xml',
  'https://hawksley.dev/sitemap.txt',
  'https://hawksley.dev/key.asc',
  'https://hawksley.dev/rss.xml',
  'https://hawksley.dev/feed.json',
  'https://hawksley.dev/elsewhere.txt',
  'https://hawksley.dev/.well-known/security.txt',
  'https://hawksley.dev/.well-known/webfinger',
  'https://hawksley.dev/blog/confirm-subscription',
];

export async function getContentUrls() {
  const allPosts = await getSortedPosts();
  const allChapters = await getSortedSecondMaintainer();

  const contentPaths = [
    '/',
    '/blog',
    '/elsewhere',
    '/the-second-maintainer',
    ...allPosts.map((post) => `/blog/${post.id}`),
    ...allChapters.map((chapter) => `/the-second-maintainer/${chapter.id}`),
  ];

  return contentPaths.map((path) => `https://hawksley.dev${path}`);
}

export async function getAllSiteUrls() {
  const contentUrls = await getContentUrls();
  return [...NON_CONTENT_URLS, ...contentUrls];
}
