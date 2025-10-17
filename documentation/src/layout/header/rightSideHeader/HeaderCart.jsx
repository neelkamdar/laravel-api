import React, { useContext, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import Btn from '@/elements/buttons/Btn';

import HeaderCartData from './HeaderCartData';
import CartContext from '@/helper/cartContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { RiShoppingCartLine } from 'react-icons/ri';

const HeaderCart = () => {
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  
  const { t } = useTranslation( 'common');
  const { cartProducts } = useContext(CartContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    <li className='right-side'>
      <div className='onhover-dropdown header-badge'>
        <Btn type='button' className='btn p-0 position-relative header-wishlist' onClick={() => cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas)}>
          <RiShoppingCartLine />
          {cartProducts?.length > 0 && (
            <span className='position-absolute top-0 start-100 translate-middle badge'>
              {cartProducts?.length}
              <span className='visually-hidden'>{t('unread_messages')}</span>
            </span>
          )}
        </Btn>
        <HeaderCartData cartStyle={cartStyle} />
      </div>
    </li>
  );
};

export default HeaderCart;
