import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { stepComponents } from "./imports";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminSearchPage from "./pages/AdminPage/AdminSearchPage/AdminSearchPage";
import AdminTablePage from "./pages/AdminPage/AdminTablePage/AdminTablePage";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

  const switchComponent = () => {
    const Component = stepComponents[step];
    return <Component />;
  };

  return (
    <Routes>
      <Route path="/" element={<main>{switchComponent()}</main>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/prices" element={<AdminPage />} />
      <Route path="/admin/table">
        <Route index element={<AdminSearchPage />} />
        <Route path=':id' element={<AdminTablePage />} />
      </Route>
    </Routes>
  )
})