/** https://github.com/vercel/next.js/discussions/12124 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../components/Layout';

export default function HomePage({ recipes }) {
  console.log(recipes);
  return (
    <Layout>
      <h1>ITS ALIVE</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('recipes'));

  const recipes = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('recipes', filename),
      'utf-8'
    );

    /** https://github.com/jonschlinkert/gray-matter */
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: { recipes },
  };
}
