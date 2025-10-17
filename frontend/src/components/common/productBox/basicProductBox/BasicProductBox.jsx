import React, { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import SettingContext from '@/helper/settingContext';
import { useTranslation } from "react-i18next";
import Btn from '@/elements/buttons/Btn';
import ProductBagde from '../widgets/ProductBagde';
import ProductCartButton from '../widgets/ProductCartButton';
import ProductRating from '../widgets/ProductRating';
import ProductAction from "../widgets/productAction/ProductAction"
import WishlistContext from '@/helper/wishlistContext';
import { placeHolderImage } from '../../../../data/CommonPath';

const BasicProductBox = ({ product, isClose, classObj = {} , isProductAction=true}) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);
    return (
        <div className={`product-box ${classObj?.productBoxClass}`}>
            <ProductBagde productDetail={product} />
            <div className='product-image'>
                <Link href={`/product/${product?.slug}`}>
                    { <Image className="img-fluid" src={product?.product_thumbnail ? product?.product_thumbnail?.original_url : placeHolderImage} height={500} width={500} alt="product" />}
                </Link>
                {isProductAction && <ProductAction productObj={product} listClass="product-option" />}
                {isClose && (
                    <div className='product-header-top' onClick={() => removeWishlist(product.product_id, product.id)}>
                        <Btn className='wishlist-button close_button'>
                            <RiCloseLine />
                        </Btn>
                    </div>
                )}
            </div>
            <div className='product-detail'>
                {product?.brand &&
                    <h6 className="brand-name">{product?.brand?.name}</h6>
                }
                <Link href={`/product/${product?.slug}`}>
                    <h6 className='name'>{product?.name}</h6>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                {product?.unit && <h6 className='unit mb-1'>{product?.unit}</h6>}
                {product?.store &&
                    <h6 className="byers">{('By')}<span className="text-title">{product?.store?.store_name}</span></h6>
                }
                <h5 className='sold text-content'>
                    <span className='theme-color price'>{convertCurrency(product?.sale_price)}</span>
                    {product?.discount && <del className='ms-1'>{convertCurrency(product?.price)}</del>}
                </h5>

                <div className='product-rating mt-sm-2 mt-1'>
                    <ProductRating totalRating={product?.rating_count || 0} />
                    {product?.stock_status == 'in_stock' &&
                        <h6 className='theme-color'>{ModifyString(product?.stock_status, false, '_')}</h6>
                    }
                </div>
                <div className='add-to-cart-box'>
                    <ProductCartButton productObj={product} text="Add" />
                </div>
            </div>
        </div>
    );
};

export default BasicProductBox;
