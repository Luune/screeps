/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.alchemist');
 * mod.thing == 'a thing'; // true
 */

var roleAlchemist = {
    run: function (creep) {
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            creep.say('🧪 收集');
        }
        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            creep.say('⚗️ 运送');
        }

        // console.log('A>> ' + order.resourceType + ' ' + order.remainingAmount );
        //----set labs----
        switch (creep.memory.loc) {
            case 'W2N27':
                var storage = Game.getObjectById(Memory.structures.storages.W2N27['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id1']);
                var terminalRes = Memory.structures.terminals['resource1'];
                var labM = Game.getObjectById(Memory.structures.labMW2N27['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W2N27['id']);
                var lab1Res = Memory.structures.lab1W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W2N27['id']);
                var lab2Res = Memory.structures.lab2W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W2N27['id']);
                var lab3Res = Memory.structures.lab3W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W2N27['id']);
                var lab4Res = Memory.structures.lab4W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab5 = Game.getObjectById(Memory.structures.lab5W2N27['id']);
                var lab5Res = Memory.structures.lab5W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab5Res, lab5.pos.x, lab5.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab6 = Game.getObjectById(Memory.structures.lab6W2N27['id']);
                var lab6Res = Memory.structures.lab6W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab6Res, lab6.pos.x, lab6.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab7 = Game.getObjectById(Memory.structures.lab7W2N27['id']);
                var lab7Res = Memory.structures.lab7W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab7Res, lab7.pos.x, lab7.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab8 = Game.getObjectById(Memory.structures.lab8W2N27['id']);
                var lab8Res = Memory.structures.lab8W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab8Res, lab8.pos.x, lab8.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW2N27['id']);
                var factoryRes = Memory.structures.factoryW2N27['resource'];
                var factoryPrd = Memory.structures.factoryW2N27['prod'];
                var nuker = Game.getObjectById('657061da8cfbe564237930dc');
                break;
            case 'W1N27':
                var storage = Game.getObjectById(Memory.structures.storages.W1N27['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id2']);
                var terminalRes = Memory.structures.terminals['resource2'];
                var labM = Game.getObjectById(Memory.structures.labMW1N27['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W1N27['id']);
                var lab1Res = Memory.structures.lab1W1N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W1N27['id']);
                var lab2Res = Memory.structures.lab2W1N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W1N27['id']);
                var lab3Res = Memory.structures.lab3W1N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW1N27['id']);
                var factoryRes = Memory.structures.factoryW1N27['resource'];
                var factoryPrd = Memory.structures.factoryW1N27['prod'];
                break;
            case 'W4N28':
                var storage = Game.getObjectById(Memory.structures.storages.W4N28['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id3']);
                var terminalRes = Memory.structures.terminals['resource3'];
                var labM = Game.getObjectById(Memory.structures.labMW4N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W4N28['id']);
                var lab1Res = Memory.structures.lab1W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W4N28['id']);
                var lab2Res = Memory.structures.lab2W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W4N28['id']);
                var lab3Res = Memory.structures.lab3W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W4N28['id']);
                var lab4Res = Memory.structures.lab4W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab5 = Game.getObjectById(Memory.structures.lab5W4N28['id']);
                var lab5Res = Memory.structures.lab5W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab5Res, lab5.pos.x, lab5.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab6 = Game.getObjectById(Memory.structures.lab6W4N28['id']);
                var lab6Res = Memory.structures.lab6W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab6Res, lab6.pos.x, lab6.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab7 = Game.getObjectById(Memory.structures.lab7W4N28['id']);
                var lab7Res = Memory.structures.lab7W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab7Res, lab7.pos.x, lab7.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW4N28['id']);
                for (let resourceType in storage.store) {
                    if (resourceType == RESOURCE_KEANIUM_BAR) {
                        var factoryRes = resourceType;
                        var factoryPrd = RESOURCE_KEANIUM;
                        break;
                    }
                    else {
                        var factoryRes = Memory.structures.factoryW4N28['resource'];
                        var factoryPrd = Memory.structures.factoryW4N28['prod'];
                    }
                }
                
                break;
            case 'W6N29':
                var storage = Game.getObjectById(Memory.structures.storages.W6N29['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id4']);
                var terminalRes = Memory.structures.terminals['resource4'];
                var labM = Game.getObjectById(Memory.structures.labMW6N29['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W6N29['id']);
                var lab1Res = Memory.structures.lab1W6N29['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W6N29['id']);
                var lab2Res = Memory.structures.lab2W6N29['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W6N29['id']);
                var lab3Res = Memory.structures.lab3W6N29['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                // var lab4 = Game.getObjectById(Memory.structures.lab4W6N29['id']);
                // var lab4Res = Memory.structures.lab4W6N29['resource'];
                // Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW6N29['id']);
                var factoryRes = Memory.structures.factoryW6N29['resource'];
                var factoryPrd = Memory.structures.factoryW6N29['prod'];
                break;
            case 'W3N28':
                var storage = Game.getObjectById(Memory.structures.storages.W3N28['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id5']);
                var terminalRes = Memory.structures.terminals['resource5'];
                var labM = Game.getObjectById(Memory.structures.labMW3N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W3N28['id']);
                var lab1Res = Memory.structures.lab1W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W3N28['id']);
                var lab2Res = Memory.structures.lab2W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W3N28['id']);
                var lab3Res = Memory.structures.lab3W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W3N28['id']);
                var lab4Res = Memory.structures.lab4W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab5 = Game.getObjectById(Memory.structures.lab5W3N28['id']);
                var lab5Res = Memory.structures.lab5W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab5Res, lab5.pos.x, lab5.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab6 = Game.getObjectById(Memory.structures.lab6W3N28['id']);
                var lab6Res = Memory.structures.lab6W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab6Res, lab6.pos.x, lab6.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab7 = Game.getObjectById(Memory.structures.lab7W3N28['id']);
                var lab7Res = Memory.structures.lab7W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab7Res, lab7.pos.x, lab7.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW3N28['id']);
                var factoryRes = Memory.structures.factoryW3N28['resource'];
                var factoryPrd = Memory.structures.factoryW3N28['prod'];
                break;
            case 'W6N28':
                var storage = Game.getObjectById(Memory.structures.storages.W6N28['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id6']);
                var terminalRes = Memory.structures.terminals['resource6'];
                var labM = Game.getObjectById(Memory.structures.labMW6N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W6N28['id']);
                var lab1Res = Memory.structures.lab1W6N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W6N28['id']);
                var lab2Res = Memory.structures.lab2W6N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W6N28['id']);
                var lab3Res = Memory.structures.lab3W6N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var factory = Game.getObjectById(Memory.structures.factoryW6N28['id']);
                var factoryRes = Memory.structures.factoryW6N28['resource'];
                var factoryPrd = Memory.structures.factoryW6N28['prod'];
                break;
            case 'W4N29':
                var storage = Game.getObjectById(Memory.structures.storages.W4N29['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id7']);
                var terminalRes = Memory.structures.terminals['resource7'];
                // var labM = Game.getObjectById(Memory.structures.labMW6N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W4N29['id']);
                var lab1Res = Memory.structures.lab1W4N29['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W4N29['id']);
                var lab2Res = Memory.structures.lab2W4N29['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W4N29['id']);
                if ((lab3.mineralType == 'ZH' || lab3.mineralType == 'UH' || lab3.mineralType == 'KO' || lab3.mineralType == 'GO' || lab3.mineralType == 'LO') 
                && lab3.store[lab3.mineralType] >= 5) {
                    var lab3Res = lab3.mineralType;
                }
                else {
                    var lab3Res = Memory.structures.lab3W4N29['resource'];
                }
                if (lab3Res != 'ZH' && lab3Res != 'UH' && lab3Res != 'KO' && lab3Res != 'GO' && lab3Res != 'LO') {
                    for (let resourceType in storage.store) {
                        if ((resourceType == 'ZH' || resourceType == 'UH' || resourceType == 'KO' || resourceType == 'GO' || resourceType == 'LO') 
                        && storage.store[resourceType] >= 5 ) {
                            var lab3Res = resourceType;
                            break;
                        }
                    }
                    for (let resourceType in creep.store) {
                        if ((resourceType == 'ZH' || resourceType == 'UH' || resourceType == 'KO' || resourceType == 'GO' || resourceType == 'LO') 
                        && creep.store[resourceType] >= 5 && !lab3.mineralType) {
                            var lab3Res = resourceType;
                            break;
                        }
                    }
                }
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'white', stroke: 'black', font: 0.3 });
                break;
        }

        
        //----run labs----
        // if (lab8) {
        //     if (lab8Res == '' && lab3Res != '' && lab7Res != '') {
        //         lab8.runReaction(lab3,lab7);
        //     }
        //     else {
        //         lab8.reverseReaction(lab3,lab7);
        //     }
        // }
        // else {
        if (lab3) {
            if (lab3Res == '') {
                if (lab1 && lab1Res != '' && lab2 && lab2Res != '') {
                    lab3.runReaction(lab1, lab2);
                }
            }
            else {
                lab3.reverseReaction(lab1, lab2);
            }
        }
        if (lab7) {
            if (lab7Res == '') {
                if (lab5 && lab5Res != '' && lab6 && lab6Res != '') {
                    lab7.runReaction(lab5, lab6);
                }
            }
            else {
                lab7.reverseReaction(lab5, lab6);
            }
        }
        // }

        //----run factory----
        if (factory) {
            let totalRes = storage.store[factoryRes] + terminal.store[factoryRes];
            let totalPrd = storage.store[factoryPrd] + terminal.store[factoryPrd];
            let totalEng = storage.store[RESOURCE_ENERGY] + terminal.store[RESOURCE_ENERGY];
            let totalBty = storage.store[RESOURCE_BATTERY] + terminal.store[RESOURCE_BATTERY];
            factory.room.visual.text(factoryPrd + ': ' + totalPrd, 8, 3 - 0.3, {align: 'right', stroke: 'black', opacity: 0.7});
            factory.room.visual.text(factoryRes + ': ' + totalRes, 8, 3 + 0.5, {align: 'right', stroke: 'black', opacity: 0.7});
            factory.room.visual.text('Battery: ' + totalBty, 8, 5 - 0.3, {align: 'right', stroke: 'black', opacity: 0.7});
            factory.room.visual.text('Energy: ' + totalEng, 8, 5 + 0.5, {align: 'right', stroke: 'black', opacity: 0.7});
            if (totalPrd * 5 < totalRes) {
                var result = factory.produce(factoryPrd);
                // console.log(result);
            }
            else if (totalPrd * 5 >= totalRes && totalEng > 500000 && totalBty < 100000 && factory.store[RESOURCE_ENERGY] >= 600 ) {
                var result = factory.produce(RESOURCE_BATTERY);
            }
            else if (totalPrd * 4.9 > totalRes) {
                var result = factory.produce(factoryRes);
            }
            else if (totalEng < 300000 && factory.store[RESOURCE_BATTERY] >= 600) {
                var result = factory.produce(RESOURCE_ENERGY);
            }
        }

        //----run terminal----
        if (terminal) {
            for (let resourceType in terminal.store) {
                //invader资源送到W4N29拆解
                if ((resourceType == 'ZH' || resourceType == 'UH' || resourceType == 'KO' || resourceType == 'GO' || resourceType == 'LO' )
                    && terminal.room.name != 'W4N29') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W4N29');
                    break;
                }
                //G送到W6N29合成GH
                else if (resourceType == 'G' && terminal.store[resourceType] >= 50 && terminal.room.name != 'W6N29') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W6N29');
                    break;
                }
                //ZK UL送到W2N27合成G,O H送到W2N27合成OH
                else if ((resourceType == 'ZK' || resourceType == 'UL' || resourceType == 'H') 
                && terminal.store[resourceType] >= 50 && terminal.room.name != 'W2N27' && terminal.room.name != 'W6N29' && terminal.room.name != 'W4N29') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W2N27');
                    break;
                }
                else if (resourceType == 'O' && terminal.store[resourceType] >= 50 && terminal.room.name != 'W2N27') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W2N27');
                    break;
                }
                else if (resourceType == 'H' && terminal.room.name != 'W2N27' && terminal.store[resourceType] >= 5000 && terminal.room.storage.store[resourceType] >= 300000) {
                    terminal.send(resourceType, 5000, 'W2N27');
                    break;
                }
                //U送到W6N28合成UL
                else if (resourceType == 'U' && terminal.store[resourceType] >= 50 && terminal.room.name != 'W6N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W6N28');
                    break;
                }
                //L送到W6N28合成UL
                else if (resourceType == 'L' && terminal.store[resourceType] >= 50 && terminal.room.name != 'W1N27' && terminal.room.name != 'W6N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W6N28');
                    break;
                }
                else if (resourceType == 'L' && terminal.store[resourceType] >= 5000 && terminal.room.name != 'W6N28' && terminal.room.storage.store[resourceType] >= 300000) {
                    terminal.send(resourceType, 5000, 'W6N28');
                    break;
                }
                //Z K送到W4N28合成ZK
                else if ((resourceType == 'Z' || resourceType == 'K') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W4N28' && terminal.room.name != 'W3N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W4N28');
                    break;
                }
                else if (resourceType == 'K' && terminal.store[resourceType] >= 5000 && terminal.room.name != 'W4N28' && terminal.room.storage.store[resourceType] >= 300000) {
                    terminal.send(resourceType, 5000, 'W4N28');
                    break;
                }
                //GH OH送到W3N28合成GH2O
                else if ((resourceType == 'GH' || resourceType == 'OH') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W3N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W3N28');
                    break;
                }
                //battery送到W2N28
                else if ((resourceType == RESOURCE_BATTERY) && terminal.store[resourceType] >= 500 && terminal.room.name != 'W1N27') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W1N27');
                    break;
                }
                //energy支援W1N27
                else if (resourceType == RESOURCE_ENERGY && terminal.store[RESOURCE_ENERGY] >= 8000 
                && terminal.room.storage.store[RESOURCE_ENERGY] >= 500000 
                && (Memory.structures.storages.W1N27.energy + Memory.structures.storages.W1N27.term.energy < 250000
                    || !Memory.structures.storages.W1N27.energy)) {
                    terminal.send(RESOURCE_ENERGY, 5000, 'W1N27');
                    break;
                }
            }
        }

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                for (let resourceType of Object.keys(creep.store)) {
                    //----fill nuker----
                    if (nuker && resourceType == RESOURCE_GHODIUM && nuker.store.getFreeCapacity(RESOURCE_GHODIUM) > 0) {
                        creep.memory.target = nuker.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
                    //----fill terminal transfer----
                    else if (terminalRes && terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] < 10000) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    //----fill labs----
                    else if (lab4 && resourceType == lab4Res && lab4.store[resourceType] <= 2900) {
                        creep.memory.target = lab4.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab4: ' + resourceType);
                        break;
                    }
                    else if (lab1 && lab3Res == '' && resourceType == lab1Res && lab1.store[resourceType] <= 2900) {
                        creep.memory.target = lab1.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab1: ' + resourceType);
                        break;
                    }
                    else if (lab2 && lab3Res == '' && resourceType == lab2Res && lab2.store[resourceType] <= 2900) {
                        creep.memory.target = lab2.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab2: ' + resourceType);
                        break;
                    }
                    else if (lab3 && lab3Res != '' && resourceType == lab3Res && lab3.store[resourceType] <= 2900) {
                        creep.memory.target = lab3.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab3: ' + resourceType);
                        break;
                    }
                    else if (lab5 && lab7Res == '' && resourceType == lab5Res && lab5.store[resourceType] <= 2900) {
                        creep.memory.target = lab5.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab5: ' + resourceType);
                        break;
                    }
                    else if (lab6 && lab7Res == '' && resourceType == lab6Res && lab6.store[resourceType] <= 2900) {
                        creep.memory.target = lab6.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab6: ' + resourceType);
                        break;
                    }
                    else if (lab7 && lab7Res != '' && resourceType == lab7Res && lab7.store[resourceType] <= 2900) {
                        creep.memory.target = lab7.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab7: ' + resourceType);
                        break;
                    }
                    else if (lab8 && lab8Res != '' && resourceType == lab8Res && lab8.store[resourceType] <= 2900) {
                        creep.memory.target = lab8.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab7: ' + resourceType);
                        break;
                    }
                    //----fill factory resource----
                    else if (factoryRes && (resourceType == factoryRes || resourceType == RESOURCE_ENERGY || resourceType == factoryPrd || resourceType == RESOURCE_BATTERY) 
                    && factory.store[resourceType] < 600) {
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
                    // else if (factory && resourceType == RESOURCE_ENERGY && factory.store[resourceType] < 600) {
                    //     creep.memory.target = factory.id;
                    //     creep.memory.targetResource = resourceType;
                    //     // console.log('⚗️ A>> to factory: ' + resourceType);
                    //     break;
                    // }
                    //----to storage----
                    else {
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to storage: ' + resourceType);
                        break;
                    }
                }
            }
            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target) {
                // if (target.room != creep.room) {
                //     creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30, visualizePathStyle: { stroke: '#ffeb0b' } });
                // } else 
                let result = creep.transfer(target, targetResource);
                if (result == ERR_NOT_IN_RANGE) {
                    // if (!creep.memory.path) {
                    //     creep.memory.path = creep.pos.findPathTo(target);
                    // }
                    creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target), visualizePathStyle: { stroke: '#ffeb0b', opacity: 0.8 } });
                    // creep.moveByPath(creep.memory.path);
                    // creep.say('⚗️>' + target.pos.x + ',' + target.pos.y);
                    // if (creep.memory.path) {
                    //     // 获取creep的路线
                    //     var path = creep.memory.path;
                    //     // 获取下一步位置
                    //     var nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                    //     // 在下一步位置查找所有对象
                    //     var objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                    //     if (objects.length > 0) {
                    //         delete creep.memory.path;
                    //     }
                    // }
                }
                else { //if (result == OK) 
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
            }
        }
        //----loot----
        else {
            //----empty containers storing not energy----
            var containersToLoot = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                        && structure.store.getUsedCapacity(RESOURCE_ENERGY) == 0
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) < 2000;
                }
            });
            if (containersToLoot.length > 0) {
                for (let resourceType in containersToLoot[0].store) {
                    if (resourceType != RESOURCE_ENERGY) {
                        creep.memory.target = containersToLoot[0].id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from container: ' + resourceType);
                        break;
                    }
                }
            }
            if (factory && !creep.memory.target) {
                for (let resourceType in factory.store) {
                    if (factory.store[resourceType] >= 700) { //----clear factory produced and other resource----
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from factory: ' + resourceType);
                        break;
                    }
                }
            }
            if (!creep.memory.target) {
                if (lab7 && lab7.mineralType && lab7.mineralType != lab7Res) { //----run reaction, clear lab7----
                    creep.memory.target = lab7.id;
                    creep.memory.targetResource = lab7.mineralType;
                    // console.log('🧪A>> from lab3: ' + lab3.mineralType);
                }
                else if (lab6 && lab6.mineralType && (lab7Res != '' || lab6.mineralType != lab6Res)) { //----revert reaction, clear lab6----
                    creep.memory.target = lab6.id;
                    creep.memory.targetResource = lab6.mineralType;
                    // console.log('🧪A>> from lab6: ' + lab6.mineralType);
                }
                else if (lab5 && lab5.mineralType && (lab7Res != '' || lab5.mineralType != lab5Res)) { //----revert reaction, clear lab5----
                    creep.memory.target = lab5.id;
                    creep.memory.targetResource = lab5.mineralType;
                    // console.log('🧪A>> from lab5: ' + lab5.mineralType);
                }
                else if (lab3 && lab3.mineralType && lab3.mineralType != lab3Res) { //----run reaction, clear lab3----
                    creep.memory.target = lab3.id;
                    creep.memory.targetResource = lab3.mineralType;
                    // console.log('🧪A>> from lab3: ' + lab3.mineralType);
                }
                else if (lab2 && lab2.mineralType && (lab3Res != '' || lab2.mineralType != lab2Res)) { //----revert reaction, clear lab2----
                    creep.memory.target = lab2.id;
                    creep.memory.targetResource = lab2.mineralType;
                    // console.log('🧪A>> from lab2: ' + lab2.mineralType);
                }
                else if (lab1 && lab1.mineralType && (lab3Res != '' || lab1.mineralType != lab1Res)) { //----revert reaction, clear lab1----
                    creep.memory.target = lab1.id;
                    creep.memory.targetResource = lab1.mineralType;
                    // console.log('🧪A>> from lab1: ' + lab1.mineralType);
                }
                // else if (lab4 && lab4.mineralType && (lab4.mineralType != lab4Res || lab4.store[lab4Res] > 1100)) { //----clear lab4----
                //     creep.memory.target = lab4.id;
                //     creep.memory.targetResource = lab4.mineralType;
                //     // console.log('🧪A>> from lab4: ' + lab4.mineralType);
                // }
                else if (lab8 && lab8.mineralType && lab8.mineralType != lab8Res) { //----clear lab8----
                    creep.memory.target = lab8.id;
                    creep.memory.targetResource = lab8.mineralType;
                    // console.log('🧪A>> from lab8: ' + lab4.mineralType);
                }
                else if (labM && labM.mineralType && labM.store[labM.mineralType] > 50) { //----clear labM----
                    creep.memory.target = labM.id;
                    creep.memory.targetResource = labM.mineralType;
                    // console.log('🧪A>> from labM: ' + labM.mineralType);
                }
            }
            if (storage && !creep.memory.target) {  //----find resource from storage----
                for (let resourceType in storage.store) { // 遍历所有资源
                    if (factory && (resourceType == RESOURCE_ENERGY || resourceType == factoryRes || resourceType == RESOURCE_BATTERY || resourceType == factoryPrd)
                    && factory.store[resourceType] < 600) { //----factory need for produce----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage tfe: ' + resourceType);
                        break;
                    }
                    // else if (terminal && resourceType == RESOURCE_ENERGY && terminal.store[resourceType] < 10000) { //----terminal need energy for transfer----
                    //     creep.memory.target = storage.id;
                    //     creep.memory.targetResource = resourceType;
                    //     // console.log('🧪A>> from storage tte: ' + resourceType);
                    //     break;
                    // }
                    else if (terminal && terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] < 10000) { //----terminal need for transfer----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage tt: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab1Res && lab1.store[resourceType] <= 2900 && lab3Res == '') { //----lab1 need for reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab1: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab2Res && lab2.store[resourceType] <= 2900 && lab3Res == '') { //----lab2 need for reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab2: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab4Res && lab4.store[resourceType] <= 2000) { //----lab4 need for boost----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab4: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab3Res && lab3.store[resourceType] <= 2900) { //----lab3 need for revert reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab3: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab5Res && lab5.store[resourceType] <= 2900 && lab7Res == '') { //----lab5 need for reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab1: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab6Res && lab6.store[resourceType] <= 2900 && lab7Res == '') { //----lab6 need for reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab2: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab7Res && lab7.store[resourceType] <= 2900) { //----lab7 need for revert reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab3: ' + resourceType);
                        break;
                    }
                    else if (resourceType == lab8Res && lab8.store[resourceType] <= 2900) { //----lab7 need for revert reaction----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage to lab3: ' + resourceType);
                        break;
                    }
                    else if (nuker && resourceType == RESOURCE_GHODIUM && nuker.store.getFreeCapacity(RESOURCE_GHODIUM) > 0) { //----nuker need G----
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from storage tn: ' + resourceType);
                        break;
                    }
                }
            }
            if (terminal && !creep.memory.target) {
                for (let resourceType in terminal.store) {
                    if (!terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] > 0 && creep.room.storage.store.getFreeCapacity(resourceType) >= 100) { //----remove terminal resource if no trade----
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from terminal 2: ' + resourceType);
                        break;
                    }
                    else if (terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] >= 10100 && creep.room.storage.store.getFreeCapacity(resourceType) >= 100) { //----remove extra terminal resource----
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('🧪A>> from terminal res: ' + resourceType);
                        break;
                    }
                }
            }
            
            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target) {
                // console.log('🧪A>> from: ' + target.id + ' take: ' + targetResource);
                if (target.room != creep.room) {
                    creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30, visualizePathStyle: { stroke: '#ffeb0b', opacity: 0.8 } });
                } else {
                    let result = creep.withdraw(target, targetResource);
                    if (result == ERR_NOT_IN_RANGE) {
                        if (!creep.memory.path) {
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        // creep.moveTo(target, { reusePath: 3, visualizePathStyle: { stroke: '#ffeb0b' } });
                        creep.moveByPath(creep.memory.path);
                        creep.say('🧪>' + target.pos.x + ',' + target.pos.y);
                        creep.room.visual.line(creep.pos, target.pos, { color: '#ffeb0b', width: 0.1, lineStyle: 'dashed' });
                    }
                    else {
                        delete creep.memory.target;
                        delete creep.memory.targetResource;
                        delete creep.memory.path;
                    }
                }
            }
            else if (creep.store.getUsedCapacity() > 0) { //----没得捡了就存掉----
                creep.memory.transporting = true;
                delete creep.memory.target;
                delete creep.memory.targetResource;
                delete creep.memory.path;
                creep.say('⚗️ 运送');
            }
        }
    }
};

module.exports = roleAlchemist;