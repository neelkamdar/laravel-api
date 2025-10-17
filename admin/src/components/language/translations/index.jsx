import Loader from "@/components/commonComponent/Loader";
import NoDataFound from "@/components/commonComponent/NoDataFound";
import SearchableSelectInput from "@/components/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/inputFields/SimpleInputField";
import Pagination from "@/components/table/Pagination";
import Btn from "@/elements/buttons/Btn";
import request from "@/utils/axiosUtils";
import { TranslationAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Input, Row } from "reactstrap";

const TranslationForm = ({ mutate, translationModule, setTranslationModule, page, setPage, loading, languageId }) => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("")
  const [text, setText] = useState("");
  const [tc, setTc] = useState(null);
  const { data: AllTranslationData, refetch, fetchStatus, isLoading: allTranslationCategoryLoading } = useQuery({ queryKey: [TranslationAPI], queryFn: () => request({ url: TranslationAPI }), enabled: true, select: (data) => data?.data });

  const {
    data: MainTranslationData,
    isLoading: mainTranslationLoading,
    error,
    refetch: translationRefetch,
  } = useQuery({
    queryKey: ["TranslationAPI/id", page, translationModule], queryFn: () =>
      request(
        {
          url: `${TranslationAPI}/${translationModule}`,
          params: { pagination: true, page, paginate: 50, search: searchTerm, id: languageId },
        },
        false,
      ), enabled: false, select: (data) => data?.data
  }
  );

  const TranslationData = MainTranslationData?.data;

  useEffect(() => {
    if (translationModule) {
      translationRefetch();
    }
    setPage(1);
  }, [translationModule, translationRefetch, searchTerm]);

  useEffect(() => {
    translationRefetch();
  }, [page, loading]);

  useEffect(() => {
    if (!translationModule && AllTranslationData?.length > 0) {
      setTranslationModule(AllTranslationData[0].slug);
    }
  }, [AllTranslationData, translationModule]);//to set the initial selected file

  if (allTranslationCategoryLoading || mainTranslationLoading) return <Loader />;

  const handleChange = (value) => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setSearchTerm(value), 400));
  };

  return (
    <Row>
      <Col>
        <Card>
          <div className="title-header option-title">
            <h5>{t("translations")}</h5>
          </div>
          <Row>
            <Col>
              <Formik
                enableReinitialize
                initialValues={
                  TranslationData
                    ? Object.keys(TranslationData).reduce((acc, key) => {
                      acc[key] = TranslationData[key] || "";
                      return acc;
                    }, {})
                    : { translation_module: translationModule }
                }
                onSubmit={(values) => {
                  mutate({
                    ...Object.keys(values).reduce((acc, key) => {
                      acc[key] = values[key] || "";
                      return acc;
                    }, {}),
                  });
                }}
              >
                {({ values, setFieldValue, errors }) => {
                  return (
                    <Form className="theme-form theme-form-2 mega-form row">
                      <SearchableSelectInput
                        nameList={[
                          {
                            name: "translation_module",
                            title: "Select File To Be Translated",
                            inputprops: {
                              name: "translation_module",
                              id: "translation_module",
                              options: AllTranslationData || [],
                              value: AllTranslationData?.find((item) => item.name === translationModule),
                              getValuesKey: "name",
                            },
                            getValuesKey: "name",
                            setNewState: (val) => {
                              setTranslationModule(val);
                            },
                          },
                        ]}
                      />
                      <hr />
                      {translationModule ? (
                        <>
                          <div className="common-search">
                            <label htmlFor="transaltion-search" className="form-label"> {t("search")}:</label>
                            <Input type="search" className="form-control" id="transalation-search" value={text}
                              onChange={(e) => { handleChange(e.target.value); setText(e.target.value) }}
                            />
                          </div>
                          {TranslationData && Object.keys(TranslationData)?.map((key) => <SimpleInputField key={key} nameList={[{ name: key, title: key }]} noNameConversation />)}
                          <Pagination current_page={MainTranslationData?.current_page} total={MainTranslationData?.total} per_page={MainTranslationData?.per_page} setPage={setPage} />
                          <Btn className="btn btn-theme ms-auto d-inline-block w-auto" type="submit" title="save" />
                        </>
                      ) : (
                        <NoDataFound noImage={false} title={"Please select file to be translated"} />
                      )}
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default TranslationForm;
