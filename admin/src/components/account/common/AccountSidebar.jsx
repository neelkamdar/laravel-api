import NavTabTitles from '@/components/common/NavTabs';
import Btn from '@/elements/buttons/Btn';
import AccountContext from '@/helper/accountContext';
import request from '@/utils/axiosUtils';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Col } from 'reactstrap';
import SidebarProfile from '.';
import { sidebarMenu } from '../../../data/AccountSidebarMenu';

const AccountSidebar = ({ tabActive }) => {
  const [activeTab, setActiveTab] = useState({ id: tabActive });
  const [notification, setNotification] = useState();

  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({queryKey: ['NotificationsAPI'], queryFn: () => request({ url: "/notifications" },router), enabled: false, select: (res) => (res?.data?.data) });
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading])

  const pathName =usePathname()
  useEffect(()=>{
    return ()=>{
      pathName == "/account/notifications" && !isLoading && refetch()
    }
  },[pathName])
  
  useEffect(() => {
    setNotification(data?.filter(item => !item.read_at)?.length)
  }, [data ,isLoading])

  const handelCallback = () => {
    setMobileSideBar(!mobileSideBar);
  };
  return (
    <Col xxl={3} lg={4}>
      <div className={`dashboard-left-sidebar ${mobileSideBar ? 'show' : ''}`}>
        <div className='close-button d-flex d-lg-none' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <Btn className='close-sidebar'>
            <RiCloseLine />
          </Btn>
        </div>
        <SidebarProfile />
        <NavTabTitles notification={notification} classes={{ navClass: 'nav-pills user-nav-pills' }} setActiveTab={setActiveTab} activeTab={activeTab} titleList={sidebarMenu} isLogout callBackFun={handelCallback} />
      </div>
    </Col>
  );
};

export default AccountSidebar;
