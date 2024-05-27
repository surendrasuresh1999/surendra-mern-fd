import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { userSignUpSchema } from "../FormikSchemas";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { Helmet } from "react-helmet";

const SignupPage = () => {
  const navigate = useNavigate();
  const userObject = {
    name: "",
    email: "",
    password: "",
  };

  const handleFormSubmit = (values, actions) => {
    axios
      .post(`${Baseurl.baseurl}/api/user/signup`, values)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
          actions.resetForm();
        } else {
          toast.error(res.data.message);
          console.log("res", res.data.message);
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error", err.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <div className="h-dvh bg-blue-50 form-shadow">
      <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white border rounded-md border-borderColor space-y-2 p-4 m-4 w-96">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-22size sm:text-26size font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={userObject}
            validationSchema={userSignUpSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <label
                      htmlFor={key}
                      className="text-12size text-black font-600 tracking-wide"
                    >
                      {key.charAt(0).toUpperCase()}
                      {key.slice(1, key.length)}
                    </label>
                    <Field
                      type={key === "password" ? key : "text"}
                      name={key}
                      className="grow rounded-md"
                    />
                    <ErrorMessage
                      name={key}
                      render={(msg) => (
                        <p className="text-red-600 font-500 tracking-wide text-12size">
                          **{msg}
                        </p>
                      )}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-500 text-white flex items-center justify-center font-medium tracking-wide text-14size rounded-md py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle
                      className="text-white animate-spin"
                      size={21}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
