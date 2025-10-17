import FileUploadField from '../../inputFields/FileUploadField'
import CheckBoxField from '../../inputFields/CheckBoxField'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'

const SliderBanner = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <CheckBoxField name={`[content][slider_product_with_banner][left_side_banners][status]`} title="status" />
            <FileUploadField name="sliderBanner" title='image' showImage={values['sliderBanner']} id="sliderBanner" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1594x101px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'sliderBannerLinkType', multipleNameKey: 'sliderBannerLink' }} setSearch={setSearch} />
        </>
    )
}

export default SliderBanner