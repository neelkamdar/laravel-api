import { useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import CheckBoxField from "../../inputFields/CheckBoxField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";

const LeftSidebar = ({values,setFieldValue,productData,categoryData,setSearch,}) => {
  const [active, setActive] = useState("1");
  
  const { t } = useTranslation("common");
  return (
    <>
      <Row className="align-items-center">
        <Col xs="10">
          <CheckBoxField name={`[content][slider_product_with_banner][slider_products][status]`} title="status"/>
          <div className="shipping-accordion-custom">
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>
              {values["content"]?.["slider_product_with_banner"]?.["slider_products"]?.["product_slider_1"]?.["title"]}<RiArrowDownLine />
            </div>
            {active == 1 && (
              <div className="rule-edit-form">
                <SimpleInputField nameList={[{name: `[content][slider_product_with_banner][slider_products][product_slider_1][title]`,placeholder: t("enter_title"),title: "title",},]}/>
                <SearchableSelectInput
                  nameList={[ {name: "productSlider1ProductIds",title: "products", inputprops: { name: "productSlider1ProductIds", id: "productSlider1ProductIds", options: productData || [], setsearch: setSearch,},},]}/>
                <CheckBoxField name={`[content][slider_product_with_banner][slider_products][product_slider_1][status]`} title="status" />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="10">
          <div className="shipping-accordion-custom">
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(2)}>
              {values["content"]?.["slider_product_with_banner"]?.["slider_products"]?.["product_slider_2"]?.["title"]}<RiArrowDownLine />
            </div>
            {active == 2 && (
              <div className="rule-edit-form">
                <SimpleInputField nameList={[{name: `[content][slider_product_with_banner][slider_products][product_slider_2][title]`,placeholder: t("enter_title"),title: "title",},]}/>
                <SearchableSelectInput
                  nameList={[ {name: "productSlider2ProductIds",title: "products", inputprops: { name: "productSlider2ProductIds", id: "productSlider2ProductIds", options: productData || [], setsearch: setSearch,},},]}/>
                <CheckBoxField name={`[content][slider_product_with_banner][slider_products][product_slider_2][status]`} title="status" />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="10">
          <div className="shipping-accordion-custom">
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>
              {values["content"]?.["slider_product_with_banner"]?.["slider_products"]?.["product_slider_3"]?.["title"]}<RiArrowDownLine />
            </div>
            {active == 3 && (
              <div className="rule-edit-form">
                <SimpleInputField nameList={[{name: `[content][slider_product_with_banner][slider_products][product_slider_3][title]`,placeholder: t("enter_title"),title: "title",},]}/>
                <SearchableSelectInput
                  nameList={[ {name: "productSlider3ProductIds",title: "products", inputprops: { name: "productSlider3ProductIds", id: "productSlider3ProductIds", options: productData || [], setsearch: setSearch,},},]}/>
                <CheckBoxField name={`[content][slider_product_with_banner][slider_products][product_slider_3][status]`} title="status" />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LeftSidebar;
