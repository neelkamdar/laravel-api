import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";

const ShippingTaxTab = () => {
  
  const { t } = useTranslation( 'common');
  return (
    <>
      <CheckBoxField name="is_free_shipping" title="free_shipping" />
      <SimpleInputField nameList={[{ name: "weight", placeholder: t("Enter Weight Gms(E.G 100)"), title: "weight", helpertext: "*Specify the weight of this product in Gms." },
      {name: "estimated_delivery_text", placeholder: t("enter_estimated_delivery_text"), title: "estimated_delivery_text", helpertext: "*Specify delivery text e.g Your order is likely to reach you within 5 to 10 days."}, ]} />
      <CheckBoxField name="is_return" title="return"  helpertext="*Enable to make the product eligible for returns." />
      <SimpleInputField nameList={[{ name: "return_policy_text", placeholder: t("enter_return_policy_text"), title: "return_policy_text", helpertext: "*Specify return text e.g Hassle free 7, 15 and 30 days return might be available." }]} />
    </>
  );
};

export default ShippingTaxTab;
