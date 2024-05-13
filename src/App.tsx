import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { stepComponents } from "./imports";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import { WelcomePage } from "./pages/WelcomePage";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

  const switchComponent = () => {
    const Component = stepComponents[step];
    return <Component />;
  };


  return (
    <Routes>
      <Route path="/" element={<main>{switchComponent()}</main>} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="prices" element={<WelcomePage />} />
        <Route path="table" element={<div>вфффф</div>} />
      </Route>
    </Routes>
  )
})