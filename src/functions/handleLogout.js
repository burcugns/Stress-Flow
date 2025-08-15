  
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export const handleLogout = async (navigate) => {
  try {
    await signOut(auth);
    localStorage.clear();
    navigate("/home");
  } catch (error) {
  }
};
