import { useState, useCallback } from "react";
import { SearchResults } from "../Shared/SearchResults/searchResults";
import { getHotelsByQuery } from "../../api/api";
import { debounce } from "lodash";

interface Hotel {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
}

export const Search = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const fetchDataByQueryString = async (query: string) => {
    return await getHotelsByQuery(query);
  };

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) return;
      const hotels = await fetchDataByQueryString(searchTerm);
      setShowClearBtn(true);

      const searchQueryLowerCase = searchQuery.toLowerCase();

      const country: string[] = [
        ...new Set(
          hotels
            .filter((hotel: Hotel) =>
              hotel.country.toLowerCase().includes(searchQueryLowerCase)
            )
            .map((hotel: Hotel) => hotel.country)
        ),
      ] as string[];

      const city: string[] = [
        ...new Set(
          hotels
            .filter((hotel: Hotel) =>
              hotel.city.toLowerCase().includes(searchQueryLowerCase)
            )
            .map((hotel: Hotel) => hotel.city)
        ),
      ] as string[];
      setHotels(hotels);
      setCountries(country);
      setCities(city);
    }, 500),
    []
  );

  const clearLocalState = () => {
    setHotels([]);
    setCountries([]);
    setCities([]);
    setSearchQuery("");
    setShowClearBtn(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (!value) {
      clearLocalState();
      debouncedSearch.cancel();
    } else {
      //avoid calling api on every key stroke, hence added a delay of 500ms
      debouncedSearch(value);
    }
  };

  const handleClearBtn = () => {
    clearLocalState();
    return;
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row height d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="dropdown">
                <div className="form">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Search accommodation..."
                    onChange={handleSearch}
                    value={searchQuery}
                  />
                  {showClearBtn && (
                    <span className="left-pan">
                      <i className="fa fa-close" onClick={handleClearBtn}></i>
                    </span>
                  )}
                </div>
                {hotels.length > 0 && (
                  <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                    <SearchResults
                      title="Hotels"
                      results={hotels.map((hotel) => hotel.hotel_name)}
                      path="hotel"
                    />
                    {countries.length > 0 ? (
                      <SearchResults
                        title="Countries"
                        results={countries}
                        path="country"
                      />
                    ) : (
                      <p>No countries matched</p>
                    )}
                    {cities.length > 0 ? (
                      <SearchResults
                        title="Cities"
                        results={cities}
                        path="city"
                      />
                    ) : (
                      <p>No cities matched</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
