import SimpleInputField from "../../inputFields/SimpleInputField"
import ServiceWrapper from "./ServiceWrapper";
import CheckBoxField from "../../inputFields/CheckBoxField";


import { useTranslation } from "react-i18next";

const ServiceSeller = ({ values, errors, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][services][status]" title="status" />
            <SimpleInputField nameList={[{ name: '[options][seller][services][title]', title: 'title', placeholder: t('enter_title') }]} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_1", title: "service_box_1", imageName: "serviceImage1" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_2", title: "service_box_2", imageName: "serviceImage2" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_3", title: "service_box_3", imageName: "serviceImage3" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_4", title: "service_box_4", imageName: "serviceImage4" }} setFieldValue={setFieldValue} />
        </>
    )
}

export default ServiceSeller