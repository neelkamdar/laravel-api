import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Row } from 'reactstrap';
import { AllCurrencyData } from '../../data/AllCurrency';
import FormBtn from '../../elements/buttons/FormBtn';
import request from '../../utils/axiosUtils';
import { currency } from '../../utils/axiosUtils/API';
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas';
import Loader from '../commonComponent/Loader';
import CheckBoxField from '../inputFields/CheckBoxField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";
import CurrencySymbol from './widgets/CurrencySymbol';
import { useRouter } from 'next/navigation';

const CurrencyForm = ({ mutate, loading, updateId, buttonName}) => {
    
    const { t } = useTranslation( 'common');
    const router = useRouter();
    const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({ queryKey: ["/currency/id"], queryFn: () => request({ url: `${currency}/${updateId}` },router),
        enabled: false, select: (data) => data?.data
    });
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);
    if (updateId && oldDataLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                code: updateId ? oldData?.code || "" : "",
                symbol: updateId ? oldData?.symbol || "" : "",
                no_of_decimal: updateId ? oldData?.no_of_decimal || "" : "",
                exchange_rate: updateId ? Number(oldData?.exchange_rate) || "" : "",
                symbol_position: updateId ? oldData?.symbol_position || "" : "",
                status: updateId ? Boolean(Number(oldData?.status)) : true,
            }}
            validationSchema={YupObject({
                code: nameSchema, symbol: nameSchema, exchange_rate: nameSchema, symbol_position: nameSchema
            })}
            onSubmit={(values) => {
                values["status"] = Number(values["status"]);
                mutate(values);
            }}>
            {({ values, setFieldValue }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <Row>
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "code", title: "currency_code", require: "true",
                                    inputprops: {
                                        name: "code", id: "code", options: AllCurrencyData.map((elem) => { return { id: elem.currency_code, name: elem.currency_code } }), defaultOption: "Select Code",
                                    },
                                }
                            ]}
                        />
                        <CurrencySymbol values={values} setFieldValue={setFieldValue} />
                        <SimpleInputField nameList={[{ title: "decimal_number", name: "no_of_decimal", type: "number", placeholder: t("enter_number_of_decimal") }, {
                            name: "exchange_rate", title: "exchange_rate", require: "true", type: "number", placeholder: t("enter_exchange_rate"), helpertext: "*Specify the exchange rate for converting other currencies to US Dollars (USD)."
                        }]} />
                        <SearchableSelectInput
                            nameList={
                                [
                                    {
                                        name: "symbol_position", title: "symbol_position", require: "true",
                                        inputprops: {
                                            name: "symbol_position",
                                            id: "symbol_position",
                                            options: [
                                                { id: "after_price", name: "AfterPrice" },
                                                { id: "before_price", name: "BeforePrice" },
                                            ],
                                            defaultOption: "Select Type",
                                        },
                                    },
                                ]
                            }
                        />
                        <CheckBoxField name="status" />

                        <FormBtn loading={loading} buttonName={buttonName} />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default CurrencyForm