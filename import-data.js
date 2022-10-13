require('dotenv').config()

//console.log(process.env.MONGO_URI);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaLocations = new Schema({
    filmType:  String, // String is shorthand for {type: String}
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
    District: String,
    geolocation: {
        type: String,
        coordinates: [Number]
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,

},{typeKey: '$type'}
);
async function reponse(){
    try {
        const reponse1 = await Locations.findById("6333230099183ad74a0fd4fd");
        console.log(reponse1);
    }
    catch (e){ console.log(e);}
}
const Locations = mongoose.model("Locations", schemaLocations);
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("[+] Connection is successfull");
        /*
        const filmingLocations = require('./lieux-de-tournage-a-paris.json');
        const getFilmingArray = (filmingLocations) => {
            let tab = [];
            for (const element of filmingLocations) {
                tab.push({
                        "filmType": element.fields.type_tournage, // String is shorthand for {type: String}
                        "filmProducerName": element.fields.nom_producteur,
                        "endDate": element.fields.date_fin,
                        "filmName": element.fields.nom_tournage,
                        "District": element.fields.ardt_lieu,
                        "geolocation": {
                            "type": "Point",
                            "coordinates": element.fields.geo_shape.coordinates
                        },
                        "sourceLocationId": element.fields.id_lieu,
                        "filmDirectorName": element.fields.nom_realisateur,
                        "address": element.fields.adresse_lieu,
                        "startDate": element.fields.date_debut,
                        "year": element.fields.annee_tournage,
                    }
                )
            }
            return tab;
        }
        const filmingArray = getFilmingArray(filmingLocations);
        console.log(filmingArray.length);
        //console.log(filmingArray[0]);
        //populate(filmingArray);

        */
        //locationById(2019-1631)
        //locationByName("LUZ")
        deleteById(2016-2222)
        //await reponse();
        mongoose.connection.close();
    }).catch((e) => {
    console.log("[-] No connection ");
    console.error(e);

});
console.log(process.env.MONGO_URI);

async function populate(filmingArray){
    try {
        await Locations.insertMany(filmingArray);
        console.log("imported successfully");
    }
    catch (e){console.log(e)}

}

async function locationById(id) {
    try {
        const response = await Locations.findOne({id:id});
        console.log(response);
    } catch (err) {
        console.log("Cette location n'existe pas");
        console.log(err);
    }
}

async function locationByName(filmName){
    try {
        const response = await Locations.find().where('filmName').equals(filmName);
        console.log(response);
    } catch (err) {
        console.log("Cette location n'existe pas");
        console.log(err);
    }
}

async function deleteById(id) {
    try {
        const response = await Locations.findOneAndDelete({id:id});
        console.log(response);
    } catch (err) {
        console.log("Cette location n'existe pas");
        console.log(err);
    }
}
//import mongoose from 'mongoose';

//mongoose.connection.close();