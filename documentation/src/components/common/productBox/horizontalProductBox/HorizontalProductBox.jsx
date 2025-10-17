import Btn from '@/elements/buttons/Btn';
import SettingContext from '@/helper/settingContext';
import WishlistContext from '@/helper/wishlistContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';
import ProductAction from "../widgets/productAction/ProductAction";
import ProductBagde from '../widgets/ProductBagde';
import ProductCartButton from '../widgets/ProductCartButton';
import ProductRating from '../widgets/ProductRating';

const BasicProductBox = ({ product, isClose, classObj, isProductAction=true }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);
    return (
        <div>
            <div className={`product-box ${classObj?.productBoxClass}`}>
                <ProductBagde productDetail={product} />

                <div className='product-image'>
                    <Link href={`/product/${product?.slug}`}>
                        {product.product_thumbnail.original_url && <Image className="img-fluid" src={product.product_thumbnail ? product.product_thumbnail.original_url : ''} height={500} width={500} alt="product" />}
                    </Link>
                    {isProductAction && <ProductAction productObj={product} listClass="product-option" /> }
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
                        <h6 className='name'>{product.name}</h6>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                    {product?.unit && <h6 className='unit mb-1'>{product?.unit}</h6>}
                    <h6 className="byers">By {product.store?.store_name}</h6>
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
                        <ProductCartButton productObj={product} text="Add" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicProductBox;
