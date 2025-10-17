import TableWrapper from "../../utils/hoc/TableWrapper";
import ShowTable from "../table/ShowTable";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";

const AllQnATable = ({ data, ...props }) => {
    const [edit, destroy] = usePermissionCheck(["edit", "destroy"], 'question_and_answer');
    const headerObj = {
        checkBox: true,
        isOption: edit == false && destroy == false ? false : true,
        noEdit: true,
        isSerialNo:false,
        optionHead: { title: "action" },
        column: [
            { title: "question", apiKey: "question" },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
            { title: "status", apiKey: "status" }
        ],
        data: data || []
    };
    headerObj.data.filter((element) => element.status = element?.answer ? <div className="status-approved"><span>Replied</span></div> : < div className="status-pending" > <span>Pending</span></div>)
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} keyInPermission={'question_and_answer'} />
    </>
};

export default TableWrapper(AllQnATable);
