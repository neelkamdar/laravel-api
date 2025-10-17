
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { BrandAPI } from "../../utils/axiosUtils/API";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { mediaConfig } from "@/data/MediaConfig";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";
import { generateSlug } from "@/utils/customFunctions/SlugName";

const BrandForm = ({ mutate, loading, updateId , buttonName, language}) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter()
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: [updateId], queryFn: () => request({ url: BrandAPI + "/" + updateId },router), refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: updateId ? oldData?.data?.name || "" : "",
          slug: updateId ? oldData?.data?.slug || "" : "",
          brand_image_id: updateId ? oldData?.data?.brand_image?.id || "" : "",
          brand_image: updateId ? oldData?.data?.brand_image || "" : "",
          brand_banner_id: updateId ? oldData?.data?.brand_banner?.id || "" : "",
          brand_banner: updateId ? oldData?.data?.brand_banner || "" : "",
          meta_title: updateId ? oldData?.data?.meta_title || "" : "",
          meta_description: updateId ? oldData?.data?.meta_description || "" : "",
          brand_meta_image_id: updateId ? oldData?.data?.brand_meta_image?.id : "",
          brand_meta_image: updateId ? oldData?.data?.brand_meta_image : "",
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        }}
        validationSchema={YupObject({   
          name: nameSchema,
        })}
        onSubmit={(values) => {
            mutate({ ...values, status: Number(values.status) });
        }}>
        {({ values, setFieldValue, errors, touched }) => {
            useEffect(() => {
              if (values.name && !updateId && !values.slug) {
                setFieldValue("slug", generateSlug(values.name));
              }
            }, [values.name, setFieldValue, updateId, values.slug]);
    
          return (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              {updateId && <LanguageRedirection id={updateId} path={'/brand'} language={language} />}
              <SimpleInputField nameList={[
                { name: "name", placeholder: t("enter_name"), require: "true", value: values.name, onChange: (e) => {setFieldValue("name", e.target.value); if (!updateId) { setFieldValue("slug", generateSlug(e.target.value));}},},
                { name: "slug", require: "true", placeholder: t("enter_slug"), value: values.slug, onChange: (e) => setFieldValue("slug", e.target.value)},
              ]}/>
              <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="brand_image_id" title='image' id="brand_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="brand_banner_id" title='banner_image' id="brand_banner_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <SimpleInputField nameList={[{name: "meta_title",title: "meta_title",placeholder: t("enter_meta_title"),},{name: "meta_description",title: "meta_description",type: "textarea", rows:"3",placeholder: t("enter_meta_description"),}]}/>
              <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="brand_meta_image_id" id="brand_meta_image_id" title="meta_image" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} loading={loading}/>
              <CheckBoxField name="status" />
              <FormBtn loading={Number(loading)} buttonName={buttonName}/>
            </Form>
          </>
        )}}
      </Formik>
    </>
  );
};

export default BrandForm;
