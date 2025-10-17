import request from "@/utils/axiosUtils";
import { BlogAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogIdsContext from ".";

const BlogIdsProvider = (props) => {
  const router = useRouter();
  const [getBlogIds, setGetBlogIds] = useState({});
  const [filteredBlog, setFilteredBlog] = useState([]);
  const { data, refetch, isLoading } = useQuery({queryKey: [BlogAPI, getBlogIds?.ids], queryFn: () => request({ url: BlogAPI, params: { ...getBlogIds, status: 1 } }, router),
    enabled: !!getBlogIds.ids,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  
  useEffect(() => {
    if (data) {
      setFilteredBlog(data);
    }
  }, [data]);
  return <BlogIdsContext.Provider value={{ ...props, filteredBlog, setGetBlogIds, blogIdsLoader: isLoading }}>{props.children}</BlogIdsContext.Provider>;
};

export default BlogIdsProvider;
