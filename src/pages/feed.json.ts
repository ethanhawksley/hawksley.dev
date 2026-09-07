import { getSortedPosts, getPostHtml } from '../utils/content-helpers';

export async function GET() {
  const allPosts = await getSortedPosts();
  const siteUrl = 'https://hawksley.dev/';

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: "Ethan Hawksley's Blog",
    description:
      'A blog by Ethan Hawksley, a Computer Science student in the UK. Articles on systems programming, cybersecurity, and whatever else grabs my attention.',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}feed.json`,
    authors: [{ name: 'Ethan Hawksley', url: siteUrl }],
    language: 'en',
    favicon: 'https://hawksley.dev/icon-48x48.png',
    icon: 'https://hawksley.dev/icon-512x512.png',
    items: await Promise.all(
      allPosts.map(async (post) => ({
        id: `${siteUrl}blog/${post.id}`,
        url: `${siteUrl}blog/${post.id}`,
        title: post.data.title,
        summary: post.data.description,
        content_text: post.data.description,
        content_html: await getPostHtml(post),
        date_published: post.data.pubDate.toISOString(),
      })),
    ),
  };

  return new Response(JSON.stringify(feed), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
