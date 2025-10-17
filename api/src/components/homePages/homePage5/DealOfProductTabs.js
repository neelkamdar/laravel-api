import { useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SearchableSelectInput from '../../inputFields/SearchableSelectInput';
import SimpleInputField from '../../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const DealOfProductTabs = ({ setFieldValue, values, productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][product_with_deals][deal_of_days][title]`, placeholder: t("enter_title"), title: "title" }
            ]} />
            <FileUploadField name={"productDealsImage"} showImage={values['productDealsImage']} title='image' id={'productDealsImage'} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('580x526px')} />
            <CheckBoxField name={`[content][product_with_deals][deal_of_days][status]`} title="status" />
            <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][product_with_deals][deal_of_days][deals]" || [], [...values['content']['product_with_deals']['deal_of_days']['deals'], { title: "", description: "", status: false }])} title="add_deals" />
            {
                values['content']?.['product_with_deals']?.['deal_of_days']?.['deals']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{values['content']['product_with_deals']['deal_of_days']['deals'][index]['label'] || 'Text Here'}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField nameList={[
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][label]`, placeholder: t("enter_label_text"), title: "label" },
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][offer_title]`, placeholder: t("enter_offer_title"), title: "offer_title" },
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][end_date]`, type: "datetime-local", placeholder: t("enter_end_date"), title: "end_date" },
                                        ]} />
                                        <SearchableSelectInput
                                            nameList={
                                                [{
                                                    name: `DealOfDaysProduct${index}`,
                                                    title: "products",
                                                    inputprops: {
                                                        name: `DealOfDaysProduct${index}`,
                                                        id: `DealOfDaysProduct${index}`,
                                                        options: productData || [],
                                                        setsearch: setSearch,
                                                    }
                                                },
                                                ]}
                                        />
                                        <CheckBoxField name={`[content][product_with_deals][deal_of_days][deals][${index}][status]`} title="status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => values['content']['product_with_deals']['deal_of_days']['deals'].length > 1 && setFieldValue("[content][product_with_deals][deal_of_days][deals]", values['content']['product_with_deals']['deal_of_days']['deals'].filter((item, i) => i !== index),)}>{t('remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default DealOfProductTabs