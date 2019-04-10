const mongoose = require('mongoose'),
    SubCategoryMenu = require('./SubCategoryMenu');

const CategoryMenuSchema = new mongoose.Schema({
    category: String,
    manufacturer : String,
    type: String,
    name: String,
    imageHR : String,
    imageTH : String,
    url: String,
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategoryMenu'
    }]

});

CategoryMenuSchema.index({
    name: 'text',
    manufacturer: 'text',
    type: 'text',
});
module.exports = mongoose.model('CategoryMenu',CategoryMenuSchema);