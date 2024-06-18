import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BASEURL } from './conig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HealingIcon from "@mui/icons-material/Healing";
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const defaultTheme = createTheme();

export default function Add_customer() {
const[name,setName]=React.useState('')
const[phoneno,setphone]=React.useState('')
const[gender,setGender]=React.useState('')
const[address,setAddress]=React.useState('')
const[pincode,setPincode]=React.useState('')
const[email,setemail]=React.useState('')
const[age,setAge]=React.useState('')
const[treatment,setTreatment]=React.useState('')

const navigate=useNavigate()


  const handleSubmit = async(event) => {
    console.log(name,phoneno,age,address,gender,email,treatment,pincode);
    event.preventDefault();
    await axios.post(`${BASEURL}/api/create/patient`,
    {name:name,
      treatment:treatment,
      email:email,
      address:address,
      phoneNo:phoneno,
      gender:gender,
      pincode:pincode,
      age:age,
      
    })
    .then(res=>{
      console.log("res=>",res);
      setName("")
      setphone('')
      setAddress('')
      setPincode('')
      setemail('')
      setAge('')
      setGender('')
      setTreatment('')
      toast.success("Add Patient Sucessfully!!")
      navigate('/')
    })

    .catch(err=>{
      console.log(err);
    })
  };

  return (

    <>    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div>
        <h1>
          {" "}
          <HealingIcon /> CITY HOSPITAL <HealingIcon />{" "}
        </h1>
        </div>
        <CssBaseline />
       <div className='border'>
       <div className='customer' >
            <Typography component="h1" variant="h5">
              Add A New Patient
            </Typography>
            </div>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          <TextField
              required
              fullWidth
              label="Patient Name"
              autoComplete="Patient Name"
              size='small'
              variant='outlined'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          <div className='combineBox'>
         <TextField
              margin="normal"
              required
              fullWidth
              name="Age"
              label="Age"
              size='small'
              value={age}
              onChange={(e)=>setAge(e.target.value)}
              
          />
        
          <FormControl fullWidth>
          <InputLabel >Gender*</InputLabel> 
          <Select    
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          label="Gender*"
          required
          fullWidth       
          size='small'      
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        </FormControl>
        
            </div>
          
                < div className='combineBox'>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              autoComplete="Phone Number"
              size='small'
              value={phoneno}
              onChange={(e)=>setphone(e.target.value)}
            />
           
            
           <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size='small'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
            </div>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Address"
              rows={2}
              multiline
              size='small'
              value={address}
              onChange={(e)=>setAddress((e.target.value))}
            />
            
              <TextField
              margin="normal"
              required
              fullWidth
              name="Zip Code"
              label="Zip Code"
              size='small'
              value={pincode}
              onChange={(e)=>setPincode((e.target.value))}
            /> 
            


     <TextField
              margin="normal"
              required
              fullWidth
              name="Treatment"
              label="Treatment"
               rows={3}
               multiline
              size='small'
              value={treatment}
              onChange={(e)=>setTreatment(e.target.value)}
            />
     
  
           <div className='combineBox1'> 
           <Button 
            onClick={() => navigate(-1)}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='outlined'
            className='blackborderbutton'
            >             
             GO Back
            </Button>

            
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='blackbutton'
            >
              Add Patient
            </Button>
           </div>
            
          </Box>
        </Box>
       </div>
      </Container>
    </ThemeProvider>
    </>
  );
}