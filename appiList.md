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

<!-- how pagination done in mongodb: it done with limit and skip -->
 suppose we have: 
 /feed?page=1&limit=10
 - page 1 -> 0 to 10 documents
 - page 2 -> 11 to 20 documents
 - page 3 -> 21 to 30 documents


  .skip(0).limit(10)
  formaula for skip = (page-1) * limit
  