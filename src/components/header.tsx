import moonIcon from "../assets/moon-outline.svg";
import moonSharp from "../assets/moon-sharp.svg";
import { useTheme } from "../context/theme";

function header() {
  const { darkMode, toggleMode } = useTheme();

  return (
    <div className="header-container">
      <h1>Where in tha world?</h1>
      <button onClick={toggleMode}><img src={darkMode ? moonSharp : moonIcon}/>Dark mode</button>
    </div>
  )
}

export default header