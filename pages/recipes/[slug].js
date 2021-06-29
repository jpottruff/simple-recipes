import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function RecipePage({
  frontmatter: { title, category, data, cover_image, author, author_image },
  content,
  slug,
}) {
  return <div>{title}</div>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('recipes'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    /** `404` for paths that do not exist */
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('recipes', slug + '.md'),
    'utf-8'
  );

  /** https://github.com/jonschlinkert/gray-matter */
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
