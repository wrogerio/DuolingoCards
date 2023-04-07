import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
// user
import HeaderPage from "@/components/HeaderPage";
import { toFirstLetterUpperCase } from "@/helper/util";
import { GetItem, SaveItem } from '@/services/UnityService';

const AddOrEdit = () => {
  const urlRoot = "unities";
  const router = useRouter();
  const [unity, setUnity] = useState({ Number: 0, Name: "", Description: "" });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      SaveItem({ ...unity }
      ).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else console.log("Erro ao salvar");
      })
    }
    //setValidated(true);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id !== "0") {
      GetItem(id).then(data => {
        setUnity(data);
      })
    }
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label htmlFor="name">Number</label>
              <input type="number" autoFocus step={1} className="form-control" value={unity.Number} onChange={e => setUnity({ ...unity, Number: e.target.value })} />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" value={unity.Name} onChange={e => setUnity({ ...unity, Name: e.target.value })} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Description</label>
              <textarea type="text" className="form-control" value={unity.Description} onChange={e => setUnity({ ...unity, Description: e.target.value })} rows={3}></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="float-end">
              <button type="submit" className="btn btn-primary me-2">
                <i className="fas fa-save me-2"></i>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddOrEdit;
