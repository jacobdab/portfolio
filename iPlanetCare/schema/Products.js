const mongoose = require('mongoose'),
    Devices = require('./Devices'),
    CategoryMenu = require('./CategoryMenu'),
    SubCategoryMenu = require('./SubCategoryMenu');

const ProductsSchema = new mongoose.Schema({
    manufacturer : String,
    model : String,
    type: String,
    imageHR : String,
    imageTH : String,
    price: Number,
    bought: Number,
    quantity: Number,
    name: String,
    shortDescription: String,
    description: String,
    cpu: String,
    cpuSpeed: String,
    color: String,
    ram: String,
    hdd: String,
    graphics: String,
    size: String,
    connection: String,
    resolution: String,
    serial: String,
    category: String,
    subCategory: String,
    created: {type: Date, default: Date.now},
});

ProductsSchema.index({
    name: 'text',
    manufacturer: 'text',
    type: 'text',
    model: 'text',
    cpu: 'text',
    ram: 'text',
    hdd: 'text',
    graphics: 'text',
    size: 'text'
});
module.exports = mongoose.model('Product',ProductsSchema);