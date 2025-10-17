
import { useTranslation } from "react-i18next";

import SimpleInputField from "../inputFields/SimpleInputField";

const PaypalTab = () => {
    
    const { t } = useTranslation( 'common');
    return (
        <SimpleInputField nameList={[
            { name: 'paypal_email', title: 'paypal_email', placeholder: t('enter_paypal_email') }
        ]} />
    )
}

export default PaypalTab