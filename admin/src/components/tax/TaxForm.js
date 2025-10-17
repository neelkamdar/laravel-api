import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { tax } from "../../utils/axiosUtils/API";
import { YupObject, nameSchema, roleIdSchema } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const TaxForm = ({ mutate, updateId, loading , buttonName, language}) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: [updateId], queryFn: () => request({ url: tax + "/" + updateId },router), refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  
  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        rate: updateId ? oldData?.data?.rate || "" : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        rate: roleIdSchema,
      })}
      onSubmit={(values) => {
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          {updateId && <LanguageRedirection id={updateId} path={'/tax'} language={language} />}
          <SimpleInputField nameList={[{ name: "name", placeholder: t("enter_tax_title"), require: "true" }, { name: "rate", type: "number", placeholder: t("enter_rate"), require: "true", inputaddon: "true", postprefix: "%", min: "0", max: "100", step:"0.01" }]} />
          <CheckBoxField name="status" />
          <FormBtn loading={loading} buttonName={buttonName}/>
        </Form>
      )}
    </Formik>
  );
};

export default TaxForm;
