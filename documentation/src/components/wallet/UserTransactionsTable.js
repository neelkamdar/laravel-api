import { useMemo } from 'react';
import TableWrapper from '../../utils/hoc/TableWrapper'
import ShowTable from '../table/ShowTable';

const UserTransactionsTable = ({ data, ...props }) => {
       const headerObj = {
        isSerialNo:false,
        column: [
            { title: props.pointTable ?"Point": "Amount", apiKey: "amount",type: "price" },
            { title: "type", apiKey: "type" },
            { title: "remark", apiKey: "detail" },
            { title: "created_at", apiKey: "created_at", type: "date" },
        ],
        data: data?.data?.transactions?.data || []
    };
    let orders = useMemo(() => {
        return headerObj?.data?.filter((element) => {     
            element.type = element.type ? <div className={`${element.type=='credit'? 'status-credit':'status-debit'}`}><span>{element?.type}</span></div> : '-';   
            return element;
        });
    }, [headerObj?.data]);
    headerObj.data = headerObj ? orders : [];
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
};

export default TableWrapper(UserTransactionsTable)