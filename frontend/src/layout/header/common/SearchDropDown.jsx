import Link from "next/link";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
const RecursiveCategory = ({ categories }) => (
  <>
    {categories.map((category) => (
      <Fragment key={category.id}>
        <div>
          <Link
            href={{
              pathname: `/category/${category?.slug}`,
            }}
          >
            {category.name}
          </Link>
        </div>
        {category.subcategories && (
          <RecursiveCategory categories={category?.subcategories} />
        )}
      </Fragment>
    ))}
  </>
);

const SearchDropDown = React.forwardRef((props, ref) => {
  const {
    searchValue,
    categoryLoading,
    categoryData,
    searchArr,
    selectedItemIndex,
  } = props;
  const { t } = useTranslation("common");
  const skeleton = Array.from({ length: 3 }, (_, index) => index);
  const queryParams = searchValue ? { search: searchValue } : null;
  return (
    <div className="search-suggestion-box" ref={ref}>
      <div
        className={
          !(categoryData?.length || categoryLoading)
            ? "recent-search-section mt-0 mb-1"
            : "recent-search-section mb-4"
        }
      >
        {categoryLoading ? (
          <div className="filter-row filter-skeleton">
            {skeleton.map((number) => (
              <div className="skeleton__p" key={number}></div>
            ))}
          </div>
        ) : (
          <>
            {categoryData?.length > 0 ? (
              <>
                <h4 className="page-title">{t("related_categories")}</h4>
                <div className="filter-row">
                  <RecursiveCategory categories={categoryData} />
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      <div className="recent-search-section">
        <h4 className="page-title">
          {t("related_product")}
          <Link href={{ pathname: `/search`, query: queryParams }}>
            {t("see_all")}
          </Link>
        </h4>
        {searchArr?.length == 0 ? (
          <div className="not-found-box">
            <h5>
              No results for <span>{searchValue}</span>
            </h5>
          </div>
        ) : (
          <ul>
            {searchArr?.map((data, index) => (
              <li
                id={`searchItem_${index}`}
                className={` result-item ${
                  selectedItemIndex == index ? " selected" : ""
                }`}
                key={index}
              >
                <div className="suggestion-image">
                  <img
                    src={
                      data?.original_url
                        ? data?.original_url
                        : "/assets/images/placeholder.png"
                    }
                    alt="product image"
                  />
                </div>
                <div className="suggestion-category">
                  <Link href={`/product/${data?.slug}`}>{data.title}</Link>
                  {data?.categories?.map((category, index) => (
                    <p key={index}>
                      <Link
                        href={{
                          pathname: "/collections",
                          query: { category: category?.slug },
                        }}
                      >
                        {category.name}
                      </Link>
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default SearchDropDown;
