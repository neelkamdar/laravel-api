import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { AuthorApi, country } from "../../utils/axiosUtils/API";
import { YupObject } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { mediaConfig } from "@/data/MediaConfig";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";
import { AuthorValidation } from "../coupon/widgets/AuthorValidation";
import { Col, Label, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import { generateSlug } from "@/utils/customFunctions/SlugName";

const AuthorForm = ({ mutate, loading, updateId , buttonName, language}) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter()
  
  const [birthDate, setBirthDate] = useState(new Date("1800-01-01"));
  const [deathDate, setDeathDate] = useState(null);

  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: [updateId], queryFn: () => request({ url: AuthorApi + "/" + updateId },router), refetchOnMount: false, enabled: false });
  const { data: countryData, isLoading: isCountryLoad } = useQuery({ queryKey: [country], queryFn: () => request({ url: country },router), refetchOnWindowFocus: false, select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })) });
 
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  useEffect(() => {
    if (updateId && oldData?.data) {
      setBirthDate(new Date(oldData.data.birth_date || "1800-01-01"));
      setDeathDate(oldData.data.death_date ? new Date(oldData.data.death_date) : null);
    }
  }, [oldData]);
 
  if (updateId && isLoading && isCountryLoad) return <Loader />
 
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          author_name: updateId ? oldData?.data?.author_name || "" : "",
          slug: updateId ? oldData?.data?.slug || "" : "",
          bio: updateId ? oldData?.data?.bio || "" : "",
          author_image_id: updateId ? oldData?.data?.author_image?.id || "" : "",
          author_image: updateId ? oldData?.data?.author_image || "" : "",
          author_cover_image_id: updateId ? oldData?.data?.author_cover_image?.id || "" : "",
          author_cover_image: updateId ? oldData?.data?.author_cover_image || "" : "",
          country_id: updateId ? oldData?.data?.country?.id || "" : "",
          country: updateId ? oldData?.data?.country || "" : "",
          state_id: updateId ? oldData?.data?.state?.id || "" : "",
          state: updateId ? oldData?.data?.state || "" : "",
          city: updateId ? oldData?.data?.city || "" : "",
          birth_date: birthDate,
          death_date: deathDate,
          languages: updateId ? oldData?.data?.languages || "" : "",
          facebook: updateId ? oldData?.data?.facebook || "" : "",
          twitter: updateId ? oldData?.data?.twitter || "" : "",
          instagram: updateId ? oldData?.data?.instagram || "" : "",
          youtube: updateId ? oldData?.data?.youtube || "" : "",
          pinterest: updateId ? oldData?.data?.pinterest || "" : "",
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        }}
        validationSchema={YupObject(AuthorValidation)}
        onSubmit={(values) => {
            mutate({ ...values, status: Number(values.status) });
        }}>
        {({ values, setFieldValue, errors, touched }) => {
          useEffect(() => {
            if (values.author_name && !updateId && !values.slug) {
              setFieldValue("slug", generateSlug(values.author_name));
            }
          }, [values.author_name, setFieldValue, updateId, values.slug]);
  
        return (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              {updateId && <LanguageRedirection id={updateId} path={'/author'} language={language} />}
              <SimpleInputField nameList={[
                { name: "author_name", placeholder: t("enter_name"), require: "true", value: values.author_name, onChange: (e) => {setFieldValue("author_name", e.target.value); if (!updateId) { setFieldValue("slug", generateSlug(e.target.value));}},},
                { name: "slug", require: "true", placeholder: t("enter_slug"), value: values.slug, onChange: (e) => setFieldValue("slug", e.target.value)},
                { name: "bio",require: "true", type: 'textarea', placeholder: t("enter_bio") }
              ]} />
              <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="author_image_id" require= "true" title={t('image')} id="author_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="author_cover_image_id" title={t('cover')} id="author_cover_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
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
                      close: (values.country_id !== '') ? true : false
                    },
                  },
                  {
                    name: "state_id",
                    require: "true",
                    title: "State",
                    inputprops: {
                      name: "state_id",
                      id: "state_id",
                      options: values.country_id ? countryData?.filter((country) => Number(country.id) === Number(values.country_id))?.[0]?.["state"] : [],
                      defaultOption: "Select state",
                      close: values['state_id'] !== '' ? true : false
                    },
                    disabled: values.country_id ? false : true,
                  },
                ]}
              />
              <SimpleInputField nameList={[{ name: "city", placeholder: t("enter_city"), require: "true" }]} />
              <Row className="mb-4 align-items-center">
                <Col sm={2}>
                <Label className="col-form-label form-label-title">{t("birth_date")}</Label>
                </Col>
                <Col sm={10}>
                <div className="report-filter-box">
                  <div className="datepicker-box">
                  <DatePicker
                    selected={birthDate}
                    onChange={(date) => {
                    setBirthDate(date);
                    setFieldValue("birth_date", date);
                    // Reset death date if it's earlier than birthdate
                    if (deathDate && date > deathDate) setDeathDate(null);
                    }}
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={300}
                    minDate={new Date("1800-01-01")}
                    maxDate={new Date()}
                  />
                  </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-4 align-items-center">
                <Col sm={2}>
                    <Label className="col-form-label form-label-title">{t("death_date")}</Label>
                </Col>
                <Col sm={10}>
                <div className="report-filter-box">
                  <div className="datepicker-box">
                    <DatePicker
                      selected={deathDate}
                      onChange={(date) => {
                          setDeathDate(date);
                          setFieldValue("death_date", date);
                      }}
                      dateFormat="yyyy-MM-dd"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={300}
                      minDate={birthDate} // Death date must be after birthdate
                      maxDate={new Date()} // Death date cannot be after today
                    />
                  </div>
                  </div>
                </Col>
              </Row>
              <SimpleInputField nameList={[
                { name: "languages", placeholder: t("enter_languages")},
                { name: "facebook", type: "url", placeholder: t("enter_facebook_url") },
                { name: "twitter", type: "url", placeholder: t("enter_twitter_url") },
                { name: "instagram", type: "url", placeholder: t("enter_instagram_url") },
                { name: "youtube", type: "url", placeholder: t("enter_youtube_url") },
                { name: "pinterest", type: "url", placeholder: t("enter_pinterest_url") },
              ]} />
              <CheckBoxField name="status" />
              <FormBtn loading={Number(loading)} buttonName={buttonName}/>
            </Form>
          </>
        )}}
      </Formik>
    </>
  );
};

export default AuthorForm;
