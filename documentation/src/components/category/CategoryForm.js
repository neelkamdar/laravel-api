import React, { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import request from "../../utils/axiosUtils";
import { nameSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import SimpleInputField from "../inputFields/SimpleInputField";
import FileUploadField from "../inputFields/FileUploadField";
import FormBtn from "../../elements/buttons/FormBtn";
import CheckBoxField from "../inputFields/CheckBoxField";
import MultiSelectField from "../inputFields/MultiSelectField";
import Loader from "../commonComponent/Loader";
import CategoryContext from "../../helper/categoryContext";

import { useTranslation } from "react-i18next";
import { mediaConfig } from "@/data/MediaConfig";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";
import { ZoneApi } from "@/utils/axiosUtils/API";
import { generateSlug } from "@/utils/customFunctions/SlugName";
import SettingContext from "@/helper/settingContext";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";

const CategoryForm = ({ mutate, updateId, loading, type, buttonName, language }) => {
  const { t } = useTranslation("common");
  const { categoryState } = useContext(CategoryContext);
  const { state } = useContext(SettingContext)
  const router = useRouter();
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["category/" + updateId], queryFn: () => request({ url: `category/${updateId}` }, router), enabled: false });
  const { data: zoneData} = useQuery({ queryKey: [ZoneApi],  queryFn: () => request({ url: ZoneApi}, router), refetchOnWindowFocus: false, select: (res) =>  res?.data?.data?.map((elem) => { return { name: elem.name, id: elem.id };}),});
  
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  const updatedData = useMemo(() => {
    return categoryState;
  }, [categoryState]);

  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        slug: updateId ? oldData?.data?.slug || "" : "",
        description: updateId ? oldData?.data?.description || "" : "",
        category_image_id: updateId ? oldData?.data?.category_image?.id : "",
        meta_title: updateId ? oldData?.data?.meta_title || "" : "",
        meta_description: updateId ? oldData?.data?.meta_description || "" : "",
        category_meta_image_id: updateId ? oldData?.data?.category_meta_image?.id : "",
        category_meta_image: updateId ? oldData?.data?.category_meta_image : "",
        category_icon_id: updateId ? oldData?.data?.category_icon?.id : "",
        category_image: updateId ? oldData?.data?.category_image : "",
        category_icon: updateId ? oldData?.data?.category_icon : "",
        commission_rate: updateId ? oldData?.data?.commission_rate : "",
        type: type,
        is_allow_all_zone: updateId ? Boolean(Number(oldData?.data?.is_allow_all_zone)) : true,
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        parent_id: updateId ? Number(oldData?.data?.parent_id) || undefined : undefined,
        zone_ids: updateId ? oldData?.data?.zone_ids || [] : [],
        exclude_zone_ids: [],
      }}
      validationSchema={YupObject({
        name: nameSchema,
      })}
      onSubmit={(values, helpers) => {
        values.status = Number(values.status);
        if (!values["parent_id"]) {
          values["parent_id"] = null;
        }
        if (!values["is_allow_all_zone"]) {
          values["exclude_zone_ids"] = null;
        } else {
          values.zone_ids = null;
        }
        delete values["category_image"];
        delete values["category_icon"];
        values["type"] = type;
        if (updateId) values["_method"] = "put";

        mutate(updateId ? { ...values, id: updateId } : values);
      }}
    >
      {({ setFieldValue, values, errors }) => {
        useEffect(() => {
          if (values.name && !updateId && !values.slug) {
            setFieldValue("slug", generateSlug(values.name));
          }
        }, [values.name, setFieldValue, updateId, values.slug]);
        
      return (
        <Form className="theme-form theme-form-2 mega-form">
          {updateId && <LanguageRedirection id={updateId} path={'/category'} language={language} />}
          <Row>
            <SimpleInputField
              nameList={[
                {
                  name: "name",
                  title: "name",
                  placeholder: t("enter_category_name"),
                  require: "true",
                  value: values.name, onChange: (e) => {setFieldValue("name", e.target.value); if (!updateId) { setFieldValue("slug", generateSlug(e.target.value));}},
                },
                { name: "slug", require: "true", placeholder: t("enter_slug"), value: values.slug, onChange: (e) => setFieldValue("slug", e.target.value)}, 
                {
                  name: "description",
                  type: "textarea",
                  rows: "3",
                  placeholder: t("enter_category_description"),
                },
              ]}
            />
            {state?.zone_enable && (
              <> 
                <CheckBoxField name="is_allow_all_zone" title="allow_all_zone" />
                {values?.['is_allow_all_zone'] ? 
                <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="exclude_zone_ids" title="exclude_zones" data={zoneData} />
                :
                <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="zone_ids" title="zones" data={zoneData} />
                }
              </>
            )}
            {type == "product" && <SimpleInputField nameList={[{ name: "commission_rate", title: "commission_rate", postprefix: "%", inputaddon: "true", placeholder: t("enter_commission_rate"), min: "0", max: "100", type: "number", helpertext: "*Define the percentage of earnings retained as commission." }]} />}
            <SearchableSelectInput
              nameList={[
                {
                  name: "parent_id",
                  title: "select_parent",
                  inputprops: {
                    name: "parent_id",
                    id: "parent_id",
                    options: updatedData || [],
                    close: true,
                  },
                },
              ]}
            />
            <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="category_image_id" id="category_image_id" title="image" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} loading={loading} />
            <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="category_icon_id" id="category_icon_id" title="icon" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} loading={loading} />
            <SimpleInputField
              nameList={[
                { name: "meta_title", title: "meta_title", placeholder: t("enter_meta_title") },
                { name: "meta_description", title: "meta_description", type: "textarea", rows: "3", placeholder: t("enter_meta_description") },
              ]}
            />
            <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="category_meta_image_id" id="category_meta_image_id" title="image" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} loading={loading} />
            <CheckBoxField name="status" />
            <FormBtn loading={loading} buttonName={buttonName} />
          </Row>
        </Form>
      )}}
    </Formik>
  );
};
export default CategoryForm;
