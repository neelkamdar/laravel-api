import CheckBoxField from "@/components/inputFields/CheckBoxField";
import FileUploadField from "@/components/inputFields/FileUploadField";
import MultiSelectField from "@/components/inputFields/MultiSelectField";
import SimpleInputField from "@/components/inputFields/SimpleInputField";
import { getHelperText } from "@/utils/customFunctions/getHelperText";
import { useTranslation } from "react-i18next";

const HomeBannerTab = ({ values, setFieldValue, categoryData }) => {
  
  const { t } = useTranslation("common");

  return (
    <>
      <FileUploadField
        name="homeBannerImage"
        title="image"
        id="homeBannerImage"
        showImage={values["homeBannerImage"]}
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        helpertext={getHelperText("1859x550px")}
      />
      <SimpleInputField
        nameList={[
          {
            name: `[content][home_banner][main_banner][title]`,
            placeholder: t("enter_title"),
            title: "title",
          },
          {
            name: `[content][home_banner][main_banner][sub_title]`,
            placeholder: t("enter_sub_title"),
            title: "title",
          },
        ]}
      />
      <CheckBoxField
        name={`[content][home_banner][status]`}
        title="status"
      />
      <MultiSelectField
        values={values}
        setFieldValue={setFieldValue}
        name="homeCategoryIconList"
        title="categories"
        data={categoryData}
      />
    </>
  );
};

export default HomeBannerTab;
