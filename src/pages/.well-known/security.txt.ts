import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const content = `Contact: https://hawksley.dev/
Encryption: https://hawksley.dev/key.asc
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: https://hawksley.dev/.well-known/security.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
