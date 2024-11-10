import mongoose from 'mongoose';

// The URI for connecting to the MongoDB database, containing credentials and connection settings.
const uri = "mongodb+srv://mercadocolegial:M.Colegio9@cluster0.vcnew.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";


const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};


// Exporting the 'connect' function and 'client' instance so they can be used in other parts of the application.
export { connect };
