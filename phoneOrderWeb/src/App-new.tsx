import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { BrowserRouter } from "react-router-dom";
import { useAction } from "./app-hook";
import { Router } from "./routes";
import { AuthProvider } from "./hooks/auth-provider";
import { ConfigProvider } from "antd";

dayjs.extend(utc);

function App() {
  const { isLoaded } = useAction();

  return isLoaded ? (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <Router />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  ) : (
    <></>
  );
}

export default App;
