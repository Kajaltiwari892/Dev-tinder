const express =  require('express');

const app = express();

app.use('/',(req,res)=>{
  res.end("hehhehe")
})

// this will only handle GET call to /user
app.get("/user" , (req,res)=>{
  res.send({firstNAme:"KAjal"})
})

app.post('/user',(req,res)=>{
  console.log("Save data to the databsee")
  res.send("Data successfully saved to the database")
});

app.delete('/user',(req,res)=>{
  
  res.send("Deleted successfully")
})

app.listen(3000 , ()=>{
  console.log("http://localhost:3000/");
});
