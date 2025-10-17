import AccountContext from '@/helper/accountContext';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useContext } from 'react';
import { Col, Row, Table } from 'reactstrap';
import dashProfileImage from '../../../../public/assets/images/inner-page/dashboard-profile.png';
import EmailPassword from './EmailPassword';

const ProfileInformation = () => {
  const { t } = useTranslation( 'common');
  const { accountData } = useContext(AccountContext);
  return (
    <div className='profile-about dashboard-bg-box'>
      <Row>
        <Col xxl={7}>
          <div className='dashboard-title mb-3'>
            <h3>{t('profile_information')}</h3>
          </div>

          <div className='table-responsive'>
            <Table>
              <tbody>
                <tr>
                  <td>{t("name")} :</td>
                  <td>{accountData?.name}</td>
                </tr>
                <tr>
                  <td>{t("phone_number")} :</td>
                  <td>
                    +{accountData?.country_code} {accountData?.phone}
                  </td>
                </tr>
                <tr>
                  <td>{t("address")} :</td>
                  <td>
                    {accountData?.address[0]?.street}
                    {accountData?.address[0]?.city}, {accountData?.address[0]?.state.name}, {accountData?.address[0]?.country.name} {accountData?.address[0]?.pincode}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className='dashboard-title mb-3'>
            <h3>{t("login_details")}</h3>
          </div>
          <EmailPassword />
        </Col>
        <Col xxl={5}>
          <div className='profile-image'>
           {dashProfileImage && <Image src={dashProfileImage} className='img-fluid' alt='profile-image' height={450} width={450} />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInformation;
