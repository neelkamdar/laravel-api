import Btn from "@/elements/buttons/Btn";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiFilter3Line } from "react-icons/ri";
import { Form, Input, Label } from "reactstrap";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import CalenderFilter from './CalenderFilter';
import MultipleFilter from "./MultipleFilter";
import TableDeleteOption from "./TableDeleteOption";
import TableDuplicateOption from "./TableDuplicateOption";

const TableTop = (props) => {
  const { differentFilter, setPaginate, showFilterDifferentPlace, setSearch, paginate, url, isCheck, setIsCheck, isReplicate, refetch, dateRange, date, setDate, filterHeader, keyInPermission, advanceFilter, mutate } = props
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"], keyInPermission ? keyInPermission : "");

  const { t } = useTranslation('common');
  const [input, setInput] = useState();
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(true);

  const [text, setText] = useState("");
  const [tc, setTc] = useState(null);
  useEffect(() => {
    setInput(paginate);
  }, [paginate]);

  const onChange = (text) => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setSearch(text), 1000));
  };
  return (
    <>
      <div className="show-box">
        {filterHeader?.noPageDrop !== true && <div className="me-auto">
          <div className="entries-form">
            <Label>
              {t("show")}:
              <select className="form-control" onChange={(e) => setPaginate(e.target.value)}>
                <option>15</option> <option>25</option> <option>50</option> <option>100</option>
              </select>
            </Label>
            <span>{t("items_per_page")}</span>
            {
              destroy && isCheck?.length > 0 &&
              <TableDeleteOption url={url} setIsCheck={setIsCheck} isCheck={isCheck} refetch={refetch} mutate={mutate} />
            }
            {edit && isCheck?.length > 0 && isReplicate && <TableDuplicateOption isReplicate={isReplicate} url={url} isCheck={isCheck} setIsCheck={setIsCheck} refetch={refetch} />}
          </div>

        </div>}
        {dateRange && <CalenderFilter date={date} setDate={setDate} />}
        <div className="d-flex align-items-center gap-2">
          {filterHeader?.noSearch !== true && <div className="role-search">
            <Label htmlFor="role-search" className="form-label"> {t("search")}:</Label>

            <Input type="search" className="form-control" id="role-search" value={text}
              onChange={(e) => { onChange(e.target.value); setText(e.target.value) }} />
          </div>}

          {
            advanceFilter && <div className="top-panel-selection">
              <Btn
                className="align-items-center btn d-flex h-100 btn-outline fs-5 px-3 py-1"
                onClick={() => setShowAdvanceFilter((prev) => !prev)}
              >
                <RiFilter3Line />
              </Btn>
            </div>
          }
        </div>
        {showFilterDifferentPlace && filterHeader?.customFilter}
      </div>
      {differentFilter && differentFilter}
      {showAdvanceFilter ? <MultipleFilter showAdvanceFilter={showAdvanceFilter} advanceFilter={advanceFilter} /> : null}
    </>
  );
};

export default TableTop;
