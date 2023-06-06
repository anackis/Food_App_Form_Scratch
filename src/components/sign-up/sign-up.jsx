
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate} from 'react-router-dom';
import { getAllUsers } from "../../utils/firebase/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { 
  createUserDocumentFromAuth, 
  createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase";
import userImg from "../../assets/Img/icons/user-icon.png";
import "./sign-up.scss";


const SignUp = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .required('Display Name is required')
      .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, 'Please enter your first and last name'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  function generateUniqueId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '#';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
}


  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ displayName, email, password }) => {
      try {
        let id;
        let userExists = true;
        while (userExists) {
          id = generateUniqueId();
          const users = await getAllUsers();
          userExists = users.some(user => user.id === id);
        }

        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, {
          id, 
          displayName, 
          kcal: "", 
          userImg: userImg,
          diet: [
            {day: "Monday", meals: []},
            {day: "Tuesday", meals: []},
            {day: "Wednesday", meals: []},
            {day: "Thursday", meals: []},
            {day: "Friday", meals: []},
            {day: "Saturday", meals: []},
            {day: "Sunday", meals: []}
          ]
        });
        // console.log("User created successfully!");
        navigate('/main');
      } catch (error) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          formik.setErrors({ email: 'Email is already used' });
        } else {
          // console.log(error.message);
        }
      }
    },
  });

  

  return (
    <div className="sign-up">
    <h2>Sign Up</h2>
    <div className="home__right_divider"></div>
    <form onSubmit={formik.handleSubmit}>
      <div className="input-wrapper">
        <input
          type='text'
          placeholder="Display Name"
          name='displayName'
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {formik.touched.displayName && formik.errors.displayName ? (
          <div className="error error__sign-up">{formik.errors.displayName}</div>
        ) : null}
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Email"
          autoComplete="on"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // autoComplete="off"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error error__sign-up">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Password"
          autoComplete="on"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // autoComplete="off"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error error__sign-up">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
  );
};

export default SignUp;