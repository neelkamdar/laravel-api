"use client"
import { ReactstrapInput } from "@/components/reactstrapFormik";
import Btn from "@/elements/buttons/Btn";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import useUpdatePassword, { UpdatePasswordSchema } from "@/utils/hooks/auth/useUpdatePassword";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";

const UpdatePassword = () => {
    const { t } = useTranslation( 'common');
    const { mutate, isLoading } = useUpdatePassword();
  return (
    <>
      <div className="box-wrapper">
        <LoginBoxWrapper>
          <div className="log-in-title">
            <h4>{t("update_password")}</h4>
          </div>
          <div className="input-box">
            <Formik
              initialValues={{
                password: "",
                password_confirmation: "",
              }}
              validationSchema={UpdatePasswordSchema}
              onSubmit={mutate}>
              {() => (
                <Form className="row g-2">
                  <Col sm="12">
                    <Field name="password" component={ReactstrapInput} type="password" className="form-control" id="password" placeholder={t("password")} label="password" />
                  </Col>
                  <Col sm="12">
                    <Field name="password_confirmation" component={ReactstrapInput} type="password" className="form-control" id="password" placeholder={t("confirm_password")} label="confirm_password" />
                  </Col>
                  <Col sm="12">
                    <Btn title="submit" className="btn btn-animation w-100 justify-content-center" type="submit" color="false" loading={Number(isLoading)} />
                  </Col>
                </Form>
              )}
            </Formik>
          </div>
        </LoginBoxWrapper>
      </div>
    </>
  );
};
export default UpdatePassword;
