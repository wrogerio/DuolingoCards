import { useEffect, useState } from "react";
// components
import HeaderPage from "@/components/HeaderPage";
import { handleSearch, toFirstLetterUpperCase } from "@/helper/util";
import { GetAll, RemoveItem } from "@/services/CardService";
import { GetAll as GetAllUnities } from "@/services/UnityService";
import Link from "next/link";

const Cards = () => {
  const urlRoot = "cards";
  const [cards, setCards] = useState([]);
  const [unities, setUnities] = useState([]);

  const [unity, setUnity] = useState('');
  const [termo, setTermo] = useState("");

  const handleRemove = (id) => {
    if (!confirm("Deseja realmente remover este item?")) return;
    RemoveItem(id).then(data => {
      GetAll(unity).then(data => {
        setCards(data);
      })
    })
  }

  useEffect(() => {
    GetAllUnities().then(data => {
      setUnities(data);
    })
  }, [])

  useEffect(() => {
    handleSearch(termo.toLocaleLowerCase());
  }, [termo])

  useEffect(() => {
    setCards([]);
    if (unity !== '') {
      GetAll(unity).then(data => {
        setCards(data);
      })
    }
  }, [unity])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} lenght={cards.length} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <div className="row mb-2">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label htmlFor="selectCard">Select the Unity</label>
            <select className="form-control" autoFocus onChange={e => setUnity(e.target.value)}>
              <option value="">Todos</option>
              {unities.map((unity, index) => (
                <option key={index} value={unity.Id}>{unity.Name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Pesquisar" value={termo} onChange={e => setTermo(e.target.value)} />
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Phrase</th>
                <th className="d-none d-md-table-cell">Translate</th>
                <th className="d-none d-md-table-cell">IPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cards) && cards.map((card, index) => (
                <tr key={index} data-search={`${card.Phrase}-${card.Translate}-${card.IPA}`}>
                  <td>{card.Phrase}</td>
                  <td className="d-none d-md-table-cell">{card.Translate}</td>
                  <td className="d-none d-md-table-cell">{card.IPA}</td>
                  <td>
                    <Link href={`/${urlRoot}/add-or-edit/${card.Id}`} >
                      <i className="fas fa-edit me-2"></i>
                    </Link>
                    <span className="text-danger" onClick={e => handleRemove(card.Id.toLowerCase())}>
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

export default Cards;
