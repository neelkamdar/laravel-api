import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import FormBtn from "../../elements/buttons/FormBtn";
import AccountContext from "../../helper/accountContext";
import { VendorSettingAPI } from "../../utils/axiosUtils/API";
import useCreate from "../../utils/hooks/useCreate";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import AddressComponent from "../inputFields/AddressComponent";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useContext } from "react";

const VendorProfile = () => {
    
    const { t } = useTranslation( 'common');
    const { mutate, isLoading } = useCreate(VendorSettingAPI, false, false, "Vendor setting updated")
    const { accountData } = useContext(AccountContext)
    return (
        <Formik
            enableReinitialize
            initialValues={{
                store_name: accountData?.store?.store_name ?? "",
                description: accountData?.store?.description ?? "",
                country_id: accountData?.store?.country_id ?? '',
                state_id: accountData?.store?.state_id ?? '',
                city: accountData?.store?.city ?? "",
                address: accountData?.store?.address ?? "",
                pincode: accountData?.store?.pincode ?? "",
                facebook: accountData?.store?.facebook ?? "",
                twitter: accountData?.store?.twitter ?? "",
                instagram: accountData?.store?.instagram ?? "",
                youtube: accountData?.store?.youtube ?? "",
                pinterest: accountData?.store?.pinterest ?? "",
                store_logo_id: accountData?.store?.store_logo_id ?? '',
                store_logo: accountData?.store?.store_logo ?? '',
                hide_vendor_email: accountData?.store?.hide_vendor_email ? Boolean(accountData?.store?.hide_vendor_email) : false,
                hide_vendor_phone: accountData?.store?.hide_vendor_phone ? Boolean(accountData?.store?.hide_vendor_phone) : false
            }}
            validationSchema={YupObject({
                store_name: nameSchema,
                description: nameSchema,
                country_id: nameSchema,
                state_id: nameSchema,
                city: nameSchema,
                address: nameSchema,
                pincode: nameSchema,
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                delete values["store_logo"];
                if (values['store_logo_id'] == undefined) values['store_logo_id'] = null
                values["hide_vendor_phone"] = Number(values["hide_vendor_phone"]);
                values["hide_vendor_email"] = Number(values["hide_vendor_email"]);
                mutate(values);
            }}>
            {({ setFieldValue, values, errors, touched }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <Row>
                        <FileUploadField values={values} setFieldValue={setFieldValue} title="store_logo" type="file" id="store_logo_id" name="store_logo_id" errors={errors} touched={touched} />
                        <SimpleInputField nameList={[{ name: "store_name", placeholder: t("enter_store_name"), require: "true" }, { name: "description", title: "store_description", type: "textarea", placeholder: t("enter_description"), require: "true" }]} />
                        <AddressComponent values={values} />
                        <SimpleInputField nameList={[
                            { name: "facebook", type: "url", placeholder: t("enter_facebook_url") },
                            { name: "pinterest", type: "url", placeholder: t("enter_pinterest_url") },
                            { name: "instagram", type: "url", placeholder: t("enter_instagram_url") },
                            { name: "twitter", type: "url", placeholder: t("enter_twitter_url") },
                            { name: "youtube", type: "url", placeholder: t("enter_youtube_url") },
                        ]} />
                        <CheckBoxField name="hide_vendor_email" title="hide_email" />
                        <CheckBoxField name="hide_vendor_phone" title="hide_phone" />
                        <FormBtn loading={Number(isLoading)} />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default VendorProfile