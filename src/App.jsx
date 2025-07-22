
import { BrowserRouter, Routes, Route , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Upload from './pages/uploaded.jsx'
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Places from './pages/Places';
import Shared from './pages/Shared';
import HotelDetailsPage from './components/HotelDetails.jsx';
import Share from './pages/share1.jsx';
import Contact from './pages/Contact';
import TripDetailsForm from './pages/TripDetails.jsx'
import AvailableFlights from './components/AvailableFlights.jsx';
import DestinationDetails from './pages/DestinationDetails copy.jsx';
import Pool from './components/pool/Pool';
import Uploaded from './pages/uploaded.jsx';
import Ride from './components/pool/Ride';
import CreateRide from './components/pool/CreateRide';
import AvailableHotels from './components/AvailableHotels.jsx';
import Footer from './pages/Footer.jsx';
import ImageCaptcha from './components/capcha.jsx';
import ExpenseTracker from './components/Expensetracker.jsx';
import MaskedImage from './components/image_mask.jsx';
import WebPlayComp from './pages/webplayer.jsx';
import Dashboard from './components/Dashboard.jsx';
import Cart from './pages/cart_page.jsx';
import LandingPage from './components/TripPlanner.jsx';
import HotelPage from './components/Hotels.jsx';
import DasboardTripPage from "./components/dasboardTripPlan.jsx";
import UserTrips from "./pages/usertrips.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <CartIcon /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/upload_place' element={<Upload/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/places' element={<Places />} />
        <Route path='/shared' element={<Shared />} />
        <Route path='/share' element={<Share />} />
        <Route path='/uploaded' element={<Uploaded />} />
        <Route path='/pool' element={<Pool />} />
        <Route path='/createride' element={<CreateRide />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/expensetracker' element={<ExpenseTracker />} />
        <Route path='/mImg' element={<MaskedImage />}/>
        <Route path='/available-flights' element={<AvailableFlights />} />
        <Route path='/webplay' element={< WebPlayComp />}/>
        <Route path='/usertrips' element={< UserTrips />}/>
        {/* <Route path='/hotels' element={<HotelDetailsPage />} /> */}
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/hotels' element={<AvailableHotels />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/dashboard/:tripid/:currentuser_id" element={<DasboardTripPage />} />
        <Route path='/trip_details' element={<TripDetailsForm />} />
        <Route exact path="/cart" element={<Cart />} /> 
        {/* <Route path="/hotels" element={< HotelPage/>}/> */}
        <Route exact path="/destination/:id" element={<DestinationDetails />} /> 
        <Route exact path="/shared/:id" element={<DestinationDetails />} /> 
        <Route exact path="/ride/:id" element={<Ride />} /> 
        <Route exact path="/capcha" element={<ImageCaptcha />} /> 

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      {/* {!isSignUpOrSignInPage && <Footer />}  */}
    </BrowserRouter>

  );

}