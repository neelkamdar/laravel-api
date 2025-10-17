import React, { useState } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import {  ThemeSevenHorizontalTab } from '../../../data/TabTitleList'
import LeftSidebar from './LeftSidebar'
import SliderBanner from './SliderBanner'
import TabTitle from '@/components/widgets/TabTitle'

const SliderProductTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div className="inside-horizontal-tabs">
      <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeSevenHorizontalTab} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <LeftSidebar values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
        </TabPane>
        <TabPane tabId="2">
          <SliderBanner values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default SliderProductTab