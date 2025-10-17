import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import request from "../axiosUtils";
import { selfData } from "../axiosUtils/API";
import ConvertPermissionArr from "../customFunctions/ConvertPermissionArr";

const usePermissionCheck = (permissionTypeArr, keyToSearch) => {
  const [ansData, setAnsData] = useState([]);
  const path = usePathname();
  const moduleToSearch = keyToSearch ? keyToSearch : path.split("/")[1]
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({ queryKey: [selfData], queryFn: () => request({ url: selfData },router),
    enabled: false
  });

  useEffect(() => {
    function removeDuplicateObjects(array) {
      const uniqueObjects = [];
      const seenNames = new Set();
    
      for (const obj of array) {
        if (!seenNames.has(obj.name)) {
          uniqueObjects.push(obj);
          seenNames.add(obj.name);
        }
      }
      return uniqueObjects;
    }
    
    if (JSON.parse(localStorage.getItem("account"))?.permissions?.length > 0) {
      const securePaths = removeDuplicateObjects(ConvertPermissionArr(JSON.parse(localStorage.getItem("account"))?.permissions));
      setAnsData(permissionTypeArr.map((permissionType) => Boolean(securePaths?.find((permission) => moduleToSearch == permission.name)?.permissionsArr.find((permission) => permission.type == permissionType))));
    } else {
      refetch();
      if (data) {
        const securePaths = ConvertPermissionArr(data?.data?.permissions);
        setAnsData(permissionTypeArr.map((permissionType) => Boolean(securePaths?.find((permission) => moduleToSearch == permission.name)?.permissionsArr.find((permission) => permission.type == permissionType))));
      }
    }
  }, [isLoading]);

  return ansData;
};

export default usePermissionCheck;
