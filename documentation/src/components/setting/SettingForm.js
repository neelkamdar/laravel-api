import * as Yup from "yup";
import TabTitle from "@/components/widgets/TabTitle";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { SettingTabTitleListData } from "../../data/TabTitleList";
import Btn from "../../elements/buttons/Btn";
import request from "../../utils/axiosUtils";
import { AllLanguageApi, setting } from "../../utils/axiosUtils/API";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import {
  YupObject,
  emailSchema,
  nameSchema,
} from "../../utils/validation/ValidationSchemas";
import AllTabs from "./AllTabs";
import { dateSubmitValue } from "@/utils/customFunctions/DateFormate";
import { useTranslation } from "react-i18next";
import LanguageContext from "@/helper/languageContext";

const SettingForm = ({ mutate, loading, title }) => {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();
  const [edit] = usePermissionCheck(["edit"]);
  const { localLanguage, setLocalLanguage,setFormLanguage } = useContext(LanguageContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, refetch } = useQuery(
    {
      queryKey: [setting],
      queryFn: () => request({ url: setting }, router),
      enabled: false,
      refetchOnWindowFocus: false,
      select: (res) => res.data,
    },
    onsubmit
  );

  const { data: allLanguages } = useQuery({
    queryKey: ["newLang"],
    queryFn: () => request({ url: AllLanguageApi }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });

  let IncludeList = [
    "status",
    "coupon_enable",
    "point_enable",
    "product_auto_approve",
    "stock_product_hide",
    "wallet_enable",
    "same_day_delivery",
    "is_category_based_commission",
    "multivendor",
    "sandbox_mode",
    "store_auto_approve",
    "maintenance_mode",
    "zone_enable",
    "new_vendor_notification_mail",
    "order_confirmation_mail",
    "order_status_update_mail",
    "password_reset_mail",
    "pending_order_alert_mail",
    "refund_request_mail",
    "refund_status_update_mail",
    "signup_welcome_mail",
    "system_test_mail",
    "visitor_inquiry_mail",
    "withdrawal_request_mail",
    "withdrawal_status_update_mail",
  ];

  const RecursiveSet = ({ data }) => {
    if (data && typeof data == "object") {
      Object.keys(data).forEach((key) => {
        if (data[key] == 0 && IncludeList.includes(key)) {
          data[key] = false;
        } else if (data[key] == 1 && IncludeList.includes(key)) {
          data[key] = true;
        } else {
          RecursiveSet({ data: data[key] });
        }
      });
    }
  };

  useEffect(() => {
    refetch()
      .then((res) => {
        const general = res?.data?.values?.general;

        // Apply mode
        if (general?.mode === "dark-only") {
          document.body.classList.add("dark-only");
        } else {
          document.body.classList.remove("dark-only");
        }

        // Apply language direction
        if (general?.default_language.is_rtl === 1) {
          document.documentElement.dir = "rtl";
        } else {
          document.documentElement.dir = "ltr";
        }

        // Optional: sync language with context/localStorage
        if (localLanguage && general?.default_language) {
          const newLanguage = general.default_language.locale || localLanguage;
          const storedLanguage =
            window.localStorage.getItem("selectedLanguage") || "";
          if (newLanguage !== storedLanguage) {
            // You can update or set local language here if needed
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, [localLanguage, refetch, setLocalLanguage, i18n]);

  let NewSettingsData = data?.values || {};
  RecursiveSet({ data: NewSettingsData });
  if (!data) return null;

  const validationSchema = YupObject({
    email: Yup.string().when("submitButtonClicked", {
      is: true,
      then: emailSchema,
      otherwise: Yup.string().notRequired(),
    }),
    values: YupObject({
      general: YupObject({ site_title: nameSchema }),
    }),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        submitButtonClicked: false,
        email: "",
        start_date: NewSettingsData
          ? NewSettingsData?.start_date || new Date()
          : new Date(),
        end_date: NewSettingsData
          ? NewSettingsData?.end_date || new Date()
          : new Date(),
        media_disk: NewSettingsData?.media_configuration?.media_disk || "local",
        light_logo_image: NewSettingsData?.general?.light_logo_image || "",
        light_logo_image_id:
          NewSettingsData?.general?.light_logo_image_id || "",
        dark_logo_image: NewSettingsData?.general?.dark_logo_image || "",
        dark_logo_image_id: NewSettingsData?.general?.dark_logo_image_id || "",
        tiny_logo_image: NewSettingsData?.general?.tiny_logo_image || "",
        tiny_logo_image_id: NewSettingsData?.general?.tiny_logo_image_id || "",
        favicon_image: NewSettingsData?.general?.favicon_image || "",
        favicon_image_id: NewSettingsData?.general?.favicon_image_id || "",
        values: NewSettingsData || {},
        default_timezone:
          NewSettingsData?.general?.default_timezone || "Asia/Kolkata",
        mail_mailer: NewSettingsData?.email?.mail_mailer || "smtp",
        maintenance_image:
          NewSettingsData?.maintenance?.maintenance_image || "",
        maintenance_image_id:
          NewSettingsData?.maintenance?.maintenance_image_id || "",
        mail_encryption: NewSettingsData?.email?.mail_encryption || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setIsSubmitting(true);
        values["_method"] = "put";
        values["values"]["maintenance"]["start_date"] = dateSubmitValue(
          values["start_date"]
        );
        values["values"]["maintenance"]["end_date"] = dateSubmitValue(
          values["end_date"]
        );
        values["values"]["general"]["default_timezone"] =
          values["default_timezone"];
        values["values"]["email"]["mail_mailer"] = values["mail_mailer"];
        values["values"]["email"]["mail_encryption"] =
          values["mail_encryption"];
        values["values"]["general"]["light_logo_image_id"] = values[
          "light_logo_image_id"
        ]
          ? values["light_logo_image_id"]
          : "";
        values["values"]["general"]["favicon_image_id"] = values[
          "favicon_image_id"
        ]
          ? values["favicon_image_id"]
          : "";
        values["values"]["general"]["dark_logo_image_id"] = values[
          "dark_logo_image_id"
        ]
          ? values["dark_logo_image_id"]
          : "";
        values["values"]["general"]["tiny_logo_image_id"] = values[
          "tiny_logo_image_id"
        ]
          ? values["tiny_logo_image_id"]
          : "";
        values["values"]["maintenance"]["maintenance_image_id"] = values[
          "maintenance_image_id"
        ]
          ? values["maintenance_image_id"]
          : "";
        values["values"]["general"]["default_language"] = localLanguage || "en";
        delete values?.values?.general?.light_logo_image;
        delete values?.values?.general?.dark_logo_image;
        delete values?.values?.general?.tiny_logo_image;
        delete values?.values?.general?.favicon_image;
        delete values?.values?.general?.default_currency;
        delete values?.values?.maintenance?.maintenance_image;
        // mutation.mutate(values);
        mutate(values, {
          onSuccess: () => {
            const selectedLangId = values?.values?.general?.default_language_id;
            const selectedLang = allLanguages?.find(
              (lang) => lang.id === selectedLangId
            );

            if (selectedLang?.locale) {
              setLocalLanguage(selectedLang.locale);
              setFormLanguage(selectedLang.locale);
              i18n.changeLanguage(selectedLang.locale);
              window.localStorage.setItem( "selectedLanguage", selectedLang.locale );
              Cookies.set("i18next", selectedLang.locale);
              router.refresh();
            }

            setIsSubmitting(false);
            setSubmitting(false);
          },
          onError: () => {
            setIsSubmitting(false);
            setSubmitting(false); // Formik internal state
          },
        });
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Col>
          <Card>
            <div className="title-header option-title">
              <h5>{t(title)}</h5>
            </div>
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              <Row>
                <Col xl="3" lg="4">
                  <TabTitle
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    titleList={SettingTabTitleListData}
                    errors={errors}
                    touched={touched}
                  />
                </Col>
                <AllTabs
                  values={values}
                  activeTab={activeTab}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />
                <div className="ms-auto justify-content-end dflex-wgap mt-4 save-back-button">
                  <Btn
                    className="me-2 btn-outline btn-lg"
                    title="back"
                    onClick={() => router.back()}
                  />
                  {edit && (
                    <Btn
                      className="btn-primary btn-lg"
                      type="submit"
                      title="save"
                      loading={isSubmitting}
                    />
                  )}
                </div>
              </Row>
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default SettingForm;
