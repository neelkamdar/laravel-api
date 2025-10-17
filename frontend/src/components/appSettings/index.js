import TabTitle from "@/components/widgets/TabTitle";
import { AppSettingsPageTitle } from "@/data/TabTitleList";
import FormBtn from "@/elements/buttons/FormBtn";
import request from "@/utils/axiosUtils";
import { AppSettingsApi } from "@/utils/axiosUtils/API";
import { RecursiveSet } from "@/utils/customFunctions/RecursiveSet";
import useCreate from "@/utils/hooks/useCreate";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "reactstrap";
import Loader from "../commonComponent/Loader";
import AppSettingHomePage from "./AppSettingHomePage";
import AppSettingsInitialValue from "./AppSettingsInitialValue";
import AppSettingsSubmit from "./AppSettingsSubmit";
import { useRouter } from "next/navigation";
import { RiInformationLine } from "react-icons/ri";

const AppSettingsForm = ({ title }) => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("1");
  const refRefetch = useRef();
  const router = useRouter();
  const { data, isLoading } = useQuery({ queryKey: ["AppSettingsApi"], queryFn: () => request({ url: AppSettingsApi }, router),
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  const { mutate, isLoading: createLoader } = useCreate(
    AppSettingsApi,
    false,
    false,
    false,
    (resDta) => {
      refRefetch?.current?.call();
    }
  );
  let NewSettingsData = data || {};
  let IncludeList = ["status"];
  RecursiveSet({ data: NewSettingsData, IncludeList });

  if (isLoading) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...AppSettingsInitialValue(NewSettingsData),
      }}
      onSubmit={(values) => {
        values["_method"] = "put";
        AppSettingsSubmit(values, mutate);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Col>
          <div className="notice-section">
            <div className="notice-content">
              <div className="icon-box">
                <RiInformationLine />
              </div>
              <div className="notice-box">
                <h4>
                  <b style={{ color: "#ff616f" }}> Mobile app code is an addon you need to purchase separately.</b>
                </h4>
              </div>
            </div>
          </div>
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
                    titleList={AppSettingsPageTitle}
                    errors={errors}
                    touched={touched}
                  />
                </Col>
                <AppSettingHomePage
                  activeTab={activeTab}
                  values={values}
                  setFieldValue={setFieldValue}
                  isLoading={isLoading}
                  ref={refRefetch}
                />
                <FormBtn loading={createLoader} />
              </Row>
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default AppSettingsForm;
