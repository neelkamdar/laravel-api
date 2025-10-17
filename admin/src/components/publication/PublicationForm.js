import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { country, PublicationApi } from "../../utils/axiosUtils/API";
import { YupObject } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { mediaConfig } from "@/data/MediaConfig";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import { PublicationValidation } from "../coupon/widgets/PublicationValidation";
import { generateSlug } from "@/utils/customFunctions/SlugName";

const PublicationForm = ({ mutate, loading, updateId, buttonName, language }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { data: oldData, isLoading, refetch,} = useQuery({ queryKey: [updateId], queryFn: () => request({ url: PublicationApi + "/" + updateId }, router), refetchOnMount: false, enabled: false });
  const { data: countryData, isLoading: isCountryLoad } = useQuery({ queryKey: [country], queryFn: () => request({ url: country }, router), refetchOnWindowFocus: false,select: (res) =>  res.data.map((country) => ({id: country.id, name: country.name, state: country.state,})),});

  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  if (updateId && isLoading && isCountryLoad) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          publisher_name: updateId ? oldData?.data?.publisher_name || "" : "",
          slug: updateId ? oldData?.data?.slug || "" : "",
          description: updateId ? oldData?.data?.description || "" : "",
          publisher_logo_id: updateId ? oldData?.data?.publisher_logo?.id || "" : "",
          publisher_logo: updateId ? oldData?.data?.publisher_logo || "" : "",
          publisher_cover_image_id: updateId ? oldData?.data?.publisher_cover_image?.id || "" : "",
          publisher_cover_image: updateId ? oldData?.data?.publisher_cover_image || "" : "",
          country_id: updateId ? oldData?.data?.country?.id || "" : "",
          country: updateId ? oldData?.data?.country || "" : "",
          state_id: updateId ? oldData?.data?.state?.id || "" : "",
          state: updateId ? oldData?.data?.state || "" : "",
          city: updateId ? oldData?.data?.city || "" : "",
          facebook: updateId ? oldData?.data?.facebook || "" : "",
          twitter: updateId ? oldData?.data?.twitter || "" : "",
          instagram: updateId ? oldData?.data?.instagram || "" : "",
          youtube: updateId ? oldData?.data?.youtube || "" : "",
          pinterest: updateId ? oldData?.data?.pinterest || "" : "",
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        }}
        validationSchema={YupObject(PublicationValidation)}
        onSubmit={(values) => {
          mutate({ ...values, status: Number(values.status) });
        }}
      >
        {({ values, setFieldValue, errors, touched }) => {
            useEffect(() => {
              if (values.publisher_name && !updateId && !values.slug) {
                setFieldValue("slug", generateSlug(values.publisher_name));
              }
            }, [values.publisher_name, setFieldValue, updateId, values.slug]);
    
          return (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              {updateId && <LanguageRedirection id={updateId} path={'/publication'} language={language} />}
              <SimpleInputField
                nameList={[
                  { name: "publisher_name", placeholder: t("enter_name"), require: "true", value: values.publisher_name, onChange: (e) => {setFieldValue("publisher_name", e.target.value); if (!updateId) { setFieldValue("slug", generateSlug(e.target.value));}},},
                  { name: "slug", require: "true", placeholder: t("enter_slug"), value: values.slug, onChange: (e) => setFieldValue("slug", e.target.value)},
                  {
                    name: "description",
                    require: "true",
                    type: "textarea",
                    placeholder: t("enter_description"),
                  },
                ]}
              />
              <FileUploadField
                paramsProps={{ mime_type: mediaConfig.image.join(",") }}
                require= "true"
                name="publisher_logo_id"
                title="image"
                id="publisher_logo_id"
                updateId={updateId}
                type="file"
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <FileUploadField
                paramsProps={{ mime_type: mediaConfig.image.join(",") }}
                name="publisher_cover_image_id"
                title="cover"
                id="publisher_cover_image_id"
                updateId={updateId}
                type="file"
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <SearchableSelectInput
                nameList={[
                  {
                    name: "country_id",
                    require: "true",
                    title: "country",
                    inputprops: {
                      name: "country_id",
                      id: "country_id",
                      options: countryData,
                      defaultOption: "Select state",
                      close: values.country_id !== "" ? true : false,
                    },
                  },
                  {
                    name: "state_id",
                    require: "true",
                    title: "State",
                    inputprops: {
                      name: "state_id",
                      id: "state_id",
                      options: values.country_id
                        ? countryData?.filter(
                            (country) =>
                              Number(country.id) === Number(values.country_id)
                          )?.[0]?.["state"]
                        : [],
                      defaultOption: "Select state",
                      close: values["state_id"] !== "" ? true : false,
                    },
                    disabled: values.country_id ? false : true,
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: "city",
                    placeholder: t("enter_city"),
                    require: "true",
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: "facebook",
                    type: "url",
                    placeholder: t("enter_facebook_url"),
                  },
                  {
                    name: "twitter",
                    type: "url",
                    placeholder: t("enter_twitter_url"),
                  },
                  {
                    name: "instagram",
                    type: "url",
                    placeholder: t("enter_instagram_url"),
                  },
                  {
                    name: "youtube",
                    type: "url",
                    placeholder: t("enter_youtube_url"),
                  },
                  {
                    name: "pinterest",
                    type: "url",
                    placeholder: t("enter_pinterest_url"),
                  },
                ]}
              />
              <CheckBoxField name="status" />
              <FormBtn loading={Number(loading)} buttonName={buttonName} />
            </Form>
          </>
        )}}
      </Formik>
    </>
  );
};

export default PublicationForm;