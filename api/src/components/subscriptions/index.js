import TableWrapper from '../../utils/hoc/TableWrapper'
import ShowTable from '../table/ShowTable';
import Loader from '../commonComponent/Loader';

const AllSubscriptionTable = ({ data, ...props }) => {
    const headerObj = {
        isSerialNo:false,
        column: [
            { title: "email", apiKey: "email", sorting: true, sortBy: "desc", },
            { title: "created_at", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllSubscriptionTable)