import { CategoryIDs } from "core/enums";
import { Product } from "../product/product";

export interface FavoriteResponse {
    OneListGetByCardIdResult: Favorite[];
}

export interface FavoritePayload {
    oneList: Favorite;
    calculate?: boolean;
}

export interface Favorite {
    Id?:             string;
    CardId:          string;
    CardLinks:       CardLink[];
    CreateDate?:     string;
    Description:     string;
    ExternalType:    number;
    Item?:           Product;
    Items:           FavoriteItem[];
    ListType:        number;
    PointAmount:     number;
    PublishedOffers: any[];
    ShippingAmount:  number;
    StoreId:         string;
    TotalAmount:     number;
    TotalDiscAmount: number;
    TotalNetAmount:  number;
    TotalTaxAmount:  number;
}

 interface CardLink {
    CardId: string;
    Name:   string;
    Owner:  boolean;
    Status: number;
}

interface FavoriteItem {
    Id?:                      string;
    Amount:                   number;
    BarcodeId:                string;
    CreateDate?:              string;
    Detail:                   string;
    DiscountAmount:           number;
    DiscountPercent:          number;
    DisplayOrderId:           number;
    Image:                    Product['Images'][0];
    ItemDescription:          string;
    ItemId:                   string;
    ItemCategoryCode:         CategoryIDs;
    ProductGroupId:           string;
    NetAmount:                number;
    NetPrice:                 number;
    OnelistItemDiscounts:     any[];
    Price:                    number;
    Quantity:                 number;
    TaxAmount:                number;
    UnitOfMeasureDescription: string | null;
    UnitOfMeasureId:          string;
    VariantDescription:       string;
    VariantId:                string;
    VariantRegistration:      VariantRegistration | null;
}

interface VariantRegistration {
    Id:            string;
    Dimension1:    string;
    Dimension2:    string;
    Dimension3:    string;
    Dimension4:    string;
    Dimension5:    string;
    Dimension6:    string;
    FrameworkCode: string;
    Images:        any[];
    ItemId:        string;
}
