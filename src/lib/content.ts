import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.resolve("content");

export type FaqItem = { q: string; a: string };

export type Frontmatter = {
  title: string;
  description: string;
  primary_kw?: string;
  secondary_kws?: string[];
  faq?: FaqItem[];
};

export type LoadedMarkdown = {
  frontmatter: Frontmatter;
  html: string;
};

export function loadMarkdown(relativePath: string): LoadedMarkdown {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return { frontmatter: data as Frontmatter, html };
}

export function loadArticle(id: string): LoadedMarkdown {
  return loadMarkdown(path.join("articles", `${id}.md`));
}

export function listArticleIds(): string[] {
  const dir = path.join(CONTENT_DIR, "articles");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}
