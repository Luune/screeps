/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('cons.data');
 * mod.thing == 'a thing'; // true
 */

var consData = {
    run: function () {
        Memory.structures = {
            "terminals": {
                "id0": "6515f9470399d864cad3fd02"
            },
            "storages": {
                "id0": "65052ea2c34196660d3e9925"
            },


            "lab1": {
                "id": "6516e83ffa84f734a619576d",
                "resource": RESOURCE_OXYGEN
            }
            ,

            "lab2": {
                "id": "651add606fbdcdc6f031cfcd",
                "resource": RESOURCE_HYDROGEN
            }
            ,

            "lab3": {
                "id": "651e6d6686831591a7847dcf",
                "resource": ""
            }


        };
    }
};


module.exports = consData;