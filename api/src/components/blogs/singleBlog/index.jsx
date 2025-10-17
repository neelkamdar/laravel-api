"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import WrapperComponent from "@/components/common/WrapperComponent";
import request from "@/utils/axiosUtils";
import { BlogAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BlogCardDetails from "../BlogCardDetails";
import Sidebar from "../sidebar/Sidebar";
import Loader from "@/layout/loader";

const SingleBlog = ({ params }) => {
  const router = useRouter();

  const { data: Blog, isLoading } = useQuery({
    queryKey: [params],
    queryFn: () => request({ url: `${BlogAPI}/slug/${params}` }, router),
    enabled: !!params,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Breadcrumb
        title={Blog?.title}
        subNavigation={[
          { name: "blogs", link: "/blogs" },
          { name: Blog?.title },
        ]}
      />
      <WrapperComponent
        classes={{ sectionClass: "blog-section section-b-space", row: "g-4" }}
        customCol={true}
      >
        <BlogCardDetails Blog={Blog} key={params} />
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default SingleBlog;
