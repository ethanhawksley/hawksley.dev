// @ts-check
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hawksley.dev',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      transformers: [
        {
          name: 'add-copy-button',
          pre(node) {
            node.properties.role = 'region';
            node.properties.tabindex = '0';
            node.properties['aria-label'] = 'Code snippet';
            node.children.push({
              type: 'element',
              tagName: 'button',
              properties: {
                className: ['copy-button'],
                type: 'button',
                'aria-label': 'Copy code',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['copy-icon'],
                    width: '18',
                    height: '18',
                    'aria-hidden': 'true',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'use',
                      properties: { href: '#icon-copy' },
                      children: [],
                    },
                  ],
                },
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['check-icon'],
                    width: '18',
                    height: '18',
                    'aria-hidden': 'true',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'use',
                      properties: { href: '#icon-check' },
                      children: [],
                    },
                  ],
                },
              ],
            });
          },
        },
      ],
    },
  },
  vite: {
    build: {
      cssTarget: ['chrome60', 'firefox60', 'safari11', 'edge16'],
      assetsInlineLimit(filePath) {
        if (filePath.includes('Misc')) {
          return false;
        }
      },
    },
  },
  integrations: [
    mdx(),
    compress({
      Image: false,
      SVG: false,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
    }),
  ],
});
