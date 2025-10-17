import React, { useContext } from "react";
import TableWrapper from "../../utils/hoc/TableWrapper";
import ShowTable from "../table/ShowTable";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import SettingContext from "@/helper/settingContext";

const AllPagesTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const { settingObj } = useContext(SettingContext);
  const language = settingObj?.general?.default_language?.locale;

  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    isSerialNo: false,
    noEdit: edit ? false : true,
    optionHead: { title: "action" },
    column: [
      { title: "title", apiKey: "title", sorting: true, sortBy: "desc" },
      {
        title: "created_at",
        apiKey: "created_at",
        sorting: true,
        sortBy: "desc",
        type: "date",
      },
      { title: "status", apiKey: "status", type: "switch" },
    ],
    data: data || [],
  };
  if (!data) return null;
  return (
    <>
      <ShowTable {...props} headerData={headerObj} lang={language} />
    </>
  );
};

export default TableWrapper(AllPagesTable);
