import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import ProductBox from "@/components/common/productBox";
import ProductSkeletonComponent from "@/components/common/skeletonLoader/productSkeleton/ProductSkeletonComponent";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import noProduct from "../../../../public/assets/svg/no-product.svg";

const CollectionProducts = ({ filter, grid }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, fetchStatus } = useQuery(
    {queryKey: [page, filter],
    queryFn: () =>
      request(
        {
          url: ProductAPI,
          params: {
            page,
            status: 1,
            paginate: 40,
            brand: slug ? slug : null,
          },
        },
        router
      ),
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );
  return (
    <>
      {fetchStatus == "fetching" ? (
        <Row className={`g-sm-4 g-3 product-list-section ${grid == "list" ? "list-style" : grid == 4 ? "row-cols-xl-4" : grid == 5 ? "row-cols-xl-4 row-cols-xxl-5" : ""}`} xs={2} md={3}>
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.data?.length > 0 ? (
        <div className={`${themeOption?.product?.full_border ? "full_border" : ""} ${themeOption?.product?.image_bg ? "product_img_bg" : ""} ${themeOption?.product?.product_box_bg ? "full_bg" : ""} ${themeOption?.product?.product_box_border ? "product_border" : ""} `}>
          <Row className={`g-sm-4 g-3 product-list-section ${grid == "list" ? "list-style" : grid == 4 ? "row-cols-xl-4" : grid == 5 ? "row-cols-xl-4 row-cols-xxl-5" : ""}`} xs={2} md={3}>
            {data?.data?.map((product, i) => (
              <Col key={i}>
                <ProductBox product={product} className="boxClass" style="horizontal" />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        // row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5
        // row row-cols-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5
        <NoDataFound
          data={{
            imageUrl: noProduct,
            customClass: "no-data-added collection-no-data",
            title: "sorry_cant_find_products_looking",
            description: "please_check_misspelt_something_searching_other_way",
            height: 345,
            width: 345,
          }}
        />
      )}

      {data?.data?.length > 0 && (
        <nav className="custome-pagination">
          <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
        </nav>
      )}
    </>
  );
};

export default CollectionProducts;
