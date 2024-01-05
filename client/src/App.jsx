import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import About from "./Pages/About"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import CreateListing from "./Pages/CreateListing"
import UpdateListing from "./Pages/UpdateListing"


const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={ <Home />  } />
      <Route path="/login" element={ <SignIn />  } />
      <Route path="/signup" element={ <SignUp />  } />
      <Route path="/about" element={ <About />  } />

      <Route  element={ <PrivateRoute />  } >
      <Route path="/profile" element={ <Profile />  } />
      <Route path="/create-listing" element={ <CreateListing />  } />
      <Route path="/update-listing/:listingId" element={ <UpdateListing />  } />
      </Route>

    </Routes>


    </>
  )
}

export default App