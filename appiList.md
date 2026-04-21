# DevTinder APIs

## authRouter
- POSt /Signup
- POST /login
- POST /logout
- POST /forget-password

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - get you the profiles of others users on platoform .



<!-- Status: ignored, interested, accepted, rejected -->

