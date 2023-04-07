import { useEffect, useState } from "react";
// components
import HeaderPage from "@/components/HeaderPage";
import { toFirstLetterUpperCase } from "@/helper/util";
import { GetAll, RemoveItem } from "@/services/UnityService";
import Link from "next/link";

const Unities = () => {
  const urlRoot = "unities";
  const [unities, setUnities] = useState([]);

  const handleRemove = (id) => {
    if (!confirm("Deseja realmente remover este item?")) return;
    RemoveItem(id).then(data => {
      GetAll().then(data => {
        setUnities(data);
      })
    })
  }

  useEffect(() => {
    GetAll().then(data => {
      setUnities(data);
    })
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
                    <Link href={`/${urlRoot}/add-or-edit/${unity.Id}`} >
                      <i className="fas fa-edit me-2"></i>
                    </Link>
                    <span className="text-danger" onClick={e => handleRemove(unity.Id.toLowerCase())}>
                      <i className="fas fa-trash-alt"></i>
                    </span>
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
