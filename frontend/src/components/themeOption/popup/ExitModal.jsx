import CheckBoxField from '@/components/inputFields/CheckBoxField';
import FileUploadField from '@/components/inputFields/FileUploadField';
import SimpleInputField from '@/components/inputFields/SimpleInputField';
import { getHelperText } from '@/utils/customFunctions/getHelperText';
import { useTranslation } from "react-i18next";

const ExitModal = ({values ,setFieldValue}) => {
  
  const { t } = useTranslation( 'common');

  return (
    <>
      <CheckBoxField name="[options][popup][exit][is_enable]" title="status" />
      <SimpleInputField
        nameList={[
          { name: "[options][popup][exit][title]", title: "title", placeholder: t("enter_title") },
          { name: "[options][popup][exit][sub_title]", title: "sub_title", placeholder: t("enter_sub_title") },
          { name: "[options][popup][exit][description]", title: "description", placeholder: t("enter_description") },
      ]} />
      <FileUploadField name="exitImage" title='image' id="exitImage" showImage={values['exitImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('90x90px')} />
    </>
  )
}

export default ExitModal