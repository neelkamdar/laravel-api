import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import CustomHeading from '@/components/common/CustomHeading';
import { specialOfferSliderOffer } from '../../../../data/SliderSettingsData';
import { placeHolderImage } from '../../../../data/CommonPath';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';
import Avatar from '@/components/common/Avatar';
import { Progress } from 'reactstrap';
import ProductBoxAction from '@/components/common/productBox/productBox1/ProductBox1Action';
import Timer from './Timer';
import ProductRating from '@/components/common/productBox/widgets/ProductRating';
import RatioImage from '@/utils/RatioImage';
import LiveImagePath from '@/utils/constants';

const SpecialOffer = ({ dataAPI, ProductData }) => {
  const [dealProduct, setDealProduct] = useState([]);
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  
  useEffect(() => {
    const today = new Date();
    let temp = dataAPI?.deal_of_days?.deals?.map((deal) => {
      const givenDate = new Date(deal?.end_date);
      return {
        ...deal,
        expired: givenDate < today,
        product: ProductData?.find((product) => product.id === deal.product_id)
      };
    }) || [];
  
    // Only update state if temp is actually different
    setDealProduct((prev) => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(temp);
      return isEqual ? prev : temp;
    });
  }, [dataAPI?.deal_of_days?.deals, ProductData]);
  
  return (
    
    <div className='product-bg-image'>
      <RatioImage className='bg-img img-fluid' src={`${LiveImagePath}${dataAPI?.deal_of_days?.image_url}`} alt='deals_of_the_day' />
      <CustomHeading title={dataAPI?.deal_of_days?.title} customTitleClass='product-title product-warning' />
      <div className='product-box-4 product-box-3 rounded-0'>
        <div className='top-selling-slider product-arrow'>
          <Slider {...specialOfferSliderOffer}>
            {dealProduct
              ?.filter((el) => !el.expired)
              ?.map((elem, i) => (
                <div key={i}>
                  <div className='product-image'>
                    <Link href={`/product/${elem?.product?.slug}`}>
                      <Avatar data={elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name || 'product'} height={339} width={264} customImageClass={'img-fluid product-image'}/>
                    </Link>
                    {elem?.product && <ProductBoxAction productObj={elem?.product} listClass="option" key={i} />}
                  </div>

                  <div className='product-detail text-center'>
                    <ProductRating classes={{ customClass: 'justify-content-center' }} totalRating={elem?.product?.rating_count || 0} />
                    <Link href={`/product/${elem?.product?.slug}`}>
                      <h3 className='name w-100 mx-auto text-center'>{elem?.product?.name}</h3>
                    </Link>
                    <h3 className='price theme-color d-flex justify-content-center'>
                      {elem?.product?.sale_price ? convertCurrency(elem?.product?.sale_price) : null}
                      <del className='delete-price'>{elem?.product?.price ? convertCurrency(elem?.product?.price) : null}</del>
                    </h3>
                    <Progress className='custom-progressbar' value={(elem?.product?.quantity * 100) / 10} />
                    <h5 className='text-content'>
                      {t('solid')} :
                      <span className='text-dark'>
                        {elem?.product?.quantity} {t('items')}
                      </span>
                      <span className='ms-auto text-content'>{t('hurry_up_offer_end_in')}</span>
                    </h5>
                    <Timer elem={elem} dealProduct={dealProduct} setDealProduct={setDealProduct} />
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
