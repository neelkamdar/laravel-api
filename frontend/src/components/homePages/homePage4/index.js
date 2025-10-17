import TabTitle from '@/components/widgets/TabTitle';
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { HomePage4SettingTitle } from "../../../data/TabTitleList";
import FormBtn from "../../../elements/buttons/FormBtn";
import request from "../../../utils/axiosUtils";
import { HomePageAPI } from "../../../utils/axiosUtils/API";
import useCreate from "../../../utils/hooks/useCreate";
import Loader from "../../commonComponent/Loader";
import AllTabsHomePage4 from "./AllTabsHomePage4";
import HomePage4InitialValue from './HomePage4InitialValue';
import HomePage4Submit from './HomePage4Submit';

import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import LanguageRedirection from '@/components/commonComponent/LanguageRedirection';

const HomePageFourForm = ({ title }) => {
    
    const { t } = useTranslation( 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const router = useRouter()
    const { data, isLoading } = useQuery({ queryKey: [HomePageAPI], queryFn: () => request({ url: HomePageAPI, params: { slug: 'rome' } },router),
        refetchOnWindowFocus: false, select: (res) => res.data
    });
    const { mutate, isLoading: createLoader } = useCreate(`${HomePageAPI}/${data?.id}`, false, false, "Theme Updated Successfully", (resDta) => {
        refRefetch?.current?.call()
    });
    let IncludeList = ['status']
    let NewSettingsData = data || {};
    const RecursiveSet = ({ data }) => {
        if (data && typeof data == 'object') {
            Object.keys(data).forEach(key => {
                if (data[key] == 0 && IncludeList.includes(key)) {
                    data[key] = false
                } else if (data[key] == 1 && IncludeList.includes(key)) {
                    data[key] = true
                } else {
                    RecursiveSet({ data: data[key] });
                }
            })
        }
    }
    RecursiveSet({ data: NewSettingsData })
    if (isLoading) return <Loader />
    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...HomePage4InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage4Submit(values, mutate)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title">
                            <h5>{t(title)}</h5>
                        </div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <LanguageRedirection theme={'/theme'} path={'rome'} />
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage4SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage4 activeTab={activeTab} values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}
export default HomePageFourForm