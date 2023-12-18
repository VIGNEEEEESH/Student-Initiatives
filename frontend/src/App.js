import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import StudentCouncilpage from "./pages/StudentCouncilpage";
import ClubsDivision from "./pages/ClubsDivision";
import UniversityClubs from "./pages/UniversityClubs";
import SchoolClubs from "./pages/SchoolClubs";
import ClubPage from "./pages/School_Clubs/ClubPage";
import Login from "./pages/Login";
import Error from "./components/images/Error 404 Page Under Construction Concept Social Media-3.png"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import COE from "./pages/COE";
import ScrollToTop from "./pages/ScrollToTop";
import Calendar from "./pages/Calender";
import Admin from "./pages/Admin";
import AddClub from "./pages/AddClub";
import AddCOE from "./pages/AddCOE";
import AddSchool from "./pages/AddSchool";

import DeleteSchool from "./pages/DeleteSchool";
import DeleteClub from "./pages/DeleteClub";
import DeleteCOE from "./pages/DeleteCOE";

import EditClub from "./pages/EditClub";
import EditCOE from "./pages/EditCOE";
import Gallery from "./pages/Gallery";
import COEList from "./pages/COEList";
import COEpage from "./pages/COEpage";
import SpecificClubList from "./pages/SpecificClubList";
import AdminLogIn from "./pages/AdminLogIn";
import AddAdmin from "./pages/AddAdmin";
import { useSelector } from "react-redux";


function App() {
  const {isAuthorised,coeId,clubId}=useSelector(state=>state.auth);
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/StudentCouncilpage"
            element={<StudentCouncilpage />}
          />
          <Route exact path="/ClubsDivision" element={<ClubsDivision />} />
          <Route exact path="/UniversityClubs" element={<UniversityClubs />} />
          <Route exact path="/SchoolClubs" element={<SchoolClubs />} />
          {isAuthorised&&coeId===null&&clubId===null?<Route exact path="/Admin" element={<Admin />} />:null}
          <Route exact path="/AddClub" element={<AddClub />} />
          <Route exact path="/AddCOE" element={<AddCOE />} />
          <Route exact path="/AddSchool" element={<AddSchool />} />
          <Route exact path="/COE" element={<COE />} />
          <Route path="/COEpage/:id" element={<COEpage />} />
          <Route exact path="/Calender" element={<Calendar />} />
          <Route exact path="/COEList" element={<COEList />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/AdminLogIn" element={<AdminLogIn />} />
          <Route exact path="/DeleteSchool" element={<DeleteSchool />} />
          <Route exact path="/DeleteClub" element={<DeleteClub />} />
          <Route exact path="/DeleteCOE" element={<DeleteCOE />} />
          <Route exact path="/AddAdmin" element={<AddAdmin />} />
          
          <Route exact path="/EditClub" element={<EditClub />} />
          <Route exact path="/EditCOE" element={<EditCOE />} />
          <Route exact path="/Gallery7932" element={<Gallery />} />
          <Route
            exact
            path="/SpecificClubList/:schoolId"
            element={<SpecificClubList />}
          />
          <Route path="/ClubPage/:clubId" element={<ClubPage />}></Route>
          <Route path="*" element={<div>
            <center><img src={Error} height="400px" style={{marginTop:"100px"}}></img></center>
          </div>}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
