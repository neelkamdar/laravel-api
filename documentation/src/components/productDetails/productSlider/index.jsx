import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ProductInformation from '../common/ProductInformation';
import ProductDetailsTab from '../common/ProductDetailsTab';
import ProductDetailSidebar from '../common/productDetailSidebar';
import WrapperComponent from '@/components/common/WrapperComponent';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ProductSocial from '../common/ProductSocial';
import ProductBundle from '../common/ProductBundle';
import ProductDeliveryInformation from '../common/ProductDeliveryInformation';
import SliderImage from './SliderImage';
import CustomerOrderCount from '../common/CustomerOrderCount';
import ProductContent from '../common/ProductContent';
import ProductStatus from '../common/ProductStatus';
import PaymentOptions from '../common/PaymentOptions';

const ProductSlider = ({ productState, setProductState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <SliderImage productState={productState} setProductState={setProductState}/>
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <Col xs={12}>
              <div className='right-box-contain full-width-right-box'>
                <CustomerOrderCount productState={productState} />
                <ProductContent productState={productState} setProductState={setProductState} />
                <ProductStatus productState={productState} />
                <ProductInformation productState={productState} />
                <ProductDeliveryInformation productState={productState} />
                <PaymentOptions productState={productState} />
                <ProductSocial productState={productState} />
              </div>
            </Col>
            {productState?.product?.cross_sell_products?.length > 0 && (
              <Col xs={12} className='related-product-2'>
                <ProductBundle productState={productState} />
              </Col>
            )}
            <ProductDetailsTab productState={productState} />
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} />
      </WrapperComponent>
    </>
  );
};

export default ProductSlider;
