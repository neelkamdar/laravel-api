import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import Btn from "@/elements/buttons/Btn";
import request from "@/utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Table } from "reactstrap";
import emptyImage from "../../../../public/assets/svg/empty-items.svg";
import DropDownCommon from "./DropDownCommon";

const DownloadDetail = () => {
  const { t } = useTranslation("common");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [term, setTerm] = useState(null);  
  const { data, refetch, isLoading } = useQuery({queryKey: ["download"], queryFn: () =>request({ url: "download", params: { page: page, paginate: 10 ,search:term ?? null } },router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
   refetch();
  }, [isLoading]);
  
  const handleSearch = () =>{
    if(term?.length > 0){
      refetch();
    }else{
      setTerm(null)
      refetch();
    }
  }
  return (
    <div className="download-detail dashboard-bg-box">
      <div className="input-group download-form">
        <Input placeholder={t("search_your_download")} onChange={(e)=>setTerm(e.target.value)}  />
        <Btn className="btn theme-bg-color text-light" title={"search"} onClick={handleSearch} />
      </div>
      {data?.data?.length > 0 ? (
        <>
          <div className="table-responsive">
          <div className="download-table">
            <Table>
              <thead>
                <tr>
                  <th>{t("image")}</th>
                  <th className="table-name">{t("name")}</th>
                  <th>{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((elem, index) => (
                  <tr key={index}>
                    <td>
                      <Image src={elem?.item_image} className="img-fluid" alt="image" height={60} width={90}/>
                    </td>
                    <td className="table-name">{elem.item_name}</td>
                    <td>
                      <DropDownCommon elem={elem}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          </div>
          <nav className="custome-pagination">
            <Pagination
              current_page={data?.current_page}
              total={data?.total}
              per_page={data?.per_page}
              setPage={setPage}
            />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "no_order_found",
            description: "no_orders_have_yet",
            height: 300,
            width: 300,
          }}
        />
      )}
    </div>
  );
};

export default DownloadDetail;
