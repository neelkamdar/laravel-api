import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import request from '../../utils/axiosUtils';
import { user } from '../../utils/axiosUtils/API';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import { useRouter } from 'next/navigation';
import AccountContext from '@/helper/accountContext';

const SelectUser = ({ values, title, role, name, userRole }) => {
    const { role:contextUserRole } = useContext(AccountContext)
    const router = useRouter();
    const { data, refetch } = useQuery({ queryKey: [user], queryFn: () => request({ url: user, params: { role:role, status: 1, } },router), enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data?.map((el) => { return { id: el.id, name: el.name } }) });

    useEffect(() => {
        contextUserRole !== "vendor" && refetch()
    }, [])
    return (
        <Col xxl="4" xl="5">
            <Card>
                <CardBody className='theme-form'>
                    <div className="title-header option-title">
                        <div className="d-flex align-items-center">
                            <h5>{title}</h5>
                        </div>
                    </div>
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: name,
                                title: "users",
                                notitle: 'true',
                                inputprops: {
                                    name: name,
                                    id: name,
                                    options: data || [],
                                    defaultOption: "Select User",
                                },
                            },
                        ]}
                    />
                </CardBody>
            </Card>
        </Col>
    )
}

export default SelectUser