"use client";
import AllPublicationTable from "@/components/publication/AllPublicationTable";
import { PublicationApi } from "@/utils/axiosUtils/API";
import React, { useState } from "react";
import { Col } from "reactstrap";

const Publication = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllPublicationTable
        url={PublicationApi}
        moduleName="publication"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        keyInPermission={"publication"}
      />
    </Col>
  );
};

export default Publication;
