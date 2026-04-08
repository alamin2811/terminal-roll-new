import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Index";
import GameTerminal from "./pages/play-bit-flip";
import CacheHuntTerminal from "./pages/play-cache-hunt";
import PumpLoopTerminal from "./pages/play-pump-loop";
import BeatBombTerminal from "./pages/play-beat-the-bomb";
import Error from "./pages/error";
import PlayerConsole from "./pages/player-console";
import InviteAndEarn from "./pages/invite-and-earn";
import ContactSupport from "./pages/contact-support";
import TermsAndConditions from "./pages/terms-and-condition";
import PrivacyPolicy from "./pages/privacy-policy";
import FreeRollTerminalPage from "./pages/free-roll-terminal";
import PlayerLeaderboardPage from "./pages/player-leaderboard";
import ReferrerLeaderboardPage from "./pages/referrer-leaderboard";
import TransactionPage from "./pages/transaction";
import FaqPage from "./pages/faq";
import { useEnsurePlayer } from "./hooks/useEnsurePlayer";
import { AppPlayerProvider } from "./context/AppPlayerContext";
import { useLocation } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import { authenticate } from "./services/auth.api";
import { useAuthSession } from "./hooks/useAuthSession"
import AuthNotice from "./components/Core/AuthNotice/AuthNotice";



function PlausiblePageview() {
  const location = useLocation();

  useEffect(() => {
    if (window.plausible) {
      window.plausible("pageview", {
        u: window.location.origin + location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}



function App() {
  // Get teh wallet address
  const { address, isConnected, signMessage } = useAppKitAccount();
  const authInFlight = useRef(false);

  const { needsAuth, startAuth, dismiss } = useAuthSession();

  // Test for invite referral and associate
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("invite");

    if (ref && !localStorage.getItem("invite")) {
      localStorage.setItem("invite", ref);
    }
  }, []);

  // Make sure the player has an account
  useEnsurePlayer();

  return (
    <AppPlayerProvider>
      <BrowserRouter parentC>
        <AuthNotice
          show={needsAuth}
          onClose={dismiss}
          onVerify={startAuth}
        />
        <PlausiblePageview />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play-bit-flip" element={<GameTerminal />} />
          <Route path="/play-cache-hunt" element={<CacheHuntTerminal />} />
          <Route path="/play-pump-loop" element={<PumpLoopTerminal />} />
          <Route path="/play-beat-the-bomb" element={<BeatBombTerminal />} />
          <Route path="/player-console" element={<PlayerConsole />} />
          <Route path="/invite-and-earn" element={<InviteAndEarn />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/terms-and-condition" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/free-roll-terminal" element={<FreeRollTerminalPage />} />
          <Route path="/player-leaderboard" element={<PlayerLeaderboardPage />} />
          <Route path="/referrer-leaderboard" element={<ReferrerLeaderboardPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AppPlayerProvider>
  );
}

export default App;

