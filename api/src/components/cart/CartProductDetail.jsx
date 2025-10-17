import Link from 'next/link';
import { placeHolderImage } from '../../data/CommonPath';
import HandleQuantity from './HandleQuantity';
import Avatar from '../common/Avatar';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';

const CartProductDetail = ({ elem }) => {
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <td className='product-detail'>
      <div className='product border-0'>
        <Link href={`/product/${elem?.product?.slug}`} className='product-image'>
          <Avatar customImageClass={'img-fluid'} data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} />
        </Link>
        <div className='product-detail'>
          <ul>
            <li className='name'>
              <Link href={`/product/${elem?.product?.slug}`}>{elem?.variation?.name ?? elem?.product?.name}</Link>
            </li>

            <li className='text-content'>
              <span className='text-title'>{t('sold_by')} : </span> {elem?.product?.store?.store_name}
            </li>

            <li className='text-content'>
              <span className='text-title'>{t('unit')}</span> : {elem?.variation?.unit ?? elem?.product?.unit}
            </li>

            <li>
              <h5 className='text-content d-inline-block'>{t('price')} :</h5>
              <span>{convertCurrency(elem?.product?.sale_price)}</span>
              
              <span className='text-content'>{convertCurrency(elem?.variation?.price) ?? convertCurrency(elem?.product?.price)}</span>
            </li>

            <li>
              <h5 className='saving theme-color'>
                {t('saving')} : {convertCurrency(Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)))}
              </h5>
            </li>
            <li>
              <h5>
                {t('total')}: ${elem?.sub_total}
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </td>
  );
};

export default CartProductDetail;
