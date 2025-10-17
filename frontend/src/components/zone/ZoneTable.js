import TableWrapper from "@/utils/hoc/TableWrapper";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import React, { useContext } from "react";
import ShowTable from "../table/ShowTable";
import SettingContext from "@/helper/settingContext";

const ZoneTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const { settingObj } = useContext(SettingContext); 
  const language = settingObj?.general?.default_language?.locale

  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "action" },
    column: [
      { title: "name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "status", apiKey: "status", type: "switch" },
      {
        title: "created_at",
        apiKey: "created_at",
        sorting: true,
        sortBy: "desc",
        type: "date",
      },
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

export default TableWrapper(ZoneTable);
