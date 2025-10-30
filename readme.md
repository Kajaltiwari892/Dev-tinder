- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- call the connectDB function and connect to databse before starting application on 3000
- create POST/signup API to add data to databse
- Push some documents using API calls from postman
- Error Handling using try catch

# Dev Tinder needs:

- Create adn account
- Login
- update your profile
- feed page - explore
- Send connection request
- see our matches
- see the request we've sent / recieved
- update your profile

# LLD

- DB design

  - User
    ---> firstname
    ---> lastname
    ---> emailId
    ---> passowrd
    ---> age,gender

  - ConnectionRequest(jisse ham connection bnaege ,unka data)
    ---> form userid
    ---> to USerID
    ---> status = pending

    if user A to user B these are the status:
    pending ignore  
    **\_\_**|**\_\_**
    | |
    accepted rejected

# API Design {Rest API}

    POST /signup
    post /login
    get /profile
    post /profile
    patch /profile (want to update)
    delete /profile
    post /sendRequest : ignore or interested
    post /reviewRequest : accept or reject
    get /request
    get /connections
