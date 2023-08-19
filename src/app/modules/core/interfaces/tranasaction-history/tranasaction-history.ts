export interface TransactionHistoryResponse {
    SalesEntriesGetByCardIdResult: Order[];
}

export interface TransactionHistoryDetails {
    SalesEntryGetResult: Order;
}

export interface Order {
    Id:                       string;
    AnonymousOrder:           boolean;
    CardId:                   string;
    ClickAndCollectOrder:     boolean;
    DiscountLines:            any[];
    DocumentRegTime:          string;
    ExternalId:               null;
    IdType:                   number;
    LineItemCount:            number;
    Lines:                    Line[];
    PaymentStatus:            number;
    Payments:                 Payment[];
    PointsRewarded:           number;
    PointsUsedInOrder:        number;
    Posted:                   boolean;
    ShipToAddress:            null;
    ShipToEmail:              null;
    ShipToName:               null;
    ShipToPhoneNumber:        null;
    ShippingAgentCode:        null;
    ShippingAgentServiceCode: null;
    ShippingStatus:           number;
    Status:                   number;
    StoreId:                  string;
    StoreName:                string;
    TerminalId:               string;
    TotalAmount:              number;
    TotalDiscount:            number;
    TotalNetAmount:           number;
    TaxAmount:                number;
}

interface Line {
    Id:                 string;
    Amount:             number;
    DiscountAmount:     number;
    DiscountPercent:    number;
    ItemDescription:    string;
    ItemId:             string;
    ItemImageId:        string;
    LineNumber:         number;
    LineType:           number;
    NetAmount:          number;
    NetPrice:           number;
    Price:              number;
    Quantity:           number;
    TaxAmount:          number;
    UomId:              string;
    VariantDescription: string;
    VariantId:          string;
}

interface Payment {
    Amount:         number;
    CardNo:         null;
    CurrencyCode:   null;
    CurrencyFactor: number;
    LineNumber:     number;
    TenderType:     string;
}