import { SearchFilterBase } from '@enigmatry/entry-components';
import { SearchFilterQuery } from '@shared/query/search-filter-query';

export class GetBlogPostsQuery extends SearchFilterQuery {
    keyword = new SearchFilterBase<string>({
        key: 'keyword',
        label: 'Keyword',
        placeholder: 'keyword',
        maxLength: 50
    });

    category = new SearchFilterBase<number>({
        key: 'category',
        label: 'Category',
        placeholder: 'Category',
        maxLength: 1
    });

    constructor() {
        super();
        this.filters = [this.keyword, this.category];
    }
}