export class PagedSearchDefaults {
    static get page(): number { return 1; }

    static get pageSize(): number { return 50; }

    static get sortColumn(): string { return 'TableID'; }

    static get sortDirection(): string { return 'ASC'; }
}