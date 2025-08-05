import mongoose,{Schema} from "mongoose";
import mongooseAggregate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videofile:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    ispublished: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregate);
const Video = mongoose.model("Video", videoSchema);

export default Video;
