import gql from "graphql-tag";

export const signup = gql`
  mutation signup($signupInput: UserSignUpInput!) {
    signup(signupInput: $signupInput) {
      access_token
    }
  }
`;
