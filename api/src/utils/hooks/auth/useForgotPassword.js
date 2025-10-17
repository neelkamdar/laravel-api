import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import request from "../../axiosUtils";
import { forgotPassword } from "../../axiosUtils/API";
import { ToastNotification } from "../../customFunctions/ToastNotification";
import { emailSchema, YupObject } from "../../validation/ValidationSchemas";

export const ForgotPasswordSchema = YupObject({ email: emailSchema });

const useHandleForgotPassword = (setShowBoxMessage) => {
  const router = useRouter();
  return useMutation({mutationFn: (data) => request({ url: forgotPassword, method: "post", data },router),
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200) {
        setShowBoxMessage();
        ToastNotification("success", responseData.data.message);
        Cookies.set('ue', requestData.email)
        router.push("/auth/otp-verification");
      } else {
        setShowBoxMessage("This email is not exist");
      }
    },
  },
  );
};
export default useHandleForgotPassword;
