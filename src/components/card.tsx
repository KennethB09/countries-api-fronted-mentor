import { country } from "./countries";

type cardProps = {
    c: country;
    onClickCountry: (country: country) => void;
}

function card({c, onClickCountry}: cardProps) {
    return (
        <div className="countries-list-card" onClick={() => onClickCountry(c)}>
            <div className="countries-list-card-image-container">
                <img src={c.flags.png} />
            </div>
            <div className="countries-list-card-info-container">
                <h1>{c.name.common}</h1>
                <p><span>Population: </span>{c.population}</p>
                <p><span>Region: </span>{c.region}</p>
                <p><span>Capital: </span>{c.capital}</p>
            </div>
        </div>
    )
}

export default card