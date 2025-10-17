import { RiArrowDownLine } from 'react-icons/ri'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import CommonRedirect from '../CommonRedirect'

import { useTranslation } from "react-i18next"

const RightSection8 = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(9)}>{t("banner")}<RiArrowDownLine />
            </div>
            {active == 9 && (
                <div className="rule-edit-form">
                    <FileUploadField name="section8_VegetableImage" title='image' id="section8_VegetableImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values['section8_VegetableImage']} helpertext={getHelperText('1189x297px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight8LinkType', multipleNameKey: 'mainRight8Link' }} setSearch={setSearch} />
                    <CheckBoxField name="[content][main_content][section8_full_width_banner][status]" title="status" />
                </div>
            )}
        </div>
    )
}

export default RightSection8