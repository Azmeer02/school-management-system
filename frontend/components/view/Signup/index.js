import { signup } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Formik } from "formik";

const SignUp = () => {
  const [signupMutation, { loading: signupLoading }] = useMutation(signup);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4">Sign Up</Typography>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              phoneNumber: "",
              userType: "admin",
              schoolName: "",
              schoolAddress: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                const {
                  firstname,
                  lastname,
                  email,
                  password,
                  phoneNumber,
                  userType,
                  schoolName,
                  schoolAddress,
                } = values;

                await signupMutation({
                  variables: {
                    signupInput: {
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      password: password,
                      phoneNumber: phoneNumber,
                      userType: userType,
                      schoolName: schoolName,
                      schoolAddress: schoolAddress,
                    },
                  },
                });
                resetForm({ values: "" });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <TextField
                  name="firstname"
                  label="Firstname"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.firstname}
                  value={values.firstname}
                />
                <TextField
                  name="lastname"
                  label="Lastname"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.lastname}
                  value={values.lastname}
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                />
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  handleChange={handleChange}
                  error={errors.password}
                  value={values.password}
                />
                <TextField
                  name="phoneNumber"
                  label="Phone Number (Optional)"
                  variant="outlined"
                  handleChange={handleChange}
                  error={errors.phoneNumber}
                  value={values.phoneNumber}
                />
                <label>
                  <Field type="radio" name="userType" value="admin" />
                  Admin
                </label>
                <label>
                  <Field type="radio" name="userType" value="school" />
                  School
                </label>
                {values.userType === "school" && (
                  <>
                    <TextField
                      name="schoolName"
                      label="schoolName"
                      variant="outlined"
                      handleChange={handleChange}
                      error={errors.schoolName}
                      value={values.schoolName}
                    />
                    <TextField
                      name="schoolAddress"
                      label="schoolAddress"
                      variant="outlined"
                      handleChange={handleChange}
                      error={errors.schoolAddress}
                      value={values.schoolAddress}
                    />
                  </>
                )}
                <Button
                  variant="outlined"
                  disabled={signupLoading}
                  onClick={handleSubmit}
                >
                  Sign up as {values.userType}
                </Button>
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
