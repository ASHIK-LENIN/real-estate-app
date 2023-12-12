import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/Signin"
import SignUp from "./Pages/SignUp"
import About from "./Pages/About"
import Profile from "./Pages/Profile"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={ <Home />  } />
      <Route path="/signin" element={ <SignIn />  } />
      <Route path="/signup" element={ <SignUp />  } />
      <Route path="/about" element={ <About />  } />
      <Route path="/profile" element={ <Profile />  } />


    </Routes>


    </>
  )
}

export default App