# devtinder API 

authRouter
-Post/signup
-Post /loginAPI
-Post /Logout

Profile Router
-Get /Profile/view
-Patch /Profile/edit
-Patch/Profile/password

connectionsRequestRouter
Single api for the interested or ignored.
-Post /request/send/:status/:userId

-Post /request/send/interested/:userId
-Post /request/send/ignored/:userId


Single api for the Accepted or Rejected.
-Post /request/review/:status/:requestId 

-Post /request/review/accepted/:requestId
-Post /requset/review/rejected/:requestId

UserRouter
-Get /user/connections
-Get /user/requests
-Get /userfeed -Get you the profile

Status: ignore, interested, accepted, rejected







