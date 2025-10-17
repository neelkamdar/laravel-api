import Btn from '@/elements/buttons/Btn';
import SettingContext from '@/helper/settingContext';
import WishlistContext from '@/helper/wishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';
import { placeHolderImage } from '../../../../data/CommonPath';
import ProductAction from "../widgets/productAction/ProductAction";
import ProductCartButton from '../widgets/ProductCartButton';
import ProductRating from '../widgets/ProductRating';

const ClassicProductBox = ({ product, isClose, addAction = true,isProductAction=true }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);
    return (
        <div className="product-style-2">
            <div className="label-flex">
                {product.discount &&
                    <label>{product.discount}%</label>
                }
            </div>
            <div className='product-image'>
                <Link href={`/product/${product?.slug}`}>
                    {<Image className="img-fluid" src={product?.product_thumbnail ? product?.product_thumbnail?.original_url : placeHolderImage} height={500} width={500} alt="product" />}
                </Link>
                {isProductAction && <ProductAction productObj={product} listClass="product-option" />}
                {isClose && (
                    <div className='product-header-top' onClick={() => removeWishlist(product.product_ids, product.id)}>
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

                <div className='product-rating mt-sm-2 mt-1'>
                    <ProductRating totalRating={product?.rating_count || 0} />
                    {product.rating_count &&
                        <h6 className="rating-number">( {product.rating_count.toFixed(2) || 0} Ratings)</h6>
                    }
                </div>

                <div className="product-bottom">
                    <h5 className='sold text-content'>
                        <span className='theme-color price'>{convertCurrency(product?.sale_price)}</span>
                        {product?.discount && <del className='ms-1'>{convertCurrency(product?.price)}</del>}
                    </h5>

                    <div className='add-to-cart-box'>
                        <ProductCartButton productObj={product} text="Add" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassicProductBox;
