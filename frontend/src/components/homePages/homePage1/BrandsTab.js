import CheckBoxField from "@/components/inputFields/CheckBoxField";
import SearchableSelectInput from "@/components/inputFields/SearchableSelectInput";

const BrandsTab = ({ name,setBrandSearch,brandData }) => {

  return (
    <>
      <CheckBoxField name={`[content][brands][status]`} title="status" />
      <SearchableSelectInput
        nameList={[
          {
            name: name,
            title: "brands",
            inputprops: {
              name: name,
              id: name,
              options: brandData || [],
              setsearch: setBrandSearch,
            },
          },
        ]}
      />
    </>
  );
};

export default BrandsTab;
