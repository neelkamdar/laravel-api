import React, { useEffect, useState } from "react";
import { Col, Label, Input, FormGroup, Row, Button, Container, CardBody, Card } from "reactstrap";
import DynamicTable from "./DynamicTable";
import request from "@/utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";
import { ReportApis, ReportFieldsApi } from "@/utils/axiosUtils/API";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import Loader from "../commonComponent/Loader";

const DynamicReport = () => {
  const [isCheck, setIsCheck] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [showFieldsTable, setShowFieldsTable] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtering, setFiltering] = useState({});
  const router = useRouter();
  const { t } = useTranslation("common");

  const { data: reportOptions } = useQuery(
    { queryKey: [ReportApis],
    queryFn: () => request({ url: ReportApis }, router),
    refetchOnWindowFocus: false, select: (res) => res?.data || [] }
  );

  const handleApiSelection = async (fieldType) => {
    
    setSelectedApi(fieldType);
    setShowFieldsTable([]);
    setFormFields([]);
    setIsLoading(true);

    if (!fieldType) return;

    try {
      const response = await request(
        { url: `${ReportFieldsApi}/${fieldType}` },
        router
      );
      const { show_fields_table, fields } = response?.data;

      const responseReport = await request(
        { url: `${ReportApis}/${fieldType}` },
        router
      );

      const { data } = responseReport?.data || [];
      setTableData(data || []); // Set the processed data for the table
      setShowFieldsTable(show_fields_table || []); // Set the columns for the table
      setFormFields(fields || []);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setTableData([]);
      setShowFieldsTable([]);
      setFormFields([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (values) => {
    if (!selectedApi) return;

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== "")
    );
    setFiltering(filteredValues);

    setIsLoading(true);
    try {
      const queryString = new URLSearchParams(filteredValues).toString();
      const url = `${ReportApis}/${selectedApi}?${queryString}`;
      const response = await request({ url }, router);
      const { data } = response?.data;
      setTableData(data || []);
    } catch (error) {
      console.error("Error filtering report data:", error);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reportOptions?.length > 0 && !selectedApi) {
      const defaultFieldType = reportOptions[0]?.field_type;
      setSelectedApi(defaultFieldType);
      setTimeout(() => handleApiSelection(defaultFieldType), 0);
    }
  }, [reportOptions, selectedApi]);

  return (
    <Row>
      <Col xs="12">
        <Formik
          initialValues={formFields.reduce(
            (acc, field) => ({ ...acc, [field.name]: "" }),
            { field_type: selectedApi ||reportOptions?.[0]?.field_type || ""} 
          )}
          enableReinitialize={true}
          onSubmit={(values) => handleFilter(values)}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form>
              <div className="report-filter-box">
                <Row>
                  <Col xxl="4" md="5">
                    <div className="report-sticky">
                      <Container fluid className="p-0">
                        <Row className="g-0">
                          <Col xs="12">
                            <Card>
                              <CardBody>
                                <div className="title-header">
                                  <div className="d-flex align-items-center">
                                    <h5>{t("reports_filter")}</h5>
                                  </div>
                                </div>
                                <FormGroup>
                                  <Label for="reportDropdown">{t("generate_reports")}</Label>
                                  <Input
                                    type="select"
                                    id="reportDropdown"
                                    value={values.field_type}
                                    onChange={(e) => {
                                      const selectedValue = e.target.value;
                                      setFieldValue("field_type", selectedValue);
                                      handleApiSelection(selectedValue);
                                    }}
                                  >
                                    {reportOptions?.map((option) => (
                                      <option key={option.field_type} value={option.field_type}>
                                        {option.title}
                                      </option>
                                    ))}
                                  </Input>
                                </FormGroup>

                                {formFields.length > 0 && (
                                  <Row>
                                    {formFields.map((field, index) => (
                                      <Col xs="12" key={`${field.name}-${index}`}>
                                        <FormGroup className="datepicker-box">
                                          <Label for={field.name}>{field.label}</Label>
                                          {field.type === "text" && (
                                            <Input
                                              type="text"
                                              name={field.name}
                                              placeholder={field.placeholder}
                                              onChange={(e) =>
                                                setFieldValue(field.name, e.target.value)
                                              }
                                            />
                                          )}
                                          {field.type === "select" && (
                                            <Input
                                              type="select"
                                              name={field.name}
                                              onChange={(e) =>
                                                setFieldValue(field.name, e.target.value)
                                              }
                                            >
                                              <option value="">{field.placeholder}</option>
                                              {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                  {option.label}
                                                </option>
                                              ))}
                                            </Input>
                                          )}
                                          {field.type === "date" && (
                                            <DatePicker
                                              selected={values[field.name] ? new Date(values[field.name]) : null}
                                              onChange={(date) =>
                                                setFieldValue(field.name, date)
                                              }
                                              placeholderText="Select Date"
                                              dateFormat="yyyy-MM-dd"
                                              icon={<CiCalendar /> }
                                              showIcon
                                            />
                                            
                                          )}
                                        </FormGroup>
                                      </Col>
                                    ))}
                                    <Col xs="12">
                                      <Button className="btn btn-theme ms-auto mt-sm-4 mt-2" color="transparent" type="button" onClick={handleSubmit}>
                                        {t("submit")}
                                      </Button>
                                    </Col>
                                  </Row>
                                )}
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Col>

                  <Col xxl="8" md="7">
                    {isLoading || !selectedApi ? (
                      <div className="text-center py-5">
                        <Loader />
                      </div>
                    ) : (
                      <DynamicTable
                        url={`${ReportApis}/${selectedApi}?${new URLSearchParams(filtering).toString()}`}
                        data={tableData}
                        showFieldsTable={showFieldsTable}
                        loading={isLoading}
                        moduleName={selectedApi}
                        isCheck={isCheck}
                        setIsCheck={setIsCheck}
                        filterHeader={{ noSearch: true }}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default DynamicReport;
