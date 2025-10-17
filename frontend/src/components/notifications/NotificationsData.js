import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { RiTimeLine } from "react-icons/ri";
import BadgeContext from "../../helper/badgeContext";
import request from '../../utils/axiosUtils';
import { MarkAsRead, NotificationsAPI } from '../../utils/axiosUtils/API';
import { dateFormate } from '../../utils/customFunctions/DateFormate';
import useCreate from '../../utils/hooks/useCreate';
import Loader from '../commonComponent/Loader';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

const NotificationsData = () => {
    const router = useRouter()
    const { t } = useTranslation( 'common');
    const { setNotification } = useContext(BadgeContext)
    const { data, isLoading, refetch } = useQuery({ queryKey: [NotificationsAPI], queryFn: () =>
        request({ url: NotificationsAPI },router), enabled: false, select: (res) => (res.data.data) }
    );
    const { mutate } = useCreate(MarkAsRead, false, false, false, null, true);
    useEffect(() => {
        refetch();
        setNotification(null)
        return()=>{
            mutate({ _method: "put" })
        }
    }, [])
    if (isLoading) return <Loader />
    return (
        <ul className='notification-setting'>
            {data?.map((notification, index) => (
                
                <li key={index} className={!notification.read_at ? 'unread' : ''}>
                    <h4>{t(notification.data.message)}</h4>
                    <h5><RiTimeLine /> {dateFormate(notification.created_at)}</h5>
                </li>
            ))}
        </ul>
    )
}

export default NotificationsData