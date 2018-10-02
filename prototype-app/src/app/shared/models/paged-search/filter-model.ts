export interface FilterModel {
    binding: string;
    filterText: string;
    showValues: {}; // this will be a JSON string. Ex: {CD: true, CF: true, CJ: true}
}