import Home from "@/components/view/Home";
import Login from "@/components/view/Login";
import { useAuthContext } from "@/contexts/authContext";

export default function MainPage() {
  const { user, setUser } = useAuthContext();

  return <div>{user ? <Home /> : <Login />}</div>;
}
