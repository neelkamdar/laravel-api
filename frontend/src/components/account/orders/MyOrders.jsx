import { useContext, useState } from 'react';
import Link from 'next/link';
import { RiEyeLine } from 'react-icons/ri';
import { Table } from 'reactstrap';
import NoDataFound from '@/components/common/NoDataFound';
import Pagination from '@/components/common/Pagination';
import SettingContext from '@/helper/settingContext';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { OrderAPI } from '@/utils/axiosUtils/API';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import { useQuery } from '@tanstack/react-query';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import { useTranslation } from "react-i18next";
import AccountHeading from '@/components/common/AccountHeading';
import { useRouter } from 'next/navigation';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const router = useRouter()
  const { t } = useTranslation( 'common');
  const { convertCurrency,settingData } = useContext(SettingContext);
  const { data, isLoading, refetch } = useQuery({queryKey: [page], queryFn: () => request({ url: OrderAPI, params: { page: page, paginate: 10 } }),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (res) => res?.data,
  });
  
  if (isLoading) return <Loader />;

  return (
    <>
      <AccountHeading title="my_orders" />
      {data?.data?.length > 0 ? (
        <>
          <div className='total-box mt-0'>
            <div className='wallet-table mt-0'>
              <Table>
                <tbody>
                  <tr>
                    <th>{t('no')}</th>
                    <th>{t('order_number')}</th>
                    <th>{t('date')}</th>
                    <th>{t('amount')}</th>
                    <th>{t('payment_status')}</th>
                    <th>{t('payment_method')}</th>
                    <th>{t('option')}</th>
                  </tr>
                  {data?.data?.map((order, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className='fw-bolder'>#{order.order_number}</span>
                      </td>
                      <td>{dateFormat(order?.created_at)}</td>
                      <td>{convertCurrency(order?.total)} </td>
                      <td>
                        <div className={`status-${order.payment_status.toLowerCase()}`}>
                          <span>{order.payment_status}</span>
                        </div>
                      </td>
                      <td>{ settingData?.payment_methods?.find((item)=>item?.name?.toUpperCase()==order.payment_method.toUpperCase())?.title?.toUpperCase()}</td>
                      <td>
                        <Link href={`/account/order/details/${order.order_number}`}>
                          <RiEyeLine />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <nav className='custome-pagination'>
            <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'no_orders_found',
            description: 'no_orders_have_yet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default MyOrders;
