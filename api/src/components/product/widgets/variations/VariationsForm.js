import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine } from "react-icons/ri";
import allPossibleCases from "../../../../utils/customFunctions/AllPossibleCases";
import CheckBoxField from "../../../inputFields/CheckBoxField";
import FileUploadField from "../../../inputFields/FileUploadField";
import SearchableSelectInput from "../../../inputFields/SearchableSelectInput";
import SimpleInputField from "../../../inputFields/SimpleInputField";

const VariationsForm = ({ values, setFieldValue, newId, index, elem, errors, updateId, hasSubmitted }) => {
useEffect(() => {
  if(values["variations"]?.[index]?.["is_licensable"]&& values["variations"]?.[index]?.["digital_file_ids"]?.length){
    setFieldValue(`variations[${index}]["is_licensekey_auto"]` ,values[`variations`][index]["is_licensekey_auto"] ? values[`variations`][index]["is_licensekey_auto"] :false)
  }
}, [values["variations"][index]?.["is_licensable"],values["variations"][index]?.["digital_file_ids"]?.length])

  const { t } = useTranslation( 'common');
  const [active, setActive] = useState(false);
  useEffect(() => {
    setFieldValue(`variations[${index}][attribute_values]`, allPossibleCases(values["combination"]?.map((item) => item?.values?.map((elem) => ({ name: item.name?.name, value: item.name.attribute_values?.find((attr) => {attr.id == elem})?.value })))))
  }, [values["variation_options"]])
  useEffect(() => {
    let priceValue, discountValue, salePriceValue
    priceValue = values[`variations`][index]?.price || 0.00;
    discountValue = values[`variations`][index]?.discount || 0.00;
    salePriceValue = priceValue - ((priceValue * discountValue) / 100);
    setFieldValue(`variations[${index}][sale_price]`, salePriceValue)
  }, [values[`variations`][index]?.price, values[`variations`][index]?.discount])
  return (
    <div className="shipping-accordion-custom" key={index}>
      <div
        className={`p-3 rule-dropdown d-flex justify-content-between ${
          hasSubmitted && Object.keys(errors?.variations?.[index] || {}).length > 0
            ? 'error-border'
            : ''
        }`}
        onClick={() => setActive((prev) => (prev !== elem.id ? elem.id : false))}
      >
        {newId}
        <RiArrowDownSLine />
      </div>
      {active === elem.id && (
        <div className="rule-edit-form">
          <SimpleInputField
            nameList={[
              { name: `variations[${index}][name]`, title: "name", placeholder: t("enter_name"), require: "true", errormsg: "Name" },
              { name: `variations[${index}][price]`, title: "price", type: "number", placeholder: t("enter_price"), require: "true", inputaddon: "true", errormsg: "Price", min: "0", step: "0.01" },
              { name: `variations[${index}][discount]`, title: "discount", type: "number", min: '0', max: '100', inputaddon: "true", placeholder: t("enter_discount"), postprefix: "%" },
              { name: `variations[${index}][sale_price]`, title: "sale_price", type: "number", inputaddon: "true", placeholder: "0.00", readOnly: true },
              { name: `variations[${index}][quantity]`, title: "stock_quantity", type: "number", require: "true", errormsg: "Quantity", placeholder: t("enter_quantity"), },
              { name: `variations[${index}][sku]`, title: "sku", require: "true", placeholder: t("enter_sku"), errormsg: "sku" },
            ]}
          />
          <SearchableSelectInput
            nameList={[
              {
                name: `variations[${index}][stock_status]`,
                require: 'true',
                inputprops: {
                  name: `variations[${index}][stock_status]`,
                  id: `variations[${index}][stock_status]`,
                  options: [
                    { id: "in_stock", name: "In Stock" },
                    { id: "out_of_stock", name: "out_of_stock" },
                  ],
                },
                title: "stock_status"
              },
            ]}
          />

          <FileUploadField name={`variations[${index}][variation_image_id]`} id={`variations[${index}][variation_image_id]`} uniquename={values[`variations`][index]['variation_image']} type="file" values={values} setFieldValue={setFieldValue} title="image" />

          {values.product_type == "digital" ?   
            <>
            
              <FileUploadField multiple={true}  name={`variations[${index}][digital_file_ids]`} id={`variations[${index}][digital_file_ids]`} uniquename={values[`variations`][index]['digital_files']} type="file" values={values} setFieldValue={setFieldValue} title="upload_main_files" />    
              <CheckBoxField name={`variations[${index}][is_licensable]`} title="is_licensable" />
              { values["variations"][index]["is_licensable"] ? 
                <>
                  {values["variations"][index]["digital_file_ids"]?.length > 0 ? <CheckBoxField name={`variations[${index}][is_licensekey_auto]`} title="is_licensekey_auto" /> : null}
                  {!values["variations"][index]["is_licensekey_auto"] ? 
                  <>
                  <SearchableSelectInput
              nameList={
                [
                  {
                    name: `variations[${index}][separator]`,
                    title: "separator",
                    inputprops: {
                      name: `variations[${index}][separator]`,
                      id: 'separator',
                      options: [
                        { id: "comma", name: "Comma ( , )" },
                        { id: "semicolon", name: "Semicolon ( ; )" },
                        { id: "pipe", name: "Pipe ( | )" },
                      ],
                    },
                  },
                ]} />
                <SimpleInputField nameList={[{ name: `variations[${index}][license_keys]`, title: "license_key",type:"textarea",rows:"3",placeholder: t("enter_license_key") }]}/>  
                </> : null}
                </> :null
              }
            </>
            :null
          } 
          <CheckBoxField name={`variations[${index}][status]`} title="status" require="true" />
        </div>
      )}
    </div>
  );
};

export default VariationsForm;
