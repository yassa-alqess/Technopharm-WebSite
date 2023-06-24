import { City } from "../city/city";

export interface AreaResponse {
    AreasListResult: Area[];
}

export interface Area {
    Area:      string;
    City:      City['City'];
}
