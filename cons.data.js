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
                //----W2N27----
                'id1': '6515f9470399d864cad3fd02',
                'resource1': ' O U G Z K ZH UH KO GO ' + RESOURCE_OXIDANT + ' ' + RESOURCE_BATTERY + ' ',
                //----W1N27----
                'id2': '65332c1f8919c3c4b933b1e8',
                'resource2': ' L UL ZH UH KO GO ' + RESOURCE_LEMERGIUM_BAR + ' ' + RESOURCE_BATTERY + ' ',
                //----W4N28----
                'id3': '653eba128b9e097d44dd634d',
                'resource3': ' Z ZH UH KO GO ZK G O H ' + RESOURCE_ZYNTHIUM_BAR + ' ' + RESOURCE_BATTERY + ' ',
                //----W5N28----
                'id4': '655397238fcc1dd66139f651',
                'resource4': ' H U L Z K O ' + RESOURCE_REDUCTANT + ' ' + RESOURCE_BATTERY + ' ',
                //----W3N28----
                'id5': '6569df3de0626d0ba98a5b23',
                'resource5': ' K ZH UH KO GO ' + RESOURCE_KEANIUM_BAR + ' ' + RESOURCE_BATTERY + ' '
            },
            'storages': {
                'W2N27': {
                    'id': '65052ea2c34196660d3e9925',
                    'term': {}
                },
                'W1N27': {
                    'id': '651a77669c6a9d5b5e69c0b2',
                    'term': {}
                }, 
                'W4N28': {
                    'id': '652f4d36ce5f314043bef866',
                    'term': {}
                }, 
                'W5N28': {
                    'id': '654daeddce5f317c0dc701c9',
                    'term': {}
                }, 
                'W3N28': {
                    'id': '65606acdd59f54caf3c8554c',
                    'term': {}
                }, 
                'W6N28': {
                    'id': '',
                    'term': {}
                }
            },
            //------------------------------------W2N27------------------------------------
            'labMW2N27': {
                'id': '652f1266d89677b5963ed87f',
                'resource': '' //----for miner to drop----
            },
            'lab1W2N27': {
                'id': '6516e83ffa84f734a619576d',
                'resource': 'ZK' //----for reaction----
            },
            'lab2W2N27': {
                'id': '651add606fbdcdc6f031cfcd',
                'resource': 'UL' //----for reaction----
            },
            'lab3W2N27': {
                'id': '651e6d6686831591a7847dcf',
                'resource': '' //----for revert reaction----
            },
            'lab4W2N27': {
                'id': '655f1d56524969095a770702',
                'resource': 'GH2O' //----for boost----
            },
            'lab5W2N27': {
                'id': '6575fff360a2af2b98390b1e',
                'resource': 'O' //----for reaction----
            },
            'lab6W2N27': {
                'id': '6576184acfed522641d9414f',
                'resource': 'H' //----for reaction----
            },
            'lab7W2N27': {
                'id': '65768f70f623bb38c8849b08',
                'resource': '' //----for revert reaction----
            },
            'factoryW2N27': {
                'id': '652cec5465fe9b42500b7f10',
                'resource': RESOURCE_OXYGEN, //RESOURCE_OXYGEN, RESOURCE_ENERGY, RESOURCE_GHODIUM
                'prod': RESOURCE_OXIDANT //RESOURCE_OXIDANT, RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT
            },
            //------------------------------------W1N27------------------------------------
            'labMW1N27': {
                'id': '65344bc3cb8a247b3faf4b25',
                'resource': '' //----for miner to drop----
            },
            'lab1W1N27': {
                'id': '656156ea7d800c2403f1d8cc',
                'resource': 'U' //----for reaction----
            },
            'lab2W1N27': {
                'id': '6561f2a403a6ca6b5a338137',
                'resource': 'L' //----for reaction----
            },
            'lab3W1N27': {
                'id': '65609112842812c9dc76e3a5',
                'resource': '' //----for revert reaction----
            },
            'factoryW1N27': {
                'id': '6561aa886d082eea0bcb0c4d',
                'resource': RESOURCE_LEMERGIUM, //RESOURCE_LEMERGIUM, RESOURCE_ENERGY, RESOURCE_GHODIUM
                'prod': RESOURCE_LEMERGIUM_BAR //RESOURCE_LEMERGIUM_BAR, RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT
            },
            //------------------------------------W4N28------------------------------------
            'labMW4N28': {
                'id': '653dd6733e19ec63f4e55563',
                'resource': '' //----for miner to drop----
            },
            'lab1W4N28': {
                'id': '65581e3afb0bd30747f9ed25',
                'resource': 'Z' //----for reaction----
            },
            'lab2W4N28': {
                'id': '655781bf830abb11a3f0a297',
                'resource': 'K' //----for reaction----
            },
            'lab3W4N28': {
                'id': '6557d8ed6be61427d51ad0b4',
                'resource': '' //----for revert reaction----
            },
            'lab4W4N28': {
                'id': '656036d99e270778d20b06d6',
                'resource': 'GH2O' //----for boost----
            },
            'factoryW4N28': {
                'id': '6558a879de1cb66a647dcedc',
                'resource': RESOURCE_ZYNTHIUM, //RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, RESOURCE_GHODIUM
                'prod': RESOURCE_ZYNTHIUM_BAR //RESOURCE_ZYNTHIUM_BAR, RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT
            },
            //------------------------------------W5N28------------------------------------
            'labMW5N28': {
                'id': '6554179d8b3d3209c83a4402',
                'resource': '' //----for miner to drop----
            },
            'lab1W5N28': {
                'id': '65574e8c662b5940ebb84ed3',
                'resource': 'G' //----for reaction----
            },
            'lab2W5N28': {
                'id': '656a03a3ee4874302a083bb2',
                'resource': 'H' //----for reaction----
            },
            'lab3W5N28': {
                'id': '65575cad8deb593a6a4ebbc8',
                'resource': 'UH' //----for revert reaction----
            },
            'lab4W5N28': {
                'id': '656dc747b182af372b07d7a7',
                'resource': 'GH2O' //----for boost----
            },
            'factoryW5N28': {
                'id': '6569e0677bf4c842996a3270',
                'resource': RESOURCE_HYDROGEN, //RESOURCE_ENERGY, RESOURCE_GHODIUM, RESOURCE_HYDROGEN
                'prod': RESOURCE_REDUCTANT // RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT, RESOURCE_REDUCTANT
            },
            //------------------------------------W3N28------------------------------------
            'labMW3N28': {
                'id': '656a20ecd2c9306823ea2aa6',
                'resource': '' //----for miner to drop----
            },
            'lab1W3N28': {
                'id': '656a081965dc20f131ae3598',
                'resource': '' //----for reaction----
            },
            'lab3W3N28': {
                'id': '656a01aa7661a4b9449db1a3',
                'resource': '' //----for revert reaction----
            },
            //------------------------------------W6N28------------------------------------
            
        };
        //----view storage stores----
        var stg = Game.getObjectById(Memory.structures.storages.W2N27['id']);
        for (let resourceType in stg.store) {
            Memory.structures.storages.W2N27[resourceType] = stg.store[resourceType];
        };
        var stg = Game.getObjectById(Memory.structures.storages.W1N27['id']);
        for (let resourceType in stg.store) {
            Memory.structures.storages.W1N27[resourceType] = stg.store[resourceType];
        };
        var stg = Game.getObjectById(Memory.structures.storages.W4N28['id']);
        for (let resourceType in stg.store) {
            Memory.structures.storages.W4N28[resourceType] = stg.store[resourceType];
        };
        var stg = Game.getObjectById(Memory.structures.storages.W5N28['id']);
        for (let resourceType in stg.store) {
            Memory.structures.storages.W5N28[resourceType] = stg.store[resourceType];
        };
        var stg = Game.getObjectById(Memory.structures.storages.W3N28['id']);
        for (let resourceType in stg.store) {
            Memory.structures.storages.W3N28[resourceType] = stg.store[resourceType];
        };
        
        //----view storage stores----
        var tmn = Game.getObjectById(Memory.structures.terminals['id1']);
        for (let resourceType in tmn.store) {
            Memory.structures.storages.W2N27.term[resourceType] = tmn.store[resourceType];
        };
        var tmn = Game.getObjectById(Memory.structures.terminals['id2']);
        for (let resourceType in tmn.store) {
            Memory.structures.storages.W1N27.term[resourceType] = tmn.store[resourceType];
        };
        var tmn = Game.getObjectById(Memory.structures.terminals['id3']);
        for (let resourceType in tmn.store) {
            Memory.structures.storages.W4N28.term[resourceType] = tmn.store[resourceType];
        };
        var tmn = Game.getObjectById(Memory.structures.terminals['id4']);
        for (let resourceType in tmn.store) {
            Memory.structures.storages.W5N28.term[resourceType] = tmn.store[resourceType];
        };
        var tmn = Game.getObjectById(Memory.structures.terminals['id5']);
        for (let resourceType in tmn.store) {
            Memory.structures.storages.W3N28.term[resourceType] = tmn.store[resourceType];
        };
    }
};

module.exports = consData;