const express =  require('express');

const app = express();

// app.use  will run everytime when a request is made to the server , and if i write  any path here then it will run only for that path.
app.use("/",(req,res)=>{
 res.send('This is the HOME page')
}); 

app.use("/hi", (req, res) => {
  res.send("hjsheddddjhesjdhf");
}); 


app.listen(3000 , ()=>{
  console.log("http://localhost:3000/");
})