import { useAuthContext } from "@/contexts/authContext";
import { USER_TYPE } from "@/static/constant";
import Admin from "./Admin";
import School from "./School";
import Student from "./Student";
import Teacher from "./Teacher";

const Home = () => {
  const { user } = useAuthContext();

  switch (user?.type) {
    case USER_TYPE["ADMIN"]:
      return <Admin />;
    case USER_TYPE["SCHOOL"]:
      return <School />;
    // case USER_TYPE["STUDENT"]:
    //   return <Student />;
    // case USER_TYPE["TEACHER"]:
    //   return <Teacher />;
    default:
      <></>;
  }
};

export default Home;

//first render all schools in admin page
//then go to school and render all classes of that school make crud for class
//then go to class and render all student of that class make crud for student

//when I signup as a school then I got school Id in user object and when I loggedin as a school then I got school Id in user, then get school details and their classes using schoolId
