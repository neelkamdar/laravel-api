import HandleQuantity from '@/components/cart/HandleQuantity';
import Avatar from '@/components/common/Avatar';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import SettingContext from '@/helper/settingContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { placeHolderImage } from '../../../data/CommonPath';
import { useTranslation } from 'react-i18next';

const SelectedCart = ({ modal, setSelectedVariation, setModal }) => {
  const [clearCart, setClearCartData] = useState(false)
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts, removeCart, clearCartProduct } = useContext(CartContext);
  const { t } = useTranslation('common');
  const onEdit = (data) => {
    setSelectedVariation(() => data);
    setTimeout(() => {
      setModal(true);
    }, 0);
  };

  useEffect(() => {
    cartProducts?.filter((elem) => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values?.map((values) => values?.value).join('/');
      } else {
        elem;
      }
    });
  }, [modal]);  
  return (
    <>
       {cartProducts.length &&  
         <div className="sidebar-title">
          <h4>{cartProducts?.length } {(cartProducts.length == 1 ? 'Product' : 'Products')}<a  onClick={() => clearCartProduct()}>{ t('clear_cart')}</a></h4>
        </div>
       }

      <ul className='cart-list'>
        {cartProducts.map((elem, i) => (
          <li className='product-box-contain' key={i}>
            <div className='drop-cart'>
              <Link href={`/product/${elem?.product?.slug}`} className='drop-image'>
                <Avatar data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} height={72} width={87} />
              </Link>

              <div className='drop-contain'>
                <Link href={`/product/${elem?.product?.slug}`}>
                  <h5>{elem?.variation?.name ?? elem?.product?.name}</h5>
                </Link>
                <h6>{convertCurrency(elem?.variation?.sale_price ?? elem?.product?.sale_price)}</h6>
                {elem?.variation && <h5 className='gram'>{elem?.variation?.selected_variation ?? elem?.product?.selected_variation}</h5>}
                  <HandleQuantity productObj={elem?.product} elem={elem} customIcon={<RiDeleteBinLine />} />
                <div>
                  <div className='header-button-group'>
                    {elem?.variation && (
                      <Btn className='edit-button close_button' onClick={() => onEdit(elem)}>
                        <RiPencilLine />
                      </Btn>
                    )}
                    <Btn className='delete-button close_button' onClick={() => removeCart(elem?.product_id, elem?.id)}>
                      <RiDeleteBinLine />
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectedCart;
