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
import { useNavigate, useParams } from "react-router-dom";
import HealingIcon from "@mui/icons-material/Healing";
import { useEffect } from "react";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Switch } from "@mui/material";

const defaultTheme = createTheme();

export default function Add_customer() {
  const [editname, setEditName] = React.useState("");
  const [editphoneno, setEditphone] = React.useState("");
  const [editgender, setEditGender] = React.useState("");
  const [editaddress, setEditAddress] = React.useState("");
  const [editpincode, setEditPincode] = React.useState("");
  const [editemail, setEditemail] = React.useState("");
  const [editage, setEditAge] = React.useState("");
  const [edittreatment, setEditTreatment] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const [render, setRender] = React.useState(true);
  const [emergency, setEmergency] = React.useState(true);
  const params = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    getPatient();
  }, [render]);

  const getPatient = async (id) => {
    await axios
      .get(`${BASEURL}/api/get/single/patient/${params?.id}`)
      .then((res) => {
        console.log("result=>", res.data);
        setEditName(res?.data?.name);
        setEditAge(res?.data?.age);
        setEditAddress(res?.data?.address);
        setEditGender(res?.data?.gender);
        setEditPincode(res?.data?.pincode);
        setEditemail(res?.data?.email);
        setEditphone(res?.data?.phoneNo);
        setEditTreatment(res?.data?.treatment);
        setRemark(res?.data?.remark);
        setEmergency(res.data.emergency)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .patch(`${BASEURL}/api/update/pateint/${params.id}`, {
        name: editname,
        treatment: edittreatment,
        email: editemail,
        address: editaddress,
        phoneNo: editphoneno,
        gender: editgender,
        pincode: editpincode,
        age: editage,
        remark: remark,
        emergency: emergency,
      })
      .then((res) => {
        console.log("res=>", res);
        setRender((prev) => !prev);
        toast.success("Edit Patient Successfully");
        navigate(-1);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setEmergency(event.target.checked);
  };
  // console.log("working...", handleChange);

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
                Edit Patient
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
                  required
                  fullWidth
                  label="Edit Name"
                  autoComplete="Edit Name"
                  size="small"
                  variant="outlined"
                  value={editname}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <div>
                  {emergency ? " EMERGENCY" : " NOt EMERGENCY"}
                  <Switch
                    checked={emergency}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="combineBox">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Edit Phone Number"
                    autoComplete="Edit Phone Number"
                    size="small"
                    value={editphoneno}
                    onChange={(e) => setEditphone(e.target.value)}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label=" Edit Email Address"
                    name="Edit Email"
                    autoComplete="Edit Email"
                    size="small"
                    value={editemail}
                    onChange={(e) => setEditemail(e.target.value)}
                  />
                </div>

                <div className="combineBox">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Edit Age"
                    label="Edit Age"
                    size="small"
                    value={editage}
                    onChange={(e) => setEditAge(e.target.value)}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Gender*</InputLabel>
                    <Select
                      value={editgender}
                      onChange={(e) => setEditGender(e.target.value)}
                      label="Gender*"
                      required
                      fullWidth
                      size="small"
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="combineBox">
                  {" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Edit Address"
                    size="small"
                    value={editaddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Edit Zip Code"
                    label="Edit Zip Code"
                    size="small"
                    value={editpincode}
                    onChange={(e) => setEditPincode(e.target.value)}
                  />
                </div>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name=" Edit Treatment"
                  label="Edit Treatment"
                  rows={3}
                  multiline
                  size="small"
                  value={edittreatment}
                  onChange={(e) => setEditTreatment(e.target.value)}
                />
                <div className="remarkField">
                  <FormControl fullWidth>
                    <InputLabel>Remark*</InputLabel>
                    <Select
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      label="Gender*"
                      required
                      fullWidth
                      size="small"
                    >
                      <MenuItem value={"Good"}>Good</MenuItem>
                      <MenuItem value={"Bad"}>Bad</MenuItem>
                      <MenuItem value={"Excellent"}>Excellent</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="combineBox1">
                  <Button
                    onClick={() => navigate(-1)}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    variant="outlined"
                    className="blackborderbutton"
                  >
                    GO Back
                  </Button>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className="blackbutton"
                  >
                    Save Changes
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
