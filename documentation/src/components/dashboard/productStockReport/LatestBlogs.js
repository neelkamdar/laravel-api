import { useQuery } from "@tanstack/react-query";
import Link from 'next/link';
import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import request from "../../../utils/axiosUtils";
import { blog } from "../../../utils/axiosUtils/API";
import { dateFormate } from "../../../utils/customFunctions/DateFormate";
import Avatar from "../../commonComponent/Avatar";
import NoDataFound from "../../commonComponent/NoDataFound";
import DashboardWrapper from "../DashboardWrapper";
import { useRouter } from "next/navigation";


const LatestBlogs = () => { 
    
  const router = useRouter()   
    const { data, refetch } = useQuery({ queryKey: [blog], queryFn: () => request({ url: blog, params: { status: 1, paginate: 2 } },router),
        refetchOnWindowFocus: false, enabled: false, select: (data) => data?.data?.data,
    });
    useEffect(() => {
        refetch()
    }, [])
    return (
        <DashboardWrapper classes={{ title: "latest_blogs" }}>
            <Row>
                {data?.length > 0 ? data?.map((elem, i) => (
                    <Col xs={6} key={i}>
                        <div className="blog-box">
                            <Link href={`/blog/edit/${elem?.id}`} className="blog-img">
                                <Avatar data={elem?.blog_thumbnail} customClass={"img-fluid"} noPrevClass={true} placeHolder={placeHolderImage} name={elem?.title} width={278} height={180} />
                            </Link>
                            <div className="blog-content">
                                <Link href={`/blog/edit/${elem?.id}`}>{elem?.title}</Link>
                                <h6>{dateFormate(elem?.created_at)}</h6>
                            </div>
                        </div>
                    </Col>
                )) : <NoDataFound title={"no_data_found"} noImage={true} />}
            </Row>
        </DashboardWrapper>
    )
}

export default LatestBlogs