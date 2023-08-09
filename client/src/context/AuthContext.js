import { useContext, createContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onIdTokenChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../redux/user/thunks";
import { resetUser, setUser } from "../redux/user/reducer";

const GoogleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const googleSignIn = () => {
    signInWithPopup(auth, GoogleProvider).catch((err) => {
      console.error(err.message);
    });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, displayName, email, photoURL } = currentUser;
        const userToAdd = {
          _id: uid,
          email: email,
          name: displayName,
          profilePic: photoURL
        };
        dispatch(addUserAsync(userToAdd)).then((user) => {
          let payload = { user: user };
          dispatch(setUser(payload));
        });
      } else {
        dispatch(resetUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
