import site from "../../data/site.json";
import { listArticleIds } from "../lib/content";

export const prerender = true;

interface PageConfig {
  path: string;
  changefreq: string;
  priority: string;
}

export async function GET() {
  const base = `https://${site.domain}`;
  const today = new Date().toISOString().split("T")[0];

  const staticPages: PageConfig[] = [
    { path: "/",                      changefreq: "weekly",  priority: "1.0" },
    { path: "/about",                 changefreq: "monthly", priority: "0.7" },
    { path: "/faq",                   changefreq: "monthly", priority: "0.8" },
    { path: "/clean-label-checklist", changefreq: "monthly", priority: "0.8" },
  ];

  const articlePages: PageConfig[] = listArticleIds().map((id) => ({
    path: `/articles/${id}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  const allPages = [...staticPages, ...articlePages];

  const urls = allPages
    .map(
      ({ path, changefreq, priority }) =>
        `<url>` +
        `<loc>${base}${path}</loc>` +
        `<lastmod>${today}</lastmod>` +
        `<changefreq>${changefreq}</changefreq>` +
        `<priority>${priority}</priority>` +
        `</url>`
    )
    .join("");

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
