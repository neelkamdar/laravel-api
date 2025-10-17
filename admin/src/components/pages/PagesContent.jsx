"use client";
import React from "react";
import { Container } from "reactstrap";
import Breadcrumb from "../common/Breadcrumb";
import PageCard from "./PageCard";

const PagesContent = ({ params }) => {
  const title = params?.split("-").join(" ");

  return (
    <>
      <Breadcrumb
        title={title}
        subNavigation={[{ name: "pages" }, { name: params }]}
      />
      <section className="blog-section section-b-space section-t-space">
        <Container>
          <PageCard params={params} />
        </Container>
      </section>
    </>
  );
};

export default PagesContent;
