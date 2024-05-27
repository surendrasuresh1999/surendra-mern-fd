import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { passwordChangeSchema } from "../FormikSchemas";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (values, actions) => {
    axios
      .put(`${Baseurl.baseurl}/api/user/update-password`, values)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
          toast.success(res.data.message);
          actions.resetForm();
        } else {
          toast.error(res.data.message);
          console.log("res", res);
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <div className="h-dvh bg-blue-50 form-shadow">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white border rounded-md border-borderColor space-y-4 p-4 m-4 w-96">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-22size sm:text-26size font-bold leading-9 tracking-tight text-gray-900">
              Reset your password
            </h2>
          </div>
          <Formik
            initialValues={userObject}
            validationSchema={passwordChangeSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-3">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <label
                      htmlFor={key}
                      className="text-12size text-black font-600 tracking-wide"
                    >
                      {key.charAt(0).toUpperCase()}
                      {key.slice(1, key.length)}
                    </label>
                    {key === "confirmPassword" ? (
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <div className="relative rounded-md shadow-sm">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="block w-full rounded-md pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {showPassword ? (
                                <EyeOff className="text-gray-600" />
                              ) : (
                                <Eye className="text-gray-600" />
                              )}
                            </button>
                          </div>
                        )}
                      </Field>
                    ) : (
                      <Field
                        type={key}
                        name={key}
                        placeholder={`Enter ${key}`}
                        className="grow rounded-md border"
                      />
                    )}
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
                  className="bg-blue-500 mt-2 text-white flex items-center justify-center font-medium tracking-wide text-14size rounded-md py-2"
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
            Remembered your password?{" "}
            <Link
              to="/login"
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

export default ForgotPassword;
