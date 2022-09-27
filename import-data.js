require('dotenv').config()

//console.log(process.env.MONGO_URI);
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("[+] Connection is successfull");
        const { Schema } = mongoose;

        const schemaLocations = new Schema({
            filmType:  String, // String is shorthand for {type: String}
            filmProducerName: String,
            endDate:   Date,
            filmName: String,
            District: String,
            geolocalisation: {
                type: {
                    type: String, // Don't do `{ location: { type: String } }`
                    enum: ['Point'] // 'location.type' must be 'Point'
                },
                coordinates: {
                    type: [Number]
                }
            },
            sourceLocationId: String,
            filmDirectorName: String,
            address: String,
            startDate: Date,
            year: Number,
        });

        const Locations = mongoose.model("Locations", schemaLocations);
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
                        "geolocalisation": {
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
        console.log(filmingArray[0]);
    }).catch((e) => {
    console.log("[-] No connection ");
    console.error(e);
});
console.log(process.env.MONGO_URI);

//import mongoose from 'mongoose';

mongoose.connection.close();