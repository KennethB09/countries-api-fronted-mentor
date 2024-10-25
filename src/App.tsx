import Header from "./components/header";
import Countries from "./components/countries";
import { ThemeProvider } from "./context/theme";

function App() {

  return (
    <ThemeProvider>
      <main className="main-container">
        <Header />
        <Countries />
      </main>
    </ThemeProvider>
  )
}

export default App
