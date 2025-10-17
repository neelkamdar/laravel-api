import { useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import Btn from '../../../elements/buttons/Btn'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"

const ServiceBannerTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    return (
        <>
            <CheckBoxField name={`[content][services_banner][status]`} title="status" />
            {<Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][services_banner][services]" || [], [...values['content']['services_banner']['services'] || [], { title: "", description: "", status: false }] || [])} title="add_service" />}
            {
                values['content']?.['services_banner']?.['services']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{values['content']?.['services_banner']?.['services']?.[index]?.['title'] || 'Text Here'}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField nameList={[
                                            { name: `[content][services_banner][services][${index}][title]` || '', placeholder: t("enter_title"), title: "title" },
                                            { name: `[content][services_banner][services][${index}][sub_title]`, placeholder: t("enter_sub_title"), title: "sub_title" }
                                        ]} />
                                        <FileUploadField name={`serviceImage${index}`} showImage={values[`serviceImage${index}`]} title='image' id={`serviceImage${index}`} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('42x42px')} />
                                        <CheckBoxField name={`[content][services_banner][services][${index}][status]`} title="status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => values['content']['services_banner']['services'].length > 1 && setFieldValue("[content][services_banner][services]", values['content']['services_banner']['services'].filter((item, i) => i !== index),)}>{t('remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default ServiceBannerTab