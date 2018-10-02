import { CourtSearchListModel } from "./court-search-list-model";
import { FileTypeSearchListModel } from "./file-type-search-list-model";
import { CourtTypeSearchListModel } from "./court-type-search-list-model";
import { SupplierSearchListModel } from "./supplier-search-list-model";

export interface SearchListModel {
    courts: CourtSearchListModel[];
    fileTypes: FileTypeSearchListModel[];
    courtTypes: CourtTypeSearchListModel[];
    suppliers: SupplierSearchListModel[];
}