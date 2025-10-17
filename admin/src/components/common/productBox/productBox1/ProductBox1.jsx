import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { RiCloseLine } from 'react-icons/ri';
import ProductBoxAction from './ProductBox1Action';
import ProductBox1Cart from './ProductBox1Cart';
import Avatar from '../../Avatar';
import { placeHolderImage } from '../../../../data/CommonPath';
import Btn from '@/elements/buttons/Btn';
import useDelete from '@/utils/hooks/useDelete';
import { WishlistAPI } from '@/utils/axiosUtils/API';

import { useTranslation } from "react-i18next";
import ProductBagde from './ProductBagde';
import SettingContext from '@/helper/settingContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import ProductRating from '../widgets/ProductRating';

const ProductBox1 = ({ imgUrl, badge, productDetail, isClose, refetch, addAction = true, classObj }) => {

  const { t } = useTranslation('common');
  const { convertCurrency } = useContext(SettingContext);
  const { data: wishlistData, mutate, isLoading: wishlistLoader } = useDelete(WishlistAPI, `/wishlist`);
  const handelDelete = (currObj) => {
    mutate(currObj?.id);
  };
  useEffect(() => {
    if (wishlistData?.status == 200 || wishlistData?.status == 201) {
      refetch();
    }
  }, [wishlistLoader]);
  return (
    <div className={`product-box ${classObj?.productBoxClass}`}>
      <ProductBagde productDetail={productDetail} />
      {isClose && (
        <div className='product-header-top' onClick={() => handelDelete(productDetail)}>
          <Btn className='wishlist-button close_button'>
            <RiCloseLine />
          </Btn>
        </div>
      )}
      <div className='product-image'>
        <Link href={`/product/${productDetail?.slug}`}>
          <Avatar data={imgUrl} placeHolder={placeHolderImage} customeClass={'img-fluid'} name={productDetail.title} height={500} width={500} />
        </Link>
        <ProductBoxAction productObj={productDetail} listClass="product-option" />
      </div>
      <div className='product-detail'>
        <Link href={`/product/${productDetail?.slug}`}>
          <h6 className='name'>{productDetail.name}</h6>
          <p dangerouslySetInnerHTML={{ __html: productDetail?.short_description }} />
        </Link>
        {productDetail?.unit && <h6 className='unit mb-1'>{productDetail?.unit}</h6>}
        <h5 className='sold text-content'>
          <span className='theme-color price'>{convertCurrency(productDetail?.sale_price)}</span>
          {
            productDetail?.discount || productDetail?.discount ? (
              <del className='ms-1'>{convertCurrency(productDetail?.price)}</del>
            ) : null
          }
        </h5>

        <div className='product-rating mt-sm-2 mt-1'>
          <ProductRating totalRating={productDetail?.rating_count || 0} />
          <h6 className='theme-color'>{ModifyString(productDetail.stock_status, false, '_')}</h6>
        </div>
        {addAction && <ProductBox1Cart productObj={productDetail} />}
      </div>
    </div>
  );
};

export default ProductBox1;
