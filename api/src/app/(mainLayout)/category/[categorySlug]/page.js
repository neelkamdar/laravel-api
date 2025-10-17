import CategoryMainPage from "@/components/category";
import React from "react";

const categorySlugPage = async ({ params }) => {
  const { categorySlug } = await params;
  
  return <CategoryMainPage categorySlug={categorySlug} />;
};

export default categorySlugPage;
