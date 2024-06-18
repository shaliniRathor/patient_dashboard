import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASEURL } from "./conig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HealingIcon from "@mui/icons-material/Healing";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function LogIn() {
  const [password, setpassword] = React.useState("");
  const [email, setemail] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log(password, email);
    event.preventDefault();
    await axios
      .post(`${BASEURL}/api/logIn/patient`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("res=>", res);
        if (res.data.status) {
          setpassword("");
          setemail("");
          toast.success("Logged in Admin Sucessfully!!");
          navigate("/");
        }else{
          toast.error(res.data.message)
        }
      })

      .catch((err) => {
        console.log(err);
      });
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
          <div className="border">
            <div className="customer">
              <Typography component="h1" variant="h5">
                LOG IN
              </Typography>
            </div>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="password"
                  autoComplete="password"
                  size="small"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />

                {/* <div className='combineBox1'>  */}
                {/* <Button 
            onClick={() => navigate(-1)}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='outlined'
            className='blackborderbutton'
            >             
             GO Back
            </Button> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="blackbutton"
                >
                  Log In
                </Button>
                {/* </div> */}
              </Box>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
