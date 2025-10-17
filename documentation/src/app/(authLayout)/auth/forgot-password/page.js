"use client";
import Link from "next/link";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import ShowBox from "@/elements/alerts&Modals/ShowBox";
import Btn from "@/elements/buttons/Btn";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import useHandleForgotPassword, {ForgotPasswordSchema} from "@/utils/hooks/auth/useForgotPassword";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";

const ForgotPassword = () => {
  const [showBoxMessage, setShowBoxMessage] = useState();
  const { mutate, isLoading } = useHandleForgotPassword(setShowBoxMessage);
  const { t } = useTranslation("common");
  return (
    <div className="box-wrapper">
      <ShowBox showBoxMessage={showBoxMessage} />
      <LoginBoxWrapper>
        <div className="log-in-title">
          <h3>{t("welcome_to_store")}</h3>
          <h4>{t("forgot_password")}</h4>
        </div>
        <div className="input-box">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => mutate(values)}
          >
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field
                    name="email"
                    component={ReactstrapInput}
                    className="form-control"
                    id="email"
                    placeholder={t("email_address")}
                    label="email_address"
                  />
                </Col>
                <Col sm="12">
                  <Btn
                    title="send_email"
                    className="btn btn-animation w-100 justify-content-center"
                    type="submit"
                    color="false"
                    loading={Number(isLoading)}
                  />
                </Col>
                <Col sm="12">
                <div className="sign-up-box">
                    <h4>{t("already_have_account")}</h4>
                    <Link href={`/auth/login`}>{t("back_to_login")}</Link>
                  </div>
                </Col>
              </Form>
            )}
          </Formik>
        </div>
      </LoginBoxWrapper>
    </div>
  );
};
export default ForgotPassword;
