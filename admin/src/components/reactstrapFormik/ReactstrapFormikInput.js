import { ErrorMessage } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import SettingContext from "../../helper/settingContext";
import { handleModifier } from "../../utils/validation/ModifiedErrorMessage";

const ReactstrapFormikInput = ({ field: { ...fields }, form: { touched, errors }, ...props }) => {
  function modifyingValue(value, object) {
    const keys = value.split(/\.|\[|\]/).filter(Boolean);
    let result = object;
    for (const key of keys) {
      result = result[key];
      if (result === undefined) return undefined;
    }
    return result;
  }
  const { t } = useTranslation("common");
  const { currencySymbol } = useContext(SettingContext);
  return (
    <>
      {props?.inputprops?.noExtraSpace ? (
        <div className="form-floating">
          <Input {...props} {...fields} value={fields?.value ?? ""} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" />
          <Label htmlFor={props.id}>{t(props.label)}</Label>
          {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]).split(" ").join(""))}</FormFeedback> : ""}
        </div>
      ) : props.label ? (
        <>
          <FormGroup floating>
            <Input {...props} {...fields} value={fields?.value ?? ""} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" />
            <Label htmlFor={props.id}>{t(props.label)}</Label>
            {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]).split(" ").join(""))}</FormFeedback> : ""}
          </FormGroup>
        </>
      ) : props.inputaddon ? (
        <>
          <InputGroup>
            {!props.postprefix && <InputGroupText>{props?.prefixvalue ? props?.prefixvalue : currencySymbol}</InputGroupText>}
            <Input
              disabled={props.disable ? props.disable : false}
              {...fields}
              value={fields?.value ?? ""}
              {...props}
              invalid={Boolean(modifyingValue(fields?.name, touched) && modifyingValue(fields?.name, errors))}
              valid={Boolean(modifyingValue(fields?.name, touched) && !modifyingValue(fields?.name, errors))}
              autoComplete="off"
              readOnly={props.readOnly ? true : false}
              onInput={(e) => {
                if (props.min && props.max) {
                  if (e.target.value > 100) e.target.value = 100;
                  if (e.target.value < 0) e.target.value = 0;
                } else false;
              }}
            />
            {props.postprefix && <InputGroupText>{props.postprefix}</InputGroupText>}
            {modifyingValue(fields?.name, touched) && modifyingValue(fields?.name, errors) ? <FormFeedback>{t(modifyingValue(fields?.name, errors))}</FormFeedback> : ""}
            {props?.errormsg && (
              <ErrorMessage
                name={fields.name}
                render={(msg) => (
                  <div className="invalid-feedback d-block">
                    {t(props.errormsg)} {t("is_required")}
                  </div>
                )}
              />
            )}
          </InputGroup>
          {props?.helpertext && <p className="help-text">{props?.helpertext}</p>}
        </>
      ) : (
        <>
          {props.type == "color" ? (
            <div className="color-box">
              <Input disabled={props.disable ? props.disable : false} {...fields} value={fields?.value ?? ""} {...props} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" />
              {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ""}
              <h6>{fields.value}</h6>
            </div>
          ) : (
            <>
              <Input
                disabled={props.disable ? props.disable : false}
                {...fields}
                value={fields?.value ?? ""}
                {...props}
                invalid={Boolean(modifyingValue(fields?.name, touched) && modifyingValue(fields?.name, errors))}
                valid={Boolean(modifyingValue(fields?.name, touched) && !modifyingValue(fields?.name, errors))}
                autoComplete="off"
                onInput={(e) => {
                  if (props.min && props.max) {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  } else false;
                }}
              />
              {props?.helpertext && <p className="help-text">{props?.helpertext}</p>}
              {modifyingValue(fields?.name, touched) && modifyingValue(fields?.name, errors) ? (
                <FormFeedback className="test">{modifyingValue(fields?.name, errors)}</FormFeedback>
              ) : props?.errormsg ? (
                <ErrorMessage
                  name={fields.name}
                  render={(msg) => (
                    <div className="12 invalid-feedback d-block">
                      {t(props.errormsg)} {t("is_required")}
                    </div>
                  )}
                />
              ) : (
                ""
              )}
              {}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReactstrapFormikInput;
