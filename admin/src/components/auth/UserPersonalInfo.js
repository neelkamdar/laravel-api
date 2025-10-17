import { Field } from "formik";
import { Col } from "reactstrap";
import { ReactstrapInput } from "../reactstrapFormik";
import { useTranslation } from "react-i18next";

const UserPersonalInfo = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Col sm="6">
        <Field name="name" type="text" inputprops={{ noExtraSpace: true }} component={ReactstrapInput} className="form-control" id="name" placeholder={t("name")} label="name" />
      </Col>
      <Col sm="6">
        <Field name="email" type="email" inputprops={{ noExtraSpace: true }} component={ReactstrapInput} className="form-control" id="email" placeholder={t("email")} label="email" />
      </Col>
      <Col sm="6">
        <Field name="password" type="password" inputprops={{ noExtraSpace: true }} component={ReactstrapInput} className="form-control" id="password" placeholder={t("password")} label="password" />
      </Col>
      <Col sm="6">
        <Field name="password_confirmation" type="password" inputprops={{ noExtraSpace: true }} component={ReactstrapInput} className="form-control" id="password_confirmation" placeholder={t("confirm_password")} label="confirm_password" />
      </Col>
      <Col sm="6">
        <Field name="store_name" type="text" component={ReactstrapInput} inputprops={{ noExtraSpace: true }} className="form-control" id="store_name" placeholder={t("store_name")} label="store_name" />
      </Col>
      <Col sm="6">
        <Field name="description" type="textarea" component={ReactstrapInput} inputprops={{ noExtraSpace: true }} className="form-control" id="description" placeholder={t("store_description")} label="store_description" />
      </Col>
    </>
  );
};

export default UserPersonalInfo;
