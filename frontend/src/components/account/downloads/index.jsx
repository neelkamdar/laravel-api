"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import WrapperComponent from "@/components/common/WrapperComponent";
import React from "react";
import AccountSidebar from "../common/AccountSidebar";
import { Col, TabContent, TabPane } from "reactstrap";
import ResponsiveMenuOpen from "../common/ResponsiveMenuOpen";
import AccountHeading from "@/components/common/AccountHeading";
import DownloadDetail from "./DownloadDetail";

const AccountDownloads = () => {
  return (
    <>
      <Breadcrumb title={"downloads"} subNavigation={[{ name: "downloads" }]}/>
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
      <AccountSidebar tabActive={'download'} /> 
      <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <AccountHeading title='downloads' />
                <DownloadDetail />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>

    </>
  );
};

export default AccountDownloads;
