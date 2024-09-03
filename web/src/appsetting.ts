export interface IAppSettings {
  serverUrl: string;
  tokenKey: string;
}

const settings = (window as any).appsettings;

export const InitialAppSetting = async () => {
  if ((window as any).appsettings) return (window as any).appsettings;

  await fetch("../../../../../appsetting.json", {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res: IAppSettings) => {
      (window as any).appsettings = res;
    });
};

export default settings as IAppSettings;
