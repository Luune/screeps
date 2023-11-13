/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.alchemist');
 * mod.thing == 'a thing'; // true
 */

var roleAlchemist = {
    run: function (creep, roomName, order, tradeAmount, tradeCost) {
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            creep.say('🧪 loot');
        }
        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            creep.say('⚗️ send');
        }
        
        // console.log('A>> ' + order.resourceType + ' ' + order.remainingAmount );
        //----set labs----
        if (creep.memory.loc == 'W2N27') {
            var lab1 = Game.getObjectById(Memory.structures.lab1.id);
            var lab1Res = Memory.structures.lab1.resource;
            var lab2 = Game.getObjectById(Memory.structures.lab2.id);
            var lab2Res = Memory.structures.lab2.resource;
            var lab3 = Game.getObjectById(Memory.structures.lab3.id);
            var lab3Res = Memory.structures.lab3.resource;
            var labM = Game.getObjectById(Memory.structures.labM.id);
            var terminal = Game.getObjectById(Memory.structures.terminals['id1']);
            var terminalRes = Memory.structures.terminals['resource1'];
            var storage = Game.getObjectById(Memory.structures.storages['id1']);
            var factory = Game.getObjectById(Memory.structures.factory1.id);
            var factoryRes = Memory.structures.factory1.resource;
            var factoryPrd = Memory.structures.factory1.prod;
        }
        else if (creep.memory.loc == 'W1N27') {
            var terminal = Game.getObjectById(Memory.structures.terminals['id2']);
            var terminalRes = Memory.structures.terminals['resource2'];
            var storage = Game.getObjectById(Memory.structures.storages['id2']);
            var labM = Game.getObjectById(Memory.structures.labMb.id);
        }
        else if (creep.memory.loc == 'W4N28') {
            var terminal = Game.getObjectById(Memory.structures.terminals['id3']);
            var terminalRes = Memory.structures.terminals['resource3'];
            var storage = Game.getObjectById(Memory.structures.storages['id3']);
            var labM = Game.getObjectById(Memory.structures.labMc.id);
        }

        //----run labs----
        if (lab3) {
            if (lab3Res == '') {
                lab3.runReaction(lab1, lab2);
            }
            else {
                lab3.reverseReaction(lab1, lab2);
            }
        }
        //----run factory---
        if (factory) { //&& factory.store[Memory.structures.factory1.resource] >= 500 && factory.store[RESOURCE_ENERGY] >= 200
            var result = factory.produce(factoryPrd);
            // console.log(result);
        }

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                for (var resourceType of Object.keys(creep.store)) {
                    //----order exist----
                    if (order && resourceType == order.resourceType && terminal.store[resourceType] < tradeAmount) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    //----fill labs----
                    else if (lab3Res == '' && resourceType == lab1Res && lab1.store[resourceType] < 50) {
                        creep.memory.target = lab1.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to lab1: ' + resourceType);
                        break;
                    }
                    else if (lab3Res == '' && resourceType == lab2Res && lab2.store[resourceType] < 50) {
                        creep.memory.target = lab2.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to lab2: ' + resourceType);
                        break;
                    }
                    else if (lab3Res != '' && resourceType == lab3Res && lab3.store[resourceType] < 50) {
                        creep.memory.target = lab3.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to lab3: ' + resourceType);
                        break;
                    }
                    //----fill terminal transfer----
                    else if (terminalRes && resourceType == terminalRes && terminal.store[resourceType] < 10000) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    else if (terminal && resourceType == RESOURCE_ENERGY && terminal.store[resourceType] < 8000) {
                        creep.memory.target = terminal.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to terminal: ' + resourceType);
                        break;
                    }
                    //----fill factory resource----
                    else if (factoryRes && resourceType == factoryRes && factory.store[resourceType] < 600) {
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
                    else if (factory && resourceType == RESOURCE_ENERGY && factory.store[resourceType] < 200) {
                        creep.memory.target = factory.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to factory: ' + resourceType);
                        break;
                    }
                    //----to storage----
                    else {
                        creep.memory.target = storage.id;
                        creep.memory.targetResource = resourceType;
                        console.log('⚗️ A>> to storage: ' + resourceType);
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
                if (result== ERR_NOT_IN_RANGE) {
                    if (!creep.memory.path) {
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                    // creep.moveTo(target, { visualizePathStyle: { stroke: '#ffeb0b' } });
                    creep.moveByPath(creep.memory.path);
                    creep.say('⚗️>' + target.pos.x + ',' + target.pos.y);
                    if (creep.memory.path) {
                        // 获取creep的路线
                        var path = creep.memory.path;
                        // 获取下一步位置
                        var nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                        // 在下一步位置查找所有对象
                        var objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                        if (objects.length > 0) {
                            delete creep.memory.path;
                        }
                    }
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
                        if (resourceType == lab1Res && lab1.store[resourceType] < 30 && lab3Res == '') { //----lab1 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage to lab1: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab2Res && lab2.store[resourceType] < 30 && lab3Res == '') { //----lab2 need for reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage to lab2: ' + resourceType);
                            break;
                        }
                        else if (resourceType == lab3Res && lab3.store[resourceType] < 30) { //----lab3 need for revert reaction----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage to lab3: ' + resourceType);
                            break;
                        }
                        else if (resourceType == terminalRes && terminal.store[resourceType] < 10000) { //----terminal need for transfer----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage tt: ' + resourceType);
                            break;
                        }
                        else if (terminal && resourceType == RESOURCE_ENERGY && terminal.store[resourceType] < 8000) { //----terminal need energy for transfer----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage tte: ' + resourceType);
                            break;
                        }
                        else if (resourceType == factoryRes && factory.store[resourceType] < 600 && (storage.store[factoryPrd] + terminal.store[factoryPrd]) < (storage.store[factoryRes] + terminal.store[factoryRes])/10) { //----factory need for produce----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage tf: ' + resourceType);
                            break;
                        }
                        else if (factory && resourceType == RESOURCE_ENERGY && factory.store[resourceType] < 200) { //----factory need energy for produce----
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage tfe: ' + resourceType);
                            break;
                        }
                        else if (order && resourceType == order.resourceType && terminal.store[order.resourceType] < tradeAmount) {
                            creep.memory.target = storage.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from storage tto: ' + resourceType);
                            break;
                        }
                    }
                }
                if (lab1 && lab1.mineralType && lab3Res != '') { //----revert reaction, clear lab1----
                    creep.memory.target = lab1.id;
                    creep.memory.targetResource = lab1.mineralType;
                    console.log('🧪A>> from lab1: ' + lab1.mineralType);
                    // break;
                }
                else if (lab2 && lab2.mineralType && lab3Res != '') { //----revert reaction, clear lab2----
                    creep.memory.target = lab2.id;
                    creep.memory.targetResource = lab2.mineralType;
                    console.log('🧪A>> from lab2: ' + lab2.mineralType);
                    // break;
                }
                else if (lab3 && lab3.mineralType && lab3.mineralType != lab3Res) { //----run reaction, clear lab3----
                    creep.memory.target = lab3.id;
                    creep.memory.targetResource = lab3.mineralType;
                    console.log('🧪A>> from lab3: ' + lab3.mineralType);
                    // break;
                }
                else if (labM && labM.mineralType) { //----clear labM----
                    creep.memory.target = labM.id;
                    creep.memory.targetResource = labM.mineralType;
                    console.log('🧪A>> from labM: ' + labM.mineralType);
                    // break;
                }
                if (terminal) {
                    for (let resourceType in terminal.store) {
                        if (order && resourceType != RESOURCE_ENERGY && resourceType != order.resourceType && resourceType != terminalRes && terminal.store[resourceType] > 0) { //----remove terminal resource not needed for trade----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from terminal: ' + resourceType);
                            break;
                        }
                        else if (!order && resourceType != RESOURCE_ENERGY && resourceType != terminalRes && terminal.store[resourceType] > 0) { //----remove terminal resource if no trade----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from terminal 2: ' + resourceType);
                            break;
                        }
                        else if (resourceType == terminalRes && terminal.store[resourceType] > 10100) { //----remove extra terminal resource----
                            creep.memory.target = terminal.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from terminal 2: ' + resourceType);
                            break;
                        }
                    }
                }
                if (factory) {
                    for (let resourceType in factory.store) {
                        if (resourceType != factoryRes && resourceType != RESOURCE_ENERGY) { //----clear factory produced and other resource----
                            creep.memory.target = factory.id;
                            creep.memory.targetResource = resourceType;
                            console.log('🧪A>> from factory: ' + resourceType);
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
                    creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30, visualizePathStyle: { stroke: '#ffeb0b' } });
                } else {
                    let result = creep.withdraw(target, targetResource);
                    if (result == ERR_NOT_IN_RANGE) {
                        if (!creep.memory.path) {
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        // creep.moveTo(target, { reusePath: 3, visualizePathStyle: { stroke: '#ffeb0b' } });
                        creep.moveByPath(creep.memory.path);
                        creep.say('🧪>' + target.pos.x + ',' + target.pos.y);
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
                creep.say('⚗️ send');
            }
        }
    }
};

module.exports = roleAlchemist;