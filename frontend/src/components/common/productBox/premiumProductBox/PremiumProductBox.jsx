import Btn from '@/elements/buttons/Btn';
import SettingContext from '@/helper/settingContext';
import WishlistContext from '@/helper/wishlistContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';
import { placeHolderImage } from '../../../../data/CommonPath';
import AddToWishlist from '../AddToWishlist';
import ProductAction from "../widgets/productAction/ProductAction";
import ProductCartButton from '../widgets/ProductCartButton';
import ProductRating from '../widgets/ProductRating';

const PremiumProductBox = ({ product, isClose, refetch, classObj = {}, isProductAction=true }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);

    return (
        <div className={`product-style-1  ${classObj?.productBoxClass}`} >
            <div className='product-image'>
                <div className="label-flex">
                    {product.discount &&
                        <div className="discount">
                            <label>{product.discount}%</label>
                        </div>
                    }

                    <AddToWishlist productObj={product} customClass="btn p-0 wishlist btn-wishlist notifi-wishlist" />
                </div>
                <Link href={`/product/${product?.slug}`}>
                    { <Image className="img-fluid" src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} height={500} width={500} alt="product" />}
                </Link>

                {isProductAction && <ProductAction productObj={product} listClass="product-option" actionsToHide={'wishlist'} />}

                {isClose && (
                    <div className='product-header-top' onClick={() => removeWishlist(product.id)}>
                        <Btn className='wishlist-button close_button'>
                            <RiCloseLine />
                        </Btn>
                    </div>
                )}
            </div>
            <div className='product-detail'>
                <Link href={`/product/${product?.slug}`}>
                    <h6 className='name'>{product.name}</h6>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                <h5 className='sold text-content'>
                    <span className='theme-color price'>{convertCurrency(product?.sale_price)}</span>
                    {product?.discount && <del className='ms-1'>{convertCurrency(product?.price)}</del>}
                </h5>
                <div className='product-rating mt-sm-2 mt-1'>
                    <ProductRating totalRating={product?.rating_count || 0} />
                    {product.stock_status == 'in_stock' &&
                        <h6 className='theme-color'>{ModifyString(product.stock_status, false, '_')}</h6>
                    }
                </div>
                <div className='add-to-cart-box'>
                    <ProductCartButton productObj={product} text="Add to Cart" />
                </div>
            </div>
        </div>
    );
};

export default PremiumProductBox;
