import Avatar from "@/components/common/Avatar";
import Btn from "@/elements/buttons/Btn";
import CategoryContext from "@/helper/categoryContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import { placeHolderImage } from "../../../data/CommonPath";
import categoryImage from "../../../../public/assets/images/category.png";
import NoDataFound from "../NoDataFound";
import {
  categorySliderOption7,
  categorySliderOption8,
  categorySliderOption9,
  SliderCategoryOption7,
} from "../../../data/SliderSettingsData";

const CategoryBox = ({
  dataAPI,
  style,
  title,
  categoryIds,
  theme,
  sliderOptions,
  sliderKey,
  classes = {},
  image = true,
}) => {
  const { filterCategory } = useContext(CategoryContext);

  const categoryData = useMemo(() => {
    return categoryIds?.length > 0
      ? filterCategory("product")?.filter((category) =>
          categoryIds?.includes(category.id)
        )
      : filterCategory("product");
  }, [filterCategory("product")]);

  const handleClick = (event) => {
    event.preventDefault();
  };

  const { t } = useTranslation("common");

  const option = {
    categorySliderOption8: categorySliderOption8,
    categorySliderOption9: categorySliderOption9,
    SliderCategoryOption7: SliderCategoryOption7,
    categorySliderOption7: categorySliderOption7,
  };

  return (
    <>
      {/* Category Style Vertical */}
      {style == "vertical" && (
        <div className="category-menu section-b-space">
          <h3>{title ? title : "categories"}</h3>
          {categoryData?.length && (
            <ul>
              {categoryData?.map((category, index) => (
                <li key={index}>
                  <div className="category-list">
                    <Avatar
                      data={category?.category_icon}
                      placeHolder={categoryImage}
                      name={category?.name}
                    />
                    <h5>
                      <Link href={`/collections?category=${category?.slug}`}>
                        {category?.name}
                      </Link>
                    </h5>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!categoryData?.length && (
            <ul>
              <li>
                <div className="category-list">
                  <h5>
                    <a onClick={handleClick}>{t("no_category_found")}</a>
                  </h5>
                </div>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Category Classic Vertical  */}
      {style == "classic_vertical" && (
        <div className="shop-left-sidebar">
          {categoryData?.length && (
            <ul className="nav nav-pills mb-3 custom-nav-tab">
              {categoryData?.map((category, index) => (
                <li key={index} className="nav-item">
                  <Btn
                    className={
                      selectedCategorySlug.length &&
                      selectedCategorySlug.includes(!category.slug)
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={redirectToCollection(!category.slug)}
                  >
                    {" "}
                    {category.name}
                    <Avatar
                      data={category?.category_icon}
                      placeHolder={placeHolderImage}
                      name={category?.name}
                    />
                  </Btn>
                </li>
              ))}
            </ul>
          )}
          {categoryData?.length && (
            <NoDataFound
              data={{
                customClass: "no-data-added bg-light",
                title: "no_category_found",
              }}
            />
          )}
        </div>
      )}

      {/* Category Style Horizontal */}
      {style == "horizontal" && (
        <div className="product-wrapper no-arrow category-slider">
          <Slider {...option[sliderKey](categoryData.length || 1)}>
            {categoryData?.map((category, index) => (
              <div key={index}>
                {theme == "paris" && (
                  <div>
                    <Link
                      href={`/collections?category=${category?.slug}`}
                      className={`category-box ${classes?.link} category-dark`}
                    >
                      <div>
                        <Avatar
                          data={category?.category_icon}
                          placeHolder={placeHolderImage}
                          name={category.name}
                        />
                        <h5>{category.name}</h5>
                      </div>
                    </Link>
                  </div>
                )}
                {theme == "madrid" && (
                  <div className="category-box-list">
                    <Link
                      className="category-name"
                      href={`/collections?category=${category?.slug}`}
                    >
                      <h4>{category.name}</h4>
                      <h6>
                        {category.products_count} {"items"}
                      </h6>
                    </Link>
                    <div className="category-box-view">
                      <Link
                        className="category-name"
                        href={`/collections?category=${category?.slug}`}
                      >
                        {
                          <Image
                            src={
                              category?.category_image?.original_url ||
                              categoryImage
                            }
                            className="img-fluid"
                            alt="Shop Category"
                            height={133}
                            width={133}
                          />
                        }
                      </Link>
                      <Btn className="btn shop-button">
                        <span>{"Shop Now"}</span>
                        <RiArrowRightSLine />
                      </Btn>
                    </div>
                  </div>
                )}

                {theme == "rome" && (
                  <div className="shop-category-box border-0">
                    <Link
                      href={`/collections?category=${category?.slug}`}
                      className="circle-1"
                    >
                      {
                        <Image
                          src={
                            category?.category_image?.original_url ||
                            categoryImage
                          }
                          className="img-fluid"
                          alt={category?.name || ""}
                          width={106}
                          height={90}
                        />
                      }
                    </Link>
                    <div className="category-name">
                      <h6>{category.name}</h6>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/*  Category Style classic  */}
      {style == "classic" && (
        <Slider {...classes?.sliderOption}>
          {categoryData?.map((category, index) => (
            <div key={index}>
              <div className="shop-category-box border-0" key={category.id}>
                <a
                  className="circle-1"
                  onClick={redirectToCollection(!category.slug)}
                >
                  {/* <Avatar data={image} placeHolder={placeHolderImage} name={category.name} />
                                                <Avatar data={category?.category_icon} placeHolder={placeHolderImage} name={category.name} /> */}
                </a>
                <div className="category-name">
                  <h6>{category.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/*  Category Style Filter  */}
      {categoryData?.length && style == "filter" && (
        <ul className="nav nav-tabs tab-style-color-2 tab-style-color">
          <li className="nav-item">
            <Btn
              className={
                !selectedCategoryId ? "nav-link btn active" : "nav-link btn"
              }
              onClick={selectCategory()}
            >
              {t("all")}
            </Btn>
          </li>
          {categoryData?.map((category, index) => (
            <li key={index} className="nav-item">
              <Btn
                className={
                  selectedCategoryId == category.id
                    ? "nav-link btn active"
                    : "nav-link btn"
                }
                onClick={selectCategory(category.id)}
              >
                {" "}
                {category.name}
              </Btn>
            </li>
          ))}
        </ul>
      )}

      {/* Category Style Dropdown  */}
      {categoryData?.length && style == "dropdown" && (
        <ul className="category-list">
          {categoryData?.map((category, index) => (
            <li key={index} className="onhover-category-list">
              <Avatar
                data={
                  category?.category_icon
                    ? category?.category_icon?.original_url
                    : ""
                }
                name={category?.name}
              />
              <h6>{category?.name}</h6>
            </li>
          ))}
        </ul>
      )}
      {!categoryData?.length && style == "dropdown" && (
        <li className="onhover-category-list">
          <Link onClick={handleClick} className="category-name">
            <h6>{"no_category_found"}</h6>
          </Link>
        </li>
      )}

      {theme == "moscow" && (
        <Row>
          <Col xs="12">
            <div className="position-relative">
              {categoryData?.length > 0 ? (
                <Slider
                  {...classes?.sliderOption}
                  className="slider-9 book-category-slider"
                >
                  {categoryData?.map((elem, i) => (
                    <Link
                      key={i}
                      href={`/collections?category=${elem?.slug}`}
                      className={`category-box`}
                    >
                      <img
                        src={
                          elem?.category_image
                            ? elem?.category_image?.original_url
                            : ""
                        }
                        alt={elem?.name || ""}
                        className="img-fluid"
                        width={305}
                        height={166}
                      />
                    </Link>
                  ))}
                </Slider>
              ) : (
                <NoDataFound
                  data={{
                    customClass: "bg-light no-data-added",
                    title: "no_category_found",
                  }}
                />
              )}
            </div>
            <div className="shelf"></div>
          </Col>
        </Row>
      )}

      {/* theme-classic  */}
      {theme == "cairo" && (
        <Slider {...sliderOptions} className={classes.sliderClass}>
          {categoryData?.map((data, index) => (
            <div key={index}>
              <Link
                href={`/collections?category=${data?.slug}`}
                className="cate-box"
              >
                <span>{data?.name}</span>
              </Link>
            </div>
          ))}
        </Slider>
      )}

      {style == "cairo_classic" && (
        <div className="category-panel-slider no-arrow">
          <Slider {...sliderOptions} className={classes.sliderClass}>
            {categoryData?.map((data, index) => (
              <div key={index}>
                <Link
                  href={`/collections?category=${data?.slug}`}
                  className="cate-box"
                >
                  {data?.category_icon?.original_url && (
                    <Image
                      alt={data?.name || ""}
                      src={data?.category_icon?.original_url}
                      height={44.56}
                      width={44.56}
                    />
                  )}
                  <span>{data?.name}</span>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default CategoryBox;
