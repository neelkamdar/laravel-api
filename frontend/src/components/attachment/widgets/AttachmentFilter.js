import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";

const AttachmentFilter = ({ setSearch, setSorting, search, sorting }) => {
    
    const { t } = useTranslation( 'common');
    const [tc, setTc] = useState(null);
    const [text, setText] = useState("");
    //  Debouncing function for filtering image by its name
    const onChange = (text) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setSearch(text), 1000));
    };
    //  Image Sorting 
    const onSortingChange = (value) => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setSorting(value), 1000));
    };
    return (
        <div className="select-top-panel">
            <div>
                <Input type="search" className="form-control" value={text ?? search ?? ""}
                    placeholder={t("search_your_files")}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setText(e.target.value);
                    }}
                />
            </div>
            <select className="form-select" value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
                <option value={""} >{t("sort_by_desc")}</option>
                <option value={"newest"}>{t("sort_by_newest")}</option>
                <option value={"oldest"}>{t("sort_by_oldest")}</option>
                <option value={"smallest"}>{t("sort_by_smallest")}</option>
                <option value={"largest"}>{t("sort_by_largest")}</option>
            </select>
        </div>
    );
};

export default AttachmentFilter;