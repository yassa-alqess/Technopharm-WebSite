export interface CityResponse {
    CitiesListResult: City[];
}

export interface City {
    City:      string;
    Country:   Country;
}

export enum Country {
    EGYPT = "مصر",
}
