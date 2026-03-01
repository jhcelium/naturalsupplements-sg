import site from "../../data/site.json";
import { listArticleIds } from "../lib/content";

export const prerender = true;

export async function GET() {
  const base = `https://${site.domain}`;
  const staticPaths = ["/", "/about", "/faq"];
  const articlePaths = listArticleIds().map((id) => `/articles/${id}`);
  const allPaths = [...staticPaths, ...articlePaths];

  const urls = allPaths.map((p) => `<url><loc>${base}${p}</loc></url>`).join("");

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
