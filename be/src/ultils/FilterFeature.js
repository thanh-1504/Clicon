module.exports = class FilterFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filterByCategory() {
    if (this.queryString.category && this.queryString.category !== null)
      this.query.find({ category: this.queryString.category });
    return this;
  }
  filterByPriceRange() {
    const priceRange = Number(this.queryString.priceRange);
    if (priceRange && !isNaN(priceRange)) {
      this.query.find({ sellingPrice: { $lte: priceRange } });
    }
    return this;
  }
  filterByPrice() {
    if (this.queryString.price === "all price" && this.queryString.price)
      this.query.find({ sellingPrice: { $gte: 0 } });
    if (this.queryString.price && this.queryString.price !== null) {
      const [minPrice, maxPrice] = this.queryString.price
        .split("-")
        .map(Number);

      if (!isNaN(minPrice)) {
        if (!maxPrice && maxPrice !== 0) {
          this.query.find({ sellingPrice: { $lte: minPrice } });
        } else if (!isNaN(maxPrice)) {
          this.query.find({ sellingPrice: { $gte: minPrice, $lte: maxPrice } });
        }
      }
    }
    return this;
  }
  pagination() {
    if (this.queryString.page) {
      const page = +this.queryString.page || 1;
      const skip = (page - 1) * 5;
      // this.query.skip(skip).limit(5);
      this.query
        .find({ category: this.queryString.category })
        .skip(skip)
        .limit(5);
    }
    return this;
  }
  sortByPrice() {
    if (this.queryString.sortPrice) {
      if (this.queryString.sortPrice === "asc")
        this.query
          .find({ category: this.queryString.category })
          .sort("sellingPrice");
      else if (this.queryString.sortPrice === "desc")
        this.query
          .find({ category: this.queryString.category })
          .sort("-sellingPrice");
      else return this;
    }
    return this;
  }
};
