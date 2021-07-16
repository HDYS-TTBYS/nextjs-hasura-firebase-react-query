import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import firebase from '../firebaseConfig';

export const useFirebaseAuth = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLogin, setisLogin] = useState(true);

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  }, []);

  const pwChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  }, []);

  const resetInput = useCallback(() => {
    setemail('');
    setpassword('');
  }, []);

  const toggleMode = useCallback(() => {
    setisLogin(!isLogin);
  }, [isLogin]);

  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLogin) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        try {
        } catch (error) {
          alert(error.message);
        }
        resetInput();
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error.message);
        }
        resetInput();
      }
    },
    [email, password, isLogin, resetInput]
  );

  return {
    email,
    password,
    emailChange,
    pwChange,
    resetInput,
    isLogin,
    toggleMode,
    authUser,
  };
};
