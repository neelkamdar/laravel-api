import { useContext, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import SettingContext from '@/helper/settingContext';
import useCreate from '@/utils/hooks/useCreate';
import { useTranslation } from "react-i18next";
import ReceiptModal from './receiptModal';

const InvoiceSummary = ({ data }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { mutate: InvoiceMutate, isLoading } = useCreate("/order/invoice", false, false, "Downloaded Successfully", (resData) => {
        if (resData?.status === 200 || resData?.status === 201) {
            const blob = new Blob([resData.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${data?.order_number}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    }, true, 'blob');

    const downloadInvoice = (orderId) => {
        InvoiceMutate({ order_number: orderId });
    };

    const [openReceiptModal, setOpenReceiptModal] = useState(false);

    return (
        <Card>
            <CardBody>
                <div className="title-header">
                    <div className="d-flex align-items-center">
                        <h5>{t("summary")}</h5>
                    </div>
                    {data?.invoice_url && (
                        <div className='d-flex gap-2'>
                            <Btn className="btn-animation btn-sm ms-auto btn-outline" onClick={() => setOpenReceiptModal(true)}>{t("receipt")}</Btn>
                            <button onClick={() => downloadInvoice(data?.order_number)} className="btn btn-animation btn-sm ">{t("invoice")}</button>
                        </div>
                    )}
                </div>
                <div className="tracking-total tracking-wrapper">
                    <ul>
                        <li>{t("sub_total")} :<span>{convertCurrency(data?.amount)}</span></li>
                        {!data?.is_digital_only &&
                            <li>{t("shipping")} :<span>{convertCurrency(data?.shipping_total ?? 0)}</span></li>
                        }
                        <li>{t("tax")} :<span>{convertCurrency(data?.tax_total ?? 0)}</span></li>
                        {data?.points_amount ? <li className="txt-primary fw-bold">{t("points")} <span>{convertCurrency(data?.points_amount)}</span></li> : ""}
                        {data?.wallet_balance ? <li className="txt-primary fw-bold">{t("wallet_balance")} <span>{convertCurrency(data?.wallet_balance)}</span></li> : ""}
                        {data?.coupon_total_discount !== 0 ? <li className="txt-primary fw-bold">{t("discount")} <span>{convertCurrency(data?.coupon_total_discount)}</span></li> : ""}
                        <li>{t("total")} <span>{convertCurrency(data?.total ?? 0)}</span></li>
                    </ul>
                </div>
            </CardBody>
            {openReceiptModal && <ReceiptModal open={openReceiptModal} data={data} setOpen={setOpenReceiptModal} />}
        </Card>
    );
};

export default InvoiceSummary;
