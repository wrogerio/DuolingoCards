import pool from "@/database/db";


export const GetAll = async () => {
  const query = ` SELECT Id, Number, Name, Description
                  FROM DuoUnity
                  ORDER BY Number`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    console.log(result.recordset);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};