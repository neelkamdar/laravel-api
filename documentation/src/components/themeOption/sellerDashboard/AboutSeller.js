import SimpleInputField from "../../inputFields/SimpleInputField"
import FileUploadField from "../../inputFields/FileUploadField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { getHelperText } from "../../../utils/customFunctions/getHelperText";


import { useTranslation } from "react-i18next";

const AboutSeller = ({ values, setFieldValue, errors }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][about][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][seller][about][title]', title: 'title', placeholder: t('enter_title') },
                    { name: '[options][seller][about][description]', title: 'description', type: "textarea", placeholder: t('enter_description'), rows: 8 },
                ]}
            />
            <FileUploadField name="aboutSellerImage" title='image' id="aboutSellerImage" showImage={values['aboutSellerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
        </>
    )
}

export default AboutSeller