
import './App.css';
import { Route , Routes, useLocation } from 'react-router-dom';
import About from './components/about/About';
import Home from './components/home/Home';
import Properties from './components/properties/Properties';
import Contact from './components/contact/Contact';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import OtpVerify from './components/otpVerify/OtpVerify';
import Forgetpassword from './components/forgetPassword/Forgetpassword.js';
import Forgetotp from './components/forgetOtp/Forgetotp';
import Myprofile from './components/myProfile/Myprofile';
import Propertydetails from './components/propertyDetail/Propertydetails.js';
import Listproperty from './components/listproperty/Listproperty';
import Viewmore from './components/viewMore/Viewmore';
import Viewbookmarked from './components/viewBookmarked/Viewbookmarked';
import Updateproperty from './components/updateProperty/Updateproperty';
import Header from './components/header/Header.js';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();
  const showHeader = ['/about','/','/properties','/contact','/list-property','/myprofile',
    '/property/:id','/view-more/:id','/view-bookmarked/:id','/update-property/:id','/signin'].includes(location.pathname);

  return (
  <>
      {/* Conditionally render the header based on current location */}
      {showHeader && <Header/>}

     <div style={{paddingTop: showHeader? "68px":"0px"}}>
     <Routes>
      {/* Public routes */}
         <Route path='/' element={<Home />}></Route>
         <Route path='/about' element={<About/>}></Route>
         <Route path='/properties' element={<Properties/>}></Route>
         <Route path='/contact' element={<Contact/>}></Route>
         <Route path='/signin' element={<SignIn/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/property/:id' element={<Propertydetails/>}></Route>
         <Route path='/verify' element={<OtpVerify/>}></Route>
         <Route path='/forgetpassword' element={<Forgetpassword/>}></Route>
         <Route path='/resetpasswordotp' element={<Forgetotp/>}></Route>
         <Route path='/list-property' element={<Listproperty/>}></Route>

      {/* Protected routes */}
         <Route element={<ProtectedRoute />}>
            <Route path='/myprofile' element={<Myprofile/>}></Route>
            <Route path='/view-more/:id' element={<Viewmore/>}></Route>
            <Route path='/view-bookmarked/:id' element={<Viewbookmarked/>}></Route>
            <Route path='/update-property/:id' element={<Updateproperty/>}></Route>
        </Route>
     </Routes>
     <ToastContainer position="top-right" autoClose={2000} theme='colored'/>
     </div>
  </>
  );
}

export default App;
