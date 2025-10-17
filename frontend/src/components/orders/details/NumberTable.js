import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Avatar from '@/components/commonComponent/Avatar';
import SettingContext from '@/helper/settingContext';

import { useTranslation } from "react-i18next";

const NumberTable = ({ data }) => {
    
    const { t } = useTranslation( 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className="tracking-wrapper table-responsive">
            <Table className="product-table">
                <thead>
                    <tr>
                        <th scope="col">{t("image")}</th>
                        <th scope="col">{t("name")}</th>
                        <th scope="col">{t("price")}</th>
                        <th scope="col">{t("quantity")}</th>
                        <th scope="col">{t("subtotal")}</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((elem, index) => (
                        <tr key={index}>
                            <td className="product-image">
                                <Avatar customClass={'img-fluid'} data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.name} />
                            </td>
                            <td>
                                <h6>{elem?.pivot?.variation ? elem?.pivot?.variation?.name : elem?.name}</h6>
                            </td>
                            <td>
                                <h6>{convertCurrency(elem?.pivot?.single_price)}</h6>
                            </td>
                            <td>
                                <h6>{elem?.pivot.quantity}</h6>
                            </td>
                            <td>
                                <h6>{convertCurrency(elem?.pivot.subtotal)}</h6>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default NumberTable