'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import WrapperComponent from './WrapperComponent';
import { RiHome4Fill, RiShoppingCartLine } from 'react-icons/ri';
import ProductRating from './productBox/widgets/ProductRating';

const DigitalBreadcrumb = ({ product }) => {
    const { t } = useTranslation('common');
    return (
        <WrapperComponent classes={{ sectionClass: 'digital-breadcrumb pt-0' }} colProps={{ md: 12 }}>
            <div className='breadcrumb-contain'>
                <div className="product-title">
                    <h2 className="name">{product.name}</h2>
                    <ul className="title-content-list">
                        <li>
                            <h6 className="content">by <Link
                                href={`/seller/stores/${product.store?.slug}`}> {product.store?.store_name}</Link>
                            </h6>
                        </li>
                        <li>
                            <h6 className="content">
                                <RiShoppingCartLine />
                                {product.orders_count} {t('sales')}
                            </h6>
                        </li>
                        <li>
                            <div className="product-rating">
                                <ProductRating totalRating={product?.rating_count || 0} />
                                <span>({product.reviews_count} {t('reviews')})</span>
                            </div>
                        </li>
                    </ul>

                </div>
                <nav>
                    <ol className='breadcrumb mb-0'>
                        <li className='breadcrumb-item'>
                            <Link href='/'>
                                <RiHome4Fill />
                            </Link>
                        </li>
                        <li className='breadcrumb-item active text-capitalize'>
                            {t("product")}
                        </li>
                    </ol>
                </nav>
            </div>
        </WrapperComponent>
    );
};

export default DigitalBreadcrumb;
