import TabTitle from '@/components/widgets/TabTitle';
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "reactstrap";
import { CouponTabTitleListData } from "../../data/TabTitleList";
import request from "../../utils/axiosUtils";
import { dateSubmitValue } from "../../utils/customFunctions/DateFormate";
import { YupObject } from "../../utils/validation/ValidationSchemas";
import CouponTab from "./CouponTab";
import { CouponInitialValues } from "./widgets/CouponInitialValues";
import { CouponValidation } from "./widgets/CouponValidation";
import { useRouter } from 'next/navigation';
import LanguageRedirection from '../commonComponent/LanguageRedirection';

const CouponForm = ({ language, mutate, loading, updateId, title , buttonName}) => {
  
  const { t } = useTranslation( 'common');
  const [activeTab, setActiveTab] = useState("1");
  const router = useRouter()
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({ queryKey: [updateId], queryFn: () => request({ url: `/coupon/${updateId}` },router), enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    if (updateId) {
      refetch()
    }
  }, [updateId]);

  if (updateId && oldDataLoading) return null;
  return (
    <Formik
      initialValues={{ ...CouponInitialValues(updateId, oldData) }}
      validationSchema={YupObject(CouponValidation)}
      onSubmit={(values) => {
        const booleanValues = ["is_expired", "status", "is_unlimited", "is_apply_all", "is_first_order"];
        booleanValues.forEach((item) => (values[item] = Number(values[item])));
        if (values["is_unlimited"]) {
          delete values["usage_per_coupon"];
          delete values["usage_per_customer"];
        } else {
          values["usage_per_coupon"] = Number(values["usage_per_coupon"]);
          values["usage_per_customer"] = Number(values["usage_per_customer"]);
        }
        if (values["is_apply_all"]) {
          delete values["products"];
        } else {
          delete values["exclude_products"];
        }
        values["start_date"] = dateSubmitValue(values["start_date"], true)
        values["end_date"] = dateSubmitValue(values["end_date"], true)
        if (!values["is_expired"]) {
          delete values["start_date"];
          delete values["end_date"];
        }
        if (values["type"] === "free_shipping") {
          delete values["amount"];
        }
        mutate(values);
      }}
    >
      {({ values, setFieldValue, errors, touched ,isSubmitting }) => (
        <Col>
          <Card>
            <div className="title-header option-title">
              <h5>{t(title)}</h5>
              {language && <span className="badge title-header-badge">{language}</span>}
            </div>
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              {updateId && <LanguageRedirection id={updateId} path={'/coupon'} language={language} />}
              <Row>
                <Col xl="3" lg="4">
                  <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={CouponTabTitleListData} errors={errors} touched={touched} />
                </Col>
                <Col xl="7" lg="8">
                  <CouponTab buttonName={buttonName} loading={loading} touched={touched} values={values} activeTab={activeTab} isSubmitting={isSubmitting} setFieldValue={setFieldValue} errors={errors} updateId={updateId} setActiveTab={setActiveTab} />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};
export default CouponForm;