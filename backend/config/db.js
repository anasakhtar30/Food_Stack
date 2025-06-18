import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect(`mongodb+srv://Ankitakoley:Ankitakoley%40123@clusterone.3w2ng.mongodb.net/food-del`).then(()=>console.log("DB Connected.."))
}