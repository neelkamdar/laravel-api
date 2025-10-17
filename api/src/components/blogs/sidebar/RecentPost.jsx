'use client';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import Avatar from '@/components/common/Avatar';
import { formatDateForDateRange } from '@/utils/customFunctions/DateFormat';
import { placeHolderImage } from '../../../data/CommonPath';
import { useTranslation } from "react-i18next";
import BlogContext from '@/helper/blogContext';
import NoDataFound from '@/components/common/NoDataFound';

const RecentPost = () => {
  const { blogState ,blogContextLoader ,refetch } = useContext(BlogContext);
  useEffect(() => {
    refetch();
  }, [blogContextLoader])

  const { t } = useTranslation( 'common');
  
  return (
    <AccordionItem>
      <AccordionHeader targetId='1'>{t('recent_posts')}</AccordionHeader>
      <AccordionBody accordionId='1' className='pt-0'>
        {blogState?.length > 0 ? (
          <div className='recent-post-box'>
            {blogState?.slice(0, 5).map((blog, index) => (
              <div className='recent-box' key={index}>
                <Link href={`/blogs/${blog?.slug}`} className='recent-image'>
                  <Avatar data={blog?.blog_thumbnail} placeHolder={placeHolderImage} name={blog?.blog_thumbnail?.name} width={124} height={124} />
                </Link>

                <div className='recent-detail'>
                  <Link href={`/blogs/${blog?.slug}`}>
                    <h5 className='recent-name'>{blog.title}</h5>
                  </Link>
                  <h6>{formatDateForDateRange(blog.created_at)}</h6>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'no_blog_found' }} />
        )}
      </AccordionBody>
    </AccordionItem>
  );
};

export default RecentPost;
