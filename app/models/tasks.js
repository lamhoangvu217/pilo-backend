const { Schema } = require("mongoose");
module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: { type: String, require: true },
    duedate: { type: Date, require: true },
    description: { type: String, require: true },
    status: { type: Number },
    members: [
      {
        _id: false,
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        username: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "admin",
        },
      },
    ],
    checklists: [
      {
        text: {
          type: String,
        },
        complete: {
          type: Boolean,
        },
      },
    ],
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Task = mongoose.model("task", schema);
  return Task;
};
