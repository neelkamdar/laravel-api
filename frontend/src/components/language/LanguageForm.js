import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { AllLanguageApi } from "../../utils/axiosUtils/API";
import { YupObject } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import { LanguageInitialValue } from "./widgets/LanguageInitialValue";
import { LanguageValidationSchema } from "./widgets/LanguageValidationSchema";

const LanguageForm = ({ mutate, updateId, loading, buttonName, extraFunc }) => {
  
  const Select2Data = [
      { name: "English (En)", id: "en" },
      { name: "Arabic (Ar)", id: "ar" },
      { name: "Spanish (Es)", id: "es" },
      { name: "French (Fr)", id: "fr" },
      { name: "German (De)", id: "de" },
      { name: "Chinese Simplified (Zh-CN)", id: "zh-CN" },
      { name: "Chinese Traditional (Zh-TW)", id: "zh-TW" },
      { name: "Japanese (Ja)", id: "ja" },
      { name: "Korean (Ko)", id: "ko" },
      { name: "Russian (Ru)", id: "ru" },
      { name: "Portuguese (Pt)", id: "pt" },
      { name: "Italian (It)", id: "it" },
      { name: "Dutch (Nl)", id: "nl" },
      { name: "Swedish (Sv)", id: "sv" },
      { name: "Norwegian (No)", id: "no" },
      { name: "Danish (Da)", id: "da" },
      { name: "Finnish (Fi)", id: "fi" },
      { name: "Turkish (Tr)", id: "tr" },
      { name: "Greek (El)", id: "el" },
      { name: "Hebrew (He)", id: "he" },
      { name: "Hindi (Hi)", id: "hi" },
      { name: "Thai (Th)", id: "th" },
      { name: "Polish (Pl)", id: "pl" },
      { name: "Bengali (Bn)", id: "bn" },
      { name: "Vietnamese (Vi)", id: "vi" },
      { name: "Ukrainian (Uk)", id: "uk" },
      { name: "Czech (Cs)", id: "cs" },
      { name: "Hungarian (Hu)", id: "hu" },
      { name: "Indonesian (Id)", id: "id" },
      { name: "Malay (Ms)", id: "ms" },
      { name: "Filipino (Fil)", id: "fil" },
      { name: "Swahili (Sw)", id: "sw" },
      { name: "Zulu (Zu)", id: "zu" },
      { name: "Amharic (Am)", id: "am" },
      { name: "Afrikaans (Af)", id: "af" },
      { name: "Punjabi (Pa)", id: "pa" },
      { name: "Tamil (Ta)", id: "ta" },
      { name: "Telugu (Te)", id: "te" },
      { name: "Urdu (Ur)", id: "ur" },
      { name: "Gujarati (Gu)", id: "gu" },
      { name: "Marathi (Mr)", id: "mr" },
      { name: "Kannada (Kn)", id: "kn" },
      { name: "Malayalam (Ml)", id: "ml" },
      { name: "Sinhalese (Si)", id: "si" },
      { name: "Hausa (Ha)", id: "ha" },
      { name: "Yoruba (Yo)", id: "yo" },
      { name: "Igbo (Ig)", id: "ig" },
      { name: "Pashto (Ps)", id: "ps" },
      { name: "Mongolian (Mn)", id: "mn" },
      { name: "Lao (Lo)", id: "lo" },
      { name: "Khmer (Km)", id: "km" },
      { name: "Serbian (Sr)", id: "sr" },
      { name: "Croatian (Hr)", id: "hr" },
      { name: "Bosnian (Bs)", id: "bs" },
      { name: "Slovak (Sk)", id: "sk" },
      { name: "Slovenian (Sl)", id: "sl" },
      { name: "Bulgarian (Bg)", id: "bg" },
      { name: "Romanian (Ro)", id: "ro" },
      { name: "Latvian (Lv)", id: "lv" },
      { name: "Lithuanian (Lt)", id: "lt" },
      { name: "Estonian (Et)", id: "et" },
      { name: "Icelandic (Is)", id: "is" },
      { name: "Macedonian (Mk)", id: "mk" },
      { name: "Georgian (Ka)", id: "ka" },
      { name: "Armenian (Hy)", id: "hy" },
      { name: "Albanian (Sq)", id: "sq" }
  ];
  
  // { id: '971', name: '+971', data: { class: 'ae', code: '+971' } },

  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    data: oldData,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["language/id"], queryFn: () => request({ url: AllLanguageApi + "/" + updateId }, router),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data?.data,
  });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ ...LanguageInitialValue(updateId, oldData) }}
        validationSchema={YupObject({
          ...LanguageValidationSchema,
        })}
        onSubmit={(values, { setSubmitting }) => {
          values["status"] = Number(values["status"]);
          mutate(values, {
            onSuccess: () => {
              extraFunc?.(); // ✅ trigger update (like header dropdown reload)
              setSubmitting(false);
            },
            onError: () => setSubmitting(false),
          });
        }}
      >
        {({ values }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              <div>
                <SimpleInputField nameList={[{ name: "name", title: "name", placeholder: t("enter_language_name"), require: "true", type: "text" }]} />
              </div>
              <SearchableSelectInput
                nameList={[
                  {
                    name: "locale",
                    require: "true",
                    title: "Locale",
                    inputprops: {
                      name: "locale",
                      id: "locale",
                      options: Select2Data,
                      close: values["locale"] !== "" ? true : false,
                    },
                  },
                ]}
              />
              <CheckBoxField name="is_rtl" title="rtl" />
              <CheckBoxField name="status" />
              <FormBtn loading={loading} buttonName={buttonName} />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LanguageForm;
