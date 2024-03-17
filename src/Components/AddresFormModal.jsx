import React, { forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { XCircle } from "lucide-react";
import { useFormik } from "formik";
import { userAddressFormSchema } from "../FormikSchemas";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { indianStatesArray } from "../StaticData";
import OutlinedInput from "@mui/material/OutlinedInput";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddresFormModal = ({ openAddressModal, setOpenAddressModal }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleFormSubmit = (values, actions) => {
    console.log("Form submit------", values);
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phoneNumber: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        landmark: "",
        state: "",
        alternatePhoneNumber: "",
      },
      validationSchema: userAddressFormSchema,
      onSubmit: handleFormSubmit,
    });

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the maxWidth value based on window width
  const maxWidth = windowWidth <= 767 ? "md" : "sm";

  return (
    <Dialog
      open={openAddressModal}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={maxWidth}
      onClose={() => setOpenAddressModal(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Add A New Address
        <span
          className="cursor-pointer"
          onClick={() => setOpenAddressModal(false)}
        >
          <XCircle color="#393939" />
        </span>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start flex-col w-full">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter name"
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.name && errors.name && (
                  <span className="text-red-500 text-xs">{errors.name}</span>
                )}
              </div>
              <div className="flex items-start flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  placeholder="Enter phone number"
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start flex-col w-full">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pincode}
                  placeholder="Enter Pincode"
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.pincode && errors.pincode && (
                  <span className="text-red-500 text-xs">{errors.pincode}</span>
                )}
              </div>
              <div className="flex items-start flex-col">
                <label htmlFor="locality">Locality</label>
                <input
                  type="text"
                  id="locality"
                  name="locality"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.locality}
                  placeholder="Enter locality"
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.locality && errors.locality && (
                  <span className="text-red-500 text-xs">
                    {errors.locality}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start flex-col my-2">
            <label htmlFor="address">Address(Area and Street)</label>
            <textarea
              placeholder="Enter address and street"
              id="address"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              cols="10"
              rows="2"
              className="w-full rounded-md"
              style={{ resize: "none" }}
            ></textarea>
            {touched.address && errors.address && (
              <span className="text-red-500 text-xs">{errors.address}</span>
            )}
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start flex-col w-full">
                <label htmlFor="city">City/District/Town</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  placeholder="Enter City/District/Town"
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.city && errors.city && (
                  <span className="text-red-500 text-xs">{errors.city}</span>
                )}
              </div>
              <div className="flex items-start flex-col">
                <label htmlFor="state">State</label>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    displayEmpty
                    size="small"
                    id="state"
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em>Placeholder</em>;
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {indianStatesArray.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {touched.state && errors.state && (
                  <span className="text-red-500 text-xs">{errors.state}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start flex-col w-full">
                <label htmlFor="landmark">Landmark(Optional)</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.landmark}
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.landmark && errors.landmark && (
                  <span className="text-red-500 text-xs">
                    {errors.landmark}
                  </span>
                )}
              </div>
              <div className="flex items-start flex-col">
                <label htmlFor="alternatePhoneNumber">
                  Alternate Phone(Optional)
                </label>
                <input
                  type="text"
                  id="alternatePhoneNumber"
                  name="alternatePhoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alternatePhoneNumber}
                  className="rounded-md w-full p-[7.5px]"
                />
                {touched.alternatePhoneNumber &&
                  errors.alternatePhoneNumber && (
                    <span className="text-red-500 text-xs">
                      {errors.alternatePhoneNumber}
                    </span>
                  )}
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenAddressModal(false)}
          sx={{ border: "1px solid" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          sx={{ border: "1px solid" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddresFormModal;
