import { allProfileUrls } from './profiles';

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
  description:
    'The personal site and blog of Ethan Hawksley, a Computer Science student in the UK with a focus on systems programming and cybersecurity.',
  inLanguage: 'en',
  publisher: { '@id': 'https://hawksley.dev/#person' },
  image: {
    '@type': 'ImageObject',
    url: 'https://hawksley.dev/hawksley-dev-logo.png',
    name: 'Logo of hawksley.dev',
    caption: 'The official EH monogram logo for hawksley.dev',
    width: 1024,
    height: 1024,
  },
} as const;

export const personJsonLd = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  url: 'https://hawksley.dev/',
  mainEntityOfPage: { '@id': 'https://hawksley.dev/#webpage' },
  name: 'Ethan Hawksley',
  givenName: 'Ethan',
  familyName: 'Hawksley',
  description:
    'Computer Science student at the University of Warwick and author of The Second Maintainer, focusing on systems programming and cybersecurity.',
  disambiguatingDescription:
    'Computer Science student & systems/cybersecurity enthusiast, University of Warwick, UK',
  jobTitle: 'Computer Science Student',
  knowsLanguage: 'en',
  knowsAbout: [
    'Computer Science',
    'Systems Programming',
    'Cybersecurity',
    'XZ Utils Backdoor',
  ],
  nationality: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'West Midlands',
      addressCountry: 'GB',
    },
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

export const websiteRef = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
} as const;
