import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';

export default function Recipe({ recipe }) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={recipe.frontmatter.cover_image}
        alt=""
        height={420}
        width={600}
        className="mb-4 rounded"
      />
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {recipe.frontmatter.date}
        </span>
        <span className="flex justify-between items-center">
          {recipe.frontmatter.category.split(',').map((cat, index) => {
            const category = cat.trim();
            return <CategoryLabel key={index}>{category}</CategoryLabel>;
          })}
        </span>
      </div>

      <div className="mt-2">
        <Link href={`/recipes/${recipe.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {recipe.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{recipe.frontmatter.excerpt}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${recipe.slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Let's do it!</a>
        </Link>
        <div className="flex items-center">
          <img
            src={recipe.frontmatter.author_image}
            alt="author"
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          />
          <h3 className="text-gray-700 font bold">
            {recipe.frontmatter.author}
          </h3>
        </div>
      </div>
    </div>
  );
}
