import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { AllCountryCode } from '../../data/AllCountryCode';
import Btn from '../../elements/buttons/Btn';
import AccountContext from '../../helper/accountContext';
import { updateProfile } from '../../utils/axiosUtils/API';
import { getHelperText } from '../../utils/customFunctions/getHelperText';
import useCreate from '../../utils/hooks/useCreate';
import { YupObject, nameSchema, phoneSchema } from '../../utils/validation/ValidationSchemas';
import FileUploadField from '../inputFields/FileUploadField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';

const ProfileSettingTab = () => {    
    const { t } = useTranslation( 'common');
    const { accountData, setAccountContextData } = useContext(AccountContext)
    const { mutate, isLoading } = useCreate(updateProfile, false, "/account", false);
    return (
        <Formik
            enableReinitialize
            initialValues={{
                profile_image_id: accountData ? accountData?.profile_image_id : "",
                profile_image: accountData ? accountData.profile_image : "",
                name: accountData ? accountData.name : "",
                email: accountData ? accountData.email : "",
                phone: accountData ? accountData.phone : "",
                country_code: accountData ? `${accountData?.country_code}` : "91"
            }}
            validationSchema={YupObject({
                name: nameSchema,
                email: nameSchema,
                phone: phoneSchema
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                if (values['profile_image'] == "") {
                    values['profile_image_id'] = null
                }
                setAccountContextData({ name: values["name"], image: values["profile_image"] })
                mutate(values);
            }}>
            {({ values, setFieldValue, errors }) => (
                <Form className="theme-form theme-form-2 mega-form row">
                    <FileUploadField name="profile_image_id" uniquename={values?.profile_image} errors={errors} id="profile_image_id" title="avatar" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('500x100px')} />
                    <SimpleInputField nameList={[{ name: 'name', title: 'name', require: "true", placeholder: t("enter_name") }]} />
                    <SimpleInputField nameList={[{ name: 'email', title: 'email', require: "true", placeholder: t("enter_email") }]} />
                    <div className='country-input mb-4'>
                        <SimpleInputField nameList={[{ name: 'phone', title: 'phone', require: "true", type: "number" }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "country_code",
                                    notitle: "true",
                                    inputprops: {
                                        name: "country_code",
                                        id: "country_code",
                                        options: AllCountryCode,
                                    },
                                },
                            ]}
                        />
                    </div>
                    <Btn className="btn btn-theme ms-auto d-inline-block w-auto" type="submit" title="save" loading={Number(isLoading)} />
                </Form>
            )}
        </Formik>
    )
}

export default ProfileSettingTab