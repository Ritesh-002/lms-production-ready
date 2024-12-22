import { Route, Routes } from 'react-router-dom'
import './App.css';
import Footer from './Components/footer';
import HomePage from './Pages/homePage';
import AboutUs from './Pages/aboutUs';
import NotFound from './Pages/notFound';
import SignUp from './Pages/signUp';
import LogIn from './Pages/logIn';
import ContactUs from './Pages/contactUs';
import CourseList from './Pages/Course/courseList';
import AccessDenied from './Pages/accessDenied';
import CourseDescription from './Pages/Course/courseDescription';
import RequireAuth from './Pages/requireAuth';
import CreateCourse from './Pages/Course/createCourse';
import UserProfile from './Pages/User/userProfile';
import EditProfile from './Pages/User/editProfile';
import LectureList from './Pages/Lectures/lectureList';
import AddLectures from './Pages/Lectures/addLectures';
import DashBoard from './Pages/Admin/dashboard';
import CheckOut from './Pages/Payments/checkOut';
import PaymentSuccess from './Pages/Payments/paymentSuccess';
import PaymentFail from './Pages/Payments/paymentFail';
function App() {

  return (
    // <div className='text-3xl'>
    //   {/* <Routes>

    //   </Routes> */}
    //   {/* <Footer /> */}

    // </div>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/about-us' element={<AboutUs />}></Route>
      <Route path='/sign-up' element={<SignUp />}></Route>
      <Route path='/login' element={<LogIn />}></Route>
      <Route path='/contact-us' element={<ContactUs />}></Route>
      <Route path='/courses' element={<CourseList />}></Route>
      <Route path='/course/description' element={<CourseDescription />}></Route>
      <Route path='/denied' element={<AccessDenied />}></Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/course/create' element={<CreateCourse />}></Route>
        <Route path='/course/add-lectures' element={<AddLectures />}></Route>
        <Route path='/admin/dashboard' element={<DashBoard />}></Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path='/user/profile' element={<UserProfile />}></Route>
        <Route path='/user/profile/edit' element={<EditProfile />}></Route>
        <Route path='/lectures' element={<LectureList />}></Route>
        <Route path='/payments/checkout' element={<CheckOut />}></Route>
        <Route path='/payments/checkout/success' element={<PaymentSuccess />}></Route>
        <Route path='/payments/checkout/fail' element={<PaymentFail />}></Route>
      </Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  )
}

export default App
