import React, { useEffect, useState } from 'react';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useUserLoginMutation } from '../../features/auth/user/userAuthApi';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider  } from 'firebase/auth';
import { userLoggedIn } from '../../features/auth/admin/authSlice';
import app from '../../firebase/firebase.config';
import Cookies from 'js-cookie';


const UserLogin = () => {
  const auth = getAuth(app)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoadingGoogle,setIsLoadingGoogle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogin, {isError, isSuccess, error ,isLoading }] = useUserLoginMutation();

  useEffect(()=>{
      if(isSuccess){
          toast.success('login successfull');
          navigate('/');
      }
      if(isError){
        toast.error(error?.data?.message);
      }
  },[isError,isSuccess])


  // Event handlers for input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = ()=>{
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/^\S+@\S+$/i.test(email)) {
      validationErrors.email = 'Invalid email';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must have at least 6 characters';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
        dispatch(userLogin({
          email:email,
          password:password
        }))
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (result) {
        dispatch(userLoggedIn({
          accessToken: user?.accessToken,
          user: user
        }));

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);

        Cookies.set('token', JSON.stringify({
          accessToken: user?.accessToken,
          user: user,
        }), { expires: expirationTime });

        navigate(location?.state ? location.state : '/');
      }
    
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6">
            Login to Your Account
          </Typography>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                color="blue"
                size="lg"
                label="Email"
                className="mb-4"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div>
              <Input
                type="password"
                color="blue"
                size="lg"
                label="Password"
                className="mb-4"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
            <Button
              type="submit"
              color="green"
              size="lg"
              fullWidth
              className="mb-4 flex items-center justify-center"
              disabled={isLoading || isLoadingGoogle}
            >
              {isLoading || isLoadingGoogle  ? (
                <HashLoader color="#ffffff" size={24} />
              ) : (
                'Login'
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>
          <Button
            onClick={handleGoogleLogin}
            color="green"
            size="lg"
            variant="outlined"
            fullWidth
            className="flex items-center justify-center mb-4"
          >
            <FcGoogle size={24} className="mr-2" />
            Login with Google
          </Button>
          <Typography variant="body2" color="blue-gray" className="text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserLogin;
