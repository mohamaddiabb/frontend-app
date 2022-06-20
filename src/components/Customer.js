import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert,Container ,Paper,Button,Grid} from '@mui/material';


// creating variables
export default function Customer() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('');
    const[severity,setSeverity]=useState('info');
    const[cont,setCont]=useState('Please enter the right data');
    const[open,setOpen]=useState(false);
    const[openn,setOpenn]=useState(true);
    const[address,setAddress]=useState('');
    const[no,setno]=useState('');
   const[,setCustomers]=useState([]);
    const[country,SetCountry]=useState('');
    
// on clicking the add customer button fetching post api
  const handleClick=(e)=>{
    e.preventDefault()
    const customer={name,address,no}
    console.log(Customer)
        fetch("http://localhost:8080/customer/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(customer)

  }).then(()=>{
    console.log("New Customer added")
  });
  getcode();
  
  // verify phone number is valid
   if(!/^[0-9]+$/.test(no)){
    setOpenn(true);
    setSeverity('error');
    setCont("error incorrect phone number ");
  }
  // validation of name
  else if(!/^[a-zA-Z]+$/.test(name))
  { setOpenn(true);
    setSeverity('error');
    setCont("error incorrect name ");
  }
  // setting the alert
  else  {
    setOpenn(true);
    setSeverity('success');
    setCont("customer added succesfully ");
    setOpen(true);
  }
  
}
// using the getAll customers api to get all from data base
useEffect(()=>{
  fetch("http://localhost:8080/customer/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setCustomers(result);
  }
)
},[])
// getting country name by the phone no code by using third party api 
const getcode=()=>{
  fetch("https://phonevalidation.abstractapi.com/v1/?api_key=ee15404d600d4625b3d70f07fdc502f0&phone="+no)
  .then(res=>res.json())
  .then((result)=>{
    console.log (result);
    SetCountry(result.country.name?result.country.name:' ');
  }
);
}
//on clicking the delete button fetching delete api
const handleDelete =()=>{
  fetch("http://localhost:8080/customer/id",{
    method:"Delete",
    headers:{"Content-Type":"application/json"},
}).then(()=>{
  console.log("deleted");
});
}
//on clicking the update  button fetching put api
const handleEdit=()=>{
  fetch("http://localhost:8080/customer/id",{
    method:"Put",
    headers:{"Content-Type":"application/json"},
}).then(()=>{
  console.log("Edit successfully");
});
}

  return (
   // creating the form of the web page 
    <Container>
      <Alert open={openn} severity={severity} onClose={() => {setOpenn(false);}}>{cont} </Alert>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Customer</u></h1>

    <form  noValidate autoComplete="off">
    <Grid item xs={12} md={10}>
      <TextField id="outlined-basic" label="phone number" variant="outlined" fullWidth 
      value={no}
      onChange={(e)=>{setno(e.target.value); setOpen(false);}}
       required />
      </Grid><br/>
      <Grid item xs={12} md={10}>
       <TextField id="outlined-basic" label="Customer Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>{setName(e.target.value);setOpen(false);}}
      required /></Grid ><br/>
      <Grid item xs={12} md={10}>
      <TextField id="outlined-basic" label="Customer Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>{setAddress(e.target.value);setOpen(false);}}
      required /></Grid><br/>
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Add Customer
</Button>
    </form>
    
    </Paper>
    <h1>Customer</h1>

    <Paper elevation={3} style={paperStyle}>
    <table>
  <tr>
    <th width="25%">Name</th>
    <th width="25%">address</th>
    <th width="25%"> Phone no</th>
    <th width="25%">Country</th>
    <th width="25%">Actions</th>
  </tr>
  {open?<>
  <tr>
    <td width="20%">{name}</td>
    <td width="20%">{address}</td>
    <td width="20%">{no}</td>
    <td width="20%">{country}</td>
    <td>{" "}
    <Button variant="contained" color="secondary" onClick={handleDelete}>
  Delete
  </Button>
  <Button variant="contained" color="secondary" onClick={handleEdit}>
  Edit
  
  </Button>
    </td>
  </tr></>:<></>
}  
</table>

    </Paper>

    



    </Container>
  );
}


