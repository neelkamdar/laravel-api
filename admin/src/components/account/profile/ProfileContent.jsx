import CustomHeading from "@/components/common/CustomHeading";
import Image from "next/image";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import dashboardProfile from "../../../../public/assets/images/inner-page/dashboard-profile.png";
import { LeafSVG } from "@/components/common/CommonSVG";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

const ProfileContent = () => {
  const { t } = useTranslation("common");
  return (
    <div className="dashboard-profile">
      <CustomHeading title={"MyProfile"} svgUrl={<LeafSVG className="icon-width bg-gray" />} svgClass="bg-gray" />
      <div className="dashboard-bg-box">
        <Row>
          <Col xxl={7}>
            <div className="dashboard-title mb-3">
              <h3>{t("profile_about")}</h3>
            </div>
            <Form>
              <FormGroup floating>
                <Input id="exampleEmail" name="email" placeholder={t("enter_email_address")} type="email" />
                <Label htmlFor="exampleEmail">{t("email")}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id="examplePassword" name="password" placeholder={t("enter_password")} type="password" />
                <Label htmlFor="examplePassword">{t("password")}</Label>
              </FormGroup>
            </Form>

            <div className="dashboard-title mb-3">
              <h3>{t("change_password")}</h3>
            </div>
            <Form>
              <FormGroup floating>
                <Input id="currentPassword" name="currentPassword" placeholder={t("enter_email_address")} type="password" />
                <Label htmlFor="currentPassword">{t("current_password")}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id="newPassword" name="newPassword" placeholder={t("enter_new_password")} type="password" />
                <Label htmlFor="newPassword">{t("new_password")}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id="confirmPassword" name="confirmPassword" placeholder={t("enter_confirm_password")} type="password" />
                <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
              </FormGroup>
            </Form>
          </Col>

          <Col xxl={5}>
            <div className="profile-image">{dashboardProfile && <Image src={dashboardProfile} className="img-fluid " alt="dashboard-profile" height={428} width={428} />}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileContent;
