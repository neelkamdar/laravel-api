import { Col, Row } from 'reactstrap'
import { getHelperText } from '../../utils/customFunctions/getHelperText'
import FileUploadField from '../inputFields/FileUploadField'
import SimpleInputField from '../inputFields/SimpleInputField'

import { useTranslation } from "react-i18next"

const SeoTab = ({ values, setFieldValue, errors }) => {

  const { t } = useTranslation('common');
  return (
    <>
      <Row>
        <Col sm="12">
          <SimpleInputField
            nameList={[
              { name: "[options][seo][meta_tags]", title: "meta_tags", placeholder: t("enter_meta_tags") },
              { name: "[options][seo][meta_title]", title: "meta_title", placeholder: t("enter_meta_title") },
              { name: "[options][seo][meta_description]", type: "textarea", title: "meta_description", placeholder: t("enter_meta_description") },
              { name: "[options][seo][og_title]", title: "og_title", placeholder: t("enter_og_title") },
              { name: "[options][seo][og_description]", type: "textarea", title: "og_description", placeholder: t("enter_og_description") }]} />
          <FileUploadField errors={errors} name="og_image_id" title="og_image" id="og_image_id" type="file" values={values} setFieldValue={setFieldValue} uniquename={values?.options?.seo?.og_image} helpertext={getHelperText('1200x630px')} />
        </Col>
      </Row>
    </>
  )
}

export default SeoTab