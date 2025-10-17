// ----------------*****************----------------******************------------
export const BannerSliderOption4 = {
  speed: 500,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1417,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 601,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const productSliderOptions3 = {
  infinite: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const productSliderOptions5 = {
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1349,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1183,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 876,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 607,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const productSliderOptions6 = {
  arrows: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1583,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1327,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1170,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 865,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 613,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const osakaProductSliderOptions6 = {
  arrows: true,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1262,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1061,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 773,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 594,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const categorySliderOption7 = (totalItems) => {
  return {

    arrows: true,
    infinite: true,
    slidesToShow: totalItems > 7 ? 7 : totalItems,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1642,
        settings: {
          slidesToShow: totalItems > 6 ? 6 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1406,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1223,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: totalItems > 6 ? 6 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1036,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 791,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 557,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 447,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
    ],
  }
};

export const categorySliderOption8 = (totalItems) => {
  return {
    arrows: true,
    infinite: true,
    slidesToShow: totalItems > 8 ? 8 : totalItems,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1568,
        settings: {
          slidesToShow: totalItems > 8 ? 8 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1368,
        settings: {
          slidesToShow: totalItems > 7 ? 7 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1115,
        settings: {
          slidesToShow: totalItems > 6 ? 6 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 889,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 717,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 397,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
    ],
  }
};

export const categorySliderOption9 = (totalItems) => {
  return {
    arrows: true,
    infinite: true,
    slidesToShow: totalItems > 9 ? 9 : totalItems,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1568,
        settings: {
          slidesToShow: totalItems > 8 ? 8 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1368,
        settings: {
          slidesToShow: totalItems > 7 ? 7 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 1115,
        settings: {
          slidesToShow: totalItems > 6 ? 6 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 889,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 717,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 397,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
    ],
  }
};

export const SliderCategoryOption7 = (totalItems) => {
  return {

    arrows: false,
    infinite: true,
    slidesToShow: totalItems > 7 ? 7 : totalItems,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1630,
        settings: {
          slidesToShow: totalItems > 8 ? 8 : totalItems,
          autoplay: true,
          autoplaySpeed: 3500,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: totalItems > 7 ? 7 : totalItems,
        },
      },
      {
        breakpoint: 1384,
        settings: {
          slidesToShow: totalItems > 6 ? 6 : totalItems,
        },
      },
      {
        breakpoint: 1162,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
        },
      },
      {
        breakpoint: 951,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
        },
      },
      {
        breakpoint: 743,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
        },
      },
      {
        breakpoint: 546,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
    ],
  }
};

export const featureBlogSliderOption3 = (totalItems) => {
  return {
    arrows: true,
    infinite: true,
    slidesToShow: totalItems > 3 ? 3 : totalItems,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1684,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 668,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
        },
      },
    ],
  }
};

export const featureBlogSliderOption4 = (totalItems) => {
  return {
    arrows: true,
    infinite: true,
    slidesToShow: totalItems > 4 ? 4 : totalItems,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
        },
      },
    ],
  }
};

export const featureBlogSliderOptions4 = (totalItems) => {
  return {
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: totalItems > 3 ? 3 : totalItems,
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
        },
      },
      {
        breakpoint: 1215,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
        },
      },
      {
        breakpoint: 876,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
        },
      },
    ],
  }
};

export const detailedBannerSliderOption = {
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3200,
  responsive: [
    {
      breakpoint: 1417,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 601,
      settings: {
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
    // {
    //   breakpoint: 570,
    //   settings: {
    //     slidesToShow: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //   },
    // },
  ],
};

export const CategorySliderOption4 = {
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1630,
      settings: {
        slidesToShow: 8,
        autoplay: true,
        autoplaySpeed: 3500,
      },
    },
    {
      breakpoint: 1470,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1384,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1162,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 951,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 743,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 546,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const osakaCategoryOption = {
  arrows: false,
  infinite: true,
  slidesToShow: 9,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1630,
      settings: {
        slidesToShow: 8,
        autoplay: true,
        autoplaySpeed: 3500,
      },
    },
    {
      breakpoint: 1470,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1384,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1162,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 951,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 743,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 546,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const romeCategoryOption = {
  arrows: true,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1745,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 692,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 482,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const bestValueSliderOption = {
  arrows: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2580,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 601,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const romeBlogSliderOption = (totalItems) => {
  return {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: totalItems > 4 ? 4 : totalItems,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
        },
      },
    ],
  }
};

export const madridCategorySlider = {
  arrows: true,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1661,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1461,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const bankOfferSliderOption = (totalItem) => {
  return {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: totalItem > 3 ? 3 : totalItem,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: totalItem > 2 ? 2 : totalItem,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: totalItem > 1 ? 1 : totalItem,
        },
      },
    ],
  }
};

export const specialOfferSliderOffer = {
  arrows: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const madridFeatureBlog = (sliderItems) => {
  return {
    arrows: false,
    infinite: true,
    slidesToShow: sliderItems > 4 ? 4 : sliderItems,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: sliderItems > 4 ? 4 : sliderItems,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: sliderItems > 3 ? 3 : sliderItems,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: sliderItems > 2 ? 2 : sliderItems,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: sliderItems > 1 ? 1 : sliderItems,
        },
      },
    ],
  }
};

