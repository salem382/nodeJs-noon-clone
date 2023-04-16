class ApiFeatures {

    mongooseQuery:any;
    mongooseString:any;
    constructor (mongooseQuery:any, mongooseString:any) {
        this.mongooseQuery = mongooseQuery;
        this.mongooseString = mongooseString;
    }

    pagination () {
        let page = this.mongooseString.page * 1 || 1;
        if (this.mongooseString?.page <= 0)  page = 1;
        let limit = 2;
        let skip = (page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }

    // filter========
    filter() {

        let filterObj = {...this.mongooseString};
        let excueArr= ['sort', 'fields', 'keyword', 'page'];
        excueArr.forEach((q) => {
            delete filterObj[q];
        })
        let stringifyFilterObj:string = JSON.stringify(filterObj);
        filterObj = stringifyFilterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterObj = JSON.parse(filterObj);
        this.mongooseQuery.find(filterObj)
        return this;
    }
    // //sort===========    

        sort () {
            if (this.mongooseString.sort) {
                let sortedBy:string = this.mongooseString.sort.split(',').join(' ');
                this.mongooseQuery.sort(sortedBy)
                return this; 
            }
            return this;
        }

        // search

        search () {

             if (this.mongooseString.keyword) {

                this.mongooseQuery.find({$or:[
                    {title:{$regx:this.mongooseString.keyword, $options:'i'}},
                    {description:{$regx:this.mongooseString.keyword, $options:'i'}},
                ]})
            }
            return this;
        }
        
        // select 
        select() {

            if (this.mongooseString.fields) {
                let sortedBy:string = this.mongooseString.fields.split(',').join(' ');
                this.mongooseQuery.select(sortedBy) 
            }
            return this;
         }   
}

export default ApiFeatures;