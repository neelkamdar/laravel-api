import TableWrapper from "../../utils/hoc/TableWrapper";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import ShowTable from "../table/ShowTable";

const AllLanguagesTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "action" },
    column: [
      { title: "name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "Locale", apiKey: "locale", sorting: true, sortBy: "desc" },
      { title: "status", apiKey: "status", type: "switch" },
    ],
    data: data || [],
  };
  if (!data) return null;

  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};

export default TableWrapper(AllLanguagesTable);
