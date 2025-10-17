import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input, Label, Row } from "reactstrap";
import { ProductLayoutOption, Product_box_variant, } from "../../data/TabTitleList";
import { getHelperText } from "../../utils/customFunctions/getHelperText";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import DescriptionInput from "../widgets/DescriptionInput";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import ProductBoxDemo from "./ProductBoxDemo";

const ProductLayout = ({ values, setFieldValue }) => {
  const { t } = useTranslation("common");
  useEffect(() => {
    setFieldValue("[options][product][product_box_variant]", values?.options?.product?.product_box_variant ? values?.options?.product?.product_box_variant : "basic");
  }, []);
  const handleClick = (val) => {
    setFieldValue("[options][product][product_layout]", val.value);
  };
  useEffect(() => {
    if (values["options"]["product"]?.["product_box_bg"]) {
      setFieldValue("[options][product][image_bg]", false);
      setFieldValue("[options][product][full_border]", false);
    }
  }, [values["options"]["product"]?.["product_box_bg"]]);
  useEffect(() => {
    if (values["options"]["product"]?.["image_bg"]) {
      setFieldValue("[options][product][product_box_bg]", false);
      setFieldValue("[options][product][full_border]", false);
    }
  }, [values["options"]["product"]?.["image_bg"]]);
  useEffect(() => {
    if (values["options"]["product"]?.["product_box_border"]) {
      setFieldValue("[options][product][full_border]", false);
    }
  }, [values["options"]["product"]?.["product_box_border"]]);
  useEffect(() => {
    if (values["options"]["product"]?.["full_border"]) {
      setFieldValue("[options][product][product_box_bg]", false);
      setFieldValue("[options][product][product_box_border]", false);
      setFieldValue("[options][product][image_bg]", false);
    }
  }, [values["options"]["product"]?.["full_border"]]);

  return (
    <>
      <div className="mb-5 selection-layout radio-type-sec">
        <h4 className="fw-semibold w-100">{t("product_page_layout")}</h4>
        <Row xxl={4} xl={3} lg={2} md={3} xs={2} className="g-4 w-100">
          {ProductLayoutOption.map((elem, i) => (
            <div key={i}>
              <div className="selection-box text-center">
                <Input
                  name="[options][product][product_layout]"
                  type="radio"
                  id={elem.value}
                  checked={
                    values["options"]["product"]?.["product_layout"] == elem.value
                      ? true
                      : false
                  }
                  onChange={() => handleClick(elem)}
                />
                <Label htmlFor={elem.value}>
                  <div>
                    <Image
                      src={elem.img}
                      className="img-fluid"
                      alt=""
                      height={100}
                      width={165}
                    />
                  </div>
                  <h4 className="mt-2">{t(elem.title)}</h4>
                </Label>
              </div>
            </div>
          ))}
        </Row>
      </div>
      <div className="mb-5">
        <h4 className="fw-semibold mb-3">{t("product_box_variant")}</h4>
        <div className="product-design-sec">
          <div className={`main-product-box ${values?.options?.product?.product_box_variant === "digital" ? "main-product-full" : ""}`} >
            <div className={`${values?.options?.product?.product_box_variant}-box`}>
              <div className={`${values?.options?.product?.full_border ? "full_border" : ""} ${values?.options?.product?.image_bg ? "product_img_bg" : ""} ${values?.options?.product?.product_box_bg ? "full_bg" : ""} ${values?.options?.product?.product_box_border ? "product_border" : ""}  `}
              >
                <ProductBoxDemo />
              </div>
            </div>
          </div>
          <div className="custom-option">
            <SearchableSelectInput
              nameList={[
                {
                  name: "[options][product][product_box_variant]",
                  title: "layout_variation",
                  inputprops: {
                    name: "[options][product][product_box_variant]",
                    id: "[options][product][product_box_variant]",
                    options: Product_box_variant,
                    close: false,
                  },
                },
              ]}
            />
            <CheckBoxField
              name="[options][product][product_box_bg]"
              title={t("product_box_background_color")}
            />
            <CheckBoxField
              name="[options][product][image_bg]"
              title={t("product_image_background_color")}
            />
            <CheckBoxField
              name="[options][product][product_box_border]"
              title={t("product_box_border")}
            />
            <CheckBoxField
              name="[options][product][full_border]"
              title={t("full_border")}
            />
          </div>
        </div>
      </div>

      <Row className="mt-5 align-items-center g-2">
        <CheckBoxField
          name="[options][product][is_trending_product]"
          title="trending_product"
        />
        <CheckBoxField
          name="[options][product][banner_enable]"
          title="banner_status"
          helpertext="*Enabling this will showcase the banner in the sidebar of the product page."
        />
        <FileUploadField
          name="banner_image_url"
          title="banner_image"
          id="banner_image_url"
          showImage={values["banner_image_url"]}
          type="file"
          values={values}
          setFieldValue={setFieldValue}
          helpertext={getHelperText("380x580px")}
        />

        <CheckBoxField
          name="[options][product][safe_checkout]"
          title="safe_checkout"
          helpertext="*A safe checkout image will appear on the product page."
        />
        <FileUploadField
          name="safe_checkout_image"
          title="safe_checkout_image"
          id="safe_checkout_image"
          showImage={values["safe_checkout_image"]}
          type="file"
          values={values}
          setFieldValue={setFieldValue}
          helpertext={getHelperText("50x50px")}
        />

        <CheckBoxField
          name="[options][product][secure_checkout]"
          title="secure_checkout"
          helpertext="*A secure checkout image will appear on the product page."
        />
        <FileUploadField
          name="secure_checkout_image"
          title="secure_checkout_image"
          id="secure_checkout_image"
          showImage={values["secure_checkout_image"]}
          type="file"
          values={values}
          setFieldValue={setFieldValue}
          helpertext={getHelperText("50x50px")}
        />

        <CheckBoxField
          name="[options][product][encourage_order]"
          title="encourage_order"
          helpertext="*A random order count between 1 and 100 will be displayed to motivate user purchases."
        />
        <SimpleInputField
          nameList={[
            {
              name: "[options][product][encourage_max_order_count]",
              title: "encourage_max_order_count",
              max: "100",
              min: "0",
              type: "number",
              helpertext:
                "*Specify a number between 1 and 10 to encourage orders.",
            },
          ]}
        />
        <CheckBoxField
          name="[options][product][encourage_view]"
          title="encourage_view"
          helpertext="*This feature encourages users to view products by presenting engaging content or prompts."
        />
        <SimpleInputField
          nameList={[
            {
              name: "[options][product][encourage_max_view_count]",
              title: "encourage_max_view_count",
              max: "100",
              min: "0",
              type: "number",
              helpertext:
                "*Specify a number between 1 and 10 to encourage product view.",
            },
          ]}
        />
        <CheckBoxField
          name="[options][product][sticky_checkout]"
          title="sticky_checkout"
          helpertext="*Enable to make the Add to Cart and checkout options sticky at the bottom of the product page."
        />
        <CheckBoxField
          name="[options][product][sticky_product]"
          title="sticky_product"
          helpertext="*Enable to showcase random products at the bottom of the website."
        />
        <CheckBoxField
          name="[options][product][social_share]"
          title="social_share"
          helpertext="*Enable this option to allow users to share the product on social media platforms."
        />
        <DescriptionInput
          values={values}
          setFieldValue={setFieldValue}
          title={"shipping_and_return"}
          nameKey="[options][product][shipping_and_return]"
          helpertext="*This area contains the shipping and return policies. A minimum of 500 characters is recommended for effective communication."
        />
      </Row>
    </>
  );
};

export default ProductLayout;
