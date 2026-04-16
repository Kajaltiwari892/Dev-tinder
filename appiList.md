# DevTinder APIs

## authRouter
- POSt /Signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - get you the profiles of others users on platoform .



<!-- Status: ignored, interested, accepted, rejected -->

