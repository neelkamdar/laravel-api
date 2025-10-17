import { useContext } from 'react';
import { Col } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { useTranslation } from "react-i18next";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { RiArrowLeftLine } from 'react-icons/ri';
import SettingContext from '@/helper/settingContext';
import { useRouter } from 'next/navigation';

const CartSidebar = () => {
  const { cartProducts, getTotal } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext)
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const redirect = (path) => {
    router.push(`/${path}`)
  }
  const handelCheckout = () => {
    if (!isAuth) {
      Cookies.set("CallBackUrl", 'checkout');
      redirect('auth/login');
    } else {
      redirect('checkout');
    }
  };
  const isAuth = Cookies.get('uaf');
  return (
    <Col xxl={3} xl={4}>
      <div className='summery-box p-sticky'>
        <div className='summery-header'>
          <h3>{t('cart_total')}</h3>
        </div>

        <div className='summery-contain'>
          <ul>
            <li>
              <h4>{t('subtotal')}</h4>
              <h4 className='price'>{convertCurrency(getTotal(cartProducts)?.toFixed(2))}</h4>
            </li>

            <li className='align-items-start'>
              <h4>{t('shipping')}</h4>
              <h4 className='price text-end'>{t('cost_at_checkout')}</h4>
            </li>

            <li className='align-items-start'>
              <h4>{t('tax')}</h4>
              <h4 className='price text-end'>{t('cost_at_checkout')}</h4>
            </li>
          </ul>
        </div>

        <ul className='summery-total'>
          <li className='list-total border-top-0'>
            <h4>{t('total')}</h4>
            <h4 className='price theme-color'>{convertCurrency(getTotal(cartProducts)?.toFixed(2))}</h4>
          </li>
        </ul>

        <div className='button-group cart-button'>
          <ul>
            <li>
              <Link  href={`/checkout`} onClick={handelCheckout}  className='btn btn-animation proceed-btn fw-bold'>
                {t('process_to_checkout')}
              </Link>
            </li>

            <li>
              <Btn className='btn btn-light shopping-button text-dark'>
                <RiArrowLeftLine /> {t('return_to_shopping')}
              </Btn>
            </li>
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default CartSidebar;
