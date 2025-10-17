"use client";
import useCreate from "@/utils/hooks/useCreate";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiLockLine } from "react-icons/ri";
import { Card, CardBody, Col, Row } from "reactstrap";
import TableTitle from "../table/TableTitle";
import FrontMenuForm from "./FrontMenuForm";
import MenuForm from "./MenuForm";
import { Menu } from "@/utils/axiosUtils/API";

const FrontMenuCreate = () => {
  const { t } = useTranslation("common");
  const [create] = usePermissionCheck(["create"]);
  const refRefetch = useRef();
  const [resetData, setResetData] = useState(false);
  const { mutate, isLoading } = useCreate(Menu, false, false, false, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refRefetch?.current?.call()
      setResetData(true)
    }
  });

  return <>
    <div className="card-spacing">
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <TableTitle moduleName="menu" type={'product'} onlyTitle={true} />
              <FrontMenuForm  isLoading={isLoading} ref={refRefetch} />
            </CardBody>
          </Card>
        </Col>
        <Col xl="8">
          <Card className={create ? "" : "nopermission-parent"}>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("add_menu")}</h5>
              </div>
              <MenuForm loading={isLoading} mutate={mutate} key={resetData}  />
            </CardBody>
            <div className="no-permission"><div><RiLockLine /><h3>{t("permissions_is_required")}</h3></div></div>
          </Card>
        </Col>
      </Row>
    </div>
  </>;
};

export default FrontMenuCreate;