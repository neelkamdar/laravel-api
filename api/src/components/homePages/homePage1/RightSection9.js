import { useQuery } from '@tanstack/react-query'
import { RiArrowDownLine } from 'react-icons/ri'
import request from '../../../utils/axiosUtils'
import { blog } from '../../../utils/axiosUtils/API'
import Loader from '../../commonComponent/Loader'
import CheckBoxField from '../../inputFields/CheckBoxField'
import MultiSelectField from '../../inputFields/MultiSelectField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"
import { useRouter } from 'next/navigation'

const RightSection9 = ({ values, setFieldValue, active, setActive }) => {
    
    const { t } = useTranslation( 'common');
    const router = useRouter()   
    const { data, isLoading } = useQuery({ queryKey: [blog], queryFn: () => request({ url: blog },router),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem?.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(10)}>{values['content']?.['main_content']['section9_featured_blogs']['title']}<RiArrowDownLine />
            </div>
            {active == 10 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section9_featured_blogs][title]`, placeholder: t("enter_title"), title: "title" },
                        { name: `[content][main_content][section9_featured_blogs][sub_title]`, placeholder: t("enter_sub_title"), title: "sub_title" }
                    ]} />
                    <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainRightContentBlog' title="blog" data={data} />
                    <CheckBoxField name="[content][main_content][section9_featured_blogs][status]" title="status" />
                </div>
            )}
        </div>
    )
}

export default RightSection9