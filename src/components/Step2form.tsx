// RegistrationForm.js

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, MenuItem, Select } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitFormData } from "./redux/Action";


import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';

 


interface FormData {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: number;
}

const Step2form = () => {
  const tableRef = useRef(null);
  
  const dispatch = useDispatch();
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const location = useLocation();
  const step1FormData = location.state;
  console.log("step1 form ", step1FormData);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const allData = { ...step1FormData, ...data };
    
    dispatch(submitFormData(allData));
  };
  const formData = useSelector((state: any) => state.formData);
  console.log('final submit',formData);
  
  useEffect(() => {
    const dataTable = $(tableRef.current!).DataTable();

    if (formData && formData.length > 0) {
      dataTable.clear();

      formData.forEach((result: any) => {
        dataTable.row.add([
          result.name,
          result.email,
          result.username,
          // Add more data as needed
        ]);
      });

      // Draw the table
      dataTable.draw();
    }
  }, [formData]);
  
  
  

  let stateList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const apiCall = async (countryValue: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryValue}`
      );
      const countrySuggestions = response.data.map((x: any) => x.name.common);
      setCountryOptions(countrySuggestions);
    } catch (error) {
      console.error("Error fetching country suggestions:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          type="text"
          {...register("address")}
        />

        <Select
          sx={{ width: 400 }}
          {...register("state")}
          displayEmpty
          defaultValue=""
        >
          <MenuItem disabled={true} value="">
            select state
          </MenuItem>
          {stateList.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="City"
          type="string"
          fullWidth
          margin="normal"
          {...register("city")}
        />

        <Autocomplete
          options={countryOptions}
          freeSolo
          onInputChange={(event, newValue) => {
            apiCall(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              fullWidth
              margin="normal"
              required
              {...register("country")}
            />
          )}
        />

        <TextField
          label="Pincode"
          type="number"
          fullWidth
          margin="normal"
          required
          {...register("pincode")}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          NEXT
        </Button>
      </form>
      
      
      <div className="container">
      <table ref={tableRef} className="table table-hover table-bordered">
   

        </table>
      </div>

    </>
  );
};

export default Step2form;
