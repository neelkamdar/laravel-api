'use client';
import { useContext } from 'react';
import { Col } from 'reactstrap';
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import Loader from '@/layout/loader';
import NoDataFound from '../common/NoDataFound';
import emptyImage from '../../../public/assets/svg/empty-items.svg';
import ProductBox from '../common/productBox';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import WishlistContext from '@/helper/wishlistContext';

const WishlistContent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { wishlistProducts, WishlistAPILoading } = useContext(WishlistContext);
  if (WishlistAPILoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={'wishlist'} subNavigation={[{ name: 'wishlist' }]} />
      {wishlistProducts?.length > 0 ? (
        <WrapperComponent classes={{ sectionClass: 'wishlist-section section-b-space', row: 'g-sm-3 g-2' }} customCol={true}>
          {wishlistProducts?.map((product, i) => (
            <Col xxl={2} lg={3} md={4} xs={6} className='product-box-contain' key={i}>
              <div className={`${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
                <ProductBox product={product} className="boxClass" style="horizontal" refetch={WishlistAPILoading} isClose={true} isProductAction={false} />
              </div>
            </Col>
          ))}
        </WrapperComponent>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'no_items_added',
            description: 'appears_nothing_added_wishlist_explore_categories',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default WishlistContent;
