const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    name: "String",
    alias: "String",
    url: "String",
    type: "String",
    description: "String",
    motivation: "String",
    time: "String",
    thumbpath: "String",
    image: "String",
    video: "String",
    galerie: Array,
    like: "String",
    pinned: Boolean,
    languages: Array,
    frameworks: Array,
    process: Array,
    comments: [
        {
            name: String,
            comment: String,
            date: { type: Date, default: Date.now }

        }],


}, { timestamps: true });


const Projects = mongoose.model('Projects', projectsSchema);

Projects.find(function (err, projects) {
    if (projects.length) {
        console.log("Projekt Demo bereits vorhanden");
        return;
    }
    new Projects({
        name: "Testproject"

    }).save();

    console.log("Testproject hinzugefügt");
});
module.exports = Projects;
