import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useUserRegisterMutation } from '../../features/auth/user/userAuthApi';
import toast from 'react-hot-toast';

const UserRegistration = () => {

  const { handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userRegister,{isError,isLoading,isSuccess,error}] = useUserRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    
       if(isSuccess){
            toast.success('Registration successfull')
            navigate('/login');
       }
       if(isError){
           toast.error(error.data?.message);
            
       }

  },[isError,isSuccess,navigate])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    clearErrors(name);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must have at least 6 characters';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    Object.keys(newErrors).forEach((key) => {
      setError(key, { type: 'manual', message: newErrors[key] });
    });

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      
      dispatch(userRegister({
           name:formData.name,
           email:formData.email,
           password:formData.password
      }))
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6">
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                type="text"
                color="blue"
                size="lg"
                label="name"
                className="mb-4"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div>
              <Input
                type="email"
                color="blue"
                size="lg"
                label="Email"
                className="mb-4"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                type="password"
                color="blue"
                size="lg"
                label="Password"
                className="mb-4"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div>
              <Input
                type="password"
                color="blue"
                size="lg"
                label="Confirm Password"
                className="mb-4"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <Button
              type="submit"
              color="blue"
              size="lg"
              fullWidth
              className="mb-4"
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" color="blue-gray" className="text-center mt-[2rem]">
            Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserRegistration;
