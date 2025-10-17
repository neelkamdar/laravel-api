import { HomePage7SettingTitle } from '@/data/TabTitleList';
import FormBtn from '@/elements/buttons/FormBtn';
import TabTitle from '@/components/widgets/TabTitle';
import request from '@/utils/axiosUtils';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import { RecursiveSet } from '@/utils/customFunctions/RecursiveSet';
import useCreate from '@/utils/hooks/useCreate';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from 'reactstrap';
import AllTabsHomePage7 from './AllTabsHomePage7';
import HomePage7InitialValue from './HomePage7InitialValue';
import HomePage7Submit from './HomePage7Submit';
import { useRouter } from 'next/navigation';
import LanguageRedirection from '@/components/commonComponent/LanguageRedirection';

const HomePage7 = ({title}) => {
  
  const { t } = useTranslation( 'common');
  const [activeTab, setActiveTab] = useState("1");
  const refRefetch = useRef()
  const router = useRouter()
    const { data, isLoading, refetch } = useQuery({ queryKey: ['HomePageAPI'], queryFn: () => request({ url: HomePageAPI, params: { slug: 'moscow' } },router),
        refetchOnWindowFocus: false, select: (res) => {
            return res.data
        }
    });
    const { mutate, isLoading: createLoader } = useCreate(`${HomePageAPI}/${data?.id}`, false, false, "Theme Updated Successfully", (resDta) => {
      refRefetch?.current?.call()
  });
  let NewSettingsData = data || {};
  let IncludeList = ['status']
  RecursiveSet({ data: NewSettingsData, IncludeList })

  return (
    <Formik
            enableReinitialize
            initialValues={{
                ...HomePage7InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                HomePage7Submit(values, mutate)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title">
                            <h5>{t(title)}</h5>
                        </div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <LanguageRedirection theme={'/theme'} path={'moscow'} />
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage7SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage7 activeTab={activeTab} values={values} setFieldValue={setFieldValue} isLoading={isLoading} ref={refRefetch} />
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
  )
}

export default HomePage7