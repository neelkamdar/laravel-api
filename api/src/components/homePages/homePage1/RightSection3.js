import { RiArrowDownLine } from 'react-icons/ri'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import CommonRedirect from '../CommonRedirect'
import { useTranslation } from "react-i18next"

const RightSection3 = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{t("banner")} <RiArrowDownLine /></div>
            {active == 3 && (
                <>
                    <div className="rule-edit-form">
                        <CheckBoxField name="[content][main_content][section3_two_column_banners][status]" title="status" />
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("banner")} 1</h4>
                        <FileUploadField name="section3Banner1" title='image' id="section3Banner1" type="file" showImage={values['section3Banner1']} values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight3LinkType1', multipleNameKey: 'mainRight3Link1' }} setSearch={setSearch} />
                    </div>
                    <div className="rule-edit-form">
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("banner")} 2</h4>
                        <FileUploadField name="section3Banner2" showImage={values['section3Banner2']} title='image' id="section3Banner2" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight3LinkType2', multipleNameKey: 'mainRight3Link2' }} setSearch={setSearch} />
                    </div>
                </>
            )}
        </div>
    )
}

export default RightSection3