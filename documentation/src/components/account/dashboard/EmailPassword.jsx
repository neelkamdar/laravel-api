import React, { useContext, useState } from 'react';
import { Table } from 'reactstrap';
import AccountContext from '@/helper/accountContext';
import EmailPasswordModal from './EmailPasswordModal';
import { useTranslation } from "react-i18next";

const EmailPassword = () => {
  const { accountData } = useContext(AccountContext);
  const [modal, setModal] = useState('');
  const { t } = useTranslation( 'common');
  return (
    <>
      <div className='table-responsive'>
        <Table>
          <tbody>
            <tr>
              <td>{t('email')} :</td>
              <td>
                {accountData?.email}
                <span className='custom-anchor ms-2' onClick={() => setModal('email')}>
                  {t('edit')}
                </span>
              </td>
            </tr>
            <tr>
              <td>{t('password')} :</td>
              <td>
                
                <span className='custom-anchor ms-2' onClick={() => setModal('password')}>
                  {t('edit')}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <EmailPasswordModal modal={modal} setModal={setModal} />
    </>
  );
};

export default EmailPassword;
