'use client'
import SelectUser from "@/components/wallet/SelectUser";
import SelectWalletPrice from "@/components/wallet/SelectWalletPrice";
import UserTransactionsTable from "@/components/wallet/UserTransactionsTable";
import { PointCredit, PointDebit, PointUserTransactions } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import { YupObject, nameSchema } from "@/utils/validation/ValidationSchemas";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCoinsLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";

const Point = () => {
  const [isValue, setIsValue] = useState("");
  const [credit, debit] = usePermissionCheck(["credit", "debit"]);
  const { t } = useTranslation( 'common');
  const refRefetch = useRef();
  const { mutate: createPointCredit, isLoading: creditLoader } = useCreate(PointCredit, false, "/point", false, () => {
    refRefetch.current.call();
  });
  const { mutate: createPointDebit, isLoading: debitLoader } = useCreate(PointDebit, false, "/point", false, () => {
    refRefetch.current.call();
  });
  return (
    <div className="save-back-button">
      <Formik
        initialValues={{
          consumer_id: "",
          showBalance: "",
          balance: "",
        }}
        validationSchema={YupObject({ consumer_id: nameSchema })}
        onSubmit={(values, { setFieldValue }) => {
          if (isValue == "credit") {
            createPointCredit(values);
          } else {
            createPointDebit(values);
          }
          setFieldValue("balance", "");
        }}
      >
        {({ values, handleSubmit, setFieldValue, errors }) => (
          <>
            <Form>
              <Row>
                <SelectUser title={t("select_customer")} values={values} setFieldValue={setFieldValue} errors={errors} name={"consumer_id"} role="consumer" />
                <SelectWalletPrice values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setIsValue={setIsValue} creditLoader={creditLoader} debitLoader={debitLoader} title={t("point")} description={t("point_balance")} selectUser={"consumer_id"} icon={<RiCoinsLine />} isCredit={credit} isDebit={debit} />
              </Row>
            </Form>
            <Col sm="12"><UserTransactionsTable filterHeader={{customTitle:"transactions"}} pointTable url={PointUserTransactions} moduleName="user_transactions" setFieldValue={setFieldValue} userIdParams={true} ref={refRefetch} dateRange={true} paramsProps={{ consumer_id: values["consumer_id"] ? values["consumer_id"] : null }} /></Col>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Point;