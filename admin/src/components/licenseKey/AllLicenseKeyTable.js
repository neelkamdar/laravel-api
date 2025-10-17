import TableWrapper from "../../utils/hoc/TableWrapper";
import ShowTable from "../table/ShowTable";

const AllLicenseKeyTable = ({ data, ...props }) => {
    const headerObj = {
        checkBox: false,
        isOption: false,
        noEdit: true,
        isSerialNo:false,
        optionHead: { title: "action" },
        column: [
            { title: "product", apiKey: "item_name",sorting: false,sortBy: "desc" },
            { title: "license_key", apiKey: "license_key",sorting: true,sortBy: "desc" },
            { title: "purchased_by", apiKey: "purchased_by",subKey: ["name"],sorting: false,sortBy: "desc" },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    headerObj.data.filter((element) => element.status = element?.answer ? <div className="status-approved"><span>Replied</span></div> : < div className="status-pending" > <span>Pending</span></div>)
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} keyInPermission={'license_key'} />
    </>
};

export default TableWrapper(AllLicenseKeyTable);
