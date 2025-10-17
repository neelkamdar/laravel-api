import { useContext } from "react";
import { useTranslation } from "react-i18next";
import SettingContext from "@/helper/settingContext";
import { RiShoppingCartLine } from "react-icons/ri";

const ProductDetails = ({ productState }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  return (
    <>
      <div className="product-title">
        <h2 className="name">{product.name}</h2>
        <ul className="title-content-list">
          {product?.orders_count && (
            <h6 className="content">
              <RiShoppingCartLine />
              {product.orders_count} Sales
            </h6>
          )}
        </ul>
        <p>{product.short_description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
