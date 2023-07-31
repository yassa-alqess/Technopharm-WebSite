export interface UserResponse {
    VerifyPhoneResult: User | null;
}

export interface UserPayload {
    contact:        User;
}

export interface User {
    Id:               string | null;
    Account:          Account | null;
    Addresses:        Partial<Address>[] | null;
    AlternateId:      null;
    BirthDay:         string;
    Cards:            Card[] | null;
    Email:            string;
    Environment:      Partial<Environment>;
    FirstName:        string;
    Gender:           number | null;
    GoogleID:         string | null;
    FacebookID:       string | null;
    Initials:         string;
    LastName:         string;
    LoggedOnToDevice: Partial<LoggedOnToDevice>;
    MaritalStatus:    number | null;
    MiddleName:       string;
    MobilePhone:      string | null;
    Name:             string;
    Notifications:    any[];
    OneLists:         any[];
    Password:         string;
    Phone:            string | null;
    Profiles:         any[];
    PublishedOffers:  any[];
    SalesEntries:     any[];
    StoreId:          string | null;
    UserName:         string;
}

interface Account {
    Id:           string;
    PointBalance: number;
    Scheme:       Scheme | null;
}

interface Scheme {
    Id:           string;
    Club:         Club;
    Description:  string;
    NextScheme:   Scheme | null;
    Perks:        string;
    PointsNeeded: number;
}

interface Club {
    Id:   string;
    Name: string;
}

interface Address {
    Address1:            string;
    Address2:            string;
    ApartmentNo:         string;
    Area:                string;
    CellPhoneNumber:     null;
    City:                string;
    Country:             string;
    FloorNo:             string;
    HouseNo:             string;
    Id:                  string;
    LineNO:              number;
    Number:              string;
    PhoneNumber:         null;
    PostCode:            string;
    StateProvinceRegion: string;
    Street:              string;
    Type:                number;
}

interface Card {
    Id:              string;
    BlockedBy:       string;
    BlockedReason:   string;
    ClubId:          string;
    ContactId:       string;
    LinkedToAccount: boolean;
    LoginId:         null;
    Status:          number;
}

interface Environment {
    Currency:       Partial<Currency>;
    PasswordPolicy: string;
    Version:        string;
}

interface Currency {
    Id:                   string | null;
    AmountRoundingMethod: number;
    Culture:              string;
    DecimalPlaces:        number;
    DecimalSeparator:     string;
    Description:          string;
    Postfix:              string;
    Prefix:               string;
    RoundOffAmount:       number;
    RoundOffSales:        number;
    SaleRoundingMethod:   number;
    Symbol:               string;
    ThousandSeparator:    string;
}

interface LoggedOnToDevice {
    Id:                 string | null;
    BlockedBy:          null;
    BlockedDate:        string;
    BlockedReason:      null;
    CardId:             string;
    DeviceFriendlyName: string;
    Manufacturer:       string;
    Model:              string;
    OsVersion:          string;
    Platform:           string;
    SecurityToken:      string;
    Status:             number;
}
