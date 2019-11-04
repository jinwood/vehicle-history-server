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
