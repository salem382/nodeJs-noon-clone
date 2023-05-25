"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(mongooseQuery, mongooseString) {
        this.mongooseQuery = mongooseQuery;
        this.mongooseString = mongooseString;
    }
    pagination() {
        var _a;
        this.page = this.mongooseString.page * 1 || 1;
        if (((_a = this.mongooseString) === null || _a === void 0 ? void 0 : _a.page) <= 0)
            this.page = 1;
        let limit = 4;
        let skip = (this.page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit);
        this.pagesLength = limit;
        return this;
    }
    // filter========
    filter() {
        let filterObj = Object.assign({}, this.mongooseString);
        let excueArr = ['sort', 'fields', 'keyword', 'page'];
        excueArr.forEach((q) => {
            delete filterObj[q];
        });
        let stringifyFilterObj = JSON.stringify(filterObj);
        filterObj = stringifyFilterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterObj = JSON.parse(filterObj);
        this.mongooseQuery.find(filterObj);
        return this;
    }
    // //sort===========    
    sort() {
        if (this.mongooseString.sort) {
            let sortedBy = this.mongooseString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
            return this;
        }
        return this;
    }
    // search
    search() {
        if (this.mongooseString.keyword) {
            this.mongooseQuery.find({ $or: [
                    { title: { $regx: this.mongooseString.keyword, $options: 'i' } },
                    { description: { $regx: this.mongooseString.keyword, $options: 'i' } },
                ] });
        }
        return this;
    }
    // select 
    select() {
        if (this.mongooseString.fields) {
            let sortedBy = this.mongooseString.fields.split(',').join(' ');
            this.mongooseQuery.select(sortedBy);
        }
        return this;
    }
}
exports.default = ApiFeatures;
