import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { userSignUpSchema } from "../FormikSchemas";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const userObject = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleFormSubmit = (values, actions) => {
    axios
      .post(`${Baseurl.baseurl}/api/user/signup`, values)
      .then((res) => {
        if (res.data.status) {
          console.log(res);
          // localStorage.setItem(
          //   "talHuntUserDetails",
          //   JSON.stringify(res.data.details)
          // );
          navigate("/login");
          actions.resetForm();
        } else {
          toast.error(res.data.message);
          console.log("res", res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="h-screen bg-blue-50 form-shadow">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white border rounded-md border-borderColor space-y-2 p-4 w-96">
          <div className="flex flex-col items-center justify-center">
            {/* <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="text-26size font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={userObject}
            validationSchema={userSignUpSchema}
            onSubmit={handleFormSubmit}
          >
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
                className="bg-blue-500 text-white font-medium tracking-wide text-14size rounded-md py-2"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
