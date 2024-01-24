import { convertToObjectId, nilObjectId } from "../../helpers/index.js";
import mongoose from "mongoose";

export class Base {
  constructor(model) {
    this.Model = model;
  }

  async find(query = {}, select = "", sort = null, populate = null) {
    query = { ...query, deleted: false };

    sort = sort || {
      createdAt: -1,
    };

    populate = populate || "";

    const res = await this.Model.find(query)
      .select(select)
      .sort(sort)
      .populate(populate);

    return res;
  }

  async findOne(query = {}, select = "", populate = null, sort = null) {
    query = { ...query, deleted: false };

    populate = populate || "";
    co;
    sort = sort || {
      createdAt: 1,
    };

    const res = await this.Model.findOne(query)
      .select(select)
      .populate(populate)
      .sort(sort);

    return res;
  }

  async findById(id, select = "") {
    const query = {
      _id: convertToObjectId(id),
      deleted: false,
    };

    return this.findOne(query, select);
  }

  async paginate(
    query = {},
    { count, page, sort } = {},
    populate = null,
    select = null
  ) {
    query = { ...query, deleted: false };

    count = count || 15;
    page = page || 1;
    sort = sort || {
      createdAt: -1,
    };

    const options = {
      limit: count,
      page: page,
      sort: sort,
    };

    if (populate) {
      options.populate = populate;
    }

    if (select) {
      options.select = select;
    }

    const res = await this.Model.paginate(query, options);

    return res;
  }

  async paginateAggregate(pipeline = [], { count, page, sort } = {}) {
    count = count || 15;
    page = page || 1;
    sort = sort || {
      createdAt: -1,
    };

    const res = await this.Model.aggregatePaginate(
      this.Model.aggregate(pipeline),
      {
        limit: count,
        page: page,
        sort: sort,
      }
    );

    return res;
  }

  async aggregate(pipeline = []) {
    const res = await this.Model.aggregate(pipeline);
    return res;
  }

  async baseCreate(data) {
    return this.Model.create({
      ...data,
      deleted: false,
    });
  }

  async findOneAndUpdate(query = {}, data) {
    query = { ...query, deleted: false };
    const res = await this.Model.findOneAndUpdate(
      query,
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    return res;
  }

  async baseUpdate(query = {}, data) {
    query = { ...query, deleted: false };
    const res = await this.Model.updateMany(query, {
      $set: data,
    });
    return res;
  }

  getHiddenFields() {
    const schema = this.Model.schema.obj;
    const fields = Object.keys(schema);
    const res = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (schema[field].select === false) {
        res.push(field);
      }
    }

    return res;
  }
}
