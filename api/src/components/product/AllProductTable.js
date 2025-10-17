import { useContext,useEffect } from "react";
import { Approved, product } from "../../utils/axiosUtils/API";
import TableWrapper from "../../utils/hoc/TableWrapper";
import ShowTable from "../table/ShowTable";
import Loader from "../commonComponent/Loader";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import AccountContext from "../../helper/accountContext";

import { useTranslation } from "react-i18next";
import SettingContext from "@/helper/settingContext";

const AllProductTable = ({ data, ...props }) => {
  
  const { t } = useTranslation( 'common');
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const { role, setRole } = useContext(AccountContext) 
  const { settingObj } = useContext(SettingContext); 
  const language = settingObj?.general?.default_language?.locale
  
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, [])
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    isSerialNo: false,
    optionHead: { title: "action",show:"product",  type: 'download',modalTitle: t("download") },
    column: [
      { title: "image", apiKey: "product_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "sku", apiKey: "sku", sorting: true, sortBy: "desc" },
      { title: "price", apiKey: "sale_price", sorting: true, sortBy: "desc", type: 'price' },
      { title: "stock", apiKey: "stock_status", type: 'stock_status' },
      { title: "store_name", apiKey: "store", subKey: ["store_name"] },
      { title: "approved", apiKey: "is_approved", type: 'switch', url: `${product}${Approved}` },
      { title: "status", apiKey: "status", type: 'switch' }
    ],
    data: data || []
  };
  headerObj.data.map((element) => element.sale_price = element?.sale_price)

  let pro = headerObj?.column?.filter((elem) => {
    return role == 'vendor' ? elem.title !== 'Approved' : elem;
  });
  headerObj.column = headerObj ? pro : [];
  if (!data) return <Loader />;
  
  return <>
    <ShowTable {...props} headerData={headerObj} lang={language} />
  </>
};

export default TableWrapper(AllProductTable);
