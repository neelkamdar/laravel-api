import Link from 'next/link';
import { optionListMinimal } from '../../../data/CustomData';
import { Fragment, useContext, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import CartContext from '@/helper/cartContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import HeaderCartData from '../rightSideHeader/HeaderCartData';
import HeaderProfile from '../rightSideHeader/HeaderProfile';
import Cookies from 'js-cookie';

const MinimalRightSidebar = ({setSearchBarOpen}) => {
  const { t } = useTranslation('common');
  const { cartProducts } = useContext(CartContext);
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  const cookieUAT = Cookies.get('uaf');
  return (
    <div className='rightside-menu'>
      <ul className='option-list-2'>
        {optionListMinimal.map((elem, i) => (
          <Fragment key={i}>
            <li className='onhover-dropdown' onClick={() => {elem?.isBadge && cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas); elem?.searchIcon ? setSearchBarOpen(prev=>!prev) :null 
          if (!cookieUAT) {
            elem.callBackUrl ? Cookies.set("CallBackUrl",elem.path) :""}
          
          }  }>
              {elem?.path ? (
                <Link href={`${elem?.path}`} className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}>
                  {elem.icon}
                </Link>
              ) : (
                <a className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}>
                  {elem?.isBadge && cartProducts?.length > 0 && <small className='badge-number badge-light'>{cartProducts?.length}</small>}
                  {elem.icon}
                </a>
              )}
              {elem.isBadge && <HeaderCartData cartStyle={cartStyle} />}
            </li>
          </Fragment>
        ))}
        <HeaderProfile extraClass="header-icon" />
      </ul>
    </div>
  );
};

export default MinimalRightSidebar;
