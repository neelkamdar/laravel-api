"use client";
import PermissionForm from "@/components/role/PermissionForm";
import { role } from "@/utils/axiosUtils/API";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";

const UserUpdate = () => {
  const params = useParams();
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useUpdate(role, params?.updateId, `/role`, "Role Updated Successfully");
  return (
    params?.updateId && (
      <Row>
        <Col xxl="8" lg="10" className="m-auto">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("edit_role")}</h5>
              </div>
              <PermissionForm mutate={mutate} updateId={params?.updateId} loading={isLoading} buttonName="update" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default UserUpdate;
