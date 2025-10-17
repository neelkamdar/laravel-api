import { useState } from 'react';
import { RiArrowDownLine, RiCloseLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import CommonRedirect from '../CommonRedirect';
import { useTranslation } from "react-i18next";

const FeatureBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
  
  const { t } = useTranslation( 'common');
  const [active, setActive] = useState();
  const removeBanners = (index) => {
    if (values['content']['featured_banners']['banners'].length > 1) {
      let filterValue = values['content']['featured_banners']['banners'].filter((item, i) => i !== index)
      setFieldValue("[content][featured_banners][banners]", filterValue)
      filterValue?.forEach((elem, i) => {
        elem?.image_url && setFieldValue(`featureBannerImage${i}`, { original_url: elem?.image_url })
        elem?.redirect_link?.link_type && setFieldValue(`featureRedirectLinkType${i}`, elem?.redirect_link?.link_type)
        elem?.redirect_link?.link && setFieldValue(`featureRedirectLink${i}`, elem?.redirect_link?.link)
      })
    }
  }
  return (
    <>
      {<Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][featured_banners][banners]", [...values['content']['featured_banners']['banners'], { title: "", description: "", status: false }])} title="add_banners" />}
      {
        values['content']?.['featured_banners']?.['banners'].map((elem, index) => {
          return <Row className='align-items-center' key={index}>
            <Col xs="11">
              <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>
                  {t("banner") + " " + (index + 1)}<RiArrowDownLine />
                </div>
                {active == index && (
                  <div className="rule-edit-form">
                    <FileUploadField name={`featureBannerImage${index}`} title='image' id={`featureBannerImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`featureBannerImage${index}`]} helpertext={getHelperText('376x231px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: `featureRedirectLinkType${index}`, multipleNameKey: `featureRedirectLink${index}` }} setSearch={setSearch} />
                    <CheckBoxField name={`[content][featured_banners][banners][${index}][status]`} title="status" />
                  </div>
                )}
              </div>
            </Col>
            <Col xs="1">
              <a className="h-100 w-100 cursor-pointer close-icon"
                onClick={() => removeBanners(index)}><RiCloseLine /></a>
            </Col>
          </Row>
        })
      }
    </>
  )
}

export default FeatureBannerTab