import React from "react";
import CategoryBox from "@/components/common/categoryBox";

const CategoryStyle = ({categoryIds,style,image,theme,title,sliderOptions,selectedCategoryId,classes, sliderKey}) => {
  return (
    <>
      <CategoryBox
        categoryIds={categoryIds}
        style={style}
        image={image}
        theme={theme}
        title={title}
        classes={classes}
        sliderOptions={sliderOptions}
        selectedCategoryId={selectedCategoryId}
        sliderKey={sliderKey}
      />
    </>
  );
};

export default CategoryStyle;
