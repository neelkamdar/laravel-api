import React, { useContext, useMemo } from "react";
import WrapperComponent from "@/components/common/WrapperComponent";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import RatioImage from "@/utils/RatioImage";
import CategoryContext from "@/helper/categoryContext";
import  LiveImagePath  from "@/utils/constants";

const CairoBanner = ({ dataAPI }) => {
  const { filterCategory } = useContext(CategoryContext);

  const categoryData = useMemo(() => {
    return dataAPI?.main_banner?.category_ids.length > 0
      ? filterCategory("product")?.filter((category) =>
        dataAPI?.main_banner?.category_ids?.includes(category.id)
      )
      : filterCategory("product");
  }, [dataAPI, filterCategory("product")]);

  return (
    <WrapperComponent
      colProps={{ xs: 12 }}
      classes={{
        fluidClass: "p-0",
        sectionClass: "home-search-full pt-0 overflow-hidden gradient-home",
      }}
    >
      <div className="slider-animate">
        <div>
          <div className="skeleton-banner-xl">
            <div className="skeleton-text-wrap">
              <span className="placeholder col-7" />
              <span className="placeholder col-5" />
              <span className="placeholder col-4" />
              <span className="placeholder col-6" />
            </div>
          </div>
          <div className="home-contain rounded-0 p-0 b-top bg-size blur-up lazyloaded">
            <RatioImage
              className="bg-img img-fluid"
              src={`${LiveImagePath}${dataAPI?.main_banner?.image_url}`}
              alt="home-banner"
            />
            <div className="home-detail p-center text-center home-overlay position-relative">
              <div>
                <div className="content">
                  <h1>{dataAPI?.main_banner?.title}</h1>
                  <h3>{dataAPI?.main_banner?.sub_title}</h3>
                  <InputGroup className="search-box">
                    <Input type="search" placeholder="Search..." />
                    <InputGroupText>
                      <select className="form-select ">
                        <option value="">Select Category</option>
                        {categoryData?.map?.((data, index) => <option key={index} value={data?.name}>{data?.name}</option>)}
                      </select>
                    </InputGroupText>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
};

export default CairoBanner;
