

class APIFilter {
    constructor(query, items) {
        this.query = query;
        this.items = items;
    }

    search() {
        const value = this.query.search ? this.query.search.toLowerCase() : "";
        return this.items.filter(item => item.FOODNAME.toLowerCase().includes(value));
    }

    filterByRating(items) {
        if (this.query.rating) {
            return items.filter(item => item.RATINGS >= this.query.rating);
        }
        return items;
    }

    filterByTags(items) {
        if (this.query.tags.length > 0) {
            return items.filter(item => this.query.tags.every(tag => item.TAGS.includes(tag)));
        }
        return items;
    }

    filterByCuisine(items) {
        if (this.query.cuisine) {
            return items.filter(item => item.CUSSINE === this.query.cuisine);
        }
        return items;
    }

    filterByPriceRange(items) {
        if (this.query.minPrice !== null && this.query.maxPrice !== null) {
            return items.filter(item => {
                const price = parseFloat(item.PRICE);
                return price >= this.query.minPrice && price <= this.query.maxPrice;
            });
        }
        return items;
    }

    applyAllFilters() {
        let filteredItems = this.search();
        filteredItems = this.filterByRating(filteredItems);
        filteredItems = this.filterByTags(filteredItems);
        filteredItems = this.filterByCuisine(filteredItems);
        filteredItems = this.filterByPriceRange(filteredItems);
        return filteredItems;
    }
}
export default APIFilter;