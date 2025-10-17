import TabTitle from '@/components/widgets/TabTitle';
import { useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import { ProductWithDealTab } from '../../../data/TabTitleList';
import CheckBoxField from '../../inputFields/CheckBoxField';
import SimpleInputField from '../../inputFields/SimpleInputField';
import DealOfProductTabs from './DealOfProductTabs';
import ProductListTab from './ProductListTab';
import { useTranslation } from "react-i18next";

const ProductWithDeals = ({ values, setFieldValue, productData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][product_with_deals][title]`, placeholder: t("enter_title"), title: "title" }
            ]} />
            <CheckBoxField name={`[content][product_with_deals][status]`} title="status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ProductWithDealTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <ProductListTab values={values} setFieldValue={setFieldValue} bannerName={'banner_1'} imageName={'twoColumnBanner1Image'} productData={productData} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <DealOfProductTabs values={values} setFieldValue={setFieldValue} bannerName={'banner_2'} productData={productData} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div>
        </>
    )
}

export default ProductWithDeals