import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'
import CommonRedirect from '../CommonRedirect'
import { useTranslation } from "react-i18next"

const HomeBanner6Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t('home_banner')}</h4>
            <FileUploadField name="homeBannerImage1" title='image' id="homeBannerImage1" showImage={values['homeBannerImage1']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1155x670px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t('sub_banner')}</h4>
            <FileUploadField name="homeBannerImage2" title='image' id="homeBannerImage2" showImage={values['homeBannerImage2']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x670px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} setSearch={setSearch} />
            <CheckBoxField name="[content][home_banner][status]" title="status" />
        </>
    )
}

export default HomeBanner6Tab