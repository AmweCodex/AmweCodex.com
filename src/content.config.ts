// src/content.config.ts
// ============================================================================
// This file defines your two "content collections": projects and blog.
// A collection is just a folder of markdown files (src/content/projects/ and
// src/content/blog/) that all share the same frontmatter shape.
//
// WHY THIS MATTERS FOR YOU: once a collection is defined here, adding a new
// project or blog post is just adding a new .md file to the folder — you
// never touch any .astro/HTML code. The listing pages and homepage preview
// automatically pick it up.
//
// `schema` below is the checklist every markdown file's frontmatter (the
// ---fenced block at the top of the file) must satisfy. If you forget a
// required field, Astro will show you a clear error when you run the site,
// instead of silently breaking.
// ============================================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---- Projects -------------------------------------------------------------
const projects = defineCollection({
  // `glob` tells Astro: "every .md file directly inside src/content/projects/
  // is one entry in this collection."
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Short 1-2 sentence blurb shown on the PROJECT CARD (listing + homepage)
    summary: z.string(),
    // Path to the cover image, relative to /public — e.g. "/images/projects/foo.svg"
    cover: z.string(),
    // Tech-stack chips shown on the card, e.g. ["Arduino", "C++"]
    stack: z.array(z.string()).default([]),
    date: z.coerce.date(),
    // Set draft: true on a project to hide it from listings without deleting it
    draft: z.boolean().default(false),
  }),
});

// ---- Blog -------------------------------------------------------------
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Short summary shown on the BLOG CARD (listing + homepage)
    summary: z.string(),
    cover: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
