import { AllTimeZone } from "../../data/AllTimeZone";
import FileUploadField from "../inputFields/FileUploadField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import GeneralTab1 from "./GeneralTab1";
import { getHelperText } from "../../utils/customFunctions/getHelperText";


import { useTranslation } from "react-i18next";

const GeneralTab = ({ values, setFieldValue, errors }) => {
  
  const { t } = useTranslation( 'common');
  return (
    <>
      <FileUploadField name="light_logo_image_id" uniquename={values?.values?.general?.light_logo_image} title="light_logo" errors={errors} id="light_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

      <FileUploadField name="dark_logo_image_id" title="dark_logo" uniquename={values?.values?.general?.dark_logo_image} id="dark_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('180x50px')} />

      <FileUploadField name="tiny_logo_image_id" title="tiny_logo" uniquename={values?.values?.general?.tiny_logo_image} id="tiny_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('50x30px')} />

      <FileUploadField name="favicon_image_id" title="favicon" uniquename={values?.values?.general?.favicon_image} id="favicon_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('16x16px')} />

      <SimpleInputField
        nameList={[
          { name: "[values][general][site_title]", title: "site_title", placeholder: t("enter_site_title"), require: "true", errormsg: "SiteTitle" },
          { name: "[values][general][site_name]", title: "site_name", placeholder: t("enter_site_name"),errormsg:"SiteName" },
          { name: "[values][general][site_url]", title: "site_url", placeholder: t("enter_site_url"),errormsg:"SiteUrl" },
          { name: "[values][general][site_tagline]", title: "site_tagline", placeholder: t("enter_site_tagline") },]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "default_timezone",
            title: "timezone",
            inputprops: {
              name: "default_timezone",
              id: "default_timezone",
              options: AllTimeZone || [],
            },
          },
        ]}
      />
      <GeneralTab1 />
    </>
  );
};

export default GeneralTab;
