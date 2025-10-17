import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiNotificationLine, RiRecordCircleLine } from "react-icons/ri";
import BadgeContext from "../../helper/badgeContext";
import request from "../../utils/axiosUtils";
import { NotificationsAPI } from "../../utils/axiosUtils/API";

const NotificationBox = () => {
  const { t } = useTranslation('common');
  const { notification, setNotification } = useContext(BadgeContext);
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({queryKey: ['NotificationsAPI'], queryFn: () => request({ url: NotificationsAPI }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => (res.data.data) }
  );

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    setNotification(data?.filter(notification => notification.read_at === null))
  }, [data])
  if (data && data.length === 0) return null
  return (
    <li className="onhover-dropdown">
      <div className="notification-box">
        <RiNotificationLine />
        {notification?.length > 0 && <span className="badge rounded-pill badge-theme">{notification.length}</span>}
      </div>
      <ul className={`notification-dropdown onhover-show-div`}>
        <li>
          <RiNotificationLine />
          <h6 className="f-18 mb-0">{t("notifications")}</h6>
        </li>
        {data?.slice(0, 3)?.map((notification, i) => (
          <li key={i}>
            <p>
              <RiRecordCircleLine className="me-2 text-primary" />
              {t(notification?.data?.message)}
            </p>
          </li>
        ))}
        <li>
          <Link className="btn btn-primary text-white" href="/notifications">
            {t("check_all_notification")}
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default NotificationBox;
