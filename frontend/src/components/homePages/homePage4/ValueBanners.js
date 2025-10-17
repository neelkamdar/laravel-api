import { useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import Btn from '../../../elements/buttons/Btn'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import CommonRedirect from '../CommonRedirect'
import { useTranslation } from "react-i18next"

const ValueBanners = ({ values, setFieldValue, productData, categoryData }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['content']['value_banners']['banners'].length > 1) {
            let filterValue = values['content']['value_banners']['banners'].filter((item, i) => i !== index)
            setFieldValue("[content][value_banners][banners]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.image_url && setFieldValue(`featureBannerImage${i}`, { original_url: elem?.image_url })
                elem?.redirect_link?.link_type && setFieldValue(`valueBannerLinkType${i}`, elem?.redirect_link?.link_type)
                elem?.redirect_link?.link && setFieldValue(`valueBannerLink${i}`, elem?.redirect_link?.link)
            })
        }
    }
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][value_banners][title]`, placeholder: t("enter_title"), title: "title" }
            ]} />
            <CheckBoxField name={`[content][value_banners][status]`} title="status" />
            {values['content']?.['value_banners']?.['banners'] && <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][value_banners][banners]", [...values['content']['value_banners']['banners'], { title: "", description: "", status: false }])} title="add_banners" />}
            {
                values['content']?.['value_banners']?.['banners']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{t('banner')} {index + 1}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`featureBannerImage${index}`} title='image' id={`featureBannerImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`featureBannerImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: `valueBannerLinkType${index}`, multipleNameKey: `valueBannerLink${index}` }} />
                                        <CheckBoxField name={`[content][value_banners][banners][${index}][status]`} title="status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer" onClick={() => removeBanners(index)}>{t('remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default ValueBanners