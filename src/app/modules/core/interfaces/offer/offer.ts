import { Image } from "../image/image";

export interface OffersResponse {
    PublishedOffersGetByCardIdResult: Offer[];
}

export interface Offer {
    Id:             string;
    ArabicText:     string;
    Code:           number;
    Description:    string;
    Details:        string;
    ExpirationDate: string;
    Images:         Image[];
    OfferDetails:   any[];
    OfferId:        string;
    OfferLines:     OfferLine[];
    Selected:       boolean;
    Type:           number;
    ValidationText: string;
}

interface OfferLine {
    Id:            string;
    Description:   string;
    DiscountId:    string;
    DiscountType:  number;
    Exclude:       boolean;
    LineNo:        number;
    LineType:      number;
    OfferId:       string;
    UnitOfMeasure: string;
    Variant:       string;
    VariantType:   number;
}