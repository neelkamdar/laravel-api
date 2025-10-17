import ThemeOptionContext from "@/helper/themeOptionsContext";
import { useContext } from "react";
import { Col, Row } from "reactstrap";
import BlogCardContain from "./BlogCard";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import NoDataFound from "@/components/common/NoDataFound";
import emptyImage from "../../../../public/assets/svg/empty-items.svg";

const BlogCard = ({ BlogData, isLoading, refetch, page, setPage }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const queryBoxStyle = searchParams?.get("style");
  const querySidebar = searchParams?.get("sidebar");
  const styleObj = {
    no_sidebar: { colClass: { xxl: 12, xl: 12, lg: 12 } },
    left_sidebar: { class: "order-lg-2", colClass: { xxl: 9, xl: 8, lg: 7 } },
    right_sidebar: { colClass: { xxl: 9, xl: 8, lg: 7 } },
    list_view: { class: "blog-list", colClass: { xs: 12 } },
    grid_view: { colClass: { xxl: 4, sm: 6 } },
  };

  return (
    <>
      <Col
        {...styleObj[querySidebar ?? themeOption?.blog?.blog_sidebar_type]
          ?.colClass}
        className={
          styleObj[querySidebar ?? themeOption?.blog?.blog_sidebar_type]
            ?.class || ""
        }
      >
        <Row className={`g-4 `}>
          {BlogData?.data?.length > 0 ? (
            BlogData?.data?.map((blog, i) => (
              <Col
                {...styleObj[queryBoxStyle ?? themeOption?.blog?.blog_style]
                  ?.colClass}
                key={i}
              >
                <div
                  className={`blog-box ${
                    blog?.is_sticky === 1 ? "sticky-blog-box" : ""
                  } ${
                    styleObj[queryBoxStyle ?? themeOption?.blog?.blog_style]
                      ?.class
                  }`}
                >
                  {blog?.is_featured ? (
                    <div className="blog-label-tag">
                      <span>{t("featured")}</span>
                    </div>
                  ) : null}
                  <BlogCardContain blog={blog} />
                </div>
              </Col>
            ))
          ) : (
            <NoDataFound
              data={{
                customClass: "no-data-added",
                imageUrl: emptyImage,
                title: "no_blogs_found",
                description: "not_find_any_blogs_matching_search_criteria",
                height: 400,
                width: 400,
              }}
            />
          )}
        </Row>
        {BlogData?.data.length > 0 && (
          <nav className="custome-pagination">
            <Pagination
              current_page={BlogData?.current_page}
              total={BlogData?.total}
              per_page={BlogData?.per_page}
              setPage={setPage}
            />
          </nav>
        )}
      </Col>
    </>
  );
};

export default BlogCard;
