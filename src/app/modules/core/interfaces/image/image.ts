export interface Image {
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