'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import { Col, TabContent, TabPane } from 'reactstrap';
import TrackOrderDetails from './TrackOrderDetails';
import { useSearchParams } from 'next/navigation';
import NoDataFound from '../common/NoDataFound';
import request from "@/utils/axiosUtils";
import { TrackingAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import emptyImage from "../../../public/assets/svg/empty-items.svg";

const OrderDetailsTracking = () => {
  const search = useSearchParams();
  let orderNumber = search.get("order_number");
  let emailPhone = search.get("email_or_phone");

  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({queryKey: [TrackingAPI], queryFn: () => request({ url: TrackingAPI, params: { order_number: orderNumber, email_or_phone: emailPhone } }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  return (
    <>
      <Breadcrumb title={'order_details'} subNavigation={[{ name: 'order_details' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <Col xxl={12} lg={8}>
          {data ? (
            <div className='dashboard-right-sidebar'>
              <TabContent>
                <TabPane className='show active'>
                  <TrackOrderDetails data={data} isLoading={isLoading} orderNumber={orderNumber} />
                </TabPane>
              </TabContent>
            </div>) :
            <NoDataFound
              data={{
                customClass: "no-data-added",
                imageUrl: emptyImage,
                title: "no_orders_found",
                height: 300,
                width: 300
              }}></NoDataFound>
          }
        </Col>
      </WrapperComponent>
    </>
  );
};

export default OrderDetailsTracking;