'use client'
import AllRefundTable from "@/components/refund/AllRefundTable";
import { RefundAPI } from "@/utils/axiosUtils/API";
import { Col } from "reactstrap";

const Refund = () => {
    return (
        <Col sm="12">
            <AllRefundTable onlyTitle={true} url={RefundAPI} moduleName="refund" />
        </Col>
    );
}

export default Refund