"use client";

import React from "react";
import AuthorMainPage from "@/components/author";

const AuthorSlugPage = async ({ params }) => {
  const { authorSlug } = await params;

  return <AuthorMainPage slug={authorSlug} />;
};

export default AuthorSlugPage;
