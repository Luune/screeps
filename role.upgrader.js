/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, enAvail, storageStorage) {
        //---set status----
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 reload');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        //----action----
        if (creep.memory.loc != creep.room.name) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20, visualizePathStyle: { stroke: '#ff3300' } });
        } else {
            if (creep.memory.upgrading) { //----upgrade----
                if (creep.memory.target != Game.rooms[creep.memory.loc].controller.id) {
                    creep.memory.target = Game.rooms[creep.memory.loc].controller.id;
                    delete creep.memory.path;
                }
                else if (creep.upgradeController(Game.rooms[creep.memory.loc].controller) == ERR_NOT_IN_RANGE) {
                    if (!creep.memory.path) {
                        creep.memory.path = creep.pos.findPathTo(Game.rooms[creep.memory.loc].controller);
                    } else {
                        creep.moveByPath(creep.memory.path);
                    }
                }
            }
            //----find energy----
            else {
                if (creep.memory.target == Game.rooms[creep.memory.loc].controller.id) {
                    delete creep.memory.target;
                    delete creep.memory.path;
                }
                //----pick from link/container/storage----
                let targets = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_LINK) &&
                            structure.store[RESOURCE_ENERGY] > 0)
                            || ((structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store[RESOURCE_ENERGY] > 0)
                            || ((structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store[RESOURCE_ENERGY] >= 50);
                    }
                });
                if (targets.length > 0) {
                    var target = creep.pos.findClosestByPath(targets);
                    // console.log('U>> pick from link: ' + target);
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        if (!creep.memory.path) {
                            creep.memory.path = creep.pos.findPathTo(target);
                        } else {
                            creep.moveByPath(creep.memory.path);
                        }
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
                    else {
                        delete creep.memory.target;
                        delete creep.memory.path;
                    }
                }
                else {
                    //----loot----
                    target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                        filter: (resource) => {
                            return (resource.resourceType == RESOURCE_ENERGY)
                                && (resource.amount >= 10);
                        }
                    });
                    if (target) {
                        // console.log('U>> loot: ' + target);
                        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            if (!creep.memory.path) {
                                creep.memory.path = creep.pos.findPathTo(target);
                            } else {
                                creep.moveByPath(creep.memory.path);
                                creep.say('⚡ E:' + target.amount);
                            }
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
                        else {
                            delete creep.memory.path;
                        }
                    }
                    else {
                        //----harvest by self----
                        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        // console.log('U>> harvest: ' + target);
                        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                            if (!creep.memory.path) {
                                creep.memory.path = creep.pos.findPathTo(target);
                            } else {
                                creep.moveByPath(creep.memory.path);
                            }
                        }
                        else {
                            delete creep.memory.path;
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;