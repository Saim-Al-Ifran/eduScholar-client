import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import { useAdminLoginMutation } from "../../../features/auth/admin/adminAuthApi";
import useJwtDecode from "../../../hooks/useDecode";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [adminLogin, { data, isError, isLoading, isSuccess, error: errorRes }] = useAdminLoginMutation();
  const { decodedToken, tokenError } = useJwtDecode(token);

  const onSubmit = (formData) => {
    setError("");
    adminLogin({
      email: formData.email,
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setToken(data.token);
    } else if (isError && errorRes) {
     toast.error(errorRes.data.message);
    }
  }, [isSuccess, isError, data, errorRes]);

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.role === "student") {
        toast.error("Access denied: only admin/moderator login");
      } else {
        setSuccess(true);
      }
    }
  }, [decodedToken]);

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-96">
          <CardBody>
            <Typography variant="h4" className="text-center mb-4">
              Admin Login
            </Typography>
            {success ? (
              <Typography variant="h6" className="text-center mb-4 text-green-500">
                Login successful!
              </Typography>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Input
                    type="email"
                    color="lightBlue"
                    size="lg"
                    outline={true}
                    placeholder="Email"
                    className={`${errors.email ? "border-red-500" : ""} border`}
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                    })}
                  />
                  {errors.email && (
                    <Typography variant="small" className="text-red-500">
                      {errors.email.message}
                    </Typography>
                  )}
                </div>
                <div className="mb-6">
                  <Input
                    type="password"
                    color="lightBlue"
                    size="lg"
                    outline={true}
                    placeholder="Password"
                    className={`${errors.password ? "border-red-500" : ""} border`}
                    {...register("password", { 
                      required: "Password is required", 
                      minLength: { value: 6, message: "Password must be at least 6 characters" } 
                    })}
                  />
                  {errors.password && (
                    <Typography variant="small" className="text-red-500">
                      {errors.password.message}
                    </Typography>
                  )}
                </div>
                {error && (
                  <Typography variant="small" className="text-red-500 mb-4 text-center">
                    {error}
                  </Typography>
                )}
                <Button color="lightBlue" size="lg" fullWidth={true} type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            )}
            {tokenError && (
              <Typography variant="small" className="text-red-500 mb-4 text-center">
                {tokenError}
              </Typography>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
