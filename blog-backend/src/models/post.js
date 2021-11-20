import mongoose, {Schema} from 'mongoose'

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], // 문자로 이루어진 배열
    // publishDate : {
    publishDate : {
        type: Date,
        default: Date.now // 현재 날짜를 기본 값으로 지정
    },
    user : {
        _id: mongoose.Types.ObjectId,
        username: String,
    }
})

const Post = mongoose.model('Post', PostSchema)
export default Post;