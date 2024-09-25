import { useEffect, useState } from "react";
import { InitialAppSetting } from "./appsettings";

export const useAction = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    InitialAppSetting().then(() => setIsLoaded(true));
  }, []);

  return { isLoaded };
};
