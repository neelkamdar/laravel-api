import { useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import Btn from '../../../elements/buttons/Btn'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from 'react-i18next'

const AboutTab = ({ values, setFieldValue }) => {
    const { t } = useTranslation( 'common');
    
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['about']?.['futures'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['about']?.['futures']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][about][futures]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.icon && setFieldValue(`futureIcons${i}`, { original_url: elem?.icon })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][about][status]" title="status" />
            <FileUploadField name="content_left_image_url" title={t('left_bg_image')} id="content_left_image_url" showImage={values['content_left_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
            <FileUploadField name="content_right_image_url" title={t('right_bg_image')} id="content_right_image_url" showImage={values['content_right_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][about][sub_title]', title: 'sub_title', placeholder: t('enter_sub_title') },
                    { name: '[options][about_us][about][title]', title: 'title', placeholder: t('enter_title') },
                    { name: '[options][about_us][about][description]', title: 'description', type: "textarea", placeholder: t('enter_description'), rows: 6 },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="add_future" onClick={() => setFieldValue("[options][about_us][about][futures]", [...values['options']['about_us']['about']['futures'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['about']?.['futures']?.map((future, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{future?.title ? future?.title : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][about][futures][${index}][title]`, title: 'title', placeholder: t('enter_title') }
                                            ]}
                                        />
                                        <FileUploadField name={`futureIcons${index}`} title='icon' id={`futureIcons${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`futureIcons${index}`]} helpertext={getHelperText('510x288px')} />
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

export default AboutTab