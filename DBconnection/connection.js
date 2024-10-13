const mongoose=require('mongoose')
const connection =process.env.DATABASE_URL

mongoose.connect(connection)
.then(()=>{
    console.log('mongoDB connected to cred app successfully');
    
}).catch((err)=>{
    console.log(`mongoDB connection faild: ${err}`);
    
})