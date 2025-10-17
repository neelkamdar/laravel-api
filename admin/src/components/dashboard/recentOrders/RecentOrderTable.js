import { Col, Row } from "reactstrap";
import { OrderAPI } from "../../../utils/axiosUtils/API";
import RecentOrders from "./RecentOrders";
import { Form, Formik } from "formik";
import TopSellingProduct from "./TopSellingProduct";
import { checkPermission } from "@/components/common/checkPermissionList";

const RecentOrderTable = () => {
  return (
    <Row className="theme-form dashboard-form">
      {checkPermission("product.index") && (
        <Col xl={5} md={6} className="">
          <Formik initialValues={{ filter_by: "" }}>
            {({ values, setFieldValue }) => (
              <Form>
                <TopSellingProduct values={values} setFieldValue={setFieldValue}/>
              </Form>
            )}
          </Formik>
        </Col>
      )}
      {checkPermission("order.index") && (
        <Col xl={7} md={6}>
          <RecentOrders
            url={OrderAPI}
            moduleName={"recent_orders"}
            paramsProps={{ paginate: 7 }}
            filterHeader={{
              noPagination: true,
              noSearch: true,
              noPageDrop: true,
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default RecentOrderTable;
