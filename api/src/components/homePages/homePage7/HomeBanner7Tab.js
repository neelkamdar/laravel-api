import FileUploadField from '@/components/inputFields/FileUploadField'
import React from 'react'
import CommonRedirect from '../CommonRedirect'
import { getHelperText } from '@/utils/customFunctions/getHelperText'
import CheckBoxField from '@/components/inputFields/CheckBoxField'

const HomeBanner7Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
  return (
    <>
    <FileUploadField name="homeBanner7Image" title='image' id="homeBanner9Image" showImage={values['homeBanner9Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1859x550px')} />
    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
    <CheckBoxField name={`[content][home_banner][status]`} title="status" />
    </>
  )
}

export default HomeBanner7Tab