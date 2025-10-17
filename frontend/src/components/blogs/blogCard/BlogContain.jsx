import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiArrowRightFill, RiTimeLine, RiUserLine } from 'react-icons/ri';
import Btn from '@/elements/buttons/Btn';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import TextLimit from '@/utils/customFunctions/TextLimit';
import { useTranslation } from "react-i18next";

const BlogContain = ({ blog }) => {
  
  const { t } = useTranslation( 'common');
  const { themeOption } = useContext(ThemeOptionContext);
  const router = useRouter();
  return (
    <div className='blog-contain'>
      <div className='blog-label'>
        <span className='time'>
          <RiTimeLine />
          {dateFormat(blog?.created_at)}
        </span>
        {themeOption?.blog?.blog_author_enable && (
          <span className='super'>
            <RiUserLine /> {blog?.created_by?.name}
          </span>
        )}
      </div>
      <Link href={`/blogs/${blog.slug}`}>
        <h3>{blog?.title}</h3>
      </Link>
      <TextLimit value={blog?.description} maxLength={200} tag='p' />
      {themeOption?.blog?.read_more_enable && (
        <Btn className='blog-button' onClick={() => router.push(`/blogs/${blog.slug}`)}>
          {t('read_more')} <RiArrowRightFill />
        </Btn>
      )}
    </div>
  );
};

export default BlogContain;
