"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import dynamic from "next/dynamic";
import { Category, CategoryExportAPI, CategoryImportAPI } from "@/utils/axiosUtils/API";
import CategoryForm from "@/components/category/CategoryForm";
import TreeForm from "@/components/category/TreeForm";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import useCreate from "@/utils/hooks/useCreate";
import TitleWithDropDown from "@/components/common/TitleWithDropDown";
import { use, useContext, useEffect } from "react";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";

const CategoryUpdate = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const TableTitle = dynamic(() => import("@/components/table/TableTitle"), {
    ssr: false,
  });
  const [edit] = usePermissionCheck(["edit"]);
  const { mutate, isLoading } = useCreate(`${Category}/${updateId}`, false, "/category", "Category Saved Successfully");
  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <TitleWithDropDown pathName="/category" moduleName="category" importExport={{ importUrl: CategoryImportAPI, exportUrl: CategoryExportAPI }} />
                <TreeForm type={"product"} isLoading={isLoading} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card>
              {edit ? (
                <CardBody>
                  <TableTitle moduleName="edit_category" onlyTitle={true} lang={lang} />
                  {updateId && <CategoryForm mutate={mutate} updateId={updateId} loading={isLoading} type={"product"} buttonName="update" language={lang} />}
                </CardBody>
              ) : (
                <h1>No Permission</h1>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoryUpdate;
