import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import CheckBoxField from "../inputFields/CheckBoxField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  const { t } = useTranslation( 'common');
  return (
    <>
      {values["type"] == "simple" &&
      
        <FileUploadField errors={errors} uniquename={values?.digital_files} name="digital_file_ids" id="digital_file_ids" title="upload_main_files" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} />
      }

      {values["type"] == "simple" &&
        <CheckBoxField name="is_licensable" title="is_licensable" />
      }


      {values["is_licensable"] && values["files"] &&
        <CheckBoxField name="is_licensekey_auto" title="is_licensekey_auto" />
      }

      {values["is_licensable"] && !values["is_licensekey_auto"] &&
        <SearchableSelectInput
          nameList={
            [
              {
                name: 'separator',
                title: "separator",
                require: 'true',
                inputprops: {
                  name: 'separator',
                  id: 'separator',
                  options: [
                    { id: "comma", name: "Comma ( , )" },
                    { id: "semicolon", name: "Semicolon ( ; )" },
                    { id: "pipe", name: "Pipe ( | )" },
                    { id: "newline", name: "Newline" },
                  ],
                },
              },
            ]} />
      }
      {values["is_licensable"] && !values["is_licensekey_auto"] &&
        <SimpleInputField nameList={[
          { name: "license_key",type:"textarea",rows:"3", title: "license_key",  placeholder: t("enter_license_key") }]}
        />
      }

      <SearchableSelectInput
        nameList={
          [
            {
              name: 'preview_type',
              title: "preview_type",
              require: 'true',
              inputprops: {
                name: 'preview_type',
                id: 'preview_type',
                options: [
                  { id: "video", name: "Video" },
                  { id: "audio", name: "Audio" },
                  { id: "url", name: "URL" },
                ],
              },
            },
          ]} />

      {values["preview_type"] == "video" &&
        <FileUploadField errors={errors} name="preview_video_file_id" id="preview_video_file_id" title="preview_video_file" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} />
      }
      {values["preview_type"] == "audio" &&
        <FileUploadField errors={errors} name="preview_audio_file_id" id="preview_audio_file_id" title="preview_audio_file" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} />
      }
      {values["preview_type"] == "url" &&
        <SimpleInputField nameList={[
          { name: "preview_url", title: "preview_url", placeholder: t("enter_preview_url") }]}
        />
      }
    </>
  );
};

export default ImagesTab;
