import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "reactstrap";
import request from "../../utils/axiosUtils";
import { product } from "../../utils/axiosUtils/API";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import TabForProduct from "@/components/product/widgets/TabForProduct";
import { ProductInitValues, ProductValidationSchema } from "./widgets/ProductObjects";
import ProductSubmitFunction from "./widgets/ProductSubmitFunction";
import SettingContext from "../../helper/settingContext";
import AllProductTabs from "./widgets/AllProductTabs";
import { useTranslation } from "react-i18next";
import Btn from "@/elements/buttons/Btn";
import { useRouter } from "next/navigation";
import AccountContext from "@/helper/accountContext";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const ProductForm = ({ mutate, updateId, title, buttonName, saveButton, setSaveButton, language }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("1");
  const { state } = useContext(SettingContext);

  const { data: oldData, isLoading: oldDataLoading, refetch, status } = useQuery({ queryKey: [updateId], queryFn: () => request({ url: `${product}/${updateId}` }, router), refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });

  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId,saveButton]);
  const watchEvent = useCallback(
    (oldData, updateId) => {
      return ProductInitValues(oldData, updateId);
    },
    [oldData, updateId]
  );
  const { role, accountData } = useContext(AccountContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (updateId && oldDataLoading) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize={!!updateId && oldData !== null} // Set enableReinitialize dynamically
        initialValues={{ ...watchEvent(oldData, updateId) }}
        validationSchema={YupObject({
          ...ProductValidationSchema,
          store_id: state?.isMultiVendor && role === "admin" && nameSchema,
        })}
        onSubmit={(values) => {
          setHasSubmitted(true);
          if (updateId) {
            values["_method"] = "put";
          }
          if (role === "vendor") {
            values["store_id"] = accountData?.store?.id;
          }
          if (!values["watermark"]) {
            values["watermark_image_id"] = "";
          }
          if (!values["is_licensable"]) {
            values["separator"] = "";
            values["license_key"] = "";
          }
          ProductSubmitFunction(mutate, values, updateId); // Wait for the function to complete
        }}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting, setErrors, setTouched }) => {
          return (
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              <Row>
                <Col>
                  <Card>
                    <div className="title-header option-title">
                      <h5>{t(title)} </h5>
                      {language && <span className="badge title-header-badge">{language}</span>}
                    </div>
                    {updateId && <LanguageRedirection id={updateId} path={"/product"} language={language} />}
                    <Row>
                      <Col xl="3" lg="4">
                        <TabForProduct values={values} activeTab={activeTab} setActiveTab={setActiveTab} errors={errors} touched={touched} />
                      </Col>
                      <AllProductTabs setErrors={setErrors} setTouched={setTouched} touched={touched} values={values} activeTab={activeTab} isSubmitting={isSubmitting} setFieldValue={setFieldValue} errors={errors} updateId={updateId} setActiveTab={setActiveTab} hasSubmitted={hasSubmitted} />
                      <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                        <Btn className="btn-outline btn-lg" title="back" onClick={() => router.back()} />
                        {updateId && <Btn className="btn-outline btn-lg" type="submit" title={`save_and_continue`} onClick={() =>{setHasSubmitted(true); setSaveButton(true)}} />}
                        <Btn className="btn-primary btn-lg" type="submit" title={buttonName} onClick={() => { setHasSubmitted(true); setSaveButton && setSaveButton(false) }} />
                      </div>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProductForm;
