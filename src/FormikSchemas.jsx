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
