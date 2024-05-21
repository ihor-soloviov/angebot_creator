import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminSearchPage from "./pages/AdminPage/AdminSearchPage/AdminSearchPage";
import AdminTablePage from "./pages/AdminPage/AdminTablePage/AdminTablePage";
import AngebotCreatorSteps from "./pages/AngebotCreatorSteps/AngebotCreatorSteps";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import { WelcomePage } from "./pages/WelcomePage";
import AdminCheckout from "./pages/AdminPage/AdminCheckout/AdminCheckout";
import ChangePricePage from "./pages/ChangePricePage/ChangePricePage";

export const App: React.FC = observer(() => {

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/angebotCreator" element={<AngebotCreatorSteps />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/prices">
        <Route index element={<AdminCheckout />} />
        <Route path=":partition" element={<ChangePricePage />} />
      </Route>
      <Route path="/admin/table">
        <Route index element={<AdminSearchPage />} />
        <Route path=':id' element={<AdminTablePage />} />
      </Route>
    </Routes>
  )
})