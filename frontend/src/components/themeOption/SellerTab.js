import TabTitle from '@/components/widgets/TabTitle';
import Image from "next/image";
import { useState } from "react";
import { Input, Label, Row, TabContent, TabPane } from "reactstrap";
import { SellerAboutStore, SellerDashboardTitles, SellerDetailsStore } from "../../data/TabTitleList";
import AboutSeller from "./sellerDashboard/AboutSeller";
import Selling from "./sellerDashboard/Selling";
import ServiceSeller from "./sellerDashboard/ServiceSeller";
import StepTab from "./sellerDashboard/StepTab";
import { useTranslation } from "react-i18next";
import FileUploadField from '../inputFields/FileUploadField';
import { getHelperText } from '@/utils/customFunctions/getHelperText';

const SellerTab = ({ values, setFieldValue, errors, touched }) => {
    const [activeTab, setActiveTab] = useState("1");
    
    const { t } = useTranslation( 'common');
    return (
        <div className="inside-horizontal-tabs">
            <div className='selection-layout mb-4 radio-type-sec'>
                <h4 className='fw-semibold w-100'>{t("store_layout")}</h4>
                <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
                    {SellerAboutStore.map((elem, i) => (
                        <div key={i} onClick={() => setFieldValue("[options][seller][store_layout]", elem?.value)}>
                            <div className="selection-box text-center">
                                <Input name={'store_layout'} type="radio" id={elem?.value} checked={values['options']?.['seller']?.['store_layout'] == elem.value ? true : false} onChange={()=> handleClick("[options][seller][store_layout]")} />
                                <Label htmlFor={elem?.value}>
                                    <div>
                                        <Image src={elem.img} className="img-fluid" alt={elem?.title || ""} width={165} height={100} />
                                    </div>
                                    <h4 className="mt-2">{t(elem.title)}</h4>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
            <div className='selection-layout mb-4 radio-type-sec'>
                <h4 className='fw-semibold w-100'>{t("store_details")}</h4>
                <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
                    {SellerDetailsStore.map((elem, i) => (
                        <div key={i} onClick={() => setFieldValue("[options][seller][store_details]", elem?.value)}>
                            <div className="selection-box text-center">
                                <Input name={'store_details'} type="radio" id={elem.value} defaultChecked={values['options']?.['seller']?.['store_details'] == elem.value ? true : false} />
                                <Label htmlFor={elem.value}>
                                    <div>
                                        <Image src={elem.img} className="img-fluid" alt={elem?.title || ""} width={165} height={100} />
                                    </div>
                                    <h4 className="mt-2">{t(elem.title)}</h4>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
    
            <FileUploadField name="banner_image_url" title='image' id="banner_image_url" showImage={values['banner_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={SellerDashboardTitles} errors={errors} touched={touched} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <AboutSeller values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="2">
                    <ServiceSeller values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="3">
                    <StepTab values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="4">
                    <Selling values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default SellerTab