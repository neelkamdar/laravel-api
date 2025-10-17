import Link from 'next/link';
import BlogContain from './BlogContain';
import Image from 'next/image';
import { placeHolderImage } from '../../../data/CommonPath';

const BlogCardContain = ({ blog }) => {
  
  return (
    <>
      <div className='blog-image'>
        <Link href={`/blogs/${blog.slug}`}>
         {blog?.blog_thumbnail?.original_url && <Image src={blog?.blog_thumbnail?.original_url || placeHolderImage}  alt='blog-image' height={244} width={490} />}
        </Link>
      </div>
      <BlogContain blog={blog} />
    </>
  );
};

export default BlogCardContain;
