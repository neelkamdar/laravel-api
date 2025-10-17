import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
import { Table } from 'reactstrap';
import placeHolderImage from '../../../../public/assets/images/placeholder.png';
import request from '../../../utils/axiosUtils';
import { ReviewAPI } from '../../../utils/axiosUtils/API';
import Avatar from '../../commonComponent/Avatar';
import NoDataFound from '../../commonComponent/NoDataFound';
import DashboardWrapper from '../DashboardWrapper';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';


const ReviewCard = () => {
    const {t} = useTranslation()
    const router = useRouter()   
    const { data: reviewData } = useQuery({ queryKey: [ReviewAPI], queryFn: () => request({ url: ReviewAPI, params: { paginate: 5 } },router),
        refetchOnWindowFocus: false, select: (data) => data?.data?.data,
    });
    
    return (
        <DashboardWrapper classes={{ title: "latest_reviews", colProps: { sm: 12 }, headerRight: <Link href={`/review`} className='txt-primary'>{t("view_all")}</Link> }}>
            <div className='review-box table-responsive'>
                {reviewData?.length > 0 ? <Table>
                    <tbody>
                        {
                            reviewData?.map((elem, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='review-content'>
                                            <div className="img-box">
                                                <Avatar data={elem?.product?.product_thumbnail} name={elem?.product?.name} placeHolder={placeHolderImage} />
                                            </div>
                                            <span>{elem?.product?.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{elem?.consumer?.name}</span>
                                    </td>
                                    <td>
                                        <Rating initialValue={elem?.rating} readonly={true} size={17} />
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </Table> :
                    <NoDataFound title={"no_data_found"} noImage={true} />
                }
            </div>
        </DashboardWrapper>
    )
}

export default ReviewCard