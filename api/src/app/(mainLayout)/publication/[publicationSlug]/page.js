"use client";

import React from "react";
import PublicationMainPage from "@/components/publication";

const PublicationSlugPage = async ({ params }) => {
  const { publicationSlug } = await params;
  return <PublicationMainPage slug={publicationSlug} />;
};

export default PublicationSlugPage;
