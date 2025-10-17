import Avatar from '@/components/common/Avatar';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { useContext } from 'react';
import { RiArrowRightLine, RiMailLine, RiSmartphoneLine } from 'react-icons/ri';
import ProductRating from '@/components/common/productBox/widgets/ProductRating';

const VendorBox = ({ productState }) => {

  const { t } = useTranslation('common');
  return (
    <div className='vendor-box mb-4'>
      <div className='vendor-contain'>
        <Link href={`/seller/stores/${productState?.product?.store?.slug}`}>
          <div className='vendor-image'>
            <Avatar data={productState?.product?.store?.store_logo} height={64} width={64} name={productState?.product?.store?.store_name} />
          </div>
        </Link>

        <div className='vendor-name'>
          <Link href={`/seller/stores/${productState?.product?.store?.slug}`}>
            <h5 className='fw-500'>{productState?.product?.store?.store_name}</h5>
            <div className='product-rating mt-1'>
              <ProductRating totalRating={productState?.product?.store?.rating_count || 0} />
              <span>{`(${productState?.product?.store?.reviews_count ?? 0} Reviews)`}</span>
            </div>
          </Link>
          <Link href={`/seller/stores/${productState?.product?.store?.slug}`} className='store-btn'>
            {t('go_to_store')} <RiArrowRightLine />
          </Link>
        </div>
      </div>

      <p className='vendor-detail'>{productState?.product?.store?.description}</p>


      {!productState?.product?.store?.hide_vendor_email && !productState?.product?.store?.hide_vendor_email &&
        <div className='vendor-list'>
          <ul>
            {!productState?.product?.store?.hide_vendor_phone &&
              <li>
                <div className="address-contact">
                  <RiSmartphoneLine />
                  <h5>{t('contact_us')}: <span className="text-content">+ {productState?.product?.store?.vendor?.country_code} {productState?.product?.store?.vendor?.phone}</span>
                  </h5>
                </div>
              </li>
            }

            {!productState?.product?.store?.hide_vendor_email &&
              <li>
                <div className="address-contact">
                  <RiMailLine />
                  <h5>{t('email')}: <span className="text-content">{productState?.product?.store?.vendor?.email}</span></h5>
                </div>
              </li>
            }
          </ul>
        </div>
      }

    </div >
  );
};

export default VendorBox;
