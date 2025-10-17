import { useTranslation } from "react-i18next";
import CheckBoxField from '../inputFields/CheckBoxField';
import SimpleInputField from '../inputFields/SimpleInputField';

const RefundTab = ({ values }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div>
            <CheckBoxField name="[values][refund][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: "[values][refund][refundable_days]", title: "refundable_days", placeholder: t("enter_refundable_days"), helpertext: "*Define the period within which users can initiate refund requests for delivered items If left blank, this functionality will be disabled." }
                ]}
            />
        </div>
    )
}

export default RefundTab