import SimpleInputField from "../../../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";

const WholesalePriceType = ({ data, index, values, setFieldValue, errors,touched  }) => {
  const { t } = useTranslation( 'common');
  const handleRemove = () => {
    if (values["wholesale_prices"].length == 1) {
      setFieldValue("wholesale_prices", [{}]);
    }
    if (values["wholesale_prices"].length > 1) {
      setFieldValue("wholesale_prices", values["wholesale_prices"].filter((item, i) => index !== i),)
    }
  }

  return (
    <>
          <div className="variant-row variant-row-2">
            <SimpleInputField nameList={[
              { name:`wholesale_prices[${index}][min_qty]`,   title: "min_qty", placeholder: t("enter_min_qty"),type: "number"  }]}
            />
            <SimpleInputField nameList={[
              { name: `wholesale_prices[${index}][max_qty]`,  title: "max_qty", placeholder: t("enter_max_qty"), type: "number" }]}
            />
          

            {values["wholesale_price_type"] === "fixed" &&
              <SimpleInputField nameList={[
                { name: `wholesale_prices[${index}][value]`, title: "price", placeholder: t("enter_price"), type: "number", inputaddon: "true", min: "0", step: "0.01" }]}
              />
            }
            {values["wholesale_price_type"] === "percentage" &&
              <SimpleInputField nameList={[
                { name: `wholesale_prices[${index}][value]`, title: "percentage", type: "number", min: '0', max: '100', inputaddon: "true", placeholder: t("enter_percentage"), postprefix: "%",  }]}
              />
            }
            <div className="delete-variant">
              <a onClick={handleRemove}>{t("remove")}</a>
            </div>
          </div>
    </>
  )
};

export default WholesalePriceType;
