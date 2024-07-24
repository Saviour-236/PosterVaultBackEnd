import mongoose from 'mongoose'

const connetDb = async ()=>{
    try{
        await mongoose.connect( process.env.DB_CONNECTION_STRING || '' ).then(()=>{
            console.log('connected to db')
        })
    }
    catch(err){
        console.log('error in connection to db ', err)
    }
}

export default connetDb