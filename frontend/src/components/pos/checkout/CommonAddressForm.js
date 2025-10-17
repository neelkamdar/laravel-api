import React, { useEffect } from 'react'
import SimpleInputField from '../../inputFields/SimpleInputField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import { Form, Formik } from 'formik'
import { YupObject, nameSchema, phoneSchema } from '@/utils/validation/ValidationSchemas'
import { country } from '@/utils/axiosUtils/API'
import { useQuery } from '@tanstack/react-query'
import request from '@/utils/axiosUtils'
import Btn from '@/elements/buttons/Btn'
import { AllCountryCode } from '@/data/AllCountryCode'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

const CommonAddressForm = ({ type, updateId, addressMutate, loading, setModal }) => {
    const router = useRouter()
    const { data ,refetch } = useQuery({ queryKey: [country], queryFn: () => request({ url: country },router), enabled:false, refetchOnWindowFocus:false , select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })) });
    useEffect(() => {
      refetch()
    }, [])
    const { t } = useTranslation( 'common');
    return (
        <>
            <Formik
                initialValues={{
                    title: "", street: "", country_id: data ? data : "", state_id: "", city: "", pincode: "", phone: "", type: type, user_id: updateId, country_code: '91'
                }}
                validationSchema={YupObject({
                    title: nameSchema, street: nameSchema, city: nameSchema, country_id: nameSchema, state_id: nameSchema, pincode: nameSchema, phone: phoneSchema,
                })}
                onSubmit={(values) => {
                    values['pincode'] = values['pincode'].toString();
                    addressMutate(values)
                    setAddress((prev) => [...prev, values])
                    setModal(false)
                }}>
                {({ values, setFieldValue }) => (
                    <Form className='row'>
                        <SimpleInputField nameList={[{ name: "title", placeholder: t("enter_title"), title: "title", require: "true" },]} />
                        <div className='country-input mb-4'>
                            <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: t("enter_phone_number"), require: "true" }]} />
                            <SearchableSelectInput
                                nameList={[
                                    {
                                        name: "country_code", notitle: "true", inputprops: { name: "country_code", id: "country_code", options: AllCountryCode, },
                                    },
                                ]}
                            /></div>
                        <SimpleInputField nameList={[ { name: "street", placeholder: t("enter_address"), title: "address", require: "true" }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "country_id", title: "country",
                                    require: "true",
                                    inputprops: {
                                        name: "country_id", id: "country_id", options: data, defaultOption: "Select state",
                                    },
                                    disabled: values?.["country_id"] ? false : true,
                                },
                                {
                                    name: "state_id", title: "State",
                                    require: "true",
                                    inputprops: {
                                        name: "state_id", id: "state_id", options: values?.["country_id"] ? data.filter((country) => Number(country.id) === Number(values?.["country_id"]))?.[0]?.["state"] : [], defaultOption: "Select state",
                                    },
                                    disabled: values?.["country_id"] ? false : true,
                                },
                            ]}
                        />
                        <SimpleInputField nameList={[{ name: "city", title: "city", require: "true", placeholder: t("enter_city") }]} />
                        <SimpleInputField nameList={[{ name: "pincode", title: "pincode", require: "true", type: 'number', placeholder: t("enter_pincode") }]} />
                        
                        <div className="ms-auto justify-content-end dflex-wgap save-back-button">
                            <Btn className="me-2 btn-outline btn-lg" title="cancel" onClick={() => { setModal(false) }} />
                            <Btn className="btn-primary btn-lg" type="submit" title="submit" loading={Number(loading)} />
                        </div>
                    </Form>
                )
                }
            </Formik>

        </>
    )
}

export default CommonAddressForm