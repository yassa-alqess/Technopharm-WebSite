import { AdvertisementsAppTypes } from "core/enums";
import { Image } from "../image/image";

export interface AdvertisementsResponse {
    AdvertisementsGetByIdResult: Advertisement[];
}

export interface Advertisement {
    AdType:            number;
    AdValue:           string;
    AppType:           AdvertisementsAppTypes;
    AppValue:          string;
    ArabicDescription: string;
    Description:       string;
    ExpirationDate:    string;
    Id:                string;
    ImageView:         Image;
    MenuIds:           any[];
    RV:                number;
}
