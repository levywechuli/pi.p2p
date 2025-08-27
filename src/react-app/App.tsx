import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoadingPage from "@/react-app/pages/LoadingPage";
import MinePage from "@/react-app/pages/MinePage";
import ValidatePage from "@/react-app/pages/ValidatePage";
import WalletPage from "@/react-app/pages/WalletPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/mine" element={<MinePage />} />
        <Route path="/mine/validate" element={<ValidatePage />} />
        <Route path="/mine/wallet" element={<WalletPage />} />
      </Routes>
    </Router>
  );
}
