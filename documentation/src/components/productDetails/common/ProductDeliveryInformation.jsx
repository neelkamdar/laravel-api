
import { useTranslation } from "react-i18next";
import { RiArrowLeftRightLine, RiTruckLine } from 'react-icons/ri';

const ProductDeliveryInformation = ({ productState }) => {
  const { t } = useTranslation( 'common');
  return (
    <>
      {productState?.product?.estimated_delivery_text || (productState?.product?.return_policy_text && productState?.product?.is_return) ? (
        <div className='delivery-info'>
          <div className='product-title'>
            <h4>{t('delivery_details')}</h4>
          </div>
          <ul>
            {productState?.product?.estimated_delivery_text ? (
              <li>
                <RiTruckLine className='me-2' /> {productState?.product?.estimated_delivery_text}
              </li>
            ) : null}
            {productState?.product?.return_policy_text ? (
              <li>
                <RiArrowLeftRightLine className='me-2' />
                {productState?.product?.return_policy_text}
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </>
  );

};

export default ProductDeliveryInformation;
