import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Loader from "../../components/commonComponent/Loader";
import TableBottom from "../../components/table/TableBottom";
import TableTitle from "../../components/table/TableTitle";
import TableTop from "../../components/table/TableTop";
import request from "../axiosUtils";
import useDelete from "../hooks/useDelete";

const TableWrapper = (WrappedComponent) => {
  const HocComponent = forwardRef(({ url, loading, moduleName, setFieldValue, userIdParams, initialApiNoCall, exportButton, type, paramsProps, onlyTitle, isCheck, setIsCheck, isReplicate, dateRange, productType, filterHeader, importExport, showFilterDifferentPlace, keyInPermission, advanceFilter, differentFilter, extraActions, extraFunc ,language, ...props }, ref) => {
    const router = useRouter();
    const [paginate, setPaginate] = useState(15);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState([{ startDate: null, endDate: null, key: "selection" }]);
    const [sortBy, setSortBy] = useState({ field: "", sort: "asc" });
    const { mutate, isLoading: load } = useDelete(url);
    const fetchData = async () => {
      try {
        if (paramsProps?.consumer_id === null || paramsProps?.vendor_id === null) {
          return [];
        }

        const response = await request(
          {
            url,
            method: "get",
            params: {
              paginate,
              page,
              search,
              sort: sortBy?.sort,
              field: sortBy?.field,
              type,
              start_date: date[0]?.startDate ?? null,
              end_date: date[0]?.endDate ?? null,
              ...paramsProps,
            },
          },
          router
        );

        return response;
      } catch (error) {
        throw error;
      }
    };

    const { data, isLoading, refetch, fetchStatus } = useQuery({ queryKey: [url], queryFn: fetchData,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    });

    useEffect(() => {
      if (page > 1) {
        setPage(1);
        refetch();
      }
    }, [paginate]);
    // To use this function in parent
    useImperativeHandle(ref, () => ({
      call() {
        refetch();
      },
    }));
    useEffect(() => {
      load && refetch();
    }, [load]);
    useEffect(() => {
      (!loading || url) && refetch();
    }, [paginate, page, date, search, loading, sortBy, type, ...(paramsProps ? Object.values(paramsProps) : [])]);

    useEffect(() => {
      if (!data?.data?.length || !data?.data?.data?.length) {
        setIsCheck && setIsCheck([]);
      }
      if (setFieldValue) {
        setFieldValue ? setFieldValue("showBalance", data?.data?.balance) : "";
      }
    }, [data]);
    if (isLoading) return <Loader />;
    return (
      <>
        <Card>
          <CardBody className="custom-role">
            <TableTitle showFilterDifferentPlace={showFilterDifferentPlace} moduleName={moduleName} type={type} onlyTitle={onlyTitle} filterHeader={filterHeader} importExport={importExport} refetch={refetch} exportButton={exportButton} />
            {(filterHeader?.noPageDrop !== true || filterHeader?.noSearch !== true) && <TableTop differentFilter={differentFilter} advanceFilter={advanceFilter} showFilterDifferentPlace={showFilterDifferentPlace} setPaginate={setPaginate} setSearch={setSearch} paginate={paginate} isCheck={isCheck} setIsCheck={setIsCheck} url={url} isReplicate={isReplicate} refetch={refetch} dateRange={dateRange} date={date} setDate={setDate} filterHeader={filterHeader} keyInPermission={keyInPermission} mutate={mutate} />}
            <div className="table-responsive border-table">
              <WrappedComponent data={userIdParams ? data : data?.data?.data} sortBy={sortBy} setSortBy={setSortBy} moduleName={moduleName} type={type} current_page={userIdParams ? data?.data?.transactions?.current_page : data?.data?.current_page} per_page={userIdParams ? data?.data?.transactions?.per_page : data?.data?.per_page} mutate={mutate} url={url} userIdParams={userIdParams} fetchStatus={fetchStatus} refetch={refetch} isCheck={isCheck} setIsCheck={setIsCheck} {...props} keyInPermission={keyInPermission} extraActions={extraActions} extraFunc={extraFunc} language={language} />
            </div>
          </CardBody>
          {filterHeader?.noPagination !== true && <TableBottom current_page={userIdParams ? data?.data?.transactions?.current_page : data?.data?.current_page} total={userIdParams ? data?.data?.transactions?.total : data?.data?.total} per_page={userIdParams ? data?.data?.transactions?.per_page : data?.data?.per_page} setPage={setPage} />}
        </Card>
      </>
    );
  });
  return HocComponent;
};

export default TableWrapper;
