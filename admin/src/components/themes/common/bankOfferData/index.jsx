import { useContext } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Input } from 'reactstrap';
import WrapperComponent from '@/components/common/WrapperComponent';
import CustomHeading from '@/components/common/CustomHeading';
import { bankOfferSliderOption } from '../../../../data/SliderSettingsData';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from "react-i18next";
import LiveImagePath from '@/utils/constants';

const BankOfferData = ({ dataAPI }) => {
  const { t } = useTranslation('common');

  // Filter offers where status is true
  const validOffers = dataAPI?.offers?.filter(offer => offer?.status) || [];

  const CopyCode = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <WrapperComponent classes={{ sectionClass: 'bank-section overflow-hidden' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} customClass={'section-t-space'} customTitleClass={'title'} />
      <div className='slider-bank-3 arrow-slider slick-height bank-box'>
        {/* Pass the length of validOffers to bankOfferSliderOption */}
        <Slider {...bankOfferSliderOption(validOffers.length)}>
          {validOffers.map((offer, i) => (
            <div key={i}>
              <div className='bank-offer'>
                <div className='bank-left'>
                  {offer?.image_url && (
                    <Image
                      src={`${LiveImagePath}${offer?.image_url}`}
                      className='img-fluid w-100'
                      alt='bank-image'
                      height={225}
                      width={515}
                    />
                  )}
                </div>

                <div className='bank-footer bank-footer-1'>
                  <h4>
                    {t('code')} :
                    <Input defaultValue={offer?.coupon_code} />
                  </h4>
                  <Btn type='button' className='bank-coupon' onClick={() => CopyCode(offer.coupon_code)}>
                    {t('copy_code')}
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default BankOfferData;
