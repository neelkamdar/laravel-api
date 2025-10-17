"use client";
import dynamic from "next/dynamic";
import { blog } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";

const BlogForm = dynamic(() => import("@/components/blog/BlogForm"), {
  ssr: false,
});
const FormWrapper = dynamic(() => import("@/utils/hoc/FormWrapper"), {
  ssr: false,
});

const AddBlog = () => {
  const { mutate, isLoading } = useCreate(blog, false, "/blog", "Blog Created Successfully");

  return (
    <FormWrapper title="add_blog">
      <BlogForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default AddBlog;
