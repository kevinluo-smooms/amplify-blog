import "../styles/globals.css";
import "../configureAmplify";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  const [signedInUser, setSignedInUser] = useState(false);

  useEffect(() => {
    authListener();
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedInUser(true);
        case "signOut":
          return setSignedInUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (err) {}
  }
  return (
    <ChakraProvider>
      <div>
        <NavBar signedInUser={signedInUser} />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
