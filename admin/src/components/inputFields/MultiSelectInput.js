import { ErrorMessage } from "formik";
import { RiCloseLine } from "react-icons/ri";
import { handleModifier } from "../../utils/validation/ModifiedErrorMessage";
import { useTranslation } from "react-i18next";

const MultiSelectInput = ({
  values,
  name,
  selectedItems,
  setIsComponentVisible,
  setFieldValue,
  setSelectedItems,
  errors,
  getValuesKey,
  initialTittle,
  data,
}) => {
  const { t } = useTranslation("common");
  const RemoveSelectedItem = (id, item) => {
    let temp = values[name];
    if (temp.length > 0) {
      if (Array.isArray(temp)) {
        temp?.splice(temp.indexOf(id), 1);
        setFieldValue(name, temp);
      } else {
        setFieldValue(
          name,
          item[getValuesKey] == values[name] ? undefined : item[getValuesKey]
        );
      }
    } else if (temp == id) {
      setFieldValue(name, undefined);
    }
  };

  // 🔍 Helper: recursively extract all IDs from data
  const getAllIds = (items) => {
    let ids = [];
    items?.forEach((item) => {
      if (item[getValuesKey]) ids.push(item[getValuesKey]);
      if (item.subcategories?.length)
        ids = ids.concat(getAllIds(item.subcategories));
      if (item.child?.length) ids = ids.concat(getAllIds(item.child));
    });
    return ids;
  };

  // ✅ Check if all visible options are selected
  const isAllSelected = () => {
    const allIds = getAllIds(data || []);
    const selected = Array.isArray(values?.[name]) ? values[name] : [];

    return (
      allIds.length > 0 &&
      allIds.every(
        (id) => selected.includes(id) || selected.some((obj) => obj?.id === id)
      )
    );
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    setFieldValue(name, []);
    setSelectedItems([]);
  };

  return (
    <>
      <div
        className={`bootstrap-tagsinput form-select`}
        onClick={() => setIsComponentVisible((p) => p !== name && name)}
      >
        {isAllSelected() ? (
          <span className="tag label label-info">
            {t("all_selected")}
            <a className="ms-2 text-white" onClick={handleClearAll}>
              <RiCloseLine />
            </a>
          </span>
        ) : (Array.isArray(values[name]) &&
            values[name].length > 0 &&
            selectedItems?.length > 0) ||
          (!Array.isArray(values[name]) && values[name]) ? (
          selectedItems?.map((item, i) => (
            <span className="tag label label-info" key={i}>
              {item.name || item.title}
              <a className="ms-2 text-white">
                <RiCloseLine
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveSelectedItem(item[getValuesKey], item);
                    setSelectedItems((p) =>
                      p.filter(
                        (elem) => elem[getValuesKey] !== item[getValuesKey]
                      )
                    );
                    setFieldValue(
                      name,
                      Array.isArray(values[name])
                        ? values[name].filter(
                            (elem) => elem[getValuesKey] !== item[getValuesKey]
                          )
                        : undefined
                    );
                  }}
                />
              </a>
            </span>
          ))
        ) : (
          <span>{t(initialTittle ? initialTittle : "Select")}</span>
        )}
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div className="invalid-feedback d-block">
            {t(handleModifier(name))} {t("is_required")}
          </div>
        )}
      />
    </>
  );
};

export default MultiSelectInput;
