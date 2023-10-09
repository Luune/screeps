// var consData = require('cons.Data');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, sources) {
        //set job
        if (creep.memory.discharging && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.discharging = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.discharging && creep.store.getFreeCapacity() == 0) {
            creep.memory.discharging = true;
            creep.say('🚧 unload');
        }
        //sign working slot
        if (!creep.memory.workingSlot) {
            for (source of sources) {
                let harvesterOnS = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == source.id && creep.memory.role == 'harvester');
                let totalWorkParts = _.sum(_.map(harvesterOnS, (creep) => creep.body.filter((part) => part.type === WORK).length));
                console.log('H>> Source:' + source.id + ',assigned:' + harvesterOnS + ',' + totalWorkParts);
                if (totalWorkParts < 5) {
                    creep.memory.workingSlot = source.id;
                    // break;
                }
            }
        }

        var link = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    && creep.pos.getRangeTo(structure) <= 2);
            }
        });

        if (creep.room.name != roomName) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20 });
        } else {
            //discharge
            if (creep.memory.discharging) {
                //---- store to link----
                
                if (link) {
                    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else { //----store energy exclude tower----
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    })
                }
                // console.log('H>> discharge target:'+target);
                //----drop or store energy----
                if (target) {
                    let wayToDischarge = creep.pos.findPathTo(target);
                    let wayToHarvest = creep.pos.findPathTo(Game.getObjectById(creep.memory.workingSlot));
                    creep.say('S:' + wayToDischarge.length + 'W:' + wayToHarvest.length);
                    if (wayToDischarge.length > wayToHarvest.length + 1 && wayToHarvest.length >= 3) {
                        creep.drop(RESOURCE_ENERGY);
                        creep.memory.discharging = false;
                        creep.say('🔄 harvest');
                    } else {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
            //----harvest----
            else {
                var target = Game.getObjectById(creep.memory.workingSlot);
                var target2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                
                // if(link.store.getFreeCapacity(RESOURCE_ENERGY)>0){
                //     if (creep.transfer(link, RESOURCE_ENERGY) == (ERR_NOT_IN_RANGE || ERR_FULL)){}
                // } else if (target2.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                //     if (creep.transfer(target2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){}
                // }
                if (creep.transfer(target2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {};
                if (creep.transfer(link, RESOURCE_ENERGY) == (ERR_NOT_IN_RANGE || ERR_FULL)) {};
                
            }
        }
    }
};

module.exports = roleHarvester;