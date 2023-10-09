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
    run: function (creep, enAvail, storageStorage) {
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

        if (creep.memory.upgrading) { //----upgrade----
            if (creep.memory.loc != creep.room.name) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20 });
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
        }
        //----harvest(find energy)----
        else {
            //----pick from link----
            let links = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_LINK) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (links.length > 0) {
                var target = creep.pos.findClosestByPath(links);
                // console.log('U>> pick from link: ' + target);
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                }
            }
            else {
                let links = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50)
                            || (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
                    }
                });
                if (links.length > 0) {
                    var target = creep.pos.findClosestByPath(links);
                    // console.log('U>> pick from link: ' + target);
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
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
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                            creep.say('⚡ E:' + target.amount)
                        }
                    }
                    else { //----harvest by self----
                        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        // console.log('U>> harvest: ' + target);
                        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;