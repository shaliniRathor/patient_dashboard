import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import HealingIcon from "@mui/icons-material/Healing";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "./conig";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import Woman2Icon from "@mui/icons-material/Woman2";
import ManIcon from "@mui/icons-material/Man";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import emergencyImage from "./asset/siren.png";
import { TextField } from "@mui/material";
import noPatient from "./asset/person.png"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function All_Patient() {
  const [data, setData] = React.useState([]);
  const [render, setRender] = useState(true);
  const [emergencyCout, setEmergencyCout] = useState(0);
  const [Search ,setSearch]= useState("")
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getPatient();
  }, [Search,render]);

  console.log("search=>>",Search);

  const getPatient = async () => {
    await axios
      .get(`${BASEURL}/api/get/all/patient?searchdata=${Search}`)
      .then((res) => {
        console.log("res=>", res);
        setData(res?.data?.data);
        setEmergencyCout(res.data.countemergency);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletebutton = async (id) => {
    console.log(id);
    let deleteBox= window.confirm("Do u want to delete the patient")
    if (!deleteBox) {
      return
    }
    await axios
      .delete(`${BASEURL}/api/delete/${id}`)
      .then((res) => {
        console.log(res);
        setRender((prev) => !prev);
        toast.error("Patient Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePatient = (id) => {
    navigate(`/edit/patient/${id}`);
  };

  const gotoadd = () => {
    navigate("/add/patient");
  };

  return (
    <TableContainer component={Paper}>
      <div>
        <h1>
          {" "}
          <HealingIcon /> CITY HOSPITAL <HealingIcon />{" "}
        </h1>
      </div>

      <div className="heading">
        <div className="flex">
          <h2>All Record ({data.length})</h2>
          <h2>All Emergency ({emergencyCout})</h2>
        </div>

        <div

         className="flex">
        <TextField sx={{width:"300px"}}
            size="small"
            id="outlined-basic"
            label="Search Patient"
            variant="outlined"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
        
          <Button
            variant="contained"
            style={{ background: "#000" }}
            onClick={gotoadd}
          >
            {" "}
            <AddIcon /> Add Patient
          </Button>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">E-Mail</StyledTableCell>
              <StyledTableCell align="right">Phone No.</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Pincode</StyledTableCell>
              <StyledTableCell align="right">Treatment</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              {/* <StyledTableCell align="right">Emr Case</StyledTableCell> */}
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data&& data?.length >0 ?
              data?.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {row.emergency == true ? (
                      <img
                        src={emergencyImage}
                        width={"20px"}
                        alt="emergency"
                      />
                    ) : null}

                    {row.name}
                  </StyledTableCell>
                  {/* age (logical operator ) */}

                  <StyledTableCell align="right">
                    {/* {row.age < 18 ? "Child"
                    : row.age == 18 ? "Teenager" : "Elder"} */}
                    {row.age}
                  </StyledTableCell>

                  {/* gender (logic operator) */}
                  <StyledTableCell align="left">
                    {row.gender == "Female" ? (
                      <Woman2Icon />
                    ) : row.gender == "Male" ? (
                      <ManIcon />
                    ) : (
                      <DoNotDisturbIcon />
                    )}
                    {row?.gender}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    +91{row.phoneNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.address?.slice(0, 13)}
                    {row?.treatment?.length > 10 && "..."}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.treatment?.slice(0, 13)}
                    {row?.treatment?.length > 13 && "..."}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(row?.updatedAt).toLocaleString(undefined, {
                      timeZone: "asia/kolkata",
                    })}
                  </StyledTableCell>
                  
                  <StyledTableCell>
                    <div
                      className={
                        row.remark == "Good"
                          ? "goodremark"
                          : row.remark == "Bad"
                          ? "badRemark"
                          : "excellentClass"
                      }
                    >
                      {row.remark}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon onClick={() => updatePatient(row?._id)} />
                    <DeleteIcon onClick={() => deletebutton(row?._id)} />
                  </StyledTableCell>
                </StyledTableRow>
              )): 
              <StyledTableCell colSpan={20} align="center">
              <img src={noPatient} className="nopatient" alt="No Patient" />
              <h1> No Patient</h1>
              </StyledTableCell>
              }
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
