"use client";
import TaxForm from "@/components/tax/TaxForm";
import LanguageContext from "@/helper/languageContext";
import { tax } from "@/utils/axiosUtils/API";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";

const TaxUpdate = () => {
  const params = useParams();
  const { t } = useTranslation("common");
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);
  const { mutate, isLoading } = useUpdate(tax, updateId, "/tax", "Tax Updated Successfully");
  return (
    updateId && (
      <Row>
        <Col sm="8" className="m-auto">
          <Card>
            <CardBody>
              <div className="card-header-2">
                <h5>{t("edit_tax")}</h5>
                {lang && <span className="badge title-header-badge">{lang}</span>}
              </div>
              <TaxForm mutate={mutate} updateId={updateId} loading={isLoading} buttonName="update" language={lang} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default TaxUpdate;
