import { useLocation } from "react-router-dom"
import NavBar from "./components/Shop/widgets/nav_bar"
import TopBanner from "./components/Shop/widgets/top_banner"
import AppRouter from "./router"
import Footer from "./components/Shop/widgets/footer"
import PageProgress from './components/Shop/widgets/page_progress'
import WelcomeDialog from "./components/wellcoming_dialog"

function App() {
  const location = useLocation();

  return (


    <>


      <PageProgress></PageProgress>

      <WelcomeDialog></WelcomeDialog>


      <div>
        {location.pathname !== '/admin' && location.pathname !== '/register' && (
          <>
            <TopBanner></TopBanner>
            <NavBar></NavBar>
          </>
        )}

       
        <AppRouter />

      
        {location.pathname !== '/admin' && location.pathname !== '/register' && (
          <>
            <Footer></Footer>
          </>
        )}

      </div>
    </>
  )
}

export default App