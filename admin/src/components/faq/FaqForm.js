import { useQuery } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { Row } from 'reactstrap'
import FormBtn from '../../elements/buttons/FormBtn'
import request from '../../utils/axiosUtils'
import { FaqAPI } from '../../utils/axiosUtils/API'
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas'
import Loader from '../commonComponent/Loader'
import CheckBoxField from '../inputFields/CheckBoxField'
import SimpleInputField from '../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"
import { useRouter } from 'next/navigation'
import LanguageRedirection from '../commonComponent/LanguageRedirection'

const FaqForm = ({ loading, mutate, updateId , buttonName, language}) => {
    
    const { t } = useTranslation( 'common');
    const router = useRouter()   
    const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["faq/id"], queryFn: () => request({ url: `${FaqAPI}/${updateId}` },router), refetchOnMount: false, enabled: false });
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);
    if (updateId && isLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: updateId ? oldData?.data?.title || "" : "",
                description: updateId ? oldData?.data?.description : "",
                status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
            }}
            validationSchema={YupObject({ title: nameSchema, description: nameSchema })}
            onSubmit={(values) => mutate({ ...values, status: Number(values.status) })}>
            {() => (
                <Form className="theme-form theme-form-2 mega-form">
                    {updateId && <LanguageRedirection id={updateId} path={'/faq'} language={language} />}
                    <Row>
                        <SimpleInputField nameList={[{ name: "title", placeholder: t("enter_title"), require: "true" }, { name: 'description', type: 'textarea', title: 'description', placeholder: t("enter_description"), require: "true" }]} />
                        <CheckBoxField name="status" />
                        <FormBtn loading={loading} buttonName={buttonName}/>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default FaqForm