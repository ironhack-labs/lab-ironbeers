const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const cervezaSchema = new Schema({
name: String,
type: String,
img_: String,
description:String,
});

module.exports = mongoose.model('Cerveza', cervezaSchema)
