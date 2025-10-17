import React, { Fragment,  useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import Btn from "../../elements/buttons/Btn";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { attributeValues, nameSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import SimpleInputField from "../inputFields/SimpleInputField";
import Loader from "../commonComponent/Loader";
import CreateAttributes from "./widgets/CreateAttributes";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const AttributeForm = ({ mutate, updateId, loading, buttonName, language }) => {
  
  const { t } = useTranslation( 'common');
  const router =useRouter()
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["role/id"], queryFn: () => request({ url: `attribute/${updateId}` },router),
    refetchOnMount: false, enabled: false, select: (data) => data.data,
  });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  if (updateId && isLoading) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.name || "" : "",
        slug: updateId ? oldData?.slug || "" : "",
        style: updateId ? oldData?.style || '' : "rectangle",
        value: updateId ? oldData?.attribute_values || [] : [{ value: "", hex_color: "" }],
      }}
      validationSchema={YupObject({
        name: nameSchema,
        value: attributeValues,
      })}
      onSubmit={(values) => {
        values["status"] = 1;
        mutate(values);
      }}>
      {({ values }) => {
        return (
        <Form className="theme-form theme-form-2 mega-form">
          {updateId && <LanguageRedirection id={updateId} path={'/attribute'} language={language} />}
          <CreateAttributes />
          <Row className="mb-4 align-items-center">
            <Col sm="12">
              <FieldArray
                name="value"
                render={(arrayHelpers) => {
                  return (  
                    <>
                      {values["value"].map((item, i) => (
                        <Fragment key={i}>
                          <Row className="g-sm-4 g-3 align-items-center attribute-row">
                            <Col sm="10" xs="9" className="custom-row mb-4">
                              <SimpleInputField nameList={[{ name: `value[${i}][value]`, title: "value", require: "true", placeholder: t("enter_value") }]} />
                              <div className="invalid-feedback feedback-right"><ErrorMessage name={`value[${i}][value]`} render={(msg) => <div className="invalid-feedback d-block">{t("value")} {t("is_required")}</div>} /></div>
                            </Col>
                            {
                              values.style == "color" && <SimpleInputField nameList={[{ name: `value[${i}][hex_color]`, type: "color", title: "value", placeholder: t("enter_value") }]} />
                            }
                            {values["value"].length > 1 && (
                              <Col sm="2" xs="3" className="mt-0 ps-sm-2 ps-0 attribute-remove">
                                <a className="h-100 w-100 cursor-pointer text-danger" onClick={() => arrayHelpers.remove(i)}>
                                  {t("remove")}
                                </a>
                              </Col>
                            )}
                          </Row>
                        </Fragment>
                      ))}
                      <Col xs="4" className="offset-2 mt-3">
                        <Btn className="btn-theme" onClick={() => arrayHelpers.push({ value: "" })} title="add_value" />
                      </Col>
                    </>
                  );
                }}
              />
            </Col>
          </Row>
          <div className="align-items-start value-form">
            <div className="d-flex">
              <FormBtn loading={Boolean(loading)} buttonName={buttonName}/>
            </div>
          </div>
        </Form>
      )}}
    </Formik>
  );
};

export default AttributeForm;
