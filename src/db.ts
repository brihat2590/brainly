import mongoose ,{Schema,model} from "mongoose";


const userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String
})

const contentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:
        mongoose.Types.ObjectId, ref:"Tag"}],
    userId:[{type:
        mongoose.Types.ObjectId, ref:"User",required:true}],

    

})
export const contentModel=model("content",contentSchema)
export const userModel=model("user",userSchema)



