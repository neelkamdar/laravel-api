import SettingContext from '@/helper/settingContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";

const ProductInformation = ({ productState }) => {
  const { t } = useTranslation( 'common');
  const { settingObj, settingData } = useContext(SettingContext);

  return (
    <div className='pickup-box'>
      <div className='product-title'>
        <h4>{t("product_information")}</h4>
      </div>
      <div className='product-info'>
        <ul className='product-info-list'>
          <li>{t("sku")} : {productState?.selectedVariation?.sku ?? productState?.product?.sku}</li>
          {(productState?.selectedVariation?.unit || productState?.product?.unit) && (
            <li>{t("unit")} : {" "} {productState?.selectedVariation?.unit ?? productState?.product?.unit}</li>
          )}
          {productState?.product?.weight && (
            <li> {t("weight")} : {productState?.product?.weight || "-"}{" "}{ModifyString("gms")}</li>
          )}
          <li>{t("stock_status")} : {productState?.selectedVariation?.stock_status ? ModifyString(productState?.selectedVariation?.stock_status, false, '_') : ModifyString(productState?.product?.stock_status, false, '_')}</li>
          {
            !settingData?.activation?.stock_product_hide && 
            <li>{t("quantity")} : {productState?.selectedVariation?.quantity ?? productState?.product?.quantity} Items Left</li>
          }
          {productState?.product?.external_details?.length > 0 && 
            productState?.product?.external_details.map((item)=> {
              return (
                <li>{item.key}: {item.value}</li>
              )
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;
