import { Params } from '@angular/router';
import { SearchFilterBase, SearchFilterParams } from '@enigmatry/entry-components/search-filter';


export class SearchFilterQuery {
    constructor(public filters: SearchFilterBase<any>[] = []) {
    }

    searchFilterChange(searchParams: SearchFilterParams): void {
        this.filters.forEach(filter => filter.setValue(searchParams[filter.key]));
    }

    applyRouteChanges(queryParams: Params): void {
        this.filters.forEach(filter => {
            const value = this.getValueFromQueryParam(queryParams, filter.key);
            filter.setValue(value);
        });
    }

    private getValueFromQueryParam(queryParams: Params, filterKey: string): string | number | null | undefined {
        const filterValue = queryParams[filterKey];
        if (this.isFilterValueEmpty(filterValue)) {
            return filterValue;
        }

        const parsed = Number(filterValue);
        if (!isNaN(parsed)) {
            return parsed;
        }

        return filterValue;
    }

    private isFilterValueEmpty(filterValue: any): boolean {
        return filterValue === undefined
            || filterValue === null
            || filterValue?.length === 0
            || filterValue[0] === undefined;
    }

    getRouteQueryParams(): Params {
        const filterParams: Params = {};
        this.filters.forEach(filter => filterParams[filter.key] = filter.value);
        return {
            ...filterParams
        };
    }
}
