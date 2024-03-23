import "./OAuth.css";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
const OAuth = () => {
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log(user);
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      toast.success("Sign Up successfull");
    } catch (error) {
      toast.error("something went wrong,Try again");
    }
  }
  return (
    <div onClick={onGoogleClick}>
      <button
        type="button"
        className="btn btn-danger btn-block col-12 d-flex align-items-center justify-content-center"
      >
        <FcGoogle
          className="bg-white rounded mx-1 "
          style={{ fontSize: "18px" }}
        />
        <span className="btn-lg">Continue with Google</span>
      </button>
    </div>
  );
};

export default OAuth;
