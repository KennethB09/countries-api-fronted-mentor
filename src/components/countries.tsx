import { useEffect, useState } from "react";
import Detail from "./detail";
import Card from "./card";
import searchIcon from "../assets/search-outline.svg";
import searchIconWhite from "../assets/search-outline copy.svg";
import chevron from "../assets/chevron-up-outline.svg";
import chevronWhite from "../assets/chevron-up-outline copy.svg";
import { useTheme } from "../context/theme";

export interface country {
    altSpellings: string[];
    area: number;
    borders: string[] | null;
    capital: string[];
    capitalInfo: { latlng: [number, number] };
    car: { signs: string[], side: 'right' }
    cca2: string;
    cca3: string;
    ccn3: string;
    coatOfArms: {};
    continents: string[];
    currencies: { currency: { name: string, symbol: string } };
    demonyms: { eng: { f: string, m: string } };
    flag: string;
    flags: { png: string, svg: string };
    idd: { root: string, suffixes: string[] }
    independent: boolean;
    landlocked: boolean;
    languages: { eng: string }
    latlng: [number, number]
    maps: { googleMaps: string, openStreetMaps: string }
    name: { common: string, official: string, nativeName: { eng: string, common: string } }
    population: number
    region: string;
    startOfWeek: string
    status: string;
    subregion: string;
    timezones: [number]
    tld: [string]
    unMember: boolean
}

function countries() {
    const { darkMode } = useTheme();
    const [countries, setCountries] = useState<country[]>();
    const [country, setCountry] = useState<country | null>(null);
    const [filter, setFilter] = useState("");
    const [isDropDown, setIsDropDown] = useState(false);
    const [filterByRegion, setFilterByRegion] = useState("")
    const [radioToggle, setRadioToggle] = useState(false);

    const filteredCountries = countries?.filter(c => c.region.toLowerCase() === filterByRegion.toLowerCase())
    const filteredSearchCountries = filteredCountries?.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    const searchCountry = countries?.filter(c => c.name.common.toLowerCase().includes(filter))
    
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error:', error))
    }, [])

    function toggle() {
        setRadioToggle(prev => !prev);
        if (radioToggle) {
            setFilterByRegion("");
        }
    };

    function handleDropDown() {
        const dropDownBtn = document.querySelector(".countries-dropdown-menu-btn");
        const isOpen = dropDownBtn?.getAttribute("data-dropdown");
        setIsDropDown(!isDropDown);
        if (isOpen === "true") {
            dropDownBtn?.setAttribute("data-dropdown", "false");
        } else {
            dropDownBtn?.setAttribute("data-dropdown", "true");
        }
    }

    function onClickCountry(country: country) {
        setCountry(country)
        setIsDropDown(false);
    }

    return (
        <div className="countries-container">
            <div className="countries-filter-container">
                <div className="countries-search-container">
                    <img src={darkMode ? searchIconWhite : searchIcon} />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={filter}
                        onChange={e => setFilter(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="countries-dropdown-menu-container">
                    <button onClick={handleDropDown} data-dropdown="false" className="countries-dropdown-menu-btn">{radioToggle ? filterByRegion.toUpperCase() : "Filter by Region"}<img src={darkMode ? chevronWhite : chevron} /></button>
                    {isDropDown && <div className="countries-dropdown-menu-list">
                        <label htmlFor="Africa">Africa</label>
                        <input
                            id="Africa"
                            type="radio"
                            value="Africa"
                            name="continent"
                            onChange={e => setFilterByRegion(e.target.value.toLowerCase())}
                            checked={radioToggle}
                            onClick={toggle}
                        />
                        <label htmlFor="Americas">Americas</label>
                        <input
                            id="Americas"
                            type="radio"
                            value="Americas"
                            name="continent"
                            onChange={e => setFilterByRegion(e.target.value.toLowerCase())}
                            checked={radioToggle}
                            onClick={toggle}
                        />
                        <label htmlFor="Asia">Asia</label>
                        <input
                            id="Asia"
                            type="radio"
                            value="Asia"
                            name="continent"
                            onChange={e => setFilterByRegion(e.target.value.toLowerCase())}
                            checked={radioToggle}
                            onClick={toggle}
                        />
                        <label htmlFor="Europe">Europe</label>
                        <input
                            id="Europe"
                            type="radio"
                            value="Europe"
                            name="continent"
                            onChange={e => setFilterByRegion(e.target.value.toLowerCase())}
                            checked={radioToggle}
                            onClick={toggle}
                        />
                        <label htmlFor="Oceania">Oceania</label>
                        <input
                            id="Oceania"
                            type="radio"
                            value="Oceania"
                            name="continent"
                            onChange={e => setFilterByRegion(e.target.value.toLowerCase())}
                            checked={radioToggle}
                            onClick={toggle}
                        />
                    </div>}
                </div>
            </div>
            <div className="countries-list-container">
                {filteredCountries?.length !== 0 ?
                    filteredSearchCountries?.length !== 0 ?
                        filteredSearchCountries && filteredSearchCountries?.map((c: country, i: number) => (
                                <Card key={i} c={c} onClickCountry={onClickCountry}/>
                            ))
                            :
                            filteredCountries && filteredCountries.map((c: country, i: number) => (
                                <Card key={i} c={c} onClickCountry={onClickCountry}/>
                            ))
                    :
                    searchCountry?.length !== 0 ?
                        searchCountry && searchCountry.map((c: country, i: number) => (
                            <Card key={i} c={c} onClickCountry={onClickCountry}/>
                            ))
                            :
                            countries && countries.map((c: country, i: number) => (
                                <Card key={i} c={c} onClickCountry={onClickCountry}/>
                            ))
                }
            </div>
            {country && <Detail country={country} setCountry={setCountry} />}
        </div>
    )
}

export default countries