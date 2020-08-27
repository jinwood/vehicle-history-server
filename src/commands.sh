#Create user
http POST http://localhost:4000/users name="Julian" familyName="Inwood" email="foo@bar.com" hashedPassword="password"

#Get uers
http GET http://localhost:4000/users
