import React, { useEffect, useState } from 'react';
import { Post } from '../typings';
import 'moment-timezone';
import { fetchCategories } from '../utils/fetchCategories';
import Image from 'next/image';
import { sanityClient, urlFor } from '../lib/sanity';
import toast from 'react-hot-toast';

interface Props {
  posts: Post[];
}
function Categories({ posts }: Props) {
  const [categories, setCategories] = useState<Post[]>([]);
  console.log({ posts });
  const refreshCategories = async () => {
    const refreshToast = toast.loading('Refreshing...');
    const categories: Post[] = await fetchCategories();
    console.log({ categories });
    setCategories(categories);
    toast.success('Categories Updated!', {
      id: refreshToast,
    });
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <div className="mt-5 space-x-2 flex flex-wrap">
      {categories.map((category) => (
        <span
          key={category._id}
          className="flex-wrap  mt-2 text-gray-400 text-sm border p-2"
        >
          {category.title}
        </span>
      ))}
    </div>
  );
}

export default Categories;
