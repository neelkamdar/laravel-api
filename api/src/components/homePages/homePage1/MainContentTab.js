import React, { useState } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import TabTitle from '@/components/widgets/TabTitle';
import { ThemeOneMainHorizontalTab } from '../../../data/TabTitleList'
import LeftSidebar from './LeftSidebar'
import RightContent from './RightContent'

const MainContentTab = ({ values, setFieldValue, productData, categoryData, setSearch ,storeData ,setStoreSearch }) => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div className="inside-horizontal-tabs">
      <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeOneMainHorizontalTab} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <LeftSidebar values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
        </TabPane>
        <TabPane tabId="2">
          <RightContent storeData={storeData} values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch}  setStoreSearch={setStoreSearch}/>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default MainContentTab