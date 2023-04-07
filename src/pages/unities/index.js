import { useEffect, useState } from "react";
// components
import HeaderPage from "@/components/HeaderPage";
import { toFirstLetterUpperCase } from "@/helper/util";
import { GetAll } from "@/services/UnityService";

const Unities = () => {
  const urlRoot = "unities";
  const [unities, setUnities] = useState([]);

  useEffect(() => {
    const getUnities = async () => {
      const unities = await GetAll();
      setUnities(unities);
    };

    getUnities();

  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} lenght={unities.length} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <div className="row">
        <div className="col">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unities.map((unity, index) => (
                <tr key={index}>
                  <td>{unity.Number}</td>
                  <td>{unity.Name}</td>
                  <td>{unity.Description}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Unities;
