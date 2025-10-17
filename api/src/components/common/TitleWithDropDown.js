import Pluralize from "@/utils/customFunctions/Pluralize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import ImportExport from "../table/ImportExport";
import Btn from "@/elements/buttons/Btn";

const TitleWithDropDown = ({
  pathName,
  moduleName,
  importExport,
  noDropDown,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation("common");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const router = useRouter();

  return (
    //for DropdownItem there was no Dropdown tag and as it was searching for Dropdown tag , we got the error
<div className="title-header option-title">
  <h5>{t(moduleName)}</h5>
  {!noDropDown && (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        caret
        className="btn-sm btn-outline action-dropdown-button"
        color="transparent"
      >
        {t("action")}
      </DropdownToggle>
      <DropdownMenu end>
        {importExport && (
          <ImportExport
            Dropdown
            importExport={importExport}
            moduleName={Pluralize(moduleName)}
          />
        )}
        {pathName && (
          <DropdownItem onClick={() => router.push(pathName)}>
            {t("create")}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )}
</div>
 
);
};

export default TitleWithDropDown;

//usually occurs when a component (like DropdownItem or some other Bootstrap/reactstrap component) expects to be rendered within a context provider, 
//such as a Dropdown component, and tries to call this.context.toggle()—but that context isn't present.