/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep, roomName, enAvail, storageStorage, dismantleTargetId) {
        //----set status----
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 reload');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        //----action----
        if (creep.room.name != creep.memory.loc) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20, visualizePathStyle: { stroke: '#0099ff' } });
        }
        else if (creep.memory.building) {
            //----build----
            var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                }
            }

            //----do some repair when free----
            else { //----fill tower----
                let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 100;
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                        creep.say('🚧 BtT');
                    }
                }
                else { //----fix----
                    let damagedStructures = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_TOWER ||
                                (structure.structureType == STRUCTURE_RAMPART && structure.hits < ((structure.room.controller.level * 10000) + storageStorage * 10)) ||
                                structure.structureType == STRUCTURE_LINK ||
                                structure.structureType == STRUCTURE_ROAD ||
                                (structure.structureType == STRUCTURE_WALL && structure.hits < ((structure.room.controller.level * 10000) + storageStorage * 10))) &&
                                structure.hits < structure.hitsMax;
                        }
                    });
                    let target = _.sortBy(damagedStructures, s => s.hits)[0];
                    if (target) {
                        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                            creep.say('🛠️ fix');
                        }
                    }
                }
            }
        }
        //----find energy----
        else {
            if (dismantleTargetId != '') {
                var target = Game.getObjectById(dismantleTargetId);
            }
            else {
                let hosTarget = Game.rooms[creep.memory.loc].find(FIND_HOSTILE_STRUCTURES);
                var target = creep.pos.findClosestByPath(hosTarget);
            }
            if (target && target.room.name == creep.memory.loc) {
                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                }
            }
            else {
                target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (resource) => {
                        return (resource.resourceType == RESOURCE_ENERGY)
                            && (resource.amount > creep.pos.findPathTo(resource).length * 2);
                    }
                });
                if (target) {
                    // console.log('U>> loot: ' + target);
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                        creep.say('🚧E:' + target.amount)
                    }
                }
                else {
                    //----pick from container----
                    let containers = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER
                                || structure.structureType == STRUCTURE_LINK)
                                && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
                        }
                    });
                    if (containers.length > 0) {
                        let target = creep.pos.findClosestByPath(containers);
                        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                            creep.say('🚧C:' + target.pos.x + ',' + target.pos.y);
                        }
                    }
                    else {
                        //----pick from storage----
                        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] > 0;
                            }
                        });
                        if (target) {
                            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                                creep.say('🚧S:' + target.pos.x + ',' + target.pos.y);
                            }
                        }
                        else { //----harvest by self----
                            let target = creep.pos.findClosestByPath(FIND_SOURCES);
                            console.log('🚧 B>> harvest: ' + target);
                            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#0099ff' } });
                                creep.say('🚧B>harv');
                            }
                        }
                    }
                }
            } //----dismantle temp disable
        }
    }
};

module.exports = roleBuilder;