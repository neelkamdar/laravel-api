import Image from "next/image";
import React from "react";

const Img = (props) => {
  const newProps = { ...props, src: process.env.URL + "/" + props["src"] };
  return <Image {...newProps} />;
};

export default Img;
