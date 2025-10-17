import { Col, Label, Row } from "reactstrap";
import NameConversion from "../../utils/customFunctions/NameConversion";
import { useTranslation } from "react-i18next";

const InputWrapperComponent = (props) => {
  const { t } = useTranslation("common");
  return (
    <div className="input-error">
      <div className={`${props.removeExtraSpace !== "true" ? "mb-4" : ""} ${props.nolabel == "true" ? "form-floating" : "align-items-center row"}`}>
        {props.nolabel !== "true" && (
          <Col sm="2">
            <Label className="col-form-label form-label-title">
              {props?.noNameConversation ? t(props.name) : t(NameConversion(props.name))}
              {props.require == "true" && <span className="theme-color ms-1 required-dot">*</span>}
            </Label>
          </Col>
        )}
        {props.nolabel !== "true" ? (
          <Col sm="10" className={props.classes ? props.classes : ""}>
            {props.children}
          </Col>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};

export default InputWrapperComponent;
