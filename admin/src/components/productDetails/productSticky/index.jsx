import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../common/ProductDetailsTab';
import ProductDetailSidebar from '../common/productDetailSidebar';
import WrapperComponent from '@/components/common/WrapperComponent';
import CustomerOrderCount from '../common/CustomerOrderCount';
import ProductContent from '../common/ProductContent';
import ProductStatus from '../common/ProductStatus';
import ProductInformation from '../common/ProductInformation';
import ProductDeliveryInformation from '../common/ProductDeliveryInformation';
import PaymentOptions from '../common/PaymentOptions';
import ProductSocial from '../common/ProductSocial';
import ProductBundle from '../common/ProductBundle';
import StickImage from './SticktImage';

const ProductSticky = ({ productState, setProductState }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
      <Col xxl={9} xl={8} lg={7}>
        <Row className='g-4'>
          <Col xl={6} lg={12}>
            <StickImage productState={productState} setProductState={setProductState} />
          </Col>

          <Col xl={6} lg={5}>
              <div className="right-box-contain">
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
            <ProductDetailsTab productState={productState} setProductState={setProductState} />
        </Row>
      </Col>
      <ProductDetailSidebar productState={productState} />
    </WrapperComponent>
  );
};

export default ProductSticky;
