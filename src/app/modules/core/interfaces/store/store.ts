export interface StoresResponse {
    StoresGetAllResult: Store[];
}

export interface Store {
    Id: string;
    Address: Address;
    CultureName: null;
    Currency: Currency;
    DefaultCustomer: null;
    Description: string;
    Distance: number;
    FunctionalityProfileId: null;
    Images: Partial<Image>[];
    IsClickAndCollect: boolean;
    Latitude: number;
    Longitude: number;
    Phone: string;
    StoreHours: any[];
    StoreServices: any[];
    TaxGroupId: string;
    UseDefaultCustomer: null;
}

interface Address {
    Address1: string;
    Address2: string;
    ApartmentNo: string;
    Area: string;
    CellPhoneNumber: null;
    City: string;
    Country: string;
    FloorNo: string;
    HouseNo: null;
    Id: string;
    LineNO: number;
    Number: string;
    PhoneNumber: null;
    PostCode: string;
    StateProvinceRegion: string;
    Street: string;
    Type: number;
}

interface Currency {
    Id: string;
    AmountRoundingMethod: number;
    Culture: string;
    DecimalPlaces: number;
    DecimalSeparator: string;
    Description: string;
    Postfix: string;
    Prefix: string;
    RoundOffAmount: number;
    RoundOffSales: number;
    SaleRoundingMethod: number;
    Symbol: string;
    ThousandSeparator: string;
}

interface Image {
    Id: string;
    AvgColor: string;
    DisplayOrder: number;
    Format: string;
    Image: string;
    ImgSize: ImgSize;
    LoadFromFile: boolean;
    Location: string;
    LocationType: number;
}

interface ImgSize {
    Height: number;
    UseMinHorVerSize: boolean;
    Width: number;
}
