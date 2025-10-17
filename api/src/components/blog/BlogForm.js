import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { Category, blog, tag } from "../../utils/axiosUtils/API";
import { getHelperText } from '../../utils/customFunctions/getHelperText';
import { YupObject, dropDownScheme, nameSchema } from "../../utils/validation/ValidationSchemas";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import MultiSelectField from "../inputFields/MultiSelectField";
import SimpleInputField from "../inputFields/SimpleInputField";
import DescriptionInput from "../widgets/DescriptionInput";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";
import { generateSlug } from "@/utils/customFunctions/SlugName";
import * as Yup from "yup";

const BlogForm = ({ mutate, loading, updateId , buttonName, language}) => {
  
  const { t } = useTranslation( 'common');
  const router =useRouter()
  const { data } = useQuery({ queryKey: [Category], queryFn: () => request({ url: Category, params: { type: "post" } },router), refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: tagData } = useQuery({ queryKey: [tag], queryFn: () => request({ url: tag, params: { type: "post" } },router), refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({ queryKey: [blog + "/" + updateId], queryFn: () => request({ url: `${blog}/${updateId}` },router), enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && oldDataLoading) return null;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: updateId ? oldData?.data?.title || "" : "",
          slug: updateId ? oldData?.data?.slug || "" : "",
          description: updateId ? oldData?.data?.description || "" : "",
          content: updateId ? oldData?.data?.content || "" : "",
          meta_title: updateId ? oldData?.data?.meta_title || "" : "",
          meta_description: updateId ? oldData?.data?.meta_description || "" : "",
          blog_meta_image_id: updateId ? oldData?.data?.blog_meta_image?.id || "" : "",
          blog_meta_image: updateId ? oldData?.data?.blog_meta_image || "" : "",
          blog_thumbnail_id: updateId ? oldData?.data?.blog_thumbnail?.id || "" : undefined,
          blog_thumbnail: updateId ? oldData?.data?.blog_thumbnail || "" : "",
          categories: updateId ? oldData?.data?.categories.map((item) => item.id) || [] : [],
          tags: updateId ? oldData?.data?.tags.map((item) => item.id) || [] : [],
          is_featured: updateId ? Boolean(Number(oldData?.data?.is_featured)) : true,
          is_sticky: updateId ? Boolean(Number(oldData?.data?.is_sticky)) : true,
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
          is_all_categories: updateId ? Boolean(Number(oldData?.data?.is_all_categories)) : true,
          is_all_tags: updateId ? Boolean(Number(oldData?.data?.is_all_tags)) : true,
        }}
        validationSchema={YupObject({
          title: nameSchema,
          blog_thumbnail_id: nameSchema,
          categories: Yup.array().when("is_all_categories", {
            is: false,
            then: dropDownScheme.required("categories is required"),
            otherwise: Yup.array().notRequired(),
          }),
        })}
        onSubmit={(values) => {
          if (updateId) {
            values["_method"] = "put";
          }
          values.is_featured = Number(values.is_featured);
          values.is_sticky = Number(values.is_sticky);
          values.status = Number(values.status);
          if (values['blog_thumbnail_id'] == undefined) values['blog_thumbnail_id'] = null
          mutate(values);
        }}>
        {({ values, setFieldValue, errors, touched }) => {
            useEffect(() => {
                if (values.title && !updateId && !values.slug) {
                setFieldValue("slug", generateSlug(values.title));
                }
            }, [values.title, setFieldValue, updateId, values.slug]);
    
        return (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              {updateId && <LanguageRedirection id={updateId} path={'/blog'} language={language} />}
              <SimpleInputField nameList={[
                { name: "title", placeholder: t("enter_blog_title"), require: "true", value: values.title, onChange: (e) => {setFieldValue("title", e.target.value); if (!updateId) { setFieldValue("slug", generateSlug(e.target.value));}},},
                { name: "slug", require: "true", placeholder: t("enter_slug"), value: values.slug, onChange: (e) => setFieldValue("slug", e.target.value)},
                ]} />
              <SimpleInputField nameList={[{ name: "description", placeholder: t("enter_blog_description") }]} />
              <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
              <FileUploadField name="blog_thumbnail_id" title='thumbnail' require='true' id="blog_thumbnail_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} helpertext={getHelperText("1500x700px")} />
              <CheckBoxField name="is_all_categories" title="categories" helpertext="*Enabling this option allows the backend to auto select all categories for display." />
                {!values["is_all_categories"] && (
                  <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="categories" require="true" data={data} />
                )}
              <CheckBoxField name="is_all_tags" title="tags" helpertext="*Enabling this option allows the backend to auto select all tags for display." />
                {!values["is_all_tags"] && (
                    <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="tags" data={tagData} />
                )}
              <CheckBoxField name="is_featured" title="featured" />
              <CheckBoxField name="is_sticky" title="sticky" />
              <SimpleInputField nameList={[{ name: "meta_title", placeholder: t("enter_meta_title") }, { name: "meta_description", placeholder: t("enter_meta_description"), type: 'textarea' }]} />
              <FileUploadField name="blog_meta_image_id" title='meta_image' id="blog_meta_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <CheckBoxField name="status" />
              <FormBtn loading={Number(loading)} buttonName={buttonName} />
            </Form>
          </>
        )}}
      </Formik>
    </>
  );
};

export default BlogForm;
