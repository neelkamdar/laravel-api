import { Form, Formik } from 'formik';
import { useTranslation } from "react-i18next";
import Btn from '../../elements/buttons/Btn';
import { updateProfilePassword } from '../../utils/axiosUtils/API';
import useCreate from '../../utils/hooks/useCreate';
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas';
import SimpleInputField from '../inputFields/SimpleInputField';

const ProfilePasswordTab = () => {
    
    const { t } = useTranslation( 'common');
    const { mutate, isLoading } = useCreate(updateProfilePassword, false, "/account");
    return (
        <Formik
            enableReinitialize
            initialValues={{
                current_password: "",
                password: "",
                password_confirmation: ""
            }}
            validationSchema={YupObject({
                current_password: nameSchema,
                password: nameSchema,
                password_confirmation: nameSchema
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                mutate(values);
            }}>
            {({ values, setFieldValue }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <SimpleInputField nameList={[{ name: 'current_password', title: 'current_password', placeholder: t('enter_current_password'), require: "true" }, { name: 'password', title: 'password', require: "true", placeholder: t("enter_new_password") }, { name: 'password_confirmation', title: 'confirm_password', require: "true", placeholder: t("enter_confirm_password") }]} />
                    <Btn className="btn btn-theme ms-auto mt-4" type="submit" title="save" loading={Number(isLoading)} />
                </Form>
            )}
        </Formik>
    )
}

export default ProfilePasswordTab