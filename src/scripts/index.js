import fs from "fs/promises";
import path from "path";

const blogPost = (title, content) => `---
title: "${title}"
description: "${title}"
pubDate: "${new Date().toISOString()}"
heroImage: "/blog-placeholder-3.jpg"
---

${content}
`;

async function main() {
  const blogPath = path.join(process.cwd(), "src", "content", "blog");

  const saakhianPath = path.join(
    process.cwd(),
    "src",
    "content",
    "saakhian.txt"
  );
  const saakhianContent = await fs.readFile(saakhianPath, "utf-8");
  const saakhian = saakhianContent.split("---\n");
  for (let i = 0; i < saakhian.length; i++) {
    const saakhi = saakhian[i];
    const saakhiLines = saakhi.split("\n");
    const saakhiTitle = saakhiLines[0];
    const saakhianContent = saakhiLines.slice(1).join("\n");
    const saakhiPath = path.join(blogPath, `${i + 1}-saakhi.md`);
    await fs.writeFile(saakhiPath, blogPost(saakhiTitle, saakhianContent));
  }
}

main();
