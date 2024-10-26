import { country } from "./countries";
import arrowBack from "../assets/arrow-back-outline.svg";
import arrowBackWhite from "../assets/arrow-back-outline copy.svg";
import { useTheme } from "../context/theme";

type detailProps = {
  country: country | null;
  setCountry: React.Dispatch<React.SetStateAction<country | null>>;
}
function detail({ country, setCountry }: detailProps) {
  const { darkMode } = useTheme();
  const currencies = country?.currencies ? Object.values(country.currencies) : [];
  const currency = currencies.length > 0 ? currencies[0].name : 'N/A';
  const languages = country?.languages ? Object.values(country.languages) : [];
  const language = languages.length > 0 ? languages.join(", ") : 'N/A';
  return (
    <div className="detail-container">
      <button onClick={() => setCountry(null)}><img alt="back button" src={darkMode ? arrowBackWhite : arrowBack} /> Back</button>
      <div className="detail-section-container">

        <img src={country?.flags.png} alt={`${country?.name.common} flag`} />

        <div className="detail-section-1-2-3-container">
          <h1 className="detail-section-country-name">{country?.name.common}</h1>

          <div className="detail-section-1">
            <p><span>Population: </span>{country?.population}</p>
            <p><span>Region: </span>{country?.region}</p>
            <p><span>Sub Region: </span>{country?.subregion}</p>
            <p><span>Capital: </span>{country?.capital}</p>
          </div>

          <div className="detail-section-2">
            <p><span>Top Level Domain: </span>{country?.tld}</p>
            <p><span>Currency: </span>{currency}</p>
            <p><span>Languages: </span>{language}</p>
          </div>

          <div className="detail-section-3">

            <h1>Border Countries:</h1>
            <ul>
              {country?.borders && country.borders.map((border, index) => (
                <div key={index}>
                  <li>{border}</li>
                </div>
              ))}
            </ul>

          </div>
        </div>


      </div>
    </div>
  )
}

export default detail