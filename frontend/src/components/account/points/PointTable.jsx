import { useContext } from 'react';
import Image from 'next/image';
import { Col, Row, Table } from 'reactstrap';
import { RiInformationLine } from 'react-icons/ri';
import Pagination from '@/components/common/Pagination';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import CoinSVG from '../../../../public/assets/images/svg/coin.svg';
import SettingContext from '@/helper/settingContext';
import { useTranslation } from "react-i18next";

const PointTable = ({ data, setPage }) => {
  const { settingData } = useContext(SettingContext);
  const { t } = useTranslation( 'common');
  return (
    <>
      <div className='total-box mt-0'>
        <Row>
          <Col xs={12}>
            <div className='total-contain wallet-bg'>
             {CoinSVG && <Image src={CoinSVG} alt='CoinSVG' height={60} width={60} />}
              <div className='total-detail'>
                <h5>{t("total_points")}</h5>
                <h3>{data?.balance ? data?.balance : 0}</h3>
              </div>
              <div className='point-ratio'>
                <h3 className='counter'>
                  <RiInformationLine /> 1 {t("point")} = {(1 / settingData?.wallet_points?.point_currency_ratio).toFixed(2)} Balance
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <div className='wallet-table'>
          <h4 className='user-dashboard-title'>{t("transactions")}</h4>
          <div className="table-responsive">
            <Table>
              <tbody>
                <tr>
                  <th>{t("no")}</th>
                  <th>{t("date")}</th>
                  <th>{t("point")}</th>
                  <th>{t("remark")}</th>
                  <th>{t("status")}</th>
                </tr>
                {data?.transactions?.data.map((transaction, i) => (
                  <tr key={i}>
                    <td>{i + 1 +  ( data?.transactions?.current_page - 1 ) * data?.transactions?.per_page}</td>
                    <td>{dateFormat(transaction?.created_at)}</td>
                    <td>{transaction?.amount} </td>
                    <td>{transaction?.detail}</td>
                    <td>
                      <div className={`status-${transaction?.type}`}>
                        <span>{transaction?.type}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <nav className='custome-pagination'>
        <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
      </nav>
    </>
  );
};

export default PointTable;
