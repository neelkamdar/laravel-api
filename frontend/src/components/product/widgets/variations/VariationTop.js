import MultiSelectField from "../../../inputFields/MultiSelectField";
import SearchableSelectInput from "../../../inputFields/SearchableSelectInput";

import { useTranslation } from "react-i18next";

const VariationTop = ({ data, index, values, setFieldValue, errors }) => {
  const { t } = useTranslation("common");
  const setVariationValue = (name, value, index) => {
    setFieldValue(
      "combination",
      values["combination"]?.map((item, i) =>
        i == index ? { ...item, name: value, values: [] } : item
      )
    );
  };
  const setAttributesValues = (name, value) => {
    setFieldValue(
      "attributes_ids",
      values["combination"]?.map((el) => el?.["name"]?.id)
    );
    setFieldValue(
      "combination",
      values["combination"].map((item, i) =>
        i == index ? { ...item, values: value } : item
      )
    );
  };
  const handleRemove = () => {
    if (values["combination"].length > 1) {
      setFieldValue(
        "combination",
        values["combination"].filter((item, i) => index !== i)
      );
    }
  };
  return (
    <div className="variant-row">
      <SearchableSelectInput
        nameList={[
          {
            name: "attribute_name",
            title: "attributes",
            inputprops: {
              name: "attribute_name",
              id: "attribute_name",
              options: data?.filter((item) =>
                values["combination"].find(
                  (elem) => elem?.name?.name == item.name
                )
                  ? false
                  : true
              ),
              value: values["combination"][index]["name"]?.["name"],
            },
            index: index,
            store: "obj",
            setvalue: setVariationValue,
          },
        ]}
      />
      <MultiSelectField
        errors={errors}
        values={values["combination"][index]}
        setFieldValue={setAttributesValues}
        name="values"
        title="value"
        data={values?.["combination"]?.[index]?.["name"]?.[
          "attribute_values"
        ]?.map((elem) => ({ name: elem.value, id: elem.id }))}
      />
      {values["combination"].length > 1 && (
        <div className="delete-variant">
          <a onClick={handleRemove}>{t("remove")}</a>
        </div>
      )}
    </div>
  );
};

export default VariationTop;
