'use client'
import React, { useState } from "react";
import { Col } from "reactstrap";
import AllTagsTable from "@/components/tag/AllTagsTable";
import { tag, TagImportAPI } from "@/utils/axiosUtils/API";

const AllTags = () => {
  const [isCheck, setIsCheck] = useState([]);
 
  
  return (
    <Col sm="12">
      <AllTagsTable 
      url={tag} 
      moduleName="blog/tag" 
      isCheck={isCheck} 
      setIsCheck={setIsCheck} 
      type={"post"}
      exportButton={false}
      importExport={{ importUrl: TagImportAPI}} />
    </Col>
  );
};

export default AllTags;
