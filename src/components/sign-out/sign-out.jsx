

import { useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";

// import logOut from "../../assets/img/icons/log-out.png";

import "./sign-out.scss";



const SignOut = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      // console.log(error);
    });
    
  }

    return (    
      <div className="sign-out">
        <button onClick={handleSubmit}>Log Out</button>
      </div>
      
    );
};

export default SignOut;