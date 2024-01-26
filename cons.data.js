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
        if (!Memory.structures || Memory.structures.refresh <= 0) {
            delete Memory.structures;
            Memory.structures = {
                'refresh': 5,
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
                    'W6N29': {
                        'id': '65914d2082f90de0058c61c1',
                        'term': {}
                    },
                    'W3N28': {
                        'id': '65606acdd59f54caf3c8554c',
                        'term': {}
                    },
                    'W6N28': {
                        'id': '657c1d09bbed4c7b8dd5c159',
                        'term': {}
                    },
                    'W4N29': {
                        'id': '659afffbb3bc1c306046929e',
                        'term': {}
                    }
                },
                'terminals': {
                    //----W2N27----
                    'id1': '6515f9470399d864cad3fd02',
                    'resource1': ' ' + RESOURCE_ENERGY + ' O G OH ' + RESOURCE_OXIDANT + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' UL ',
                    //----W1N27----
                    'id2': '65332c1f8919c3c4b933b1e8',
                    'resource2': ' ' + RESOURCE_ENERGY + ' L UL ' + RESOURCE_LEMERGIUM_BAR + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' ',
                    //----W4N28----
                    'id3': '653eba128b9e097d44dd634d',
                    'resource3': ' ' + RESOURCE_ENERGY + ' Z ZK ' + RESOURCE_ZYNTHIUM_BAR + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' ',
                    //----W6N29----
                    'id4': '659c030b70ec908f7b1c192a',
                    'resource4': ' ' + RESOURCE_ENERGY + ' H GH ' + RESOURCE_REDUCTANT + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' ',
                    //----W3N28----
                    'id5': '6569df3de0626d0ba98a5b23',
                    'resource5': ' ' + RESOURCE_ENERGY + ' K ' + RESOURCE_KEANIUM_BAR + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' ',
                    //----W6N28----
                    'id6': '6586839dbbc9da2781292c70',
                    'resource6': ' ' + RESOURCE_ENERGY + ' U UL ' + RESOURCE_UTRIUM_BAR + ' ZH UH KO GO LO ' + RESOURCE_BATTERY + ' ',
                    //----W4N29----
                    'id7': '65a8ea9f50c557093163eaf7',
                    'resource7': ' ' + RESOURCE_ENERGY + ' H ' + RESOURCE_REDUCTANT + ' O Z K U L G ' + RESOURCE_BATTERY + ' '
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
                'lab8W2N27': {
                    'id': '65774f83523a7f27ddc532cc',
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
                    'resource': '' //----for reaction----
                },
                'lab2W1N27': {
                    'id': '6561f2a403a6ca6b5a338137',
                    'resource': '' //----for reaction----
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
                'lab5W4N28': {
                    'id': '6581723f75f4b705c3c38b11',
                    'resource': '' //----for reaction----
                },
                'lab6W4N28': {
                    'id': '65998090522cc864ecbef52d',
                    'resource': '' //----for reaction----
                },
                'lab7W4N28': {
                    'id': '65995db1e16746507cc3a0d6',
                    'resource': '' //----for revert reaction----
                },
                'factoryW4N28': {
                    'id': '6558a879de1cb66a647dcedc',
                    'resource': RESOURCE_ZYNTHIUM, //RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, RESOURCE_GHODIUM
                    'prod': RESOURCE_ZYNTHIUM_BAR //RESOURCE_ZYNTHIUM_BAR, RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT
                },
                //------------------------------------W6N29------------------------------------
                'labMW6N29': {
                    'id': '65b0742d84809b6a3f24169e',
                    'resource': '' //----for miner to drop----
                },
                'lab1W6N29': {
                    'id': '659be8cc778cfc2687c8626d',
                    'resource': 'G' //----for reaction----
                },
                'lab2W6N29': {
                    'id': '659c70cbf1697a1f50ef34ac',
                    'resource': 'H' //----for reaction----
                },
                'lab3W6N29': {
                    'id': '659c36f34add9951edd0d6da',
                    'resource': '' //----for revert reaction----
                },
                // 'lab4W6N29': {
                //     'id': '656dc747b182af372b07d7a7',
                //     'resource': 'GH2O' //----for boost----
                // },
                'factoryW6N29': {
                    'id': '65afdfbc1ec01e3efdf68319',
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
                    'resource': 'GH' //----for reaction----
                },
                'lab2W3N28': {
                    'id': '657d263506a1a9b6a0d0a0d0',
                    'resource': 'OH' //----for reaction----
                },
                'lab3W3N28': {
                    'id': '656a01aa7661a4b9449db1a3',
                    'resource': '' //----for revert reaction----
                },
                'lab4W3N28': {
                    'id': '657d8d0d4678b06e90c539ed',
                    'resource': 'GH2O' //----for boost----
                },
                'lab5W3N28': {
                    'id': '65815638571a84565cb4a062',
                    'resource': 'GH' //----for reaction----
                },
                'lab6W3N28': {
                    'id': '65affe66da6c1f5cc99a030c',
                    'resource': 'OH' //----for reaction----
                },
                'lab7W3N28': {
                    'id': '65afea6ec736b9d0a44e363c',
                    'resource': '' //----for revert reaction----
                },
                'factoryW3N28': {
                    'id': '657da9796b8dddb714ba4e70',
                    'resource': RESOURCE_KEANIUM, //RESOURCE_ENERGY, RESOURCE_GHODIUM, RESOURCE_KEANIUM
                    'prod': RESOURCE_KEANIUM_BAR // RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT, RESOURCE_KEANIUM_BAR
                },
                //------------------------------------W6N28------------------------------------
                'labMW6N28': {
                    'id': '6586c90dd71dee74083e0d0a',
                    'resource': '' //----for miner to drop----
                },
                'lab1W6N28': {
                    'id': '6586ff18482794082cae26f8',
                    'resource': 'U' //----for reaction----
                },
                'lab2W6N28': {
                    'id': '6587104339cac7780e46f83a',
                    'resource': 'L' //----for reaction----
                },
                'lab3W6N28': {
                    'id': '659d73aae167461a5ec4b08a',
                    'resource': '' //----for revert reaction----
                },
                // 'lab4W6N28': {
                //     'id': '657d8d0d4678b06e90c539ed',
                //     'resource': 'GH2O' //----for boost----
                // },
                'factoryW6N28': {
                    'id': '659e3dc347d4aba28c482000',
                    'resource': RESOURCE_UTRIUM, //RESOURCE_ENERGY, RESOURCE_GHODIUM, RESOURCE_UTRIUM
                    'prod': RESOURCE_UTRIUM_BAR // RESOURCE_BATTERY, RESOURCE_GHODIUM_MELT, RESOURCE_UTRIUM_BAR
                },
                //------------------------------------W4N29------------------------------------
                 'lab1W4N29': {
                    'id': '65a8efea50c557cf2c63ec5f',
                    'resource': '' //----for reaction----
                },
                'lab2W4N29': {
                    'id': '65a92812619753358dc2c8ab',
                    'resource': '' //----for reaction----
                },
                'lab3W4N29': {
                    'id': '65a97e08d62c5e14de6a83f5',
                    'resource': '' //----for revert reaction----
                },
    
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
            var stg = Game.getObjectById(Memory.structures.storages.W6N29['id']);
            for (let resourceType in stg.store) {
                Memory.structures.storages.W6N29[resourceType] = stg.store[resourceType];
            };
            var stg = Game.getObjectById(Memory.structures.storages.W3N28['id']);
            for (let resourceType in stg.store) {
                Memory.structures.storages.W3N28[resourceType] = stg.store[resourceType];
            };
            var stg = Game.getObjectById(Memory.structures.storages.W6N28['id']);
            for (let resourceType in stg.store) {
                Memory.structures.storages.W6N28[resourceType] = stg.store[resourceType];
            };
            var stg = Game.getObjectById(Memory.structures.storages.W4N29['id']);
            for (let resourceType in stg.store) {
                Memory.structures.storages.W4N29[resourceType] = stg.store[resourceType];
            };
    
            //----view terminal stores----
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
                Memory.structures.storages.W6N29.term[resourceType] = tmn.store[resourceType];
            };
            var tmn = Game.getObjectById(Memory.structures.terminals['id5']);
            for (let resourceType in tmn.store) {
                Memory.structures.storages.W3N28.term[resourceType] = tmn.store[resourceType];
            };
            var tmn = Game.getObjectById(Memory.structures.terminals['id6']);
            for (let resourceType in tmn.store) {
                Memory.structures.storages.W6N28.term[resourceType] = tmn.store[resourceType];
            };
            var tmn = Game.getObjectById(Memory.structures.terminals['id7']);
            for (let resourceType in tmn.store) {
                Memory.structures.storages.W4N29.term[resourceType] = tmn.store[resourceType];
            };
        }
        else {
            Memory.structures.refresh -= 1;
        }

        //----save structures to fix----
        if (!Memory.structuresToFix || Memory.structuresToFix.refresh <= 0) {
            delete Memory.structuresToFix;
            Memory.structuresToFix = {
                'refresh': 50,
                'W2N27': {},
                'W1N27': {},
                'W4N28': {},
                'W6N29': {},
                'W3N28': {},
                'W6N28': {},
                'W4N29': {}
            };
            var hitStructures = Game.rooms['W2N27'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W2N27'] = hitStructures;
            var hitStructures = Game.rooms['W1N27'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W1N27'] = hitStructures;
            var hitStructures = Game.rooms['W4N28'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W4N28'] = hitStructures;
            var hitStructures = Game.rooms['W6N29'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W6N29'] = hitStructures;
            var hitStructures = Game.rooms['W3N28'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W3N28'] = hitStructures;
            var hitStructures = Game.rooms['W6N28'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W6N28'] = hitStructures;
            var hitStructures = Game.rooms['W4N29'].find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.hits > 0;}});
            hitStructures = hitStructures.map(structure => structure.id);
            Memory.structuresToFix['W4N29'] = hitStructures;
        }
        else {
            Memory.structuresToFix.refresh -= 1;
        }
    }
};

module.exports = consData;