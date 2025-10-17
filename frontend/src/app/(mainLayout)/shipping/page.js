'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import Link from "next/link";
import FormShipping from "@/components/shipping/FormShipping";
import Btn from "@/elements/buttons/Btn";
import request from "@/utils/axiosUtils";
import { shipping } from "@/utils/axiosUtils/API";
import useDelete from "@/utils/hooks/useDelete";
import FormWrapper from "@/utils/hoc/FormWrapper";
import DeleteButton from "@/components/table/DeleteButton";
import NoDataFound from "@/components/commonComponent/NoDataFound";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import Loader from "@/components/commonComponent/Loader";
import { useRouter } from "next/navigation";

const Shipping = () => {
  const [create, edit, destroy] = usePermissionCheck(["create", "edit", "destroy"]);
  const [active, setActive] = useState(false);
  const router =useRouter()
  const { refetch, data, isLoading } = useQuery({ queryKey: [shipping], queryFn: () => request({ url: shipping },router),
    refetchOnWindowFocus: false, select: (data) => data.data,
  });

  const { mutate } = useDelete(shipping, shipping);
  if (isLoading) return <Loader />
  return (
    <>
      <FormWrapper title="Shipping" modal={
        create && <Btn className="align-items-center btn-theme add-button" title="select_country" onClick={() => setActive("create")}>
          <FiPlus /></Btn>
      }>
        <FormShipping open={"create" === active ? true : false} setActive={setActive} shippingData={data} refetch={refetch}/>
        {
          data?.length > 0 ?
            <ul className="country-list">
              {data?.map((elem, index) => (
                <li key={index}>
                  <h5>{elem.country.name}</h5>
                  {edit && <Link href={`/shipping/edit/${elem?.id}`}><RiPencilLine className="text-success" />
                  </Link>}
                  {destroy && <DeleteButton id={elem?.id} mutate={mutate} />}
                </li>
              ))}
            </ul>
            : <NoDataFound />
        }
      </FormWrapper>
    </>
  );
};

export default Shipping;
