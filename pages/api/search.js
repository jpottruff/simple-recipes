import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default (req, res) => {
  let recipes;

  if (process.env.NODE_ENV === 'production') {
    // TODO - fetch from cache
  } else {
    const files = fs.readdirSync(path.join('recipes'));

    recipes = files.map((filename) => {
      const slug = filename.replace('.md', '');

      const markdownWithMeta = fs.readFileSync(
        path.join('recipes', filename),
        'utf-8'
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });
  }

  const results = recipes.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
};
