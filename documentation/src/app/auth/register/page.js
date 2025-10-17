'use client'
import { RegistrationInitialValues, RegistrationValidationSchema } from "@/components/auth/RegistrationFormObjects";
import UserAddress from "@/components/auth/UserAddress";
import UserContact from "@/components/auth/UserContact";
import UserPersonalInfo from "@/components/auth/UserPersonalInfo";
import Btn from "@/elements/buttons/Btn";
import { store } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import { YupObject } from "@/utils/validation/ValidationSchemas";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";

const VendorRegister = () => {
    
    const { t } = useTranslation( 'common');
    const { mutate, isLoading } = useCreate(store, false, `/auth/login`);
    return (
        <section className='log-in-section section-b-space'>
            <Container className='w-100'>
                <Row>
                    <Col xl={7}>
                        <div className="log-in-box">
                            <div className="log-in-title">
                                <h3>{t("welcome_to_store")}</h3>
                                <h4>{t("setup_your_store_information")}</h4>
                            </div>
                            <div className="input-box">
                                <Formik
                                    initialValues={RegistrationInitialValues}
                                    validationSchema={YupObject({
                                        ...RegistrationValidationSchema,
                                    })}
                                    onSubmit={(values) => {
                                        values["status"] = 1;
                                        mutate(values);
                                    }}
                                >
                                    {({ values, errors }) => (
                                        <Form className="row g-4">
                                            <UserPersonalInfo />
                                            <UserAddress values={values} />
                                            <UserContact />
                                            <Col xs={12}>
                                                <Btn title="submit" className="btn btn-animation w-100 justify-content-center" type="submit" color="false" loading={Number(isLoading)} />
                                                <div className="sign-up-box">
                                                    <h4>{t("already_have_account")}? </h4>
                                                    <Link href={`/auth/login`}>{t("login")}</Link>
                                                </div>
                                            </Col>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default VendorRegister;
