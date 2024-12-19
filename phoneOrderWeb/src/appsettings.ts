export interface IAppSettings {
  token: string;
  serverUrl: string;
}

const settings = (window as any).appsettings;

export async function InitialAppSetting() {
  if ((window as any).appsettings) return (window as any).appsettings;

  await fetch("../appsetting.json", {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res: IAppSettings) => {
      (window as any).appsettings = res;
    });
}

export default settings as IAppSettings;
