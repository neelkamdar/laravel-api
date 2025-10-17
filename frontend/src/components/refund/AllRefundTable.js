import { RefundAPI } from '../../utils/axiosUtils/API';
import TableWrapper from '../../utils/hoc/TableWrapper';
import Loader from '../commonComponent/Loader';
import ShowTable from '../table/ShowTable';
import { useTranslation } from "react-i18next";

const AllRefundTable = ({ data, ...props }) => {
    
    const { t } = useTranslation( 'common');
    const headerObj = {
        checkBox: false, isOption: true, noEdit: true, isSerial: true,    isSerialNo:false,

        optionHead: { title: "action", type: 'View', url: RefundAPI, message: "Refund Status Updated Successfully", showModalData: data, modalTitle: t("refund"), permissionKey: "refund" },
        column: [
            { title: "order_number", apiKey: "order_id" },
            { title: "consumer_name", apiKey: "consumer_name", sorting: true, sortBy: "desc" },
            { title: "reason", apiKey: "reason" },
            { title: "status", apiKey: "refund_status" },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    let refunds = headerObj?.data?.filter((element) => {
        element.consumer_name = element?.user?.name
        element.order_id = <span className="fw-bolder">#{element?.order?.order_number}</span>
        element.refund_status = element.status ? <div className={`status-${element.status}`}><span>{element.status.replace(/_/g, " ")}</span></div> : '-';
        return element;
    });
    headerObj.data = headerObj ? refunds : [];
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllRefundTable);