/** https://github.com/vercel/next.js/discussions/12124 */
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Recipe from '@/components/Recipe';
import { MAX_DISPLAY_HOME } from '@/config/index';
import { sortMostRecentDate } from '@/utils/index';

export default function HomePage({ recipes }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 font-bold">Latest Recipes</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
      <Link href="/recipes">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Recipes
        </a>
      </Link>
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
      recipes: recipes.sort(sortMostRecentDate).slice(0, MAX_DISPLAY_HOME),
    },
  };
}
