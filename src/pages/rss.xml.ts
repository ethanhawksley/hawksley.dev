import { getPostHtml, getSortedPosts } from '../utils/content-helpers';

function escapeXml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const allPosts = await getSortedPosts();
  const siteUrl = 'https://hawksley.dev/';

  const title = "Ethan Hawksley's Blog";
  const description =
    'A blog by Ethan Hawksley, a computer science student at the University of Warwick. Articles on systems programming, cybersecurity, and whatever else grabs my attention.';

  const itemsXml = (
    await Promise.all(
      allPosts.map(async (post) => {
        const postUrl = `${siteUrl}blog/${post.id}`;
        const contentHtml = await getPostHtml(post);

        return `<item><title>${escapeXml(post.data.title)}</title><link>${postUrl}</link><guid isPermaLink="true">${postUrl}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.pubDate.toUTCString()}</pubDate><content:encoded>${escapeXml(contentHtml)}</content:encoded></item>`;
      }),
    )
  ).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(title)}</title><description>${escapeXml(description)}</description><link>${siteUrl}</link><language>en</language><copyright>Content licensed under CC BY 4.0</copyright><atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml"/>${itemsXml}</channel></rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
