/** https://github.com/vercel/next.js/discussions/12124 */
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Recipe from '../../components/Recipe';
import { sortMostRecentDate } from '../../utils';

export default function RecipePage({ recipes }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 font-bold">Recipes</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
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
    props: {
      recipes: recipes.sort(sortMostRecentDate),
    },
  };
}
