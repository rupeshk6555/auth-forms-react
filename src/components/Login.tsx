import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setInitialEmail(savedEmail);
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (values.rememberMe) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    console.log(values);
    setSubmitSuccess(true);

    resetForm();

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {submitSuccess && (
        <div
          role="alert"
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        >
          Login Successful!
        </div>
      )}

      <Formik
        initialValues={{
          email: initialEmail,
          password: "",
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
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
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4 flex items-center">
              <Field type="checkbox" name="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center">
        <Link to="/signup" className="text-blue-600 hover:underline">
          Don't have an account? Sign up here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
