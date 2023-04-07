import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
// user
import HeaderPage from "@/components/HeaderPage";
import { toFirstLetterUpperCase } from "@/helper/util";
import { GetItem, SaveItem } from '@/services/UnityService';
import { GetAll } from '@/services/UnityService';

const AddOrEdit = () => {
  const urlRoot = "cards";
  const router = useRouter();
  const [card, setCard] = useState({ UnityId: "", Phrase: "", Translate: "", IPA: "" });
  const [unity, setUnities] = useState([]);

  const handleSubmit = (event) => {
    // const form = event.currentTarget;
    // event.preventDefault();

    // if (form.checkValidity() !== false) {
    //   SaveItem({ ...unity }
    //   ).then((result) => {
    //     if (result) router.push(`/${urlRoot}`);
    //     else console.log("Erro ao salvar");
    //   })
    // }
    //setValidated(true);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id !== "0") {
      GetItem(id).then(data => {
        setCard(data);
      })
    }

    GetAll().then(data => {
      setUnities(data);
    })
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="name">Unity</label>
              <select className='form-control' autoFocus value={card.UnityId} onChange={e => setCard({ ...card, UnityId: e.target.value })}>
                <option value="">Selecione</option>
                {Array.isArray(unity) && unity.map((unity, index) => (
                  <option key={index} value={unity.Id}>{unity.Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="Phrase">Phrase</label>
              <textarea type="text" className="form-control" value={card.Phrase} name='Phrase' onChange={e => setCard({ ...card, Phrase: e.target.value })} rows={3}></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="Translate">Translate</label>
              <textarea type="text" className="form-control" value={card.Translate} name='Translate' onChange={e => setCard({ ...card, Translate: e.target.value })} rows={3}></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="IPA">IPA</label>
              <textarea type="text" className="form-control" value={card.IPA} name='IPA' onChange={e => setCard({ ...card, IPA: e.target.value })} rows={3}></textarea>
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
