import { getCollection } from 'astro:content';
import { marked } from 'marked';

import type { CollectionEntry } from 'astro:content';

export async function getSortedProjects() {
  const projects = await getCollection('projects');
  return projects.toSorted((a, b) => a.data.priority - b.data.priority);
}

export async function getSortedPosts() {
  const posts = await getCollection('posts');
  return posts.toSorted(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getSortedSecondMaintainer() {
  const chapters = await getCollection('theSecondMaintainer');
  return chapters.toSorted((a, b) => a.data.index - b.data.index);
}

export async function getPostHtml(post: CollectionEntry<'posts'>) {
  if (!post.body) return '';

  let html = await marked.parse(post.body);

  html = html.replace(/(src|href)="([^"]+)"/g, (match, attr, url) => {
    // External protocols
    if (/^[a-z]+:/i.test(url)) {
      return match;
    }

    // Anchor links
    if (url.startsWith('#')) {
      return `${attr}="https://hawksley.dev/blog/${post.id}${url}"`;
    }

    // Root-relative links
    if (url.startsWith('/')) {
      return `${attr}="https://hawksley.dev${url}"`;
    }

    // Relative links
    const cleanRel = url.replace(/^\.\//, '');
    return `${attr}="https://hawksley.dev/blog/${post.id}/${cleanRel}"`;
  });

  return html;
}

const WORDS_PER_MINUTE = 238;

export function getReadingTime(content: string | undefined) {
  const words = (content ?? '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
