import TableWrapper from '../../utils/hoc/TableWrapper';
import ShowTable from '../table/ShowTable';
import usePermissionCheck from '../../utils/hooks/usePermissionCheck';

const AllCurrency = ({ data, ...props }) => {
    const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
    const headerObj = {
        checkBox: true,
        isOption: edit == false && destroy == false ? false : true,
        noEdit: edit ? false : true,
        isSerialNo:false,
        optionHead: { title: "action" },
        column: [
            { title: "code", apiKey: "code", sorting: true, sortBy: "desc" },
            { title: "symbol", apiKey: "symbol", sorting: true, sortBy: "desc" },
            { title: "exchange_rate", apiKey: "exchange_rate", sorting: true, sortBy: "desc" },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
            { title: "status", apiKey: "status", type: "switch" }
        ],
        data: data || []
    };
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllCurrency)