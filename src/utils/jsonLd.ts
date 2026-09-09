import { allProfileUrls } from './profiles';

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
} as const;

export const personJsonLd = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  description:
    'Ethan Hawksley is a computer science student at the University of Warwick and author of The Second Maintainer: Inside the XZ Utils Backdoor.',
  jobTitle: 'Author',
  authorOf: {
    '@id': 'https://hawksley.dev/the-second-maintainer#book',
  },
  nationality: {
    '@type': 'Country',
    name: 'United Kingdom',
    sameAs: 'https://www.wikidata.org/wiki/Q145',
  },
  affiliation: {
    '@type': 'CollegeOrUniversity',
    url: 'https://warwick.ac.uk',
    name: 'University of Warwick',
    sameAs: [
      'https://www.wikidata.org/wiki/Q865528',
      'https://en.wikipedia.org/wiki/University_of_Warwick',
    ],
  },
  alumniOf: [
    {
      '@type': 'HighSchool',
      url: 'https://www.alcestergs.co.uk',
      name: 'Alcester Grammar School',
      sameAs: [
        'https://www.wikidata.org/wiki/Q4713005',
        'https://en.wikipedia.org/wiki/Alcester_Grammar_School',
      ],
    },
    {
      '@type': 'HighSchool',
      url: 'https://www.brookeweston.org',
      name: 'Brooke Weston Academy',
      sameAs: [
        'https://www.wikidata.org/wiki/Q4974495',
        'https://en.wikipedia.org/wiki/Brooke_Weston_Academy',
      ],
    },
  ],
  image: {
    '@type': 'ImageObject',
    url: 'https://hawksley.dev/ethan-hawksley.jpg',
    name: 'Ethan Hawksley',
    caption: 'Ethan Hawksley',
    width: 1536,
    height: 1536,
  },
  sameAs: allProfileUrls,
} as const;