export const productDetailSlider = (length) => {
  return {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".product-main-1",
    dots: false,
    focusOnSelect: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: length,
          vertical: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: length,
          vertical: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          vertical: false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: length,
          vertical: false,
        },
      },
    ],
  };
};

export const productDetailTopSlider = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  arrows: false,
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1230,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const collectionCategorySlider = {
  arrows: true,
  infinite: false,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1660,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1501,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1251,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 684,
      settings: {
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

export const topBarContentSlider = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  vertical: true,
  variableWidth: false,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
};

export const viewModalSlider = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
};

export const viewModalSliderOption = {
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: ".slider-image",
  dots: false,
  focusOnSelect: true,
};

export const clientSectionSlider = (totalItems) => {
  return {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: totalItems > 3 ? 3 : totalItems,
    arrows: false,
    responsive: [
      {
        breakpoint: 1262,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
          autoplay: true,
          autoplaySpeed: 3500,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2800,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2800,
        },
      },
    ],
  }
};

export const creativeTeamSlider = (totalItems) => {
  return {
    arrows: false,
    infinite: true,
    slidesToShow: totalItems < 4 ? 4 : totalItems,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1690,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
          fade: true,
        },
      },
    ],
  }
};
export const reviewSectionSlider = (totalItems) => {
  return {
    arrows: false,
    infinite: true,
    slidesToShow: totalItems > 4 ? 4 : totalItems,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1690,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
          fade: true,
        },
      },
    ],
  }
};

export const latestBlogSlider = (totalItems) => {
  return {
    className: "slider-5 ratio_87 product-wrapper",
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: totalItems > 4 ? 4 : totalItems,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
        },
      },
      {
        breakpoint: 1215,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
        },
      },
      {
        breakpoint: 876,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: totalItems > 1 ? 1 : totalItems,
        },
      },
    ],
  }
};

export const ourBlogSlider = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
  arrows: false,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1215,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 876,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
export const headerProductSlider = {
  pauseOnHover: true,
  dots: false,
  infinite: true,
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
};

export const headerBlogSlider = {
  dots: false,
  infinite: true,
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
};

export const osakaSliderOption = {
  infinite: true,
  arrows: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const osakaFullSlider = {
  infinite: true,
  arrows: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1454,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 610,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const madridFullSlider = (slidesToShow, totalItems) => {
  return {
    infinite: true,
    arrows: true,
    slidesToShow: totalItems > slidesToShow ? slidesToShow : totalItems,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: totalItems > 5 ? 5 : totalItems,
        },
      },
      {
        breakpoint: 1215,
        settings: {
          slidesToShow: totalItems > 4 ? 4 : totalItems,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: totalItems > 3 ? 3 : totalItems,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: totalItems > 2 ? 2 : totalItems,
        },
      },
    ],
  }
};

export const bookDemoSliderOption = {
  arrows: false,
  infinite: true,
  slidesToShow: 9,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1630,
      settings: {
        slidesToShow: 8,
        autoplay: true,
        autoplaySpeed: 3500,
      },
    },
    {
      breakpoint: 1470,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1384,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1162,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 951,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 743,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 546,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const featurePanelSlider = {
  arrows: true,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1745,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

export const categoryPanelSlider = {
  arrows: true,
  infinite: true,
  slidesToShow: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1745,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 692,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 482,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
export const featuredSlider = {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2800,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
export const featuredBlogs = {
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1586,
      settings: {
        slidesToShow: 3,
        dots: true,
      },
    },
    {
      breakpoint: 1140,
      settings: {
        slidesToShow: 2,
        dots: true,
      },
    },
    {
      breakpoint: 710,
      settings: {
        slidesToShow: 1,
        dots: true,
        fade: true,
      },
    },
  ],
};
