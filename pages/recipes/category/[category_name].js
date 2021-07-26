/** https://github.com/vercel/next.js/discussions/12124 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Recipe from '@/components/Recipe';
import { sortMostRecentDate } from '@/utils/index';

export default function CategoryRecipePage({ recipes, categoryName }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 font-bold">
        <span className="capitalize">{categoryName}</span> Recipes
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('recipes'));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('recipes', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    /** Account for `frontmatter.category` being a comma separated list of categories */
    return frontmatter.category
      .split(', ')
      .map((category) => category.toLowerCase());
  });

  /** Account for `categories` being an Array of Arrays */
  const paths = categories.flat().map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  console.log(category_name);
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

  // Filter recipes by category (Accounts for possible multiple categories on a single recipe)
  const categoryRecipes = recipes
    .filter((recipe) => {
      const recipeCategories = recipe.frontmatter.category
        .split(', ')
        .map((category) => category.toLowerCase());
      return recipeCategories.includes(category_name) ? recipe : undefined;
    })
    .map((item) => item);

  return {
    props: {
      recipes: categoryRecipes.sort(sortMostRecentDate),
      categoryName: category_name,
    },
  };
}
