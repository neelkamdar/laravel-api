import CheckBoxField from '../inputFields/CheckBoxField';
import SimpleInputField from '../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const VendorCommissionTab = ({ values }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div>
            <CheckBoxField name="[values][vendor_commissions][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: "[values][vendor_commissions][min_withdraw_amount]", title: "min_withdraw_amount", placeholder: t("enter_min_withdraw_amount"), inputaddon: "true", helpertext: "*Payout Minimum for Vendors: Specify the min amount vendors can request for withdrawal." },
                    { name: "[values][vendor_commissions][default_commission_rate]", inputaddon: "true", postprefix: "%", title: "default_commission_rate", placeholder: t("enter_default_commission_rate"), helpertext: "*Set the rate at which admin receives a commission from vendor earnings." },
                ]}
            />
            <CheckBoxField name="[values][vendor_commissions][is_category_based_commission]" title="category_based_commission" helpertext="*Enable the functionality to apply commissions based on product categories. To configure, navigate to the Product Category module and set the respective commission rates." />
        </div>
    )
}
export default VendorCommissionTab