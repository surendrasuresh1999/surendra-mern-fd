import * as Yup from "yup";

export const userAddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Please fill out this field."),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Please fill out this field."),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "PIN code must be 6 digits")
    .required("Please fill out this field."),
  locality: Yup.string().required("Please fill out this field."),
  address: Yup.string().required("Please fill out this field."),
  city: Yup.string().required("Please fill out this field."),
  state: Yup.string().required("Please fill out this field."),
  landmark: Yup.string(),
  alternatePhoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Alternate Phone number must be 10 digits")
    .required("Please fill out this field."),
});

export const userSignUpSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const userLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
