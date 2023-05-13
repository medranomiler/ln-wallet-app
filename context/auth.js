import { useRouter, useSegments } from "expo-router";
import axios from 'axios'
import React from "react";
import { compare } from "react-native-bcrypt"
import * as SecureStore from 'expo-secure-store';


const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/authenticate");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export const signUp = async (email, password, profilePhoto, apiKey, adminKey) => {
  try {
    const response = await axios.post('https://user-api-sigma.vercel.app/api/signup',
      {
        email, password, profilePhoto, apiKey, adminKey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      router.replace('/sign-in');
    }
  } catch (error) {
    console.error(error);
  }
};


export function Provider(props) {
  const [user, setAuth] = React.useState(null);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  

  useProtectedRoute(user);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('https://user-api-sigma.vercel.app/api/signin', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const { user } = await response.data;
        console.log("Login API response received. Authenticating user credentials ")
        const validEmail = user.email
        const validPassword = user.password
        const apiKey = user.apiKey
        const adminKey = user.adminKey
  
        // Authenticate user with email and password.
        const passwordMatch = new Promise((resolve, reject) => {
          compare(password, validPassword, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
  
        if (email === validEmail && (await passwordMatch)) {
          console.log("Success! User logged in")
          save("apiKey", apiKey)
          save("adminKey", adminKey)
          setAuth(user); // Set user info
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}