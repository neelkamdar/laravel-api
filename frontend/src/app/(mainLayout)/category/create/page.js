"use client"
import TitleWithDropDown from "@/components/common/TitleWithDropDown";
import CategoryForm from "@/components/category/CategoryForm";
import TreeForm from "@/components/category/TreeForm";
import request from "@/utils/axiosUtils";
import { Category, CategoryExportAPI, CategoryImportAPI } from "@/utils/axiosUtils/API";
import SuccessHandle from "@/utils/customFunctions/SuccessHandle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";

const CategoryCreate = () => {
  const { t } = useTranslation( 'common');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({mutationFn: (data) => request({ url: Category, data, method: "post" }, router),
    onSuccess: (resData) => {
      SuccessHandle(resData, router, `/category/create`, "Category Created Successfully");
      queryClient.invalidateQueries({ queryKey: [`/category/create`] });
    },
  });
  return (
    <>
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <TitleWithDropDown  moduleName="category"   importExport={{ importUrl: CategoryImportAPI, exportUrl: CategoryExportAPI}} />
              <TreeForm type={"product"} isLoading={isLoading} />
            </CardBody>
          </Card>
        </Col>
        <Col xl="8">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("add_category")}</h5>
              </div>
              <CategoryForm loading={isLoading} mutate={mutate} type={"product"} buttonName="save" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoryCreate;

