export function getUserById(id) {
  return fetch(`http://localhost:4000/users/${id}`)
    .then(res => res.json())
    .then(result => {
      console.log(`got a user for id ${id}`);
      return result;
    });
}

export function getUserVehicles(id) {
  return fetch (`http://localhost:4000/users/${id}/vehicles`)
    .then(res => res.json())
    .then(result => {
      console.log(`got ${result.length} vehicles for user ${id}`);
      return result;
    })
}

export  default { getUserById, getUserVehicles };
