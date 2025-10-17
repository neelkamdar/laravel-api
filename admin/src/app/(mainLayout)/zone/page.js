'use client'
import ZoneTable from "@/components/zone/ZoneTable";
import { ZoneApi } from "@/utils/axiosUtils/API";
import React, { useState } from "react";
import { Col } from "reactstrap";

const Zone = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <ZoneTable
        url={ZoneApi}
        moduleName="zone"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};
export default Zone;
