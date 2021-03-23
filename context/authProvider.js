import React, { useContext, useState, useEffect }  from "react";
import {auth} from '../firebase/Fire'
import {db} from '../firebase/Fire';


export const AuthContext  = React.createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth.signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e)
            }
          },
          signup: async (values) => {
            try {
              console.log(values.email);
              await auth.createUserWithEmailAndPassword(values.email, values.password).then(() => {
                db.collection("Users").doc(auth.currentUser.uid).set(
                  {
                    email: values.email,
                    userName: values.userName
                  }
                ).catch(e => {
                  console.log('Could not create  a user for some reaason');
                  console.log(values.email);
                  console.log(e);
                });
              });
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await auth.signOut();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
