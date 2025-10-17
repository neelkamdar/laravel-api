import { useTranslation } from "react-i18next";
import SimpleInputField from '../inputFields/SimpleInputField';

const ContactWrapper = ({ contactDetails }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div>
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t("detail")+" "+contactDetails?.title }</h4>
            <SimpleInputField
                nameList={[
                    { name: `[options][contact_us][${contactDetails.value}][label]`, title: 'label', placeholder: t('enter_label_text') },
                    { name: `[options][contact_us][${contactDetails.value}][icon]`, title: 'icon', placeholder: t('enter_icon') },
                    { name: `[options][contact_us][${contactDetails.value}][text]`, title: 'text', placeholder: t('enter_text') },
                ]}
            />
        </div>
    )
}

export default ContactWrapper