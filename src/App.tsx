import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { stepComponents } from "./imports";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

  const switchComponent = () => {
    const Component = stepComponents[step];
    return <Component />;
  };


  return (
    <Routes>
      <Route path="/" element={<main>{switchComponent()}</main>} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
})