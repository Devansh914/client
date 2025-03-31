import { Schema,mongoose } from "mongoose";


export const MoodtrackerSchema = new Schema({

    Mood:{
        type:String,
        required:true,
    },
    Anxiety:{
        type:String,
        required:true,
    },
    Sleephours:{
         type:String,
         required:true,
    },
    exercise:{
        type:String,
        required:true,
    },
    plannedornot:{
        type:Boolean,
        required:true,
    }
})

export const Moodtrackermodel = mongoose.model("Moodtrack", MoodtrackerSchema);