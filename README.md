# Autofile

## Api Docs

## Routes

### Home

`/home`

Currently does nothing. Returns 'Vehicle History'

## User

GET `/users`

Returns every user from the `user` table

GET `/users/:id`

Returns the given user for the provided `id`

POST `/users`

Create a new user

```
{
  name: string;
  familyName: string;
  email: string;
  password: string;
}
```

PUT `/users/:id`

Update the user for the provided `id`

DELETE `/users/:id`

Delete the user for the provided `id`

GET `/users/:id/vehicles`

Gets all associated vehicles for the user from the provided `id`

## Vehicles

GET `/vehicles`

Returns every vehicle from the `vehicle` table

GET `/vehicles/:id`

Returns the given vehicle for the provided `id`

POST `/vehicles`

Create a new vehicle

```
{
  manufacturer: string;
  model: string;
  engineSize: number;
  registration: string;
  user: string;
}
```

PUT `/vehicles/:id`

Update the vehicele for the provided `id`

DELETE `/vehicles/:id`

Delete the vehicle for the provided `id`

GET `/vehicles/byregistration/:registration`

Gets the vehicle from the provided `registration`
