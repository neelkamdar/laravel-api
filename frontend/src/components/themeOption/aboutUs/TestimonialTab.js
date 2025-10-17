import { useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SimpleInputField from '../../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const TestimonialTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['testimonial']?.['reviews'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['testimonial']?.['reviews']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][testimonial][reviews]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.profile_image_url && setFieldValue(`testimonialReviewImage${i}`, { original_url: elem?.profile_image_url })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][testimonial][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][testimonial][sub_title]', title: 'sub_title', placeholder: t('enter_sub_title') },
                    { name: '[options][about_us][testimonial][title]', title: 'title', placeholder: t('enter_title') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="add_content" onClick={() => setFieldValue("[options][about_us][testimonial][reviews]", [...values['options']['about_us']['testimonial']['reviews'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['testimonial']?.['reviews']?.map((team, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{team?.name ? team?.name : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`testimonialReviewImage${index}`} title='icon' id={`testimonialReviewImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`testimonialReviewImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][testimonial][reviews][${index}][title]`, title: 'title', placeholder: t('enter_title') },
                                                { name: `[options][about_us][testimonial][reviews][${index}][name]`, title: 'name', placeholder: t('enter_name') }, { name: `[options][about_us][testimonial][reviews][${index}][designation]`, title: 'designation', placeholder: t('enter_designation') }, { name: `[options][about_us][testimonial][reviews][${index}][review]`, title: 'reviews', type: "textarea", placeholder: t('enter_review') }
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

export default TestimonialTab