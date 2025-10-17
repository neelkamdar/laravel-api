import { useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SimpleInputField from '../../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const TeamTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['team']?.['members'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['team']?.['members']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][team][members]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.profile_image_url && setFieldValue(`teamContentImage${i}`, { original_url: elem?.profile_image_url })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][team][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][team][sub_title]', title: 'sub_title', placeholder: t('enter_sub_title') },
                    { name: '[options][about_us][team][title]', title: 'title', placeholder: t('enter_title') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="add_content" onClick={() => setFieldValue("[options][about_us][team][members]", [...values['options']['about_us']['team']['members'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['team']?.['members']?.map((team, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{team?.name ? team?.name : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`teamContentImage${index}`} title='icon' id={`teamContentImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`teamContentImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][team][members][${index}][name]`, title: 'name', placeholder: t('enter_name') }, { name: `[options][about_us][team][members][${index}][designation]`, title: 'designation', placeholder: t('enter_designation') },
                                                { name: `[options][about_us][team][members][${index}][instagram]`, title: 'instagram', placeholder: t('enter_instagram_url') }, { name: `[options][about_us][team][members][${index}][twitter]`, title: 'twitter', placeholder: t('enter_twitter_url') },
                                                { name: `[options][about_us][team][members][${index}][pinterest]`, title: 'pinterest', placeholder: t('enter_pinterest_url') }, { name: `[options][about_us][team][members][${index}][facebook]`, title: 'facebook', placeholder: t('enter_facebook_url') },
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

export default TeamTab