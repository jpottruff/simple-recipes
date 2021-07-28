/** https://github.com/vercel/next.js/discussions/12124 */
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import Recipe from '@/components/Recipe';
import Pagination from '@/components/Pagination';
import { MAX_DISPLAY_PER_PAGE } from '@/config/index';
import { getRecipes } from '@/lib/recipes';

export default function RecipePage({ recipes, numPages, currentPage }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 font-bold">Recipes</h1>

      <Pagination currentPage={currentPage} numPages={numPages}></Pagination>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>

      <Pagination currentPage={currentPage} numPages={numPages}></Pagination>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('recipes'));
  const numPages = Math.ceil(files.length / MAX_DISPLAY_PER_PAGE);

  let paths = [];

  /** Important to start at `1` here; do not _0 index_ pages */
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    /** 404 if not found */
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  /** Use the `params.page_index` or `1` by deafult */
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('recipes'));

  const numPages = Math.ceil(files.length / MAX_DISPLAY_PER_PAGE);

  /** The _0-based_ index of the first recipe on **this** page _(Exmaple: (1 - 1) * 3; `startAt = 0`)_*/
  const startAt = (page - 1) * MAX_DISPLAY_PER_PAGE;
  /** The _0-based_ index of the first _recipe_ on the **next** page _(Exmaple: 1 * 3; `endAt = 3`)_*/
  const endAt = page * MAX_DISPLAY_PER_PAGE;
  const recipesForPage = getRecipes().slice(startAt, endAt);
  return {
    props: {
      recipes: recipesForPage,
      numPages,
      currentPage: page,
    },
  };
}
