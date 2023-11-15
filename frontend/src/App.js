import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";

import { Routes, Route, HashRouter } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Profile from "./pages/profile/index";
import LoadingProfile from "./pages/loading/index";
import ForgotPassword from "./components/layout/forgotPassword/forgotPassword";
import PasswordReset from "./components/layout/PasswordReset/passwordReset";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile" element={<LoadingProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
{/*         <Route exact path="/personal/beFreelancer" element={<BecomeFreelancer />} />
 */}
      </Routes>
    </HashRouter>
  );
}

export default App;
