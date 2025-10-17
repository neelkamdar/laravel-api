import React, { useContext } from 'react'
import { Table } from 'reactstrap'
import { RiEyeLine } from 'react-icons/ri'
import Link from 'next/link'

import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext'
import { dateFormate } from '@/utils/customFunctions/DateFormate'

const DetailTable = ({ data }) => {
    
    const { t } = useTranslation( 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className='table-responsive'>
            <Table className="table all-package theme-table no-footer">
                <thead>
                    <tr>
                        <th scope="col">{t("order_number")}</th>
                        <th scope="col">{t("order_date")}</th>
                        <th scope="col">{t("total_amount")}</th>
                        <th scope="col">{t("status")}</th>
                        <th scope="col">{t("action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.sub_orders?.map((elem, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <h6>#{elem?.order_number}</h6>
                                </td>
                                <td>
                                    <h6>{dateFormate(elem?.created_at)}</h6>
                                </td>
                                <td>
                                    <h6>{convertCurrency(elem?.amount)}</h6>
                                </td>
                                <td>
                                    <h6>
                                        <div className={`status-${elem?.order_status.slug}`} >
                                          <span> {elem?.order_status.name} </span>
                                        </div>
                                    </h6>
                                </td>
                                <td>
                                    <Link href={`${elem?.order_number}`}>
                                        <RiEyeLine />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default DetailTable