import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const PasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (
    values: SignUpValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    setSubmitSuccess(true);

    resetForm();

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      {submitSuccess && (
        <div
          role="alert"
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        >
          Sign Up Successful!
        </div>
      )}

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <Field
                type="text"
                name="username"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  PasswordStrength(e.target.value);
                }}
              />
              <div className="mt-2 h-2 bg-gray-200 rounded">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    passwordStrength === 1
                      ? "bg-red-500 w-1/5"
                      : passwordStrength === 2
                      ? "bg-orange-500 w-2/5"
                      : passwordStrength === 3
                      ? "bg-yellow-500 w-3/5"
                      : passwordStrength === 4
                      ? "bg-green-500 w-4/5"
                      : passwordStrength === 5
                      ? "bg-green-600 w-full"
                      : "w-0"
                  }`}
                ></div>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Confirm your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Already have an account? Log in here.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
