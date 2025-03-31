import { dbconnect } from "@/helper/mongodbconnect";
import { Moodtrackermodel } from "@/schemas/moodtracker";


export async function POST(request){
    dbconnect();
    const {Mood, Anxiety, Sleephours, exercise, plannedornot} = await request.json();
    if(!Mood || !Anxiety || !Sleephours || !exercise || plannedornot === undefined){
        console.log("All fields are required")
        return Response.json({
            messsage:"All fields are required",
            success:false
        },{status:400})
    }
    try {
        const model = await Moodtrackermodel.create({
            Mood,Anxiety, Sleephours, exercise, plannedornot
        })
        return Response.json({
            message:"Mood tracker created successfully",
            success:true,
            data:model
        },{status:201})
    } catch (error) {
        console.log(error);
        return Response.json({
            message:"not able to create mood tracker instance",
            success:false,
        },{status:400})
    }
}