'use client';
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import ShowCartData from './ShowCartData';

const CartContent = () => {
  return (
    <>
      <Breadcrumb title={'cart'} subNavigation={[{ name: 'cart' }]} />
      <WrapperComponent classes={{ sectionClass: 'cart-section section-b-space', row: 'g-sm-5 g-3' }} customCol={true}>
        <ShowCartData />
      </WrapperComponent>
    </>
  );
};

export default CartContent;
