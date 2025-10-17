import Btn from '@/elements/buttons/Btn';
import SettingContext from '@/helper/settingContext';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useContext } from 'react';
import { Input } from 'reactstrap';
import offer from "../../../../public/assets/images/offer.gif"

const ApplyCoupon = ({ data, setFieldValue, storeCoupon, setStoreCoupon, values ,appliedCoupon, setAppliedCoupon,errorCoupon,mutate,isLoading }) => {
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  const onCouponApply = (value) => {
    setStoreCoupon(value);
  };
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFieldValue('coupon', '');
    setStoreCoupon('');
    mutate({ ...values });
  };
  const  onCouponApplyClick = ()=>{
    values['products']?.length > 0 &&  mutate({ ...values, coupon: storeCoupon })
    setFieldValue('coupon', storeCoupon );
  }
  return (
    <>
      {appliedCoupon == 'applied' ? (
        <li className='coupon-sec'>
          <div className='apply-sec mb-3'>
            <div>
             {offer && <Image src={offer} className='img-fluid' height={20} width={20} alt='offer' />}
              <h4>
                {t('you_saved')} <span>{convertCurrency(data?.data?.total?.coupon_total_discount)}</span> {'with_this_code'} 🎉 <p>{t('coupon_applied')}</p>
              </h4>
            </div>
            <a onClick={() => removeCoupon()}>{t('remove')}</a>
          </div>
        </li>
      ) : (
        <li className='coupon-sec'>
          <div className='coupon-box mt-2 mb-3 d-flex w-100'>
            <div className='input-group'>
              <Input type='text' placeholder={t('enter_coupon_code_here')} onChange={(e) => onCouponApply(e.target.value)} />
              <Btn className='btn-apply' loading={Number(isLoading)} onClick={onCouponApplyClick}>
                {t('apply')}
              </Btn>
            </div>
          </div>
          <div className='invalid-feedback d-block'>{errorCoupon}</div>
        </li>
      )}
    </>
  );
};

export default ApplyCoupon;
