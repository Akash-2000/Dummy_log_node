const mongooose = require('mongoose')

const detailsSchema = mongooose.Schema({
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    mobile:{type:Number,required:true}
})



const Userschema = mongooose.Schema({
    name:{type:String,unique:true,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    details:[detailsSchema]
     
},{
    collection:'userdata'
}
)

const model = mongooose.model('userschema',Userschema)
module.exports = model
