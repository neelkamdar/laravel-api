import { useTranslation } from "react-i18next";
import { WithdrawRequestAPI } from '../../utils/axiosUtils/API';
import TableWrapper from '../../utils/hoc/TableWrapper';
import Loader from '../commonComponent/Loader';
import ShowTable from '../table/ShowTable';

const AllWithdrawRequestTable = ({ data, ...props }) => {
    
    const { t } = useTranslation( 'common');
    const headerObj = {
        checkBox: false,
        isOption: true,
        isSerialNo:false,
        optionHead: { title: "action", type: 'View', url: WithdrawRequestAPI, message: "Withdraw Status Updated Successfully", showModalData: data, modalTitle: t("withdrawal"), permissionKey: "withdraw_request" },
        column: [
            { title: "consumer_name", apiKey: "vendor_name" },
            { title: "amount", apiKey: "amount", type: 'price' },
            { title: "status", apiKey: "withdrawal_status" },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    let withdrawals = headerObj?.data?.filter((element) => {
        element.vendor_name = element?.user?.name
        element.withdrawal_status = element.status ? <div className={`status-${element.status}`}><span>{element.status}</span></div> : '-'
        return element;
    });
    headerObj.data = withdrawals ? withdrawals : []

    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllWithdrawRequestTable)