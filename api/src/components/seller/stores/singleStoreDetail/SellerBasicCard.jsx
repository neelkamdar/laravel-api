import ProductRating from '@/components/common/productBox/widgets/ProductRating';
import StoreImage from '../StoreImage';
import SellerSocialCard from './SellerSocialCard';
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useContext } from 'react';
import LiveImagePath from '@/utils/constants';

const SellerBasicCard = ({ StoreData }) => {
  const { t } = useTranslation('common');
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <div className='vendor-detail-box'>
      <Image src={`${LiveImagePath}${themeOption?.seller?.store_image_url}`} alt="shop-roof"  className="shop-roof" height={92.05} width={376.66} />
      <div className='vendor-name vendor-bottom'>
        <div className='vendor-logo'>
          <StoreImage customClass={'img-fluid'} elem={StoreData} />
          <div>
            <h3>{StoreData?.store_name}</h3>
            <div className='product-rating vendor-rating'>
              <div className='product-rating'>
                 <ProductRating totalRating={StoreData?.rating_count || 0} />
                <h6 className='ms-2'>
                  ({StoreData?.reviews_count} {t('reviews')})
                </h6>
              </div>
            </div>
          </div>
        </div>
        <p>{StoreData?.description}</p>
      </div>
      <SellerSocialCard StoreData={StoreData} />
    </div>
  );
};
export default SellerBasicCard;
