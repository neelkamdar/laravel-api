
import { useTranslation } from "react-i18next";

const ProductBagde = ({ productDetail }) => {
  const { t } = useTranslation( 'common');
  return (
    <>
      {productDetail?.is_sale_enable ? (
        <div className='label-tag sale-tag'>
          <span>{t("sale")}</span>
        </div>
      ) : productDetail?.is_featured ? (
        <div className='label-tag'>
          <span>{t("featured")}</span>
        </div>
      ) : null}
    </>
  );
};

export default ProductBagde;
