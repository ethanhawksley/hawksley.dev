export const profileSections = [
  {
    title: 'Code',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/ethanhawksley',
      },
      {
        name: 'Codeberg',
        url: 'https://codeberg.org/ethanhawksley',
      },
      {
        name: 'GitLab',
        url: 'https://gitlab.com/ethanhawksley',
      },
      {
        name: 'crates.io',
        url: 'https://crates.io/users/ethanhawksley',
      },
      {
        name: 'itch.io',
        url: 'https://ethanhawksley.itch.io',
      },
      {
        name: 'Hack Club Scrapbook',
        url: 'https://scrapbook.hackclub.com/ethanhawksley',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/ethanhawksley/',
      },
    ],
  },
  {
    title: 'Writing',
    links: [
      {
        name: 'DEV Community',
        url: 'https://dev.to/ethanhawksley',
      },
      {
        name: 'Hashnode',
        url: 'https://hashnode.com/@ethanhawksley',
      },
      {
        name: 'Medium',
        url: 'https://medium.com/@ethan-hawksley',
      },
      {
        name: 'Lobsters',
        url: 'https://lobste.rs/~ethanhawksley',
      },
      {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/user?id=ethanhawksley',
      },
    ],
  },
  {
    title: 'Professional',
    links: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/ethanhawksley',
      },
      {
        name: 'ORCID',
        url: 'https://orcid.org/0009-0005-6663-0640',
      },
      {
        name: 'Wikidata',
        url: 'https://www.wikidata.org/wiki/Q141459330',
      },
      {
        name: 'Gravatar',
        url: 'https://gravatar.com/ethanhawksley',
      },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        name: 'Bluesky',
        url: 'https://bsky.app/profile/hawksley.dev',
      },
      {
        name: 'Mastodon',
        url: 'https://mastodon.social/@ethanhawksley',
      },
      {
        name: 'Twitter (X)',
        url: 'https://x.com/Ethan_Hawksley',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@Ethan-Hawksley',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/ethan.hawksley/',
      },
    ],
  },
];

export const allProfileLinks = profileSections.flatMap(
  (section) => section.links,
);

export const allProfileUrls = allProfileLinks.map((link) => link.url);
