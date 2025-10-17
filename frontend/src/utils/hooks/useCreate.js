import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import request from "../axiosUtils";
import SuccessHandle from "../customFunctions/SuccessHandle";
import { ToastNotification } from "../customFunctions/ToastNotification";

const useCreate = ( url, updateId, path = false, message, extraFunction, notHandler, responseType, method, params, headerOption) => {
  const router = useRouter();
  const pathname = usePathname();
  return useMutation({mutationFn: (data) => request({url: updateId ? `${url}/${Array.isArray(updateId) ? updateId.join("/") : updateId}`  : url, data, method: method || "post", responseType: responseType ? responseType : "", params: params ? params : null, headers: { ...headerOption }}, router),
      onSuccess: (resDta) => {
        if (resDta?.response?.data?.success === false) {
          ToastNotification("error", resDta?.response?.data?.message);
        } else {
        !notHandler && SuccessHandle(resDta, router, path, message, pathname);
        extraFunction && extraFunction(resDta);
        }
      },
      onError: (err) => {
        return err;
      },
    }
  );
};

export default useCreate;