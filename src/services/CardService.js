export const GetAll = async (unityId) => {
  const response = await fetch(`/api/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'unityId': unityId
    },
  });
  const data = await response.json();
  return data;
};

export const GetItem = async (id) => {
  const response = await fetch(`/api/cards/add-or-edit/${id}`);
  const data = await response.json();
  return data;
}

export const RemoveItem = async (id) => {
  const response = await fetch(`/api/cards/add-or-edit/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export const SaveItem = async (item) => {
  //check if item contains an id
  if (item.Id) {
    const response = await fetch(`/api/cards/add-or-edit/${item.Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  }
  else {
    const response = await fetch(`/api/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  }
}