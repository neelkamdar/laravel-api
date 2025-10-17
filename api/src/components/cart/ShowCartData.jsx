import React, { useContext } from 'react';
import CartSidebar from './CartSidebar';
import { Col, Table } from 'reactstrap';
import CartData from './CartData';
import CartContext from '@/helper/cartContext';
import { useTranslation } from "react-i18next";
import NoDataFound from '../common/NoDataFound';
import emptyImage from '../../../public/assets/svg/empty-items.svg';

const ShowCartData = () => {
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation( 'common');
  return (
    <>
      {cartProducts?.length > 0 ? (
        <>
          <Col xxl={9} xl={8}>
            <div className='cart-table'>
              <div className='table-responsive'>
                <Table className='table'>
                  <tbody>
                    {cartProducts.map((elem, i) => (
                      <CartData elem={elem} key={i} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <CartSidebar />
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'no_items_added',
            description: 'nothing_added_to_your_compare_list',
            height: 50,
            width: 50,
          }}
        />
      )}
    </>
  );
};

export default ShowCartData;
