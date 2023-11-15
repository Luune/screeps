// var consData = require('cons.Data');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, sources) {
        //set job
        if (creep.memory.discharging && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.discharging = false;
            creep.say('⛏️ harvest');
        }
        if (!creep.memory.discharging && creep.store.getFreeCapacity() == 0) {
            creep.memory.discharging = true;
            creep.say('🈵 unload');
        }
        //sign working slot
        if (!creep.memory.workingSlot) {
            for (let source of sources) {
                let harvesterOnS = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == source.id && creep.memory.role == 'harvester');
                let totalWorkParts = _.sum(_.map(harvesterOnS, (creep) => creep.body.filter((part) => part.type === WORK).length));
                console.log('⛏️ H>> Source:' + source.id + ',assigned:' + harvesterOnS + ',' + totalWorkParts);
                if (totalWorkParts < 5) {
                    creep.memory.workingSlot = source.id;
                    // break;
                }
            }
        }

        var link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    && creep.pos.inRangeTo(structure, 2));
            }
        });

        //----action----
        if (creep.room.name != creep.memory.loc) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20, visualizePathStyle: { stroke: '#ffffff' } });
        } else {
            //discharge
            if (creep.memory.discharging) {
                //----fix container besides source----
                let damagedStructures = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.hits < structure.hitsMax;
                    }
                });
                let contain = creep.pos.findClosestByRange(damagedStructures);

                if (contain) {
                    if (creep.repair(contain) == ERR_NOT_IN_RANGE) { }
                }
                //---- store to link----
                if (link) {
                    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else { //----store energy----
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (((structure.structureType == STRUCTURE_EXTENSION
                                || structure.structureType == STRUCTURE_SPAWN
                                || structure.structureType == STRUCTURE_STORAGE
                                || structure.structureType == STRUCTURE_TOWER)
                                && structure.my)
                                || structure.structureType == STRUCTURE_CONTAINER)
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    })
                }
                // console.log('H>> discharge target:'+target);
                //----drop or store energy----
                if (target) {
                    let wayToDischarge = creep.pos.getRangeTo(target);
                    let wayToHarvest = creep.pos.getRangeTo(Game.getObjectById(creep.memory.workingSlot));
                    creep.say('⛏️ S:' + wayToDischarge + 'W:' + wayToHarvest);
                    if (wayToDischarge >= wayToHarvest && wayToHarvest > 3) {
                        creep.drop(RESOURCE_ENERGY);
                        creep.memory.discharging = false;
                        creep.say('⛏️ harvest');
                    } else {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
                else {
                    creep.drop(RESOURCE_ENERGY);
                    creep.memory.discharging = false;
                    creep.say('⛏️ harvest');
                }
            }
            //----harvest----
            else {
                var target = Game.getObjectById(creep.memory.workingSlot);
                // var target2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_CONTAINER) &&
                //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //     }
                // });

                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }

                // if(link.store.getFreeCapacity(RESOURCE_ENERGY)>0){
                //     if (creep.transfer(link, RESOURCE_ENERGY) == (ERR_NOT_IN_RANGE || ERR_FULL)){}
                // } else if (target2.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                //     if (creep.transfer(target2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){}
                // }
                // if (creep.transfer(target2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { };
                if (creep.transfer(link, RESOURCE_ENERGY) == (ERR_NOT_IN_RANGE || ERR_FULL)) { };

            }
        }
    }
};

module.exports = roleHarvester;