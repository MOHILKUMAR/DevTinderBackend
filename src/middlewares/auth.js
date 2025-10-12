
const adminAuth = (req, res, next) => {
   console.log("Admin auth is getting checked");
   const token = "xyz";
   const isAdminAuthorized = token === "xyz" // or "xyz";
   if(!isAdminAuthorized){
     res.status(401).send("Unauthorized");
   } 
   else{
    next()
   }


}


const UserAuth = (req, res, next) => {
   console.log("Admin auth is getting checked");
   const token = "xyz";
   const isAdminAuthorized = token === "xyz" // or "xyz";
   if(!isAdminAuthorized){
     res.status(401).send("Unauthorized");
   } 
   else{
    next()
   }


}



module.exports = {
    adminAuth,
    UserAuth
}


