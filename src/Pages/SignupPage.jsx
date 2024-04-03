import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { userSignUpSchema } from "../FormikSchemas";

const SignupPage = () => {
  const userObject = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleFormSubmit = (values, actions) => {
    // same shape as initial values
    console.log(values);
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };
  return (
    <div className="h-screen bg-blue-50 form-shadow">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white border rounded-md border-borderColor p-4 w-96">
          <div className="flex flex-col items-center justify-center">
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
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
                <div key={index} className="flex flex-col">
                  <Field name={key} className="grow rounded-md" />
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
