import site from "../../data/site.json";

export const prerender = true;

export async function GET() {
  const body =
    `User-agent: *\n` +
    `Allow: /\n` +
    `\n` +
    `User-agent: GPTBot\n` +
    `Allow: /\n` +
    `\n` +
    `User-agent: Claude-Web\n` +
    `Allow: /\n` +
    `\n` +
    `User-agent: PerplexityBot\n` +
    `Allow: /\n` +
    `\n` +
    `Sitemap: https://${site.domain}/sitemap.xml\n`;
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
