import Btn from '@/elements/buttons/Btn';
import { RiAddLine } from 'react-icons/ri';
import AddressData from './AddressData';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/helper/accountContext';
import CustomModal from '@/components/common/CustomModal';
import AddAddressForm from '@/components/checkout/common/AddAddressForm';
import useCreate from '@/utils/hooks/useCreate';
import { AddressAPI } from '@/utils/axiosUtils/API';

import { useTranslation } from "react-i18next";

const AddressHeader = () => {
  
  const { t } = useTranslation( 'common');
  const [addressState, setAddressState] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [modal, setModal] = useState('');
  const { accountData, refetch } = useContext(AccountContext);
  useEffect(() => {
    accountData?.address.length > 0 && setAddressState((prev) => [...accountData?.address]);
  }, [accountData]);
  const { mutate, isLoading } = useCreate(AddressAPI, false, false, 'Address Added successfully', (resDta) => {
    setAddressState((prev) => [...prev, resDta?.data]);
    refetch();
    setModal('');
  });
  const { mutate: editMutate, isLoading: editLoader } = useCreate(`${AddressAPI}/${editAddress?.id}`, false, false, 'Address Updated successfully', (resDta) => {
    setAddressState((prev) =>
      prev.map((elem) => {
        if (elem?.id == resDta?.data?.id) {
          return (elem = resDta?.data);
        } else {
          return elem;
        }
      }),
    );
    refetch();
    setModal('');
    setEditAddress('');
  });
  return (
    <>
      <div className='dashboard-address'>
        <div className='title-header'>
          <div className='d-flex align-items-center w-100 justify-content-between'>
            <h5>{t("saved_address")}</h5>
            <Btn className='theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3 ms-auto' onClick={() => setModal('add')} title={'add_address'}>
              <RiAddLine />
            </Btn>
          </div>
        </div>
        <AddressData addressState={addressState} setAddressState={setAddressState} modal={modal} setModal={setModal} setEditAddress={setEditAddress} />
      </div>
      <div className='checkout-detail'>
        <CustomModal modal={modal == 'add' || modal == 'edit' ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal address-modal modal-lg', modalHeaderClass: 'p-0' }}>
          <div className='right-sidebar-box'>
            <AddAddressForm
              method={modal == "add" ? "POST" : ""}
              mutate={modal == 'add' ? mutate : editMutate}
              isLoading={isLoading || editLoader}
              setModal={setModal}
              setEditAddress={setEditAddress}
              editAddress={editAddress}
              modal={modal}
              setAddressState={setAddressState}
            />
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default AddressHeader;
