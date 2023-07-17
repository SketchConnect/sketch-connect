import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onIdTokenChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../redux/user/thunks";

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const AppleProvider = new OAuthProvider("apple.com");

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const googleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const facebookSignIn = () => {
    console.log("into facebookSignIn in AuthContext");
    signInWithPopup(auth, FacebookProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const appleSignIn = () => {
    signInWithPopup(auth, AppleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, displayName, email, photoURL } = currentUser;
        setUser({ uid, displayName, email, photoURL });
        const userToAdd = {
          _id: uid,
          email: email,
          name: displayName,
          profilePic: photoURL
        };
        console.log("user is", userToAdd);
        dispatch(addUserAsync(userToAdd));
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, facebookSignIn, appleSignIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
