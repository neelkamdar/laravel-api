import { Col } from 'reactstrap';
import WrapperComponent from '@/components/common/WrapperComponent';
import ProductDetailsTab from '../common/ProductDetailsTab';
import FourImage from './FourImage';
import CustomerOrderCount from '../common/CustomerOrderCount';
import ProductContent from '../common/ProductContent';
import ProductStatus from '../common/ProductStatus';
import ProductInformation from '../common/ProductInformation';
import ProductDeliveryInformation from '../common/ProductDeliveryInformation';
import PaymentOptions from '../common/PaymentOptions';
import ProductSocial from '../common/ProductSocial';
import ProductBundle from '../common/ProductBundle';

const Product4Image = ({ productState, setProductState}) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space', row: 'g-4' }} customCol={true}>
      <Col xl={6}>
        <FourImage productState={productState} />
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
    </WrapperComponent>
  );
};

export default Product4Image;