import { useTranslation } from "react-i18next";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";



const SeoTab = ({ setFieldValue, values, updateId }) => {
  
  const { t } = useTranslation( 'common');
  return (
    <>
      <SimpleInputField nameList={[{ name: "meta_title", placeholder: t("enter_meta_title") }, { name: "meta_description", placeholder: t("enter_meta_description"), type: "textarea" }]} />
      <FileUploadField name="product_meta_image_id" title="meta_image" id="product_meta_image_id" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} />
    </>
  );
};

export default SeoTab;
