import pool from "@/database/db";


export const GetAll = async () => {
  const query = ` SELECT Id, Number, Name, Description
                  FROM DuoUnity
                  ORDER BY Number`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT Id, Number, Name, Description
                  FROM DuoUnity
                  WHERE Id = '${id}'
                  ORDER BY Number`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = ` INSERT INTO DuoUnity (Number, Name, Description) 
                  VALUES ('${item.Number}', '${item.Name}', '${item.Description}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE DuoUnity SET 
                  Number = '${item.Number}', 
                  Name = '${item.Name}', 
                  Description = '${item.Description}'
                  WHERE Id = '${item.Id}'`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const RemoveItem = async (id) => {
  const query = ` DELETE FROM DuoUnity WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}