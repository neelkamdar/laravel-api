"use client";
import React, { useContext, useState } from "react";
import { Col } from "reactstrap";
import { Notice } from "@/utils/axiosUtils/API";
import AllNoticeTable from "@/components/notice";
import AccountContext from "@/helper/accountContext";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { checkPermission } from "@/components/common/checkPermissionList";
import ShowNotice from "@/components/notice/ShowNotice";

const NoticeRead = () => {
  const [isCheck, setIsCheck] = useState([]);
  const { accountData } = useContext(AccountContext);
  const role = accountData?.role?.name;

  return (
    <>
      {role === "admin" ? (
        <Col sm="12">
          <AllNoticeTable
            url={Notice}
            moduleName="notice"
            isCheck={isCheck}
            setIsCheck={setIsCheck}
          />
        </Col>
      ) : (
        !checkPermission(["notice.create", "notice.destroy"]) && (
          <FormWrapper title="notice">
            <ShowNotice />
          </FormWrapper>
        )
      )}
    </>
  );
};

export default NoticeRead;
