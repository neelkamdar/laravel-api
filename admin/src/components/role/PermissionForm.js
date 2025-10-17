import Loader from "@/components/commonComponent/Loader";
import FormBtn from "@/elements/buttons/FormBtn";
import request from "@/utils/axiosUtils";
import { YupObject, nameSchema, permissionsSchema } from "@/utils/validation/ValidationSchemas";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import SimpleInputField from "../inputFields/SimpleInputField";
import PermissionsCheckBoxForm from "./widgets/PermissionsCheckBoxForm";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const PermissionForm = ({ mutate, updateId, loading, buttonName }) => {
  const router = useRouter();
  const { t } = useTranslation( 'common');
  const getPermissionsIdsArray = (data) => {
    const { permissions, name, errors } = data;
    return permissions ? { name, permissions: permissions?.map((permissionsData) => permissionsData.id) } : console.log(errors[0]?.message);
  };
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["role/id"], queryFn: () => request({ url: `role/${updateId}` },router), refetchOnMount: false, enabled: false, select: (data) => getPermissionsIdsArray(data?.data) });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  if (updateId && isLoading) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: updateId ? oldData?.name || "" : "",
          permissions: updateId ? oldData?.permissions || [] : [],
        }}
        validationSchema={YupObject({
          name: nameSchema,
          permissions: permissionsSchema,
        })}
        onSubmit={(values) => mutate({ name: values.name, permissions: values.permissions })}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="theme-form theme-form-2 mega-form">
              <SimpleInputField nameList={[{ name: "name", placeholder: t("role_name"), require: 'true' }]} />
            </div>
            <PermissionsCheckBoxForm values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
            <FormBtn loading={loading} buttonName={buttonName}/>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PermissionForm;
