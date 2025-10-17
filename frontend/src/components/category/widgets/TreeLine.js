import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Options from "../../table/Options";
import SettingContext from "@/helper/settingContext";
import { RiArrowDownSLine } from "react-icons/ri";

const TreeLine = ({ data, level, active, setActive, type, mutate, loading }) => {
  const router = useRouter();
  const { settingObj } = useContext(SettingContext); 
  const language = settingObj?.general?.default_language?.locale;

  if (!data) return null;
  return (
    <ul>
      {data.map((item, i) => {
        const hasChildren = item.subcategories && item.subcategories.length > 0;
        return (
          <li
            key={i}
            className={hasChildren ? "inside-ul" : ""}
            style={{
              color: router?.query?.updateId == item.id ? "#0da487" : "",
            }}
          >
            <div
              className={`${item.status == 0 ? "disabled" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) {
                  let temp = active;
                  active.includes(item.id)
                    ? temp.splice(active.indexOf(item.id), 1)
                    : (temp = [...active, item.id]);
                  setActive([...temp]);
                }
              }}
            >
              {hasChildren && (
                <RiArrowDownSLine className="file-icon ms-0" />
              )}
              {/* {item.id} */}
              {item.name}
              <div className="tree-options">
                <Options
                  fullObj={item}
                  mutate={mutate}
                  type={type}
                  loading={loading}
                  keyInPermission={"category"}
                  lang={language}
                />
              </div>
            </div>
            {hasChildren && (
              <div className={active.includes(item.id) ? "d-block" : "d-none"}>
                <TreeLine
                  data={item.subcategories}
                  level={level + 1}
                  active={active}
                  setActive={setActive}
                  mutate={mutate}
                  type={type}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TreeLine;
