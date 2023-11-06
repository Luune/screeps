var roleTransporter = {
    run: function (creep, roomName, sortedEnergys, tombstones, order) {
         // console.log('T>> dropped energy: '+sortedEnergys);
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            creep.say('🚛 loot');
        }
        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            creep.say('🚚 transport');
        }

        // var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var emptyExtensions = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION
                    || structure.structureType == STRUCTURE_SPAWN)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var emptyTowerLabs = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_TOWER
                    || structure.structureType == STRUCTURE_LAB)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 100)
                    || (structure.structureType == STRUCTURE_FACTORY
                        && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 200);
            }
        });
        var containersToFill = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var containersToLoot = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
            }
        });
        var linksToLoot = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500;
            }
        });
        var emptyStorage = Game.rooms[creep.memory.loc].storage;
        // var terminal1 = Game.getObjectById(Memory.structures.terminals['id1']);
        var terminal1 = Game.rooms[creep.memory.loc].terminal;
        if (terminal1) {
            var terminalEn = terminal1.store.getUsedCapacity(RESOURCE_ENERGY);
        }

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                delete creep.memory.targetResource;
                delete creep.memory.path;
                //----store minerals----
                for (var resourceType of Object.keys(creep.store)) {
                    // console.log('T>> carrying: ' + resourceType + ': ' + creep.store[resourceType]);
                    if (resourceType != RESOURCE_ENERGY) {
                        creep.memory.target = emptyStorage.id;
                        creep.memory.targetResource = resourceType;
                        console.log('🚚 T>> resources to storage: ' + emptyStorage.id);
                        break;
                    }
                    //----store energy----
                    else if (emptyExtensions.length > 0) {
                        //----fill extension----
                        emptyExtensions.sort((a, b) => {
                            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                        });
                        creep.memory.target = emptyExtensions[0].id;
                        creep.memory.targetResource = resourceType;
                        console.log('🚚 T>> to extension: ' + emptyExtensions[0].id);
                        break;
                    }
                    //----fill tower/lab/factory----
                    else if (emptyTowerLabs.length > 0) {
                        let nearTL = creep.pos.findClosestByRange(emptyTowerLabs);
                        if (nearTL) {
                            creep.memory.target = nearTL.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('T>> to tower/lab: ' + target.id);
                            break;
                        }
                    }
                    //----trade cost----
                    else if (terminalEn < 5000 && terminal1.room.name == creep.memory.loc) {
                        creep.memory.target = terminal1.id;
                        creep.memory.targetResource = resourceType;
                        console.log('🚚 T>> to terminal EN: ' + terminal1.id);
                        break;
                    }
                    //----fill container----
                    else if (containersToFill.length > 0) {
                        creep.memory.target = _.min(containersToFill, container => container.store[RESOURCE_ENERGY]).id;
                        creep.memory.targetResource = resourceType;
                        console.log('T>> to this room container: ' + creep.memory.target);
                        break;
                    }
                    //----fill storage----
                    else if (emptyStorage) {
                        // creep.memorytarget = creep.pos.findClosestByRange(emptyStorages).id;
                        creep.memory.target = emptyStorage.id;
                        creep.memory.targetResource = resourceType;
                        // console.log('T>> to storage: ' + target.id);
                        break;
                    }
                }
            }

            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target) {
                var result = creep.transfer(target, targetResource);
                // console.log('🚚 T>> ' + creep.name + ' to ' + target.id + ' ' + targetResource + ' ' + result);
                if (creep.transfer(target, targetResource) == ERR_NOT_IN_RANGE) {
                    // if (!creep.memory.path) {
                    //     creep.memory.path = creep.pos.findPathTo(target);
                    // }
                    // else {
                    //     // 获取creep的路线
                    //     let path = creep.memory.path;
                    //     // 获取下一步位置
                    //     let nextStep = new RoomPosition(path[0].x, path[0].y, roomName);
                    //     // 在下一步位置查找所有对象
                    //     let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                    //     if (objects.length > 0) {
                    //         delete creep.memory.path;
                    //     }
                    // }
                    // creep.moveByPath(creep.memory.path);
                    creep.moveTo(target, {reusePath: 5, visualizePathStyle: { stroke: '#00ff00' }});
                    creep.say('🚚 ' + target.pos.x + ',' + target.pos.y);
                }
                else {
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
            }
        }
        //----loot----
        else {
            if (!creep.memory.target) {
                delete creep.memory.targetResource;
                delete creep.memory.path;
                //----pick biggest drop----
                if (sortedEnergys.length > 0) {
                    // let bigdrop = _.sortBy(sortedEnergys, s => -s.amount)[0];
                    let bigdrop = creep.pos.findClosestByPath(sortedEnergys);
                    if (bigdrop && bigdrop.amount > creep.pos.findPathTo(bigdrop).length) {
                        // console.log('🚛 T>> from drop ' + bigdrop.id);
                        creep.memory.target = bigdrop.id;
                        creep.memory.targetResource = ' ';
                    }
                }
                //----pick tomb----
                else if (tombstones.length > 0) {
                    // console.log('🚛 T>> from tomb: ' + tombstones[0].id);
                    for (let resourceType in tombstones[0].store) {
                        creep.memory.target = tombstones[0].id;
                        creep.memory.targetResource = resourceType;
                    }
                }
                //----pick link----
                else if (linksToLoot.length > 0) {
                    let nearLink = creep.pos.findClosestByPath(linksToLoot);
                    if (nearLink) {
                        creep.memory.target = nearLink.id;
                        creep.memory.targetResource = RESOURCE_ENERGY;
                    }
                }
                //----pick container----
                else if (containersToLoot.length > 0) {
                    let maxContainer = _.max(containersToLoot, container => container.store[RESOURCE_ENERGY]);
                    if (maxContainer) {
                        creep.memory.target = maxContainer.id;
                        creep.memory.targetResource = RESOURCE_ENERGY;
                        // console.log('🚛 T>> from container ' + maxContainer.id);
                    }
                }
                //----pick terminal extra energy----
                else if (terminalEn > 5300) {
                    creep.memory.target = terminal1.id;
                    creep.memory.targetResource = RESOURCE_ENERGY;
                }
                // //----没得捡了就存掉----
                // else if (creep.store.getFreeCapacity(RESOURCE_ENERGY) < creep.store.getCapacity() / 2) {
                //     creep.memory.transporting = true;
                //     creep.say('🚛 transport');
                // }
            }
            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target) {
                // console.log('🚛 T>> ' + creep.name + ' from ' + creep.memory.target + ' ' + targetResource);
                if (creep.withdraw(target, targetResource) == ERR_NOT_IN_RANGE || creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // if (!creep.memory.path) {
                    //     creep.memory.path = creep.pos.findPathTo(target);
                    // }
                    // else {
                    //     // 获取creep的路线
                    //     let path = creep.memory.path;
                    //     // 获取下一步位置
                    //     let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                    //     // 在下一步位置查找所有对象
                    //     let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                    //     if (objects.length > 0) {
                    //         delete creep.memory.path;
                    //     }
                    // }
                    // creep.moveByPath(creep.memory.path);
                    creep.moveTo(target, {reusePath: 5, visualizePathStyle: { stroke: '#00ff00' }});
                    creep.say('🚛' + target.pos.x + ',' + target.pos.y);
                }
                else {
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
            }
            else {
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
        }
    }
};

module.exports = roleTransporter;
