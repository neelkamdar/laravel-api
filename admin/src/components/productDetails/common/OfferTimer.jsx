import { useCountdown } from '@/utils/hooks/useCountDown';
import { useTranslation } from "react-i18next";
import React from 'react';

const parseDate = (dateStr) => {
  try {
    // Ensure the date string is valid and normalized
    const parts = dateStr?.split('-');
    if (parts?.length === 3) {
      const year = parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');

      const normalizedDate = `${year}-${month}-${day}`;
      const parsedDate = new Date(normalizedDate);

      return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
    }
  } catch (error) {
    console.error("🚀 ~ Date parsing error:", error);
  }
  return null;
};

const OfferTimer = ({ productState }) => {
  const { t } = useTranslation('common');

  const saleStartsAt = parseDate(productState?.product?.sale_starts_at);
  const saleExpiredAt = parseDate(productState?.product?.sale_expired_at);

  const [days, hours, minutes, seconds] = useCountdown(saleStartsAt, saleExpiredAt);

  if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    // Handle fallback in case of invalid dates
    return null;
  }

  if (days + hours + minutes + seconds <= 0) {
    return null;
  }

  return (
    <div className='time deal-timer product-deal-timer mx-md-0 mx-auto' id='clockdiv-1'>
      <div className='product-title'>
        <h4>{t("hurry_up_sales_ends_in")}</h4>
      </div>
      <ul>
        <li>
          <div className='counter d-block'>
            <div className='days d-block'>
              <h5>{days}</h5>
            </div>
            <h6>{t("days")}</h6>
          </div>
        </li>
        <li>
          <div className='counter d-block'>
            <div className='hours d-block'>
              <h5>{hours}</h5>
            </div>
            <h6>{t("hours")}</h6>
          </div>
        </li>
        <li>
          <div className='counter d-block'>
            <div className='minutes d-block'>
              <h5>{minutes}</h5>
            </div>
            <h6>{t("min")}</h6>
          </div>
        </li>
        <li>
          <div className='counter d-block'>
            <div className='seconds d-block'>
              <h5>{seconds}</h5>
            </div>
            <h6>{t("sec")}</h6>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OfferTimer;
