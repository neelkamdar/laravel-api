import Link from "next/link";
import { Card, CardBody, Col, Row } from "reactstrap";
import React, { useContext } from "react";
import { dateFormat } from "@/utils/customFunctions/DateFormat";
import SettingContext from "@/helper/settingContext";
import { RiEyeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";


const SubTable = ({ data }) => {
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <Card>
      <CardBody>
        <div className="tracking-wrapper table-responsive">
          <table className="table product-table">
            <thead>
              <tr>
                <th scope="col">{t('order_number')}</th>
                <th scope="col">{t('order_date')}</th>
                <th scope="col">{t('total_amount')}</th>
                <th scope="col">{t('status')}</th>
                <th scope="col">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((subOrder, i) => (
                <tr key={i}>
                  <td>
                    <h6>#{subOrder?.order_number}</h6>
                  </td>
                  <td>{dateFormat(subOrder?.created_at)}</td>
                  <td>{convertCurrency(subOrder?.amount)} </td>
                  <td>
                    <div className={`status-${subOrder.order_status.slug}`}>
                      <span>{subOrder.order_status.name}</span>
                    </div>
                  </td>
                  <td>
                    <Link href={`/account/order/details/${subOrder.order_number}`}>
                      <RiEyeLine />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default SubTable;
