
import { useTranslation } from "react-i18next";

import SimpleInputField from "../inputFields/SimpleInputField";


const BankDetailTab = () => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: 'bank_account_no', title: 'bank_account_no', placeholder: t("enter_bank_account_no") },
                { name: 'bank_name', title: 'bank_name', placeholder: t("enter_bank_name") },
                { name: 'bank_holder_name', title: 'holder_name', placeholder: t("enter_bank_holder_name") },
                { name: 'swift', title: 'swift', placeholder: t("enter_swift") },
                { name: 'ifsc', title: 'ifsc', placeholder: t("enter_ifsc") }]} />
        </>

    )
}

export default BankDetailTab