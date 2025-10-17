import MenuSkeleton from "@/components/common/skeletonLoader/menuSkeleton";
import request from "@/utils/axiosUtils";
import { MenuAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuList from "./MenuList";

const MainHeaderMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState([]);
  const {
    data: menuData,
    refetch: productRefetch,
    isLoading: menuIsLoading,
  } = useQuery({
    queryKey: [MenuAPI],
    queryFn: () => request({ url: MenuAPI }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data,
  });
  useEffect(() => {
    productRefetch();
  }, []);
  return (
    <>
      {menuIsLoading ? (
        <MenuSkeleton />
      ) : (
        menuData?.length > 0 && (
          <ul className="navbar-nav">
            {menuData?.map((menu, i) => (
              <MenuList
                menu={menu}
                key={i}
                customClass={`${!menu?.path ? "dropdown" : ""} nav-item `}
                level={0}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default MainHeaderMenu;
