import MultiSelectField from "../../inputFields/MultiSelectField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import { useQuery } from "@tanstack/react-query";
import request from "../../../utils/axiosUtils";
import Loader from "../../commonComponent/Loader";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { blog } from "../../../utils/axiosUtils/API";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const FeatureBlogTab = ({ values, setFieldValue ,noDescription }) => {
    
    const { t } = useTranslation( 'common');
    const sendNameList =[
        { name: `[content][featured_blogs][title]`, placeholder: t("enter_title"), title: "title" }, { name: `[content][featured_blogs][description]`, placeholder: t("enter_description"), title: "Description", type: "textarea" }
    ]
    const router = useRouter()
    
    const { data, isLoading } = useQuery({ queryKey: [blog], queryFn: () => request({ url: blog },router),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <SimpleInputField nameList={noDescription ? [sendNameList[0]] :sendNameList} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='featureBlogSelect' title="blog" data={data} />
            <CheckBoxField name={`[content][featured_blogs][status]`} title="status" />
        </>
    )
}
export default FeatureBlogTab