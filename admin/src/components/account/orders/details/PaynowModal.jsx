import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import CustomModal from "@/components/common/CustomModal";
import SettingContext from "@/helper/settingContext";
import { ModifyString } from "@/utils/customFunctions/ModifyString";
import Btn from "@/elements/buttons/Btn";
import { ErrorMessage, Form, Formik } from "formik";
import { YupObject, nameSchema } from "@/utils/validation/ValidationSchemas";
import { handleModifier } from "@/utils/validation/ModifiedErrorMessage";
import useCreate from "@/utils/hooks/useCreate";
import { RePaymentAPI } from "@/utils/axiosUtils/API";
import { useTranslation } from "react-i18next";

const PaynowModal = ({ modal, setModal, params }) => {
  const { t } = useTranslation("common");
  const [initial, setInitial] = useState("");
  const { settingData } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(RePaymentAPI, false, false, "No", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      if (resDta?.data?.["payment_method"] == "cod") {
        router.push(`/account/order/${resDta?.data?.order_number}`);
      } else {
        window.open(resDta?.data?.url, "_self");
      }
    }
  });

  useEffect(() => {
    setInitial(settingData?.payment_methods?.findIndex((method) => method.status === true));
  }, [settingData]);

  return (
    <CustomModal
      modal={modal}
      setModal={setModal}
      classes={{
        modalClass: "theme-modal",
        modalBodyClass: "address-form",
        title: `PayNow`,
      }}
    >
      <Formik
        initialValues={{ payment_method: settingData?.payment_methods?.find((item) => item?.status)?.name || "" }}
        validationSchema={YupObject({
          payment_method: nameSchema,
        })}
        onSubmit={(values) => {
          values["return_url"] = `${process.env.PAYMENT_RETURN_URL}/account/order/details`;
          values["cancel_url"] = process.env.PAYMENT_CANCEL_URL;
          values["order_number"] = params;
          mutate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="checkout-box">
              <div className="checkout-detail">
                <Row className="g-3">
                  {settingData?.payment_methods?.map((payment, i) => (
                    <Fragment key={i}>
                      {payment?.status && (
                        <Col md={6}>
                          <div className="payment-option">
                            <div className="payment-category w-100">
                              <div className="form-check">
                                <Input checked={i == initial} className="form-check-input" type="radio" name="payment_method" value={payment.name} id={payment.name} onChange={() => setFieldValue("payment_method", payment.name)} />
                                <Label className="form-check-label" htmlFor={payment.name}>
                                  {ModifyString(payment.title, "upper")}
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Fragment>
                  ))}
                </Row>
              </div>
            </div>
            <ErrorMessage name={"payment_method"} render={(msg) => <div className="invalid-feedback d-block">{handleModifier(msg)}</div>} />
            <div className="modal-footer">
              <Btn title="cancel" className="btn-md btn-theme-outline fw-bold" onClick={() => setModal(false)} />
              <Btn title="submit" type="submit" className="btn-md fw-bold text-light theme-bg-color" loading={Number(isLoading)} />
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default PaynowModal;
