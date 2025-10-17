import { useContext } from 'react';
import Link from 'next/link';
import { Label } from 'reactstrap';
import { RiArrowRightLine } from 'react-icons/ri';
import StoreImage from './StoreImage';
import { useTranslation } from "react-i18next";
import ProductRating from '@/components/common/productBox/widgets/ProductRating';

const StoreName = ({ elem, classicImage }) => {
  
  const { t } = useTranslation( 'common');
  return (
    <div className='contain-name'>
      <div>
        <Link href={`/seller/stores/${elem?.slug}`}>
          <h3>{elem?.store_name}</h3>
        </Link>
        <div className='since-number'>
          <div className='product-rating'>
            <ProductRating totalRating={elem?.rating_count || 0} />
            <h6>{`(${elem?.reviews_count} Review)`}</h6>
          </div>
        </div>
        {classicImage && (
          <Link href={`/seller/stores/${elem?.slug}`} className='btn btn-sm theme-bg-color text-white fw-bold d-inline-flex'>
            {t('visit_store')}
            <RiArrowRightLine className='ms-2' />
          </Link>
        )}
      </div>
      {!classicImage && (
        <Label className='product-label'>
          {elem?.products_count} {t('products')}
        </Label>
      )}
      {classicImage && <StoreImage customClass={'grid-image'} elem={elem} />}
    </div>
  );
};

export default StoreName;
