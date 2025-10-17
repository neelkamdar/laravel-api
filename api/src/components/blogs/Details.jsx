"use client";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { BlogAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import WrapperComponent from "../common/WrapperComponent";
import BlogCard from "./blogCard";
import Sidebar from "./sidebar/Sidebar";

const BlogDetail = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const querySearchCategory = searchParams?.get("category");
  const querySearchTag = searchParams?.get("tag");
  const breadcrumbTitle = querySearchCategory ? `Blogs:${querySearchCategory}` : querySearchTag ? `Blogs:${querySearchTag}` : "Blogs";
  const { data: BlogData, isLoading, refetch } = useQuery({queryKey: [BlogAPI, querySearchCategory, querySearchTag], queryFn: () => request({ url: BlogAPI, params: { page, paginate: 9, category: querySearchCategory ?? "", tag: querySearchTag ?? "" } }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, [page, querySearchCategory, querySearchTag]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb title={breadcrumbTitle} subNavigation={[{ name: "blogs", link: "/blogs" }]} />
      <WrapperComponent classes={{ sectionClass: "blog-section section-b-space", row: "g-4" }} customCol={true}>
        <BlogCard page={page} setPage={setPage} BlogData={BlogData} isLoading={isLoading} refetch={refetch} />
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default BlogDetail;
