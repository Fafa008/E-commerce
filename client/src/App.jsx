import {Landin} from "./pages/index.js";
import {Header, Footer} from "./layout/index.js";
function App() {

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <Header />
      <Landin />
      <Footer />
    </div>
  )
}

export default App
