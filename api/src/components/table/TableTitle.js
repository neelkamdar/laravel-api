
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";

import { FiPlus } from "react-icons/fi";
import Btn from "../../elements/buttons/Btn";
import Pluralize from "../../utils/customFunctions/Pluralize";
import NoSsr from "../../utils/hoc/NoSsr";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import ImportExport from "./ImportExport";



const TableTitle = ({lang, fullObj, moduleName, onlyTitle, type, filterHeader, importExport, refetch, exportButton ,showFilterDifferentPlace }) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const pathname = usePathname();
  const [create] = usePermissionCheck(["create"]);
  return (
    <div className="title-header option-title">
      <h5>{filterHeader?.customTitle ? t(filterHeader?.customTitle) : t(Pluralize(moduleName))}</h5>
      {lang && <span className="badge title-header-badge">{lang}</span>}
      {importExport && <ImportExport importExport={importExport} moduleName={Pluralize(moduleName)} refetch={refetch} exportButton={exportButton}/>}
      <NoSsr>
        {(filterHeader?.customFilter && !showFilterDifferentPlace) && filterHeader?.customFilter}
        {create && !onlyTitle && (
          <Btn className="align-items-center btn-theme add-button" title={t("add") + " " + t(moduleName)} onClick={() =>
            type == "post" && ['tag', 'blog/tag'].includes(moduleName.toLowerCase())
              ?
              router.push(`/${pathname.split("/")[1]}/tag/create`)
              :
              type == 'post'
                ?
                router.push(`/${pathname.split("/")[1]}/category/create`)
                :
                router.push(`/${pathname.split("/")[1]}/create`)
          }>
            <FiPlus />
          </Btn>
        )}
      </NoSsr>
    </div>
  );
};

export default TableTitle;
