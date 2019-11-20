#Get users
query{
  users{
    id
    email
  }
}

#Get user by id
query{
  user(userId: "f5407ee4-6be6-4c9a-a212-dd5a3333a17c"){
    id
    email
  }
}

#Create user
mutation{
  addUser(user:{  givenName: "Test",
  familyName: "Tester",
  email: "test.tester@test.com"
  password:"password"}){
  	email,
    id
  }
}

#Delete user
mutation {
  deleteUser(userId:"8301ec76-950a-4a09-a6cd-5deac1efac5a")
}

#-----------------------------------------

#Get vehicles
query{
  vehicles{
    id
  }
}}