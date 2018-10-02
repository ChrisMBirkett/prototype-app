import { FilterModel } from "./filter-model";

export interface FilterDefinitionModel {
    defaultFilterType: number;
    filters: FilterModel[];
}