/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.alchemist');
 * mod.thing == 'a thing'; // true
 */

var roleAlchemist = {
    run: function (creep, roomName, order, tradeAmount) {
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
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W2N27['id']);
                var lab2Res = Memory.structures.lab2W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W2N27['id']);
                var lab3Res = Memory.structures.lab3W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W2N27['id']);
                var lab4Res = Memory.structures.lab4W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab5 = Game.getObjectById(Memory.structures.lab5W2N27['id']);
                var lab5Res = Memory.structures.lab5W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab5Res, lab5.pos.x, lab5.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab6 = Game.getObjectById(Memory.structures.lab6W2N27['id']);
                var lab6Res = Memory.structures.lab6W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab6Res, lab6.pos.x, lab6.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab7 = Game.getObjectById(Memory.structures.lab7W2N27['id']);
                var lab7Res = Memory.structures.lab7W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab7Res, lab7.pos.x, lab7.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab8 = Game.getObjectById(Memory.structures.lab8W2N27['id']);
                var lab8Res = Memory.structures.lab8W2N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab8Res, lab8.pos.x, lab8.pos.y + 0.1, { color: 'black', font: 0.5 });
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
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W1N27['id']);
                var lab2Res = Memory.structures.lab2W1N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W1N27['id']);
                var lab3Res = Memory.structures.lab3W1N27['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'black', font: 0.5 });
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
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W4N28['id']);
                var lab2Res = Memory.structures.lab2W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W4N28['id']);
                var lab3Res = Memory.structures.lab3W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W4N28['id']);
                var lab4Res = Memory.structures.lab4W4N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'black', font: 0.5 });
                var factory = Game.getObjectById(Memory.structures.factoryW4N28['id']);
                var factoryRes = Memory.structures.factoryW4N28['resource'];
                var factoryPrd = Memory.structures.factoryW4N28['prod'];
                break;
            case 'W5N28':
                var storage = Game.getObjectById(Memory.structures.storages.W5N28['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id4']);
                var terminalRes = Memory.structures.terminals['resource4'];
                var labM = Game.getObjectById(Memory.structures.labMW5N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W5N28['id']);
                var lab1Res = Memory.structures.lab1W5N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W5N28['id']);
                var lab2Res = Memory.structures.lab2W5N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W5N28['id']);
                var lab3Res = Memory.structures.lab3W5N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W5N28['id']);
                var lab4Res = Memory.structures.lab4W5N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'black', font: 0.5 });
                var factory = Game.getObjectById(Memory.structures.factoryW5N28['id']);
                var factoryRes = Memory.structures.factoryW5N28['resource'];
                var factoryPrd = Memory.structures.factoryW5N28['prod'];
                break;
            case 'W3N28':
                var storage = Game.getObjectById(Memory.structures.storages.W3N28['id']);
                var terminal = Game.getObjectById(Memory.structures.terminals['id5']);
                var terminalRes = Memory.structures.terminals['resource5'];
                var labM = Game.getObjectById(Memory.structures.labMW3N28['id']);
                var lab1 = Game.getObjectById(Memory.structures.lab1W3N28['id']);
                var lab1Res = Memory.structures.lab1W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab1Res, lab1.pos.x, lab1.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab2 = Game.getObjectById(Memory.structures.lab2W3N28['id']);
                var lab2Res = Memory.structures.lab2W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab2Res, lab2.pos.x, lab2.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab3 = Game.getObjectById(Memory.structures.lab3W3N28['id']);
                var lab3Res = Memory.structures.lab3W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab3Res, lab3.pos.x, lab3.pos.y + 0.1, { color: 'black', font: 0.5 });
                var lab4 = Game.getObjectById(Memory.structures.lab4W3N28['id']);
                var lab4Res = Memory.structures.lab4W3N28['resource'];
                Game.rooms[creep.memory.loc].visual.text(lab4Res, lab4.pos.x, lab4.pos.y + 0.1, { color: 'black', font: 0.5 });
                var factory = Game.getObjectById(Memory.structures.factoryW3N28['id']);
                var factoryRes = Memory.structures.factoryW3N28['resource'];
                var factoryPrd = Memory.structures.factoryW3N28['prod'];
                break;
            case 'W6N28':
                var storage = Game.getObjectById(Memory.structures.storages.W6N28['id']);
                break;
        }

        if (creep.memory.loc == 'W5N28') {
            for (let resourceType in storage.store) {
                if ((resourceType == 'ZH' || resourceType == 'UH' || resourceType == 'KO' || resourceType == 'GO') && storage.store[resourceType] >= 5) {
                    lab3Res = resourceType;
                    break;
                }
            }
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
        if (factory && factory.store[factoryRes] >= 500
            && (storage.store[factoryPrd] + terminal.store[factoryPrd]) * 5 < (storage.store[factoryRes] + terminal.store[factoryRes])) {
            var result = factory.produce(factoryPrd);
            // console.log(result);
        }
        else if (factory
            && (storage.store[factoryPrd] + terminal.store[factoryPrd] + 100) * 5 >= (storage.store[factoryRes] + terminal.store[factoryRes])
            && storage.store[RESOURCE_ENERGY] + terminal.store[RESOURCE_ENERGY] > 600000
            && storage.store[RESOURCE_BATTERY] + terminal.store[RESOURCE_ENERGY] < 30000) {
            var result = factory.produce(RESOURCE_BATTERY);
        }

        //----run terminal----
        if (terminal) {
            for (resourceType in terminal.store) {
                if (
                    (resourceType == 'ZH' || resourceType == 'UH' || resourceType == 'KO' || resourceType == 'GO' || resourceType == 'LO' 
                        || (resourceType == 'G' && terminal.store[resourceType] >= 50)
                    ) 
                    && terminal.room.name != 'W5N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W5N28');
                }
                else if ((resourceType == 'ZK' || resourceType == 'UL' || resourceType == 'O') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W2N27') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W2N27');
                }
                else if ((resourceType == RESOURCE_BATTERY) && terminal.store[resourceType] >= 500 && terminal.room.name != 'W2N27') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W2N27');
                }
                else if ((resourceType == 'U' || resourceType == 'L') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W1N27' && terminal.room.name != 'W6N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W1N27');
                }
                else if ((resourceType == 'Z' || resourceType == 'K') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W4N28' && terminal.room.name != 'W3N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W4N28');
                }
                else if ((resourceType == 'GH' || resourceType == 'OH') && terminal.store[resourceType] >= 50 && terminal.room.name != 'W3N28') {
                    terminal.send(resourceType, terminal.store[resourceType], 'W3N28');
                }
            }
        }

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                for (let resourceType of Object.keys(creep.store)) {
                    //----order exist----
                    if (order && resourceType == order.resourceType && terminal.store[resourceType] < tradeAmount) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    //----fill nuker----
                    else if (nuker && resourceType == RESOURCE_GHODIUM && nuker.store.getFreeCapacity(RESOURCE_GHODIUM) > 0) {
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
                    else if (terminal && resourceType == RESOURCE_ENERGY && terminal.store[resourceType] < 8000) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    //----fill labs----
                    else if (lab1 && lab3Res == '' && resourceType == lab1Res && lab1.store[resourceType] < 5) {
                        creep.memory.target = lab1.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab1: ' + resourceType);
                        break;
                    }
                    else if (lab2 && lab3Res == '' && resourceType == lab2Res && lab2.store[resourceType] < 5) {
                        creep.memory.target = lab2.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab2: ' + resourceType);
                        break;
                    }
                    else if (lab4 && resourceType == lab4Res && lab4.store[resourceType] < 1000) {
                        creep.memory.target = lab4.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab4: ' + resourceType);
                        break;
                    }
                    else if (lab3 && lab3Res != '' && resourceType == lab3Res && lab3.store[resourceType] < 5) {
                        creep.memory.target = lab3.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab3: ' + resourceType);
                        break;
                    }
                    else if (lab5 && lab7Res == '' && resourceType == lab5Res && lab5.store[resourceType] < 5) {
                        creep.memory.target = lab5.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab5: ' + resourceType);
                        break;
                    }
                    else if (lab6 && lab7Res == '' && resourceType == lab6Res && lab6.store[resourceType] < 5) {
                        creep.memory.target = lab6.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab6: ' + resourceType);
                        break;
                    }
                    else if (lab7 && lab7Res != '' && resourceType == lab7Res && lab7.store[resourceType] < 5) {
                        creep.memory.target = lab7.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to lab7: ' + resourceType);
                        break;
                    }
                    //----fill factory resource----
                    else if (factoryRes && resourceType == factoryRes && factory.store[resourceType] < 600
                        && (storage.store[factoryPrd] + terminal.store[factoryPrd]) * 5 < (storage.store[resourceType] + terminal.store[resourceType] + 100)) {
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
                    else if (factory && resourceType == RESOURCE_ENERGY && factory.store[resourceType] < 600) {
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
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
            if (!creep.memory.target) {
                if (storage) {  //----find resource from storage----
                    for (let resourceType in storage.store) { // 遍历所有资源
                        if (resourceType == lab1Res && lab1.store[resourceType] < 5 && lab3Res == '') { //----lab1 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab1: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab2Res && lab2.store[resourceType] < 5 && lab3Res == '') { //----lab2 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab2: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab4Res && lab4.store[resourceType] < 700) { //----lab4 need for boost----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab4: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab3Res && lab3.store[resourceType] < 5) { //----lab3 need for revert reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab3: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab5Res && lab5.store[resourceType] < 5 && lab7Res == '') { //----lab5 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab1: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab6Res && lab6.store[resourceType] < 5 && lab7Res == '') { //----lab6 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage to lab2: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab7Res && lab7.store[resourceType] < 5) { //----lab7 need for revert reaction----
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
                        else if (terminal && terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] < 10000) { //----terminal need for transfer----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage tt: ' + resourceType);
                            break;
                        }
                        else if (terminal && resourceType == RESOURCE_ENERGY && terminal.store[resourceType] < 8000) { //----terminal need energy for transfer----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage tte: ' + resourceType);
                            break;
                        }
                        else if (resourceType == factoryRes && factory.store[resourceType] < 600 && (storage.store[factoryPrd] + terminal.store[factoryPrd]) * 5 < (storage.store[factoryRes] + terminal.store[factoryRes])) { //----factory need for produce----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage tf: ' + resourceType);
                            break;
                        }
                        else if (factory && resourceType == RESOURCE_ENERGY && factory.store[resourceType] < 600) { //----factory need energy for produce----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage tfe: ' + resourceType);
                            break;
                        }
                        else if (order && resourceType == order.resourceType && terminal.store[order.resourceType] < tradeAmount) {
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from storage tto: ' + resourceType);
                            break;
                        }
                    }
                }
                if (terminal) {
                    for (let resourceType in terminal.store) {
                        if (order && resourceType != RESOURCE_ENERGY && resourceType != order.resourceType && !terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] > 0) { //----remove terminal resource not needed for trade----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from terminal: ' + resourceType);
                            break;
                        }
                        else if (!order && resourceType != RESOURCE_ENERGY && !terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] > 0) { //----remove terminal resource if no trade----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from terminal 2: ' + resourceType);
                            break;
                        }
                        else if (terminalRes.includes(' ' + resourceType + ' ') && terminal.store[resourceType] > 10200) { //----remove extra terminal resource----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from terminal res: ' + resourceType);
                            break;
                        }
                        else if (resourceType == RESOURCE_ENERGY && terminal.store[resourceType] > 8100) { //----remove extra terminal energy----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from terminal en: ' + resourceType);
                            break;
                        }
                    }
                }
                if (factory) {
                    for (let resourceType in factory.store) {
                        if (resourceType != factoryRes && resourceType != RESOURCE_ENERGY) { //----clear factory produced and other resource----
                            creep.memory.target = factory.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🧪A>> from factory: ' + resourceType);
                            break;
                        }
                    }
                }
                if (lab1 && lab1.mineralType && (lab3Res != '' || lab1.mineralType != lab1Res)) { //----revert reaction, clear lab1----
                    creep.memory.target = lab1.id;
                    creep.memory.targetResource = lab1.mineralType;
                    // console.log('🧪A>> from lab1: ' + lab1.mineralType);
                }
                else if (lab2 && lab2.mineralType && (lab3Res != '' || lab2.mineralType != lab2Res)) { //----revert reaction, clear lab2----
                    creep.memory.target = lab2.id;
                    creep.memory.targetResource = lab2.mineralType;
                    // console.log('🧪A>> from lab2: ' + lab2.mineralType);
                }
                else if (lab4 && lab4.mineralType && (lab4.mineralType != lab4Res || lab4.store[lab4Res] > 1100)) { //----clear lab4----
                    creep.memory.target = lab4.id;
                    creep.memory.targetResource = lab4.mineralType;
                    // console.log('🧪A>> from lab4: ' + lab4.mineralType);
                }
                else if (lab3 && lab3.mineralType && lab3.mineralType != lab3Res) { //----run reaction, clear lab3----
                    creep.memory.target = lab3.id;
                    creep.memory.targetResource = lab3.mineralType;
                    // console.log('🧪A>> from lab3: ' + lab3.mineralType);
                }
                else if (lab5 && lab5.mineralType && (lab7Res != '' || lab5.mineralType != lab5Res)) { //----revert reaction, clear lab5----
                    creep.memory.target = lab5.id;
                    creep.memory.targetResource = lab5.mineralType;
                    // console.log('🧪A>> from lab5: ' + lab5.mineralType);
                }
                else if (lab6 && lab6.mineralType && (lab7Res != '' || lab6.mineralType != lab6Res)) { //----revert reaction, clear lab6----
                    creep.memory.target = lab6.id;
                    creep.memory.targetResource = lab6.mineralType;
                    // console.log('🧪A>> from lab6: ' + lab6.mineralType);
                }
                else if (lab7 && lab7.mineralType && lab7.mineralType != lab7Res) { //----run reaction, clear lab7----
                    creep.memory.target = lab7.id;
                    creep.memory.targetResource = lab7.mineralType;
                    // console.log('🧪A>> from lab3: ' + lab3.mineralType);
                }
                else if (labM && labM.mineralType && labM.store[labM.mineralType] > 50) { //----clear labM----
                    creep.memory.target = labM.id;
                    creep.memory.targetResource = labM.mineralType;
                    // console.log('🧪A>> from labM: ' + labM.mineralType);
                }
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