import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";

const School = () => {
  const { user } = useAuthContext();
  const route = useRouter();
  // Adming route?.query?.id
  // user?.id;
  return "School";
};
export default School;
