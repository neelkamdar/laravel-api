import { useContext, useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import VendorBox from './VendorBox';
import TrendingProduct from './TrendingProduct';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ImageLink from '@/components/themes/common/imageLink';

const ProductDetailSidebar = ({ productState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [banner, setBanner] = useState({
    redirect_link: {
      link_type: 'collection',
      link: 'vegetables-fruits'
    },
    image_url: null // Set an initial value or adjust accordingly
  });

  return (
    <Col xxl={3} xl={4} lg={5} className='d-none d-lg-block'>
      <div className='right-sidebar-box'>
        {productState?.product?.store &&
          <VendorBox productState={productState} />
        }
        {themeOption?.product?.is_trending_product && <TrendingProduct productState={productState} />}
        {themeOption?.product?.banner_enable && themeOption?.product?.banner_image_url && (
          <ImageLink classes={'section-t-space'} link={banner}  imgUrl={themeOption?.product?.banner_image_url} ratioImage={false} height={245} width={378} />
        )}
      </div>
    </Col>
  );
};

export default ProductDetailSidebar;
