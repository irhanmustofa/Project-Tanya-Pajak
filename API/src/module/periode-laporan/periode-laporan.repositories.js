import MongodbORM from "../../database/mongo/mongodb.orm.js";



export default class PeriodeLaporanRepository {
    constructor(
        model
    ) {
        this.model = model;
    }


    async all() {
        return await MongodbORM.collection(this.model).all();
    }

    async create(data) {
        return await MongodbORM.collection(this.model).create(data);
    }


}


