import Header from "./components/GeneralComponents/Header";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Instructions from "./components/Instructions/Instructions";
import Footer from "./components/GeneralComponents/Footer";
import HomePage from "./components/HomePage/HomePage";
import ScrollToTop from "react-scroll-to-top";
// import SignInPage from "./components/UserProfile/SignInPage";
import AboutUs from "./components/VibelyTeam/AboutUs";
import Test from "./components/Test";
import Layout from "./components/Layout";
import LogInForm from "./components/UserProfile/LogInForm";
import RegisterForm from "./components/UserProfile/RegisterForm";
import RequireAuth from "./components/RequireAuth";
import UnderConstruction from "./components/GeneralComponents/UnderConstruction";
import AllEventsList from "./components/Categories/EventPages/AllEventsList";
import Event from "./components/Categories/EventPages/Event";


function App() {
  return (
    <div className="App">
      <ScrollToTop style={{borderRadius: "50%"}}/>
      <Header />
        <Routes>   
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            {/* <Route path="/signin" element={<SignInPage />} /> */}
            <Route path="/login" element={<LogInForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tc" element={<UnderConstruction />} />
            <Route path="/allevents" element={<AllEventsList />} />
            <Route path="/allevents/event" element={<Event />} /> {/* move to protected routes  after completed* and change path to: "/allevents/:event_id/}

            {/* protected routes */}
            {/* profile, edit events, edit profile, join events, single event page? */}
            <Route element={<RequireAuth />}>
              {/* <Route path="/categories" element={<Categories />} /> */}
            </Route>

            {/* catch all - to create missing element */}
            <Route path="*" element={<Test />} />            
          </Route>    
        </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
