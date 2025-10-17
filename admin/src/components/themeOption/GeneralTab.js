import { Col, Row } from 'reactstrap'
import { getHelperText } from '../../utils/customFunctions/getHelperText'
import CheckBoxField from '../inputFields/CheckBoxField'
import FileUploadField from '../inputFields/FileUploadField'
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import SimpleInputField from '../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"

const GeneralTab = ({ values, setFieldValue, errors }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Row>
        <Col sm="12">
          <FileUploadField name="header_logo_id" uniquename={values?.options?.logo?.header_logo} title="header_logo" errors={errors} id="header_logo_id" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

          <FileUploadField errors={errors} name="footer_logo_id" id="footer_logo_id" uniquename={values?.options?.logo?.footer_logo} title="footer_logo" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

          <FileUploadField errors={errors} name="favicon_icon_id" title="favicon_icon" id="favicon_icon_id" type="file" values={values} setFieldValue={setFieldValue} uniquename={values?.options?.logo?.favicon_icon} helpertext={getHelperText('16x16px')} />
          <SimpleInputField
            nameList={[
              { name: "[options][general][site_title]", title: "site_title", placeholder: t("enter_site_title") },
              { name: "[options][general][site_tagline]", title: "site_tagline", placeholder: t("enter_site_tagline") },
            ]} />
          <SimpleInputField
            nameList={[
              { name: "[options][general][primary_color]", title: "primary_color", type: "color" },
              { name: "[options][general][secondary_color]", title: "secondary_color", type: "color" },
            ]} />
          <CheckBoxField name="[options][general][back_to_top_enable]" title="back_to_top" />
          <CheckBoxField name="[options][general][sticky_cart_enable]" title="sticky_cart" />
          <CheckBoxField name="[options][general][customizer_enable]" title="show_customizer" />
          <SearchableSelectInput
            nameList={[
              {
                name: "[options][general][cart_style]",
                title: "cart_style",
                inputprops: {
                  name: "[options][general][cart_style]",
                  id: "[options][general][cart_style]",
                  options: [
                    { id: "cart_sidebar", name: "Cart Sidebar" },
                    { id: "cart_mini", name: "Cart Mini" },
                  ],
                  defaultOption: "Select Cart Style",
                },
              },
              {
                name: "[options][general][language_direction]",
                title: "language_direction",
                inputprops: {
                  name: "[options][general][language_direction]",
                  id: "[options][general][language_direction]",
                  options: [
                    { id: "ltr", name: "LTR" },
                    { id: "rtl", name: "RTL" },
                  ],
                  defaultOption: "Select Language Direction",
                },
              },
              {
                name: "[options][general][mode]",
                title: "select_mode",
                inputprops: {
                  name: "[options][general][mode]",
                  id: "[options][general][mode]",
                  options: [
                    { id: "light", name: "Light" },
                    { id: "dark", name: "Dark" },
                  ],
                  defaultOption: "Select Mode",
                },
              },

            ]}
          />
          <SimpleInputField nameList={[{ name: "[options][general][seller_register_url]", title: "seller_register_url", placeholder: t("enter_seller_register_url") },]} />
          <CheckBoxField name="[options][general][celebration_effect]" title="celebration_effect" />
          <CheckBoxField name="[options][general][exit_tagline_enable]" title="exit_tab_tagline" />
          {values?.options?.general?.taglines?.map((val, index) =>
            <SimpleInputField key={index} nameList={[{ name: `[options][general][taglines][${index}]`, title: `tagline_${index + 1}`, placeholder: t("enter_tagline") },]} />
          )}
        </Col>
      </Row>
    </>
  )
}

export default GeneralTab