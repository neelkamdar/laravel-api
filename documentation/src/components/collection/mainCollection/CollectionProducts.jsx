import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import ProductBox from "@/components/common/productBox";
import ProductSkeletonComponent from "@/components/common/skeletonLoader/productSkeleton/ProductSkeletonComponent";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import noProduct from "../../../../public/assets/svg/no-product.svg";
import ZoneContext from "@/helper/zoneContext";

const CollectionProducts = ({ setFilter, filter, grid, categorySlug, authorSlug }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { slug } = useParams();
  const [category, brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  const [page, setPage] = useState(filter?.page);

  const { data, fetchStatus, isLoading, refetch } = useQuery({queryKey: [page, filter], queryFn: () => request({ url: ProductAPI, params: { page, status: 1, paginate: 40, field: filter?.field ?? "created_at", price: filter?.price.join(",") ?? "", category: categorySlug ? categorySlug : filter?.category.join(","), brand: filter.brand.join(","), sort: "", sortBy: filter?.sortBy ?? "asc", rating: filter?.rating.join(",") ?? "", attribute: filter?.attribute.join(",") ?? "", store_slug: slug ? slug : null, author_slug: authorSlug ? authorSlug : filter['author_slug'], publication_id: filter['publication_id'] } }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    refetch
  }, []);
  useEffect(() => {
    setPage(filter?.page);
  }, [filter?.page]);
  useEffect(() => {
    if (page >= 1) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category, page }).toString();
       setFilter((prev) => {
         return { ...prev, page: page };
       });
      router.push(`${pathname}?${queryParams}`);
      refetch();
    }
  }, [page, category, brand, attribute, price, rating, sortBy, field, layout]);

  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);
  useEffect(() => {
    categorySlug && authorSlug && !isLoading && refetch();
  }, [categorySlug, authorSlug]);
  return (
    <>
      {fetchStatus == "fetching" ? (
        <Row xxl={grid !== 3 && grid !== 5 ? 4 : ""} xl={grid == 5 ? 5 : 3} lg={grid == 5 ? 4 : 2} className={`g-sm-4 g-3 product-list-section ${grid == "list" ? "list-style" : grid == 4 ? "row-cols-xl-4" : grid == 5 ? "row-cols-xl-4 row-cols-xxl-5" : ""}`} xs={2} md={3}>
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
