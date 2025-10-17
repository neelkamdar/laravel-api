import { useContext, useEffect, useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { MarkAsReadAPI, NotificationAPI } from '@/utils/axiosUtils/API';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import AccountHeading from '@/components/common/AccountHeading';
import useCreate from '@/utils/hooks/useCreate';
import { useRouter } from 'next/navigation';

const NotificationData = () => {
  const { t } = useTranslation( 'common');
  const router = useRouter()
  const [isRead, setIsRead] = useState('');
  const { data, isLoading } = useQuery({queryKey: [NotificationAPI], queryFn: () => request({ url: NotificationAPI },router), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  const { mutate } = useCreate(MarkAsReadAPI, false, false, 'No', (resDta) => {
    if (resDta.status === 200 || resDta.status === 201) {
      setIsRead('read');
    }
  });
  useEffect(() => {
    return () => {
      mutate({ _method: 'PUT' });
    };
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title='notifications' />
      <ul className='notification-list'>
        {data?.map((elem, i) => (
          <li className={!elem?.read_at && isRead !== 'read' ? 'unread' : ''} key={i}>
            <h4>{elem?.data?.message}</h4>
            <h5>
              <RiTimeLine /> {dateFormat(elem?.created_at)}
            </h5>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationData;
