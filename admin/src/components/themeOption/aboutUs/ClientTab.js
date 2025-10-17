import { useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SimpleInputField from '../../inputFields/SimpleInputField';

import { useTranslation } from "react-i18next";

const ClientTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['clients']?.['content'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['clients']?.['content']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][clients][content]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.icon && setFieldValue(`clientContentImage${i}`, { original_url: elem?.icon })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][clients][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][clients][sub_title]', title: 'sub_title', placeholder: t('enter_sub_title') },
                    { name: '[options][about_us][clients][title]', title: 'title', placeholder: t('enter_title') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="add_content" onClick={() => setFieldValue("[options][about_us][clients][content]", [...values['options']['about_us']['clients']['content'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['clients']?.['content']?.map((future, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{future?.title ? future?.title : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`clientContentImage${index}`} title='icon' id={`clientContentImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`clientContentImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][clients][content][${index}][title]`, title: 'title', placeholder: t('enter_title') }, { name: `[options][about_us][clients][content][${index}][description]`, title: 'description', placeholder: t('enter_description') }
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer" onClick={() => removeBanners(index)}>{t('remove')}</a>
                        </Col>
                    </Row>
                ))
            }
        </>
    )
}

export default ClientTab