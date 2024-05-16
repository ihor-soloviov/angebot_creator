import { useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { SearchInput } from '../../../components/SearchInput';
import img from '../../../assets/angebotTypePicture.png'
import './AdminSearchPage.scss'
import { SearchResult } from '../../../types/dealsTypes';
import { ButtonNext } from '../../../components/Buttons/ButtonNext';
import { useNavigate } from 'react-router-dom';

const AdminSearchPage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (selectedId) {
      setIsDisabled(false)
    }
  }, [selectedId])

  const openTableByAngebotId = () => {
    if (!selectedId) {
      return
    }

    navigate(`/admin/table/${selectedId}`)
  }

  return (
    <div className="angebotTypePage">
      <Header />
      <div className="angebotTypePage__inner">
        <div className="angebotType">
          <div className="angebotType__inner">
            <p className="label angebotTypeLabel">ID ангебота</p>
            <SearchInput searchResult={searchResult} setSearchResult={setSearchResult} setSelectedId={setSelectedId} />
            <ButtonNext isDisabled={isDisabled} adminOnClick={openTableByAngebotId} />
          </div>
        </div>
        <img className="angebotImage" src={img} alt="girl with notebook" />
      </div>
    </div>
  )
}

export default AdminSearchPage
