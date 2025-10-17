import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import Btn from "../../elements/buttons/Btn";
import { shippingRule } from "../../utils/axiosUtils/API";
import useDelete from "../../utils/hooks/useDelete";
import { YupObject, ifShippingTypeIsFree, nameSchema } from "../../utils/validation/ValidationSchemas";
import CheckBoxField from "../inputFields/CheckBoxField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import DeleteButton from "../table/DeleteButton";


const FormsShippingRuleCreation = ({ rules, mutate, shipping_id, loading, refetch }) => {
  
  const { t } = useTranslation( 'common');
  const { mutate: deleteMutate, isLoading } = useDelete(shippingRule,false ,()=>refetch && refetch());
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: rules?.name || "",
        rule_type: rules?.rule_type || "",
        min: rules?.min || "",
        max: rules?.max || "",
        shipping_type: rules?.shipping_type || "",
        amount: rules?.amount || "",
        status: rules?.status ? Boolean(Number(rules?.status)) : true,
        shipping_id: rules ? shipping_id : shipping_id.create,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        min: nameSchema,
        max: nameSchema,
        shipping_type: nameSchema,
        amount: ifShippingTypeIsFree,
        status: nameSchema,
      })}
      onSubmit={(values) => {
        if (values["shipping_type"] == "free") {
          delete values["amount"];
        }
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <SimpleInputField nameList={[{ name: "name", title: 'name', placeholder: t("enter_name"), require: "true" }, ]} />
            <SearchableSelectInput
                nameList={[
                    {name: "rule_type",title: "rule_type",require: "true", inputprops: {name: "rule_type",id: "rule_type", options: [{ id: "base_on_price", name: "Base On Price" },{ id: "base_on_weight", name: "Base On Weight" }]}}  
                ]}
            />
            <SimpleInputField nameList={[{ name: "min", type: "number", placeholder: t("enter_minimum_value"), require: "true" },{ name: "max", type: "number", placeholder: t("enter_maximum_value"), require: "true" },]} />
            <SearchableSelectInput
                nameList={[
                    {name: "shipping_type",title: "shipping_type",require: "true", inputprops: {name: "shipping_type",id: "shipping_type",options: [{ id: "free", name: "Free" },{ id: "fixed", name: "Fixed" },{ id: "percentage", name: "Percentage" },],},}
                ]}
            />
            {values["shipping_type"] !== "free" && <SimpleInputField nameList={[{ name: "amount", type: "number", placeholder: t("enter_amount"), require: "true" }]} />}
          </Row>
          <div className="dflex-wgap justify-content-end ms-auto mt-0 save-back-button">
            {rules?.id && <DeleteButton id={rules.id} mutate={deleteMutate} noImage={true} loading={isLoading} />}
            <Btn className="btn-primary" type="submit" title="save" loading={Number(loading)} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormsShippingRuleCreation;
