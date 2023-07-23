import * as mongoose from "mongoose";
import { Image } from "../../models/Image";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  data: {
    type: Buffer,
    require: true
  },
  contentType: {
    type: String,
    require: true
  }
});

const imageModel = mongoose.model<Image & mongoose.Document>('Image', imageSchema);

export default imageModel;