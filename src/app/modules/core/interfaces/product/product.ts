import { CategoryIDs } from "core/enums";
import { ProductGroup } from "../category/category";

export interface ProductResponse {
    BestSellerItemsGetResult: Product[];
}
export interface ProductsResponse {
    ItemsPageResult: Product[];
}

export interface ProductsPayload {
    pageSize:       number;
    pageNumber:     number;
    itemCategoryId: string;
    productGroupId: string;
    search:         string;
    includeDetails: boolean;
}

export interface Product {
    Id:                     string;
    AllowedToSell:          boolean;
    BlockDiscount:          boolean;
    BlockManualPriceChange: boolean;
    Blocked:                boolean;
    Description:            string;
    Details:                string;
    Discount:               number;
    GrossWeight:            number;
    Images:                 Image[];
    IsDeleted:              boolean;
    ItemAttributes:         any[];
    ItemCategoryCode:       CategoryIDs;
    ItemFamilyCode:         string;
    ItemSubCategory?:       ProductGroup;
    ItemPrice:              number;
    NewPrice:               number | null;
    Price:                  string;
    Prices:                 Price[];
    ProductGroupId:         string;
    SalesUomId:             string;
    ScaleItem:              boolean;
    SeasonCode:             string;
    SelectedUnitOfMeasure:  null;
    SelectedVariant:        null;
    UnitOfMeasures:         UnitOfMeasure[];
    UnitVolume:             number;
    UnitsPerParcel:         number;
    VariantsExt:            any[];
    VariantsRegistration:   any[];
}

interface Image {
    Id:           string;
    AvgColor:     string;
    DisplayOrder: number;
    Format:       string;
    Image:        string;
    ImgSize:      ImgSize;
    LoadFromFile: boolean;
    Location:     string;
    LocationType: number;
}

interface ImgSize {
    Height:           number;
    UseMinHorVerSize: boolean;
    Width:            number;
}

interface Price {
    Amount:    string;
    Amt:       number;
    ItemId:    string;
    StoreId:   string;
    UomId:     string;
    VariantId: string;
}

interface UnitOfMeasure {
    Id:               string;
    Decimals:         number;
    Description:      string;
    ItemId:           string;
    Price:            number;
    QtyPerUom:        number;
    ShortDescription: string;
}
