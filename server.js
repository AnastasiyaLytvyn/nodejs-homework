const app = require("./app");
const dotenv = require("dotenv");

<<<<<<< HEAD
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
=======
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000!")
})
>>>>>>> d9b914df5906d3e03c7a15dd38331283879d5380
