var roleTransporter = {
    run: function (creep, roomName, sortedEnergys, tombstones, order) {
        // console.log('T>> dropped energy: '+sortedEnergys);
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            creep.say('🔄 loot');
        }
        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            creep.say('🚚 transport');
        }
        // var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var terminal1 = Game.getObjectById(Memory.structures.terminals['id0']);
        var terminalEn = terminal1.store.getUsedCapacity(RESOURCE_ENERGY);
        var storage1 = Game.getObjectById(Memory.structures.storages['id0']);

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                //----store minerals----
                for (var resourceType of Object.keys(creep.store)) {
                    // console.log('T>> carrying: ' + resourceType + ': ' + creep.store[resourceType]);
                    if (resourceType != RESOURCE_ENERGY) {
                        creep.memory.target = Memory.structures.storages['id0'];
                        creep.memory.resource = resourceType;
                        console.log('T>> mines to storage: ' + Memory.structures.storages['id0']);
                        break;
                    }
                    else { //----store energy----
                        //----fill extension----
                        var emptyExtensions = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION
                                    || structure.structureType == STRUCTURE_SPAWN)
                                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                            }
                        });
                        if (emptyExtensions.length > 0) {
                            emptyExtensions.sort((a, b) => {
                                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                            });
                            creep.memory.target = emptyExtensions[0].id;
                            creep.memory.resource = resourceType;
                            console.log('T>> to extension: ' + emptyExtensions[0].id);
                            break;
                        }
                        else if (terminalEn < 2000) { //----trade cost----
                            creep.memory.target = terminal1.id;
                            creep.memory.resource = resourceType;
                            console.log('T>> to terminal EN: ' + terminal1.id);
                            break;
                        }
                        else {
                            //----fill tower/lab----
                            var emptyTowerLabs = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_TOWER
                                        || structure.structureType == STRUCTURE_LAB)
                                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 90;
                                }
                            });
                            if (emptyTowerLabs.length > 0) {
                                creep.memory.target = creep.pos.findClosestByRange(emptyTowerLabs).id;
                                creep.memory.resource = resourceType;
                                // console.log('T>> to tower/lab: ' + target.id);
                                break;
                            }
                            else { //----fill container----
                                let containers = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return structure.structureType == STRUCTURE_CONTAINER
                                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200;
                                    }
                                });
                                if (containers.length > 0) {
                                    creep.memory.target = _.min(containers, container => container.store[RESOURCE_ENERGY]).id;
                                    creep.memory.resource = resourceType;
                                    // console.log('T>> to this room container: ' + target.id);
                                    break;
                                }
                                // else { //----fill other room container----
                                //     let myRooms = _.filter(Game.rooms, room => room.controller && room.controller.my);
                                //     let containersOther = [];
                                //     myRooms.forEach(room => {
                                //         var roomContainers = room.find(FIND_STRUCTURES, {
                                //             filter: (structure) => {
                                //                 return structure.structureType == STRUCTURE_CONTAINER
                                //                     && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 100;
                                //             }
                                //         });
                                //         containersOther.push(...roomContainers);
                                //     });
                                //     if (containersOther.length > 0) {
                                //         var target = _.min(containersOther, container => container.store[RESOURCE_ENERGY]);
                                //         console.log('T>> to other room container: ' + target.id);
                                //     }
                                else { //----fill storage----
                                    var emptyStorages = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                                        filter: (structure) => {
                                            return (structure.structureType == STRUCTURE_STORAGE)
                                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                        }
                                    });
                                    if (emptyStorages.length > 0) {
                                        creep.memorytarget = creep.pos.findClosestByRange(emptyStorages).id;
                                        creep.memory.resource = resourceType;
                                        // console.log('T>> to storage: ' + target.id);
                                        break;
                                    }
                                    else {
                                        creep.memory.target = Memory.structures.storages['id0'];
                                        creep.memory.resource = resourceType;
                                        // console.log('T>> to storage 1: ' + target.id);
                                        break;
                                    }
                                }
                                // }
                            }
                        }
                    }
                }
            }
            // else {
                var target = Game.getObjectById(creep.memory.target);
                var resource = creep.memory.resource;
            // }
            if (target) {
                // console.log('T>> to : ' + target.id);
                // if (target.room != creep.room) {
                //     creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                // } else
                var result = creep.transfer(target, resource);
                console.log(result + ' ' + target.id + ' ' + resource);
                if (creep.transfer(target, resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: creep.pos.findPathTo(target), visualizePathStyle: { stroke: '#00ff00' } });
                    // creep.say('🚚T:' + resourceType.amount);
                }
                else {
                    creep.memory.target = false;

                }
            }
        }
        //----loot----
        else {
            if (sortedEnergys.length > 0) { //----pick biggest drop----
                let bigdrop = _.sortBy(sortedEnergys, s => -s.amount)[0];
                console.log('T>> from drop ' + bigdrop.id);
                if (bigdrop.room != creep.room) {
                    creep.moveTo(new RoomPosition(25, 25, bigdrop.room.name), { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                } else if (creep.pickup(bigdrop) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(bigdrop, { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                    creep.say('🚚E:' + bigdrop.amount);
                }
            }
            else if (tombstones.length > 0) { //----pick tomb----
                console.log('T>> from tomb: ' + tombstones[0].id);
                for (let resourceType in tombstones[0].store) {
                    if (tombstones[0].room != creep.room) {
                        creep.moveTo(new RoomPosition(25, 25, tombstones[0].room.name), { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                    } else if (creep.withdraw(tombstones[0], resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstones[0], { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                        // creep.say('🚚T:' + resourceType.amount);
                    }
                }
            }
            else {
                //----pick resources from terminal----
                let terminal = Game.rooms[creep.memory.loc].terminal;
                if (terminal) {
                    for (let resourceType in terminal.store) {
                        if (order && resourceType !== RESOURCE_ENERGY && terminal.store[resourceType] > 0 && resourceType != order.resourceType) {
                            console.log(`房间 ${creep.memory.loc} 的 terminal 中有 ${terminal.store[resourceType]} 个 ${resourceType}`);
                            var target = terminal;
                            var targetResource = resourceType;
                        }
                        else if (!order && resourceType !== RESOURCE_ENERGY && terminal.store[resourceType] > 0) {
                            console.log(`房间 ${creep.memory.loc} 的 terminal 中有 ${terminal.store[resourceType]} 个 ${resourceType}`);
                            var target = terminal;
                            var targetResource = resourceType;
                        }
                    }
                }
                if (target) {
                    if (target.room != creep.room) {
                        creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                    } else if (creep.withdraw(target, targetResource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                    }
                }
                else {
                    //----pick container----
                    let containers = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                                && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
                        }
                    });
                    if (containers.length > 0) {
                        let maxContainer = _.max(containers, container => container.store[RESOURCE_ENERGY]);
                        console.log('T>> from container ' + maxContainer.id);
                        if (maxContainer.room != creep.room) {
                            creep.moveTo(new RoomPosition(25, 25, maxContainer.room.name), { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                        } else if (creep.withdraw(maxContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(maxContainer, { reusePath: 3, visualizePathStyle: { stroke: '#00ff00' } });
                        }
                    }
                    else {
                        if (creep.store.getUsedCapacity() > 0) {
                            creep.memory.transporting = true;
                            creep.say('🚚 transport');
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleTransporter;
