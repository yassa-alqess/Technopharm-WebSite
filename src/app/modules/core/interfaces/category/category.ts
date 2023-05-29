import { CategoryIDs, StaticCategoriesIDs } from "core/enums";
import { Image } from "../image/image";

export interface CategoryResponse {
    ItemCategoriesGetAllResult: Category[];
}

export interface Category {
    Id:                CategoryIDs | StaticCategoriesIDs;
    ArabicDescription: string;
    Description:       string;
    Images?:           Image[];
    ProductGroups?:    ProductGroup[];
    route?:            string;
}

export interface ProductGroup {
    Id:                string;
    ArabicDescription: string;
    Description:       string;
    Images:            Image[];
    ItemCategoryId:    CategoryIDs;
    Items:             any[];
}
