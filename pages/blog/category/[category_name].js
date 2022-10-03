import Layout from '@/components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Post from '@/components/Post';
import { sortByDate } from '@/utils/index';
import { getPosts } from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>
            Posts in {categoryName}
          </h1>{' '}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });
  const paths = categories.map((item) => ({ params: { category_name: item } }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { category_name } }) {
  // get categories
  const categories = getPosts().map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];
  const categoryPosts = getPosts().filter(
    (item) => item.frontmatter.category.toLowerCase() === category_name
  );
  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
