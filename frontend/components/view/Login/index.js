import { useAuthContext } from "@/contexts/authContext";

const Login = () => {
  const { user, setUser } = useAuthContext();
  // const hand = () => {
  //   setUser();
  // };
  return "Login";
};

export default Login;
