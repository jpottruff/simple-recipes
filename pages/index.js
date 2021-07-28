import Link from 'next/link';
import Layout from '@/components/Layout';
import Recipe from '@/components/Recipe';
import { MAX_DISPLAY_HOME } from '@/config/index';
import { getRecipes } from '@/lib/recipes';

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
  return {
    props: {
      recipes: getRecipes().slice(0, MAX_DISPLAY_HOME),
    },
  };
}
