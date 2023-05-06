import { CategoryIDs, StaticCategoriesIDs } from "core/enums";

export interface CategoryResponse {
    ItemCategoriesGetAllResult: Category[];
}

export interface Category {
    Id:                CategoryIDs | StaticCategoriesIDs;
    ArabicDescription: string;
    Description:       string;
    Images?:           Image[];
    ProductGroups?:    ProductGroup[];
}

export interface ProductGroup {
    Id:                string;
    ArabicDescription: string;
    Description:       string;
    Images:            Image[];
    ItemCategoryId:    CategoryIDs;
    Items:             any[];
}

interface Image {
    Id:           CategoryIDs | string;
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
    Width:            number;
    Height:           number;
    UseMinHorVerSize: boolean;
}
