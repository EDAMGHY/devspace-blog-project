import Link from 'next/link';
import React from 'react';

export default function CategoryList({ categories }) {
  return (
    <div className='w-full p-5 bg-white rounded-lg shadow-md mt-6'>
      <h3 className='text-2xl bg-gray-800 text-white p-3 rounded'>
        Blog Categories
      </h3>
      <ul className='divide-y divide-gray-300'>
        {categories.map((item, index) => (
          <Link href={`/blog/category/${item.toLowerCase()}`}>
            <li className='p-4 cursor-pointer hover:bg-gray-50'>{item}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
