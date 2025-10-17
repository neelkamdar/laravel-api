import BlogIdsContext from "@/helper/blogIdsContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import { latestBlogSlider } from "../../data/SliderSettingsData";
import NoDataFound from "../common/NoDataFound";
import WrapperComponent from "../common/WrapperComponent";
import BlogData from "../themes/common/blogData";

const OurBlog = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const { filteredBlog, setGetBlogIds } = useContext(BlogIdsContext);
  const BlogOptions = {
    ...latestBlogSlider,
    infinite: filteredBlog?.length > latestBlogSlider.slidesToShow,
  };

  useEffect(() => {
    if (themeOption?.about_us?.blog?.blog_ids?.length > 0) {
      setGetBlogIds((prev) => ({
        ...prev,
        ids: Array.from(new Set(themeOption?.about_us?.blog?.blog_ids))?.join(","),
      }));
    }
  }, [themeOption]);

  return (
    <WrapperComponent classes={{ sectionClass: "section-lg-space" }} noRowCol>
      <div className="about-us-title text-center">
        <h4 className="text-content">{t("our_blog")}</h4>
        <h2 className="center">{t("our_latest_blog")}</h2>
      </div>

      {themeOption?.about_us?.blog?.blog_ids?.length > 0 ? (
        <Row>
          <BlogData
            dataAPI={themeOption?.about_us?.blog}
            classes={{
              sliderClass: "col-12",
              sliderOption: BlogOptions,
              height: 150,
              width: 317,
            }}
            sliderKey="latestBlogSlider"
          />
        </Row>
      ) : (
        <NoDataFound
          data={{
            customClass: "bg-light no-data-added",
            title: "no_blog_found",
          }}
        />
      )}
    </WrapperComponent>
  );
};

export default OurBlog;
