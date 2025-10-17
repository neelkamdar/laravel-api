"use client";
import { AllLanguageApi } from "@/utils/axiosUtils/API";
import { useState } from "react";
import { Col } from "reactstrap";
import AllLanguagesTable from "@/components/language/AllLanguageTable";
import request from "@/utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";

const AllLanguages = () => {
  const { refetch } = useQuery({ queryKey: ["newLang"], queryFn: () => request({ url: AllLanguageApi }), enabled: true,
  refetchOnWindowFocus: false,
  refetchOnMount: false, select: (res) => res.data.data });

  const [isCheck, setIsCheck] = useState([]);

  return (
    <Col sm="12">
      <AllLanguagesTable extraFunc={refetch} url={AllLanguageApi} moduleName="Language" language isCheck={isCheck} setIsCheck={setIsCheck} />
    </Col>
  );
};

export default AllLanguages;
