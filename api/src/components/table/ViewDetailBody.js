import { useContext } from "react"
import { Table } from "reactstrap"
import SettingContext from "../../helper/settingContext"

import { useTranslation } from "react-i18next";

const ViewDetailBody = ({ fullObj }) => {
    
    const { t } = useTranslation( 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className="border rounded-3">
            <Table className="all-package theme-table no-footer">
                <tbody>
                    {fullObj?.message && <tr>
                        <td className="text-start fw-semibold">{t("message")}</td>
                        <td className="text-start">{fullObj?.message}</td>
                    </tr>}
                    {fullObj?.reason && <tr>
                        <td className="text-start fw-semibold">{t("reason")}</td>
                        <td className="text-start">{fullObj?.reason}</td>
                    </tr>}
                    {fullObj?.amount && <tr>
                        <td className="text-start fw-semibold">{t("amount")}</td>
                        <td className="text-start">{convertCurrency(fullObj?.amount)}</td>
                    </tr>}

                    {fullObj?.user?.payment_account && <> <tr>
                        <td className="text-start fw-semibold">{t("bank_name")} </td>
                        <td className="text-start"> {fullObj?.user?.payment_account?.bank_name}</td>
                    </tr>
                        <tr>
                            <td className="text-start fw-semibold">{t("bank_account_name")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.bank_holder_name}</td>
                        </tr>
                        <tr>
                            <td className="text-start fw-semibold">{t("bank_account_number")} </td>
                            <td className="text-start"> {fullObj?.user?.payment_account?.bank_account_no}</td>
                        </tr>
                        <tr>
                            <td className="text-start fw-semibold">{t("bank_ifsc_code")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.ifsc}</td>
                        </tr>
                        <tr>
                            <td className="text-start fw-semibold">{t("bank_swift_Code")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.swift}</td>
                        </tr></>}
                    <tr>
                        <td className="text-start fw-semibold">{t("payment_method")} </td>
                        <td className="text-start">{fullObj?.payment_type.toUpperCase()}</td>
                    </tr>
                    {fullObj?.status && <tr>
                        <td className="text-start fw-semibold">{t('status')}</td>
                        <td className="text-start">
                            <div className={`status-${fullObj?.status}`}><span>{fullObj?.status}</span></div>
                        </td>
                    </tr>}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewDetailBody