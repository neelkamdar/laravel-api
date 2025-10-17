import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import CommonRedirect from '../CommonRedirect'
import { useTranslation } from "react-i18next"

const LeftSideBanner = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <Row className='align-items-center'>
            <Col xs="10">
                <div className='shipping-accordion-custom'>
                    <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(2)}>{t("banner")} <RiArrowDownLine />
                    </div>
                    {active == 2 && (
                        <>
                            <div className="rule-edit-form">
                                <CheckBoxField name="[content][main_content][sidebar][left_side_banners][status]" title="status" />
                                <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("banner")} 1</h4>
                                <FileUploadField name="mainLeftBanner1" title='image' id="mainLeftBanner1" showImage={values['mainLeftBanner1']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('375x586px')} />
                                <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainLeftBanner1LinkType', multipleNameKey: 'mainLeftBanner1Link' }} setSearch={setSearch} />
                            </div>
                            <div className="rule-edit-form">
                                <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("banner")} 2</h4>
                                <FileUploadField name="mainLeftBanner2" title='image' id="mainLeftBanner2" showImage={values['mainLeftBanner2']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('375x980px')} />
                                <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainLeftBanner2LinkType', multipleNameKey: 'mainLeftBanner2Link' }} setSearch={setSearch} />
                            </div>
                        </>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default LeftSideBanner