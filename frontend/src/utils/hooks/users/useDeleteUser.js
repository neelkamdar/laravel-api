import { useMutation } from "@tanstack/react-query";
import request from "../../axiosUtils";
import { user } from "../../axiosUtils/API";
import { useRouter } from "next/navigation";

const useDeleteRole = () => {
  const router = useRouter();
  return useMutation({mutationFn: (deleteId) => request({ url: `${user}/${deleteId}`, method: "delete" },router)});
};

export default useDeleteRole;
