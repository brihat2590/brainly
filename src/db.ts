import mongoose ,{Schema,model, mongo} from "mongoose";

const ObjectId=mongoose.Types.ObjectId
const userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
       
})

const contentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:
        mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:
        mongoose.Types.ObjectId, ref:'User',required:true},

    

})
const linkSchema=new Schema({
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'User',
        required:true
    }

})
const tagSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true

    }
})
export const contentModel=model("Content",contentSchema)
export const userModel=model("User",userSchema)
export const tagModel=model('Tag',tagSchema)
export const linkModel=model('Link',linkSchema)


