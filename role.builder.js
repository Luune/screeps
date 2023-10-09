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
    run: function (creep, roomName, enAvail, storageStorage) {
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
        if (creep.room.name != roomName) {
            creep.moveTo(new RoomPosition(25, 25, roomName), { reusePath: 20, visualizePathStyle: { stroke: '#00aaff' } });
        } else {
            if (creep.memory.building) {
                //----build----
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
                    }
                }

                //----do some repair when free----
                else { //----fill tower----
                    let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER)
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 40;
                        }
                    });
                    if (target) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
                            creep.say('BtT');
                        }
                    }
                    else { //----fix----
                        let damagedStructures = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_ROAD ||
                                    structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                    (structure.structureType == STRUCTURE_RAMPART && structure.hits < 10000000) ||
                                    structure.structureType == STRUCTURE_LINK ||
                                    (structure.structureType == STRUCTURE_WALL && structure.hits < 5000)) &&
                                    structure.hits < structure.hitsMax;
                            }
                        });
                        let target = _.sortBy(damagedStructures, s => s.hits)[0];
                        if (target) {
                            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
                                creep.say('fix');
                            }
                        }
                    }
                }
            }
            //----harvest(find energy)----
            else {
                //----pick from container----
                let containers = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                            && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 100;
                    }
                });
                if (containers.length > 0) {
                    let maxContainer = _.max(containers, container => container.store[RESOURCE_ENERGY]);
                    if (creep.withdraw(maxContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(maxContainer, { visualizePathStyle: { stroke: '#00aaff' }
                        });
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
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
                        }
                    }
                    else { //----harvest by self----
                        let target = creep.pos.findClosestByPath(FIND_SOURCES);
                        console.log('B>> harvest: ' + target);
                        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;