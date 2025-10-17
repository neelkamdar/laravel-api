import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';
import ProductAttribute from './productAttribute/ProductAttribute';
import OfferTimer from './OfferTimer';
import ProductDetailAction from './ProductDetailAction';
import Link from 'next/link';
import ProductRating from '@/components/common/productBox/widgets/ProductRating';
import { Button } from 'reactstrap';

const ProductContent = ({ productState, setProductState }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    return (
        <>
            <h2 className='name'>{productState?.selectedVariation?.name ?? productState?.product?.name}</h2>

            <ul className="product-brand-box">
                {productState?.product?.brand && <li className='brand-box-suggestion'>
                    {'Brand'} : <Link href={`/brand/${productState?.product?.brand?.slug}`}>{productState?.product?.brand.name}</Link>
                </li>}
                {productState?.product?.authors?.length > 0 && <li className='brand-box-suggestion'>
                    <h5>{'Author'} : {productState?.product?.authors?.map((author, index) => (
                        <Link href={`/author/${author?.slug}`} key={index}>{author.author_name}</Link>
                    ))}
                    </h5>
                </li>}
                {productState?.product?.publication && <li className='brand-box-suggestion'>
                    {'Publication'} : <Link href={`/publication/${productState?.product?.publication?.slug}`}>{productState?.product?.publication.publisher_name}</Link>
                </li>}
            </ul>

            <div className='price-rating'>
                <h3 className='theme-color price'>
                    {productState?.selectedVariation?.sale_price ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}

                    {productState?.selectedVariation?.discount || productState?.product?.discount ? (
                        <del className='text-content'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del>
                    ) : null}

                    {productState?.selectedVariation?.discount || productState?.product?.discount ? (
                        <span className='offer-top'>
                            {productState?.selectedVariation ? productState?.selectedVariation?.discount : productState?.product?.discount}% {t('off')}
                        </span>
                    ) : null}
                </h3>
                {!productState?.product?.is_external && <div className='product-rating custom-rate'>
                    <ProductRating totalRating={productState?.selectedVariation?.rating_count ?? productState?.product?.rating_count} />
                    <span className='review'>
                        {productState?.selectedVariation?.reviews_count || productState?.product?.reviews_count || 0} {t('review')}
                    </span>
                </div>}
            </div>
            {productState?.selectedVariation?.short_description &&
                <div className='product-contain'>
                    <p>{productState?.selectedVariation?.short_description ?? productState?.product?.short_description}</p>
                </div>
            }
            {productState?.product?.read_document &&
                <a className='btn btn-md mt-3 read-btn' href={productState?.product?.read_document.original_url} target='_blank'>{productState?.product?.read_button_text || 'read'} </a>
            }
            {productState?.product.status &&
                <>
                    {productState?.product?.type == 'classified' && <ProductAttribute productState={productState} setProductState={setProductState} />}
                    {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && <OfferTimer productState={productState} />}
                    <ProductDetailAction productState={productState} setProductState={setProductState} />
                </>
            }
        </>
    );
};

export default ProductContent;
