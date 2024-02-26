// RegistrationForm.js

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
interface FormData {
  name: string;
  dob: number;
  mobile: number;
  sex: string;
  idtype: string;
  govtid: number;
}

const Step1form = () => {
  const navigate = useNavigate();


  const { register, handleSubmit ,watch, formState: { errors } } = useForm<FormData>();

     //yup validation schema
     const mobileNumberRegExp = /^[6-9]\d{9}$/;
     const genderOptions = ['Male', 'Female'];
     const idtype = watch("idtype");
     const aadharSchema = yup.object().shape({
       govtid: yup
         .string()
         .matches(
           /^[2-9]\d{11}$/,
           "Aadhar number must be 12 numeric digits and not start with 0 or 1"
         )
         .required("Aadhar number is required"),
     });
     
     const panSchema = yup.object().shape({
       govtid: yup
         .string()
         .matches(
           /^[A-Z]{5}[0-9]{4}[A-Z]$/,
           "PAN number must be a ten-character long alpha-numeric string"
         )
         .required("PAN number is required"),
     });
   
     const validationSchema = yup.object().shape({
       name: yup.string().required().min(3),
       dob: yup.number().required().positive().integer(),
       mobile: yup.string().matches(mobileNumberRegExp, 'Invalid mobile number').required(),
       sex: yup.string().oneOf(genderOptions, 'Invalid gender').required('Gender is required'),
   
       idtype: yup
       .string()
       .oneOf(["Aadhar", "PAN"], "Invalid ID type")
       .required("ID type is required"),
   
     ...(idtype === "Aadhar" ? aadharSchema.fields : {}),
     ...(idtype === "PAN" ? panSchema.fields : {}),
   
     });
     // validation schema ends here

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    //console.log(data);
    
    try {
      await validationSchema.validate(data, { abortEarly: false });
      console.log(data);
      navigate("/step2", { state: data });
    } catch (error) {
      // Handle validation errors
      console.error("Validation Error:", error);
    }
  };

 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "400px", margin: "auto" }}
    >
<TextField
  label="Name"
  fullWidth
  margin="normal"
  required
  type="text"
  {...register("name")}
  error={!!errors.name}
  helperText={errors.name?.message}
/>

<TextField
  label="Date of birth or Age"
  fullWidth
  margin="normal"
  required
  type="number"
  {...register("dob")}
  error={!!errors.dob}
  helperText={errors.dob?.message}
/>
<FormControl fullWidth margin="normal" error={!!errors.idtype}>
<Select
  sx={{ width: 400 }}
  {...register("sex")}
  displayEmpty
  defaultValue=""
  
>
  <MenuItem disabled={true} value="">
    select gender
  </MenuItem>
  <MenuItem value="Male">Male</MenuItem>
  <MenuItem value="Female">Female</MenuItem>
</Select>
<FormHelperText>{errors.idtype?.message}</FormHelperText>
</FormControl>

<TextField
  label="Mobile"
  type="number"
  fullWidth
  margin="normal"
  required
  {...register("mobile")}
  error={!!errors.mobile}
  helperText={errors.mobile?.message}
/>
<FormControl fullWidth margin="normal" error={!!errors.idtype}>
<Select
  sx={{ width: 400 }}
  {...register("idtype")}
  displayEmpty
  defaultValue=""
  
> 
  <MenuItem disabled={true} value="">
    Govt Issued ID
  </MenuItem>
  <MenuItem value="Aadhar">Aadhar</MenuItem>
  <MenuItem value="PAN">PAN</MenuItem>
</Select>
<FormHelperText>{errors.idtype?.message}</FormHelperText>
</FormControl>
<TextField
  label="Enter Govt Issued ID"
  type="text"
  fullWidth
  margin="normal"
  required
  {...register("govtid")}
  error={!!errors.govtid}
  helperText={errors.govtid?.message}
/>


      <Button type="submit" variant="contained" color="primary" fullWidth>
        NEXT
      </Button>
    </form>
  );
};

export default Step1form;


