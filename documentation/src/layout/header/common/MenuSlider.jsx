import NoDataFound from '@/components/common/NoDataFound';
import ProductBox from '@/components/common/productBox';
import BlogIdsContext from '@/helper/blogIdsContext';
import ProductIdsContext from '@/helper/productIdsContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { placeHolderImage } from '../../../data/CommonPath';
import SideBanner from '../../../../public/assets/images/menu_banner.jpg';
import BottomBanner from '../../../../public/assets/images/menu_banner_2.jpg';


const MenuSlider = ({ menu }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const { filteredBlog:filterBlog,setGetBlogIds, blogIdsLoader } = useContext(BlogIdsContext);
  useEffect(() => {
    if (menu?.blog_ids?.length > 0) {
      setGetBlogIds((prev) => ({
        ...prev,
        ids: Array.from(new Set(menu?.blog_ids))?.join(","),
      }));
    }
  }, [menu?.blog_ids]);

  
  const filterProduct = useMemo(() => {
    return filteredProduct?.filter((el) => menu?.product_ids?.includes(el?.id+1));
  }, [menu?.product_ids, filteredProduct]);
  
  return (
    <>
      {menu?.mega_menu_type === 'product_box' && (
        <Col xl={6} className='dropdown-column d-xl-block d-none'>
          {filterProduct?.length > 0 ? (
            <div className='menu-product-slider'>
              <div className={` ${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
               <Row>
                {filterProduct?.slice(0, 2)?.map((product, i) => (
                  <Col xs={6} key={i}>
                     <ProductBox product={product} className="boxClass" style="horizontal" />
                  </Col>
                ))}
              </Row>
              </div>
            </div>
          ) : (
            <NoDataFound data={{ customClass: 'menu-no-data', title: 'no_product_found' }} />
          )}
        </Col>
      )}
      {menu.mega_menu_type === 'side_banner' && (
        <Col xl={3} className='dropdown-column d-xl-block d-none'>
          <div className='menu-img-banner'>
            <Link href={`/product/deliciously-sweet-watermelon`} className='text-title'>
              {menu?.banner_image &&<Image src={menu?.banner_image ? menu?.banner_image?.original_url : SideBanner} alt='banner' className='img-fluid' height={511} width={270} />}
            </Link>
          </div>
        </Col>
      )}
      {menu.mega_menu_type === 'bottom_banner' && (
        <Col xl={12} className='dropdown-column d-xl-block d-none'>
          <div className='menu-img-banner rounded overflow-hidden mx-0 mt-3 mb-0'>
           {menu?.banner_image && <Image src={menu?.banner_image ? menu?.banner_image?.original_url : BottomBanner} alt='banner_landscape' className='img-fluid' height={190} width={954} />}
          </div>
        </Col>
      )}
      {menu?.mega_menu_type === 'blog_box' && (
        <Col xl={9} className='dropdown-column d-xl-block d-none'>
          {filterBlog?.length > 0 ? (
            <Row>
              {filterBlog?.slice(0, 2)?.map((blog, i) => (
                <Col xs={6} key={i}>
                  <div className='blog-box sticky-blog'>
                    <div className='blog-box-image'>
                      <Link href={`/blogs/${blog?.slug}`} className='blog-image'>
                      {blog?.blog_thumbnail  &&  <Image src={blog?.blog_thumbnail ? blog?.blog_thumbnail?.original_url : placeHolderImage} className='img-fluid' alt={blog?.title || ""} height={299} width={398} />}
                      </Link>
                    </div>
                    <Link href={`/blogs/${blog?.slug}`} className='blog-detail'>
                      <h6>{dateFormat(blog.created_at)}</h6>
                      <h5>{blog?.title}</h5>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <NoDataFound data={{ customClass: 'menu-no-data', title: 'no_blog_found' }} />
          )}
        </Col>
      )}
    </>
  );
};

export default MenuSlider;
