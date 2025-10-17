import { attribute } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Btn from "../../../../elements/buttons/Btn";
import request from "../../../../utils/axiosUtils";
import allPossibleCases from "../../../../utils/customFunctions/AllPossibleCases";
import getStringId from "../../../../utils/customFunctions/getStringId";
import VariationsForm from "./VariationsForm";
import VariationTop from "./VariationTop";
import { useRouter } from "next/navigation";

const VariationsTab = ({ values, setFieldValue, errors, updateId, hasSubmitted }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [attribute],
    queryFn: () => request({ url: attribute }, router),
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    const filledCombinations = values["combination"]?.filter(
      (item) => item?.values?.length > 0
    );

    setFieldValue(
      "attribute_values",
      values["options"]?.map((item) => item.values).flat(Infinity)
    );

    const cleanedCombinations = values["combination"]?.filter(
      (item) => item?.name && item?.values?.length > 0
    );

    if (cleanedCombinations?.length > 0) {
      const variationOpts = allPossibleCases(
        cleanedCombinations.map((item) =>
          item.values.map((elem) => ({
            name: item.name?.name,
            value: item.name.attribute_values?.find((attr) => attr.id == elem)
              ?.value,
          }))
        )
      );
      setFieldValue("variation_options", variationOpts);
    } else {
      //Clear variations and options if no usable combinations
      setFieldValue("variation_options", []);
      setFieldValue("variations", []);
    }
  }, [values["combination"]]);

  useEffect(() => {
    getNewVariations();
  }, [values["variation_options"]]);
  const getNewVariations = () => {
    let temp_variations = [];
    const variations_val = values["variations"]; // [{},{}]

    values["variation_options"]?.map((opt, ind) => {
      const att_vals = opt.map((val) => val.value); // [burgundy ,brown]
      let variant_val = variations_val.find(({ attribute_values }) =>
        attribute_values?.every(({ value }) => att_vals.includes(value))
      );
      const addObject = { stock_status: "in_stock", status: true };
      if (values.product_type === "digital") {
        addObject.is_licensable = false;
        addObject.digital_file_ids = [];

        if (
          values["variations"][ind]?.["is_licensable"] &&
          values["variations"][ind]["digital_file_ids"]?.length
        ) {
          addObject.is_licensekey_auto = false;
        }
      }
      if (variant_val) {
        if (variant_val?.is_licensekey_auto) {
          variant_val["is_licensekey_auto"] = true;
        } else {
          variant_val["is_licensekey_auto"] = false;
        }

        if (variant_val?.is_licensable) {
          variant_val["is_licensable"] = true;
        } else {
          variant_val["is_licensable"] = false;
        }
        if (variant_val?.status) {
          variant_val["status"] = true;
        } else {
          variant_val["status"] = false;
        }
      }
      temp_variations.push(variant_val || addObject);
    });

    if (temp_variations.length > 0) {
      setFieldValue("variations", temp_variations);
    }
  };
  return (
    <div className="variant-box border-top-0">
      {values["combination"]?.map((elem, i) => (
        <VariationTop
          key={i}
          index={i}
          data={data}
          setFieldValue={setFieldValue}
          values={values}
        />
      ))}
      <div className="save-back-button">
        <Btn
          className="btn-primary mb-2"
          title="AddVariation"
          onClick={() =>
            setFieldValue("combination", [...values["combination"], {}])
          }
          disabled={values["combination"]?.some(
            (item) =>
              !item?.name ||
              !Array.isArray(item?.values) ||
              item?.values?.length === 0
          )}
        />
      </div>
      {values["variation_options"]?.length >= 1 && (
        <h3 className="form-label-title mb-2">Variants</h3>
      )}
      {values["variation_options"]?.map((elem, i) => (
        <VariationsForm
          elem={elem}
          values={values}
          setFieldValue={setFieldValue}
          key={i}
          index={i}
          newId={getStringId(elem)}
          errors={errors}
          hasSubmitted={hasSubmitted}
        />
      ))}
    </div>
  );
};

export default VariationsTab;
