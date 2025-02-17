module.exports = class FilterFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filterByCategory() {
    if (this.queryString.category && this.queryString.category !== null)
      this.query.find({ category: this.queryString.category });
    if (this.queryString.category && this.queryString.category === "all")
      this.query.find({ category: { $ne: "" } });
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
      const skip = (page - 1) * 20;
      if (this.queryString.category !== "all")
        this.query
          .find({ category: this.queryString.category })
          .skip(skip)
          .limit(20);
      else
        this.query
          .find({ category: { $ne: "" } })
          .skip(skip)
          .limit(20);
    }
    return this;
  }
  sortByPrice() {
    if (this.queryString.sortPrice) {
      if (this.queryString.category === "all") {
        if (this.queryString.sortPrice === "asc") {
          this.query.sort("sellingPrice");
        } else if (this.queryString.sortPrice === "desc") {
          this.query.sort("-sellingPrice");
        } else return this;
      } else if (
        this.queryString.category &&
        this.queryString.category !== "all"
      ) {
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
    }
    return this;
  }
  filterByInput() {
    if (this.queryString.filter) {
      this.query.find({
        name: { $regex: this.queryString.filter.trim(), $options: "i" },
      });
    }
    return this;
  }
};
