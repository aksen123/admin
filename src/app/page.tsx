import useSWR from "swr";
import Table from "./Components/Table";
import { storeApi } from "./service/store";
import LoginPage from "./Components/LoginPage";

export default function Home() {
  return <LoginPage />;
}
