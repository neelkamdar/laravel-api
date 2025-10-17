import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import request from "../axiosUtils";
import SuccessHandle from "../customFunctions/SuccessHandle";

const useUpdate = (url, updateId, path, message, extraFunction, headerOption = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({mutationFn: (data) => request({ url: `${url}/${Array.isArray(updateId) ? updateId.join("/") : updateId}`, method: "put", data, headers: { ...headerOption} }, router),
    onSuccess: (resData) => {
      SuccessHandle(resData, router, path, message, pathname);
      extraFunction && extraFunction(resData);
    },
  });
};
export default useUpdate;
