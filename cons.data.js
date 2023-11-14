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
        delete Memory.structures;
        Memory.structures = {
            'terminals': {
                'id1': '6515f9470399d864cad3fd02',
                'resource1': RESOURCE_OXIDANT,
                'id2': '65332c1f8919c3c4b933b1e8',
                'resource2': 'L',
                'id3': '653eba128b9e097d44dd634d',
                'resource3': 'Z'
            },
            'storages': {
                'id1': '65052ea2c34196660d3e9925',
                'id2': '651a77669c6a9d5b5e69c0b2',
                'id3': '652f4d36ce5f314043bef866',
                'id4': '654daeddce5f317c0dc701c9'
            },
            //----W2N27----
            'lab1': {
                'id': '6516e83ffa84f734a619576d',
                'resource': '' //----for reaction----
            },
            'lab2': {
                'id': '651add606fbdcdc6f031cfcd',
                'resource': '' //----for reaction----
            },
            'lab3': {
                'id': '651e6d6686831591a7847dcf',
                'resource': 'GO' //----for revert reaction----
            },
            'lab4': {
                'id': '654b9e712fa32d766f7eee96',
                'resource': ''
            },
            'lab5': {
                'id': '654b4ec3bc178d7c802b61b5',
                'resource': ''
            },
            'labM': { //----for miner to drop----
                'id': '652f1266d89677b5963ed87f',
                'resource': ''
            },
            'factory1': {
                'id': '652cec5465fe9b42500b7f10',
                'resource': RESOURCE_OXYGEN, //RESOURCE_OXYGEN, RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY
                'prod': RESOURCE_OXIDANT //RESOURCE_OXIDANT, RESOURCE_LEMERGIUM_BAR, RESOURCE_ZYNTHIUM_BAR, RESOURCE_BATTERY
            },
            //----W1N27----
            'labMb': { //----for miner to drop----
                'id': '65344bc3cb8a247b3faf4b25',
                'resource': ''
            },
            //----W4N28----
            'labMc': { //----for miner to drop----
                'id': '653dd6733e19ec63f4e55563',
                'resource': ''
            }
        };
    }
};

module.exports = consData;