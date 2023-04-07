import pool from "@/database/db";


export const GetAll = async (unityId) => {
  const query = ` SELECT  dc.Id, dc.UnityId, dc.Phrase, dc.Translate, dc.IPA, du.Name CardName
                  FROM    DuoCards dc
                          INNER JOIN DuoUnity du ON dc.UnityId = du.Id And dc.UnityId = '${unityId}'
                  ORDER   BY du.Number`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT  dc.Id, dc.UnityId, dc.Phrase, dc.Translate, dc.IPA, du.Name CardName
                  FROM    DuoCards dc
                          INNER JOIN DuoUnity du ON dc.UnityId = du.Id
                  WHERE dc.Id = '${id}'
                  ORDER BY du.Number`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = ` INSERT INTO DuoCards (UnityId, Phrase, Translate, IPA) 
                  VALUES ('${item.UnityId}', '${item.Phrase}', '${item.Translate}', '${item.IPA}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE DuoCards SET 
                  UnityId = '${item.UnityId}', 
                  Phrase = '${item.Phrase}', 
                  Translate = '${item.Translate}'
                  IPA = '${item.IPA}'
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
  const query = ` DELETE FROM DuoCards WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}