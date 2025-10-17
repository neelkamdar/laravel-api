import { OrderInvoiceAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiDownload2Fill, RiRefreshLine } from 'react-icons/ri';
import PaynowModal from './PaynowModal';

const DetailTitle = ({ params, data }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation('common');

  const { mutate: InvoiceMutate, isLoading } = useCreate(OrderInvoiceAPI, false, false, "Downloaded Successfully", (resData) => {
      if (resData?.status == 200 || resData?.status == 201) {
          const blob = new Blob([resData.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url
          link.download = `invoice-${data?.order_number}.pdf`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
      }
  }, false, false, 'blob')

  return (
    <>
      <div className='title-header'>
        <div className='d-flex align-items-center flex-wrap gap-2'>
          <h5>{`${t('order_number')}: #${params}`}</h5>
          <div className='right-option'>
            {(data?.payment_status === 'FAILED' || data?.payment_status === 'PENDING') && data?.order_status && data?.order_status?.slug != 'cancelled' && data?.payment_method != 'cod' && (
              <a className='btn btn-md fw-bold text-light theme-bg-color' onClick={() => setModal(true)}>
                {t('pay_now')}
                <RiRefreshLine className='ms-2' />
              </a>
            )}
            {data?.invoice_url && data?.payment_status && data?.payment_status === 'COMPLETED' && (
              <div onClick={() => InvoiceMutate({order_number:data?.order_number})} className='btn btn-md fw-bold text-light theme-bg-color ms-auto'>
                {t('invoice')} <RiDownload2Fill className='ms-2' />
              </div>
            )}
          </div>
        </div>
      </div>
      <PaynowModal modal={modal} setModal={setModal} params={params} />
    </>
  );
};

export default DetailTitle;
