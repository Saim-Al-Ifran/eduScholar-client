import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setError("");

    // Simulate a login API call
    setTimeout(() => {
      setLoading(false);
      if (data.email === "admin@example.com" && data.password === "password") {
        setSuccess(true);
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
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
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
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
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
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
              <Button color="lightBlue" size="lg" fullWidth={true} type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
