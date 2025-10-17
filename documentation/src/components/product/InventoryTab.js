import { Fragment, useEffect } from "react";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import WholesaleTab from "./widgets/wholesale/WholesaleTab";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import { ErrorMessage, FieldArray } from "formik";
import Btn from "@/elements/buttons/Btn";

const InventoryTab = ({ values, setFieldValue, errors, updateId, touched, setErrors, setTouched }) => {

  const { t } = useTranslation('common');
  // Set the value of sale price
  useEffect(() => {
    if (values['price'] || values['discount']) {
      let salePriceValue = values['price'] - ((values['price'] * values['discount']) / 100);
      setFieldValue("sale_price", salePriceValue)
    }
  }, [values['price'], values['discount']])
  return (
    <>
      {values['product_type'] == "external" &&
        <SimpleInputField nameList={[
          { name: "external_url", title: "external_url", require: "true", placeholder: t("enter_external_url") },
          { name: "external_button_text", title: "external_button_text", placeholder: t("enter_external_button_text"), type: "text" }]}
        />
      }
      {values['product_type'] == "external" ? (
        null
      ) :
        <SearchableSelectInput
          nameList={[
            {
              name: "type",
              require: "true",
              inputprops: {
                name: "type",
                id: "type",
                options: [
                  { id: "simple", name: "Simple Product" },
                  { id: "classified", name: "Variable Product" },
                ],
              },
            },
          ]}
        />
      }
      <SearchableSelectInput
        nameList={[
          {
            name: "stock_status",
            title: "stock_status",
            require: 'true',
            inputprops: {
              name: "stock_status",
              id: "stock_status",
              options: [
                { id: "in_stock", name: "In stock" },
                { id: "out_of_stock", name: "out_of_stock" },
              ],
            },
          },
        ]}
      />
      <SimpleInputField nameList={[
        { name: "sku", title: "sku", require: "true", placeholder: t("enter_sku") },
        // { name: "quantity", title: "stock_quantity", placeholder: t("enter_quantity"), type: "number", require: "true" }
      ]}
      />
       {values["type"] === "simple" &&  <SimpleInputField nameList={[
        { name: "quantity", title: "stock_quantity", placeholder: t("enter_quantity"), type: "number", require: "true" }
      ]}
      />}
      {values["type"] === "simple" && <SimpleInputField nameList={[
        { name: "price", require: "true", type: "number", inputaddon: "true", placeholder: t("enter_price"), step: "0.01" },
        { name: "discount", type: "number", inputaddon: "true", postprefix: "%", placeholder: t("enter_discount"), min: "0", max: "100", step: "0.01" },
        { name: "sale_price", title: "sale_price", type: "number", inputaddon: "true", readOnly: 'true' },]}
      />
      }
      {values['product_type'] == "external" || values["type"] == "classified" ? (null) :
        <SearchableSelectInput
          nameList={[
            {
              name: "wholesale_price_type",
              require: "wholesale_price_type",
              inputprops: {
                name: "wholesale_price_type",
                id: "wholesale_price_type",
                close: values["wholesale_price_type"] ? true : false,
                options: [
                  { id: "fixed", name: "fixed" },
                  { id: "percentage", name: "percentage" },
                ],
                helpertext: "*Enabling this feature will present wholesale prices as a table list on the frontend."
              },
            },
          ]}
        />
      }
      <WholesaleTab setErrors={setErrors} setTouched={setTouched} updateId={updateId} values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
      <div className="inventory-details-box">
        <Row className="mb-4 align-items-center">
          <Col xs="12">
            <FieldArray
              name="external_details"
              render={(arrayHelpers) => {
                return (
                  <>
                    <Row className="g-sm-4 g-3">
                      {values["external_details"]?.map((item, i) => (
                        <Fragment key={i}>
                          <Col xs="12">
                            <Row className="g-sm-4 g-3 align-items-center attribute-row">
                              <Col sm="5" xs="12" className="custom-row">
                                <SimpleInputField nameList={[{ name: `external_details[${i}][key]`, title: "Key", require: "true", placeholder: t("enter_key") }]} />
                                <div className="invalid-feedback feedback-right">
                                  <ErrorMessage name={`external_details[${i}][key]`} render={(msg) => <div className="invalid-feedback d-block">{t("key")} {t("is_required")}</div>} /></div>
                              </Col>
                              <Col sm="5" xs="12" className="custom-row">
                                <SimpleInputField nameList={[{ name: `external_details[${i}][value]`, title: "Value", require: "true", placeholder: t("enter_value") }]} />
                                <div className="invalid-feedback feedback-right"><ErrorMessage name={`external_details[${i}][value]`} render={(msg) => <div className="invalid-feedback d-block">{t("value")} {t("is_required")}</div>} /></div>
                              </Col>
                              {/* {values["external_details"].length > 1 && ( */}
                              <Col sm="2" className="delete-variant">
                                <a className="invalid-feedback" onClick={() => arrayHelpers.remove(i)}>{t("remove")}</a>
                              </Col>
                              {/* )} */}
                            </Row>
                          </Col>
                        </Fragment>
                      ))}
                    </Row>
                    {/* <Col xs="4" className="offset-2"> */}
                    <Btn className="btn-theme mt-4" color="transparent" onClick={() => arrayHelpers.push({ external_details: "" })} title="add_external_details"  disabled={values["external_details"]?.some(item => !item.key?.trim() || !item.value?.trim())} />
                    {/* </Col> */}
                  </>
                );
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default InventoryTab;
