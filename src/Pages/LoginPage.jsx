import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { userLoginSchema } from "../FormikSchemas";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
    password: "",
  };

  const handleFormSubmit = (values, actions) => {
    axios
      .post(`${Baseurl.baseurl}/api/user/login`, values)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem(
            "blogUserDetails",
            JSON.stringify(res.data.user)
          );
          Cookies.set("jwtToken", res.data.token, { expires: 30 });
          navigate("/");
          actions.resetForm();
        } else {
          toast.error(res.data.message);
          console.log("res", res);
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
        <div className="bg-white border rounded-md border-borderColor space-y-4 p-4 w-96">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-26size font-bold leading-9 tracking-tight text-gray-900">
              Login in to your account
            </h2>
          </div>
          <Formik
            initialValues={userObject}
            validationSchema={userLoginSchema}
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
                  <Field type={key} name={key} className="grow rounded-md" />
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
                className="bg-blue-500 mt-2 text-white font-medium tracking-wide text-14size rounded-md py-2"
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

export default LoginPage;
