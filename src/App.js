import { Routes, Route, } from "react-router-dom";
import { Provider } from 'react-redux'
import './App.css';
import 'reset-css/reset.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'font-awesome/css/font-awesome.css'
import store from './redux/store'
import VillaPage from './Pages/User/VillaPage';
import CulinaryPage from './Pages/User/CulinaryPage';
import HomePage from './Pages/User/HomePage';
import ExplorePage from './Pages/User/ExplorePage';
import GalleryPage from './Pages/User/GalleryPage';
import BookingPage from './Pages/User/BookingPage';
import LayoutUser from './Layout/LayoutUser'
import HistoryBookingPage from './Pages/User/HistoryBookingPage'
import Login from './Components/form_login/Login'
import Register from './Components/form_register/Register'
import HomeCart from './Pages/User/HomeCart';
import PayCard from './Components/User/PayCard'
import AdminPage from './Pages/Admin/AdminPage';
import SearchFormBooking from './Components/Admin/booking_manager/searchFormBooking';
import DeluxePool from './Components/Admin/room_manager/DeluxePoolRoom';
import DeluxeExecutive from './Components/Admin/room_manager/DeluxeExecutiveRoom';
import Deluxe from './Components/Admin/room_manager/DeluxeRoom';
import DeluxePlus from './Components/Admin/room_manager/DeluxePlusRoom';
import DetailPage from "./Pages/User/DetailPage";

import ManagerUserPage from "./Pages/Admin/ManagerUserPage";
import DashBoard from "./Components/Admin/DashBoard";



function App() {
  return (
    <Provider store={store}>
      <div className="App">     
          <Routes>
            <Route path="/bookingpage" element={<BookingPage />} />
            <Route path="/history" element={<HistoryBookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homecart" element={<HomeCart />} />
            <Route path="/paycard" element={<PayCard />} />
            <Route path="/history/:id" element={<DetailPage/>} />
            {/*home  */}
            <Route path="/" element={<LayoutUser />}>
              <Route index element={<HomePage />} />
              <Route path="/villapage" element={<VillaPage />} />
              <Route path="/culinarypage" element={<CulinaryPage />} />
              <Route path="/explorepage" element={<ExplorePage />} />
              <Route path="/gallerypage" element={<GalleryPage />} />
            </Route>
            {/* admin */}
            <Route path="/adminpage" element={<AdminPage />} >
              <Route path="ManagerBooking" element={<SearchFormBooking />} />
              <Route path="ManagerRoomDeluxePool" element={<DeluxePool />} />
              <Route path="ManagerRoomDeluxeExecutive" element={<DeluxeExecutive />} />
              <Route path="ManagerRoomDeluxePlus" element={<DeluxePlus />} />
              <Route path="ManagerRoomDeluxe" element={<Deluxe />} />
              <Route path="ManagerUser" element={<ManagerUserPage/>} />
              <Route path="DashBoard" element={<DashBoard/>} />
            </Route>
            <Route path="/bookingpage" element={<BookingPage/>}/>
          </Routes>
     
      </div>
    </Provider>
  );
}

export default App;
