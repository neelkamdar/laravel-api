'use client';
import TitleWithDropDown from '@/components/common/TitleWithDropDown';
import CategoryForm from '@/components/category/CategoryForm';
import TreeForm from '@/components/category/TreeForm';
import request from '@/utils/axiosUtils';
import { Category } from '@/utils/axiosUtils/API';
import SuccessHandle from '@/utils/customFunctions/SuccessHandle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const CreateBlogCategory = () => {
    const { t } = useTranslation( 'common');
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isLoading } = useMutation({mutationFn: (data) => request({ url: Category, data, method: "post" }, router),
        onSuccess: (resData) => {
            SuccessHandle(resData, router, "/blog/category/create", "Category Created Successfully");
            queryClient.invalidateQueries({ queryKey: ["/blog/category/create"] });
        },
    });
    return (
        <Container fluid={true}>
            <Row>
                <Col xl="4">
                    <Card>
                        <CardBody>
                            <TitleWithDropDown noDropDown  moduleName="category"    />
                            <TreeForm type={"post"} isLoading={isLoading} />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="8">
                    <Card>
                        <CardBody>
                            <div className="title-header option-title">
                                <h5>{t("add_category")}</h5>
                            </div>
                            <CategoryForm loading={isLoading} mutate={mutate} type={"post"} buttonName="save"/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateBlogCategory;