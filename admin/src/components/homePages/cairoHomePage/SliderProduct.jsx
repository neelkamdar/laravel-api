import FileUploadField from "@/components/inputFields/FileUploadField";
import SearchableSelectInput from "@/components/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/inputFields/SimpleInputField";
import { getHelperText } from "@/utils/customFunctions/getHelperText";
import { useTranslation } from "react-i18next";

const SliderProduct = ({ values, setFieldValue, productData, setSearch }) => {
  
  const { t } = useTranslation("common");

  return (
    <>
      <FileUploadField
        name="sliderImage"
        title="image"
        id="sliderImage"
        showImage={values["sliderImage"]}
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        helpertext={getHelperText("1859x550px")}
      />

      <SimpleInputField
        nameList={[
          {
            name: `[content][slider_product][title]`,
            placeholder: t("enter_title"),
            title: "title",
          },
          {
            name: `[content][slider_product][description]`,
            placeholder: t("enter_sub_title"),
            title: "title",
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "sliderProductIds",
            title: "products",
            inputprops: {
              name: "sliderProductIds",
              id: "sliderProductIds",
              options: productData || [],
              setsearch: setSearch,
            },
          },
        ]}
      />
    </>
  );
};

export default SliderProduct;
