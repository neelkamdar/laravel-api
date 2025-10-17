"use client"
import Btn from "@/elements/buttons/Btn";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import AccessDenied from '../../../public/assets/svg/404.svg';        

const NotFoundPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter()
  return (
    <section className="error-section section-lg-space">
      <Container fluid={true}>
        <Row>
          <Col xl={6} lg={7} className="m-auto">
            <div className="error-content">
              <img src={AccessDenied} className="img-fluid" alt="AccessDenied" />
              <h2>{t("access_denied")}</h2>
              <h3 className="text-content">{t("access_denied_text")}</h3>
              <Btn onClick={() => router.back()} color="" className="btn btn-animation mt-4 mx-auto btn-lg">{t("back_to_page")}</Btn>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default NotFoundPage