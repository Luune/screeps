/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, minerals) {
        //set job
        if (creep.memory.discharging && creep.store.getUsedCapacity() == 0) {
            creep.memory.discharging = false;
            creep.say('🔄 mining');
        }
        if (!creep.memory.discharging && creep.store.getFreeCapacity() == 0) {
            creep.memory.discharging = true;
            creep.say('🚧 unload');
        }
        //sign working slot
        if (!creep.memory.workingSlot) {
            for (let mineral of minerals) {
                let minerOnMineral = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == mineral.id && creep.memory.role == 'miner');
                let totalWorkParts = _.sum(_.map(minerOnMineral, (creep) => creep.body.filter((part) => part.type === WORK).length));
                console.log('H>> Mineral:' + mineral.id + ',assigned:' + minerOnMineral + ',' + totalWorkParts);
                if (totalWorkParts < 5) {
                    creep.memory.workingSlot = mineral.id;
                    creep.memory.miningType = mineral.mineralType;
                    // break;
                }
            }
        }

        //discharge
        if (creep.memory.discharging) {
            //----store minerals----
            console.log('Mn>> carrying: ' + creep.memory.miningType + ': ' + creep.store[creep.memory.miningType]);
            
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                        && structure.store.getFreeCapacity(Memory.structures.lab1.resource) > 0;
                }
            });
            if (!target) {
                var target = Game.getObjectById('65052ea2c34196660d3e9925');
            }
            if (target.room != creep.room) {
                creep.moveTo(new RoomPosition(25, 25, target.room.name), { reusePath: 30 });
            } else {
                if (creep.transfer(target, creep.memory.miningType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: 30, visualizePathStyle: { stroke: '#ffff00' } });
                }
            }

        }
        else { //----mining----
            var target = Game.getObjectById(creep.memory.workingSlot);
            if (creep.room.name != roomName) {
                creep.moveTo(new RoomPosition(25, 25, roomName), { reusePath: 20 });
            } else {
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } });
                }
                if (target.mineralAmount == 0) {
                    creep.memory.discharging = true;
                    creep.say('🚧 unload');
                }
            }
        }
    }

};

module.exports = roleMiner;