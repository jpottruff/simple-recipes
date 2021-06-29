import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';

import Link from 'next/link';
import Layout from '../../components/Layout';
import CategoryLabel from '../../components/CategoryLabel';

export default function RecipePage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return (
    <Layout title={title}>
      <Link href="/recipes">Go Back</Link>

      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        {/* Title / Category */}
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <span className="flex justify-between items-center">
            {category.split(',').map((cat, index) => {
              const category = cat.trim();
              return <CategoryLabel key={index}>{category}</CategoryLabel>;
            })}
          </span>
        </div>

        {/* Image */}
        <img src={cover_image} alt="cover" className="w-full rounded" />

        {/* Author Info */}
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt="author"
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        {/* Content */}
        <div className="markdown-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
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
