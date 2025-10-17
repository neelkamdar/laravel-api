import CheckBoxField from "@/components/inputFields/CheckBoxField";
import MultiSelectField from "@/components/inputFields/MultiSelectField";
import SimpleInputField from "@/components/inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";

const CategoryIconListTab = ({
  values,
  setFieldValue,
  categoryData,
  category,
  status,
  name,
}) => {
  
  const { t } = useTranslation("common");
  return (
    <>
      {name && (
        <SimpleInputField
          nameList={[
            {
              name: `[content][${name}][title]`,
              placeholder: t("enter_title"),
              title: "title",
            },
          ]}
        />
      )}
      <MultiSelectField
        values={values}
        setFieldValue={setFieldValue}
        name={category}
        title="categories"
        data={categoryData}
      />
      <CheckBoxField name={`[content][${status}][status]`} title="status" />
    </>
  );
};

export default CategoryIconListTab;
