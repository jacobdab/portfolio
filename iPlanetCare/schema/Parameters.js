const mongoose = require('mongoose');


const ParametersSchema = new mongoose.Schema({
    cpu: String,
    cpuSpeed: String,
    color: String,
    ram: String,
    hdd: String,
    graphics: String,
    size: String,
    conn: String,
    res: String,
    serial: String,
    caseW: String,
    colorBands: String,
    type: String,
    material: String
});



module.exports = mongoose.model('Parameters',ParametersSchema);

