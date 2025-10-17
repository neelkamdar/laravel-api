import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Row } from "reactstrap";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import DescriptionInput from "../widgets/DescriptionInput";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const NoticeForm = ({ mutate, updateId, loading, buttonName, language }) => {
  const router = useRouter()
  const { t } = useTranslation( 'common');
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["notice/id"], queryFn: () => request({ url: `notice/${updateId}` },router), refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: updateId ? oldData?.data?.title || "" : "",
        description: updateId ? oldData?.data?.description : "",
        priority: updateId ? oldData?.data?.priority : "",
      }}
      validationSchema={YupObject({ title: nameSchema ,description:nameSchema })}
      onSubmit={(values) => mutate(values)}>
      {({values,setFieldValue}) => (
        <Form className="theme-form theme-form-2 mega-form">
          {updateId && <LanguageRedirection id={updateId} path={'/notice'} language={language} />}
          <Row>
            <SimpleInputField nameList={[{ name: "title", placeholder: t("enter_title"), require: "true" }, ]} />
            <DescriptionInput values={values} setFieldValue={setFieldValue} title={t('description')} nameKey="description" errorMessage={"Descriptionisrequired"} />
            <SearchableSelectInput
        nameList={[
          {
            name: "priority",
            title: "priority",
            require: "true",
            inputprops: {
              name: "priority",
              id: "priority",
              options: [
                { id: "high", name: "High" },
                { id: "low", name: "Low" },
              ],
              close: true
            },
          },
        ]}
      />
            <FormBtn loading={loading} buttonName={buttonName}/>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default NoticeForm;
