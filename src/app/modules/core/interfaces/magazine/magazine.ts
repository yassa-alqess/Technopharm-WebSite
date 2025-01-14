export interface MagazineResponse {
    MagazinesListResult: Magazine[];
}

export interface Magazine {
    Code: string;
    Description: string;
    Image: string;
    Status: boolean;
    URL: string;
    timeStamp: string;
}
