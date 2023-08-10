
import { Product } from "../product/product";

export interface SearchResponse {
    SearchResult: SearchResult;
}

export interface SearchResult {
    Id: string;
    ItemCategories: any[];
    Items: Product[];
    Notifications: any[];
    OneLists: any[];
    ProductGroups: any[];
    Profiles: any[];
    SalesEntries: any[];
    Stores: any[];
}

export interface Item {
    Id: string;
    AllowedToSell: boolean;
    BlockDiscount: boolean;
    BlockManualPriceChange: boolean;
    Blocked: boolean;
    Description: string;
    Details: string;
    Discount: number;
    GrossWeight: number;
    Images: Image[];
    IsDeleted: boolean;
    ItemAttributes: any[];
    ItemCategoryCode: ItemYCode;
    ItemFamilyCode: ItemYCode;
    ItemPrice: number;
    NewPrice: null;
    Price: string;
    Prices: any[];
    ProductGroupId: string;
    SalesUomId: SalesUomID;
    ScaleItem: boolean;
    SeasonCode: string;
    SelectedUnitOfMeasure: null;
    SelectedVariant: null;
    UnitOfMeasures: any[];
    UnitVolume: number;
    UnitsPerParcel: number;
    VariantsExt: any[];
    VariantsRegistration: any[];
}

export interface Image {
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

export interface ImgSize {
    Height: number;
    UseMinHorVerSize: boolean;
    Width: number;
}

export enum ItemYCode {
    Expensive = "EXPENSIVE",
    MSupplies = "M.SUPPLIES",
    Medicine = "MEDICINE",
    PerCare = "PER.CARE",
}

export enum SalesUomID {
    Each = "EACH",
}
