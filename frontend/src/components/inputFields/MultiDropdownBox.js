import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import CategoryOptions from "./CategoryOptions";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap"

const MultiDropdownBox = ({  setIsComponentVisible, data, setFieldValue, values, name, getValuesKey, isComponentVisible }) => {
  const { t } = useTranslation('common');
  const [path, setPath] = useState([]);
  const [showList, setShowList] = useState([]);
  useEffect(() => {
    if (data) { setShowList(data) }
    if (isComponentVisible == false) { setPath([]) }
  }, [data, isComponentVisible])
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    if (item && item["title"] && item["title"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    item["subcategories"]?.length && item["subcategories"].forEach((child) => {
      if (hasValue(child, term)) {
        valueToReturn = true
      }
    })
    item["child"]?.length && item["child"].forEach((child) => {
      if (hasValue(child, term)) {
        valueToReturn = true
      }
    })
    return valueToReturn
  }
  const handleChange = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const updatedData = []
      data?.forEach(item => { hasValue(item, keyword) && updatedData.push(item) })
      setShowList(updatedData)
    } else {
      setShowList(data)
    }
  }

  const getAllIds = (items) => {
  let ids = [];

  items?.forEach((item) => {
    if (item[getValuesKey]) {
      ids.push(item[getValuesKey]);
    }

    if (item.subcategories?.length) {
      ids = ids.concat(getAllIds(item.subcategories));
    }

    if (item.child?.length) {
      ids = ids.concat(getAllIds(item.child));
    }
  });

  return ids;
};

  return (
    <div className={`select-category-box ${isComponentVisible == name && data ? 'show' : ""}`}>
      {data?.length > 5 && <Input placeholder="Search Here ..." className="search-input" onChange={handleChange} />}
      {showList.length > 0 ?
        <>
          <div className="select-all-checkbox mb-2">
            <label>
              <input
                type="checkbox"
                checked={
                  Array.isArray(values?.[name]) &&
                  getAllIds(showList).every((id) => values[name].includes(id))
                }
                onChange={(e) => {
                  const allIds = getAllIds(showList);
                  if (e.target.checked) {
                    const newValue = Array.isArray(values?.[name])
                      ? Array.from(new Set([...values[name], ...allIds]))
                      : allIds;
                    setFieldValue(name, newValue);
                  } else {
                    const filtered = Array.isArray(values?.[name])
                      ? values[name].filter((id) => !allIds.includes(id))
                      : [];
                    setFieldValue(name, filtered);
                  }
                }}
              />{" "}
              Select All
            </label>
          </div>
          <div className="category-content">
            <nav className="category-breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item" onClick={() => { setPath([]); setShowList(data); }}>
                  <a>{t("all")}</a>
                </li>
                {path.map((item, key) => (
                  <li className={`breadcrumb-item ${key + 1 === path.length ? "active" : ""}`} key={key}>
                    <a
                      onClick={() => {
                        setShowList(item.subcategories ?? item.child );
                        setPath((p) => p.slice(0, key + 1));
                      }}>
                      {item.name || item.title}
                    </a>
                  </li>
                ))}
              </ol>
              <a
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setPath([]);
                  setIsComponentVisible(false); 
                }}>
                <RiCloseLine />
              </a>
            </nav>
            <div className="category-lisitng">
              <ul>{showList && <CategoryOptions data={data} level={0} showList={showList} setShowList={setShowList} setFieldValue={setFieldValue} path={path} setPath={setPath} setIsComponentVisible={setIsComponentVisible} name={name} values={values} getValuesKey={getValuesKey} />}</ul>
            </div>
          </div>
        </> : t("no_data_found")}
    </div>
  );
};

export default MultiDropdownBox;
