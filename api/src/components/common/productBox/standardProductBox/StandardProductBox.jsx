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


const StandardProductBox = ({ product, isClose, isProductAction=true }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);
    return (
        <div className="product-box product-white-bg">
            <div className='product-image'>
                <Link href={`/product/${product?.slug}`}>
                    {<Image className="img-fluid" src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} height={500} width={500} alt="product" />}
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
            <div className='product-detail position-relative'>
                <Link href={`/product/${product?.slug}`}>
                    <h6 className='name'>{product.name}</h6>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                {product?.unit && <h6 className='sold weight mb-0 text-content fw-normal'>{product?.unit}</h6>}

                <div className="bottom-content">
                    <h6 className="price theme-color m-0">{convertCurrency(product?.sale_price)}</h6>
                    <div className="add-to-cart-btn-2 addtocart_btn">
                        <ProductCartButton productObj={product} iconClass={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardProductBox;
