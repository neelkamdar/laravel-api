import NoDataFound from '@/components/common/NoDataFound';
import BlogIdsContext from '@/helper/blogIdsContext';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import TextLimit from '@/utils/customFunctions/TextLimit';
import RatioImage from '@/utils/RatioImage';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import Slider from 'react-slick';
import { featureBlogSliderOption3, featureBlogSliderOption4, featureBlogSliderOptions4, latestBlogSlider, madridFeatureBlog, romeBlogSliderOption } from '../../../../data/SliderSettingsData';

const BlogData = ({ classes = {}, dataAPI ,description=false, sliderKey}) => {
    const { t } = useTranslation( 'common');
    // const { filteredBlog } = useContext(BlogIdsContext);
    const { filteredBlog } = useContext(BlogIdsContext);
    
    const filterBlogs = useMemo(() => {
      if (dataAPI) {
        return filteredBlog?.filter((el) => dataAPI?.blog_ids.includes(el.id));
      } else {
        return filteredBlog;
      }
    }, [filteredBlog, dataAPI]);
    
    const option = {
        latestBlogSlider: latestBlogSlider,
        featureBlogSliderOption4: featureBlogSliderOption4,
        madridFeatureBlog: madridFeatureBlog,
        featureBlogSliderOptions4: featureBlogSliderOptions4,
        featureBlogSliderOption3: featureBlogSliderOption3,
        romeBlogSliderOption: romeBlogSliderOption
    }
    return (
        <>
            <div className={classes?.sliderClass ? classes?.sliderClass : ''}>
                <Slider {...option[sliderKey](filterBlogs?.length || 1)}>
                    {filterBlogs?.map((elem, i) => (
                        <div key={i}>
                            <div className={`blog-box ${elem?.is_sticky == 1 ? 'sticky-blog-box' : ''} ${classes?.ratioClass ? classes?.ratioClass : ''}`}>
                                {elem?.is_featured ? (
                                    <div className='blog-label-tag'>
                                        <span>{t('featured')}</span>
                                    </div>
                                ) : null}
                                <div className='blog-box-image'>
                                    <Link href={`/blogs/${elem?.slug}`} className='blog-image'>
                                        <RatioImage src={elem?.blog_thumbnail?.original_url} className='bg-img' alt='blog' height={classes?.height} width={classes?.width} />
                                    </Link>
                                </div>

                                <Link href={`/blogs/${elem?.slug}`} className='blog-detail'>
                                    <h6>{dateFormat(elem?.created_at)}</h6>
                                    <h5>{elem?.title}</h5>
                                </Link>
                                {description &&
                                    <TextLimit value={elem?.description} maxLength={100} tag='p' />
                                }
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {!filterBlogs &&
                <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'no_blog_found' }} />
            }

        </>
    );
};

export default BlogData;
