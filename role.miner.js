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
            creep.say('⛏️ 采矿');
        }
        if (!creep.memory.discharging && creep.store.getFreeCapacity() == 0) {
            creep.memory.discharging = true;
            creep.say('🈵 卸货');
        }
        //sign working slot
        if (!creep.memory.workingSlot) {
            for (let mineral of minerals) {
                let minerOnMineral = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == mineral.id && creep.memory.role == 'miner');
                let totalWorkParts = _.sum(_.map(minerOnMineral, (creep) => creep.body.filter((part) => part.type === WORK).length));
                // console.log('⛏️ MN>> Mineral:' + mineral.id + ',assigned:' + minerOnMineral + ',' + totalWorkParts);
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
            // console.log('⛏️ MN>> carrying: ' + creep.memory.miningType + ': ' + creep.store[creep.memory.miningType]);
            if (!creep.memory.minerLab) {
                let minerLab = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB)
                            && structure.store.getFreeCapacity(creep.memory.miningType) > 0;
                    }
                });
                if (minerLab && creep.pos.getRangeTo(minerLab) <= 2) {
                    creep.memory.minerLab = minerLab.id;
                } else {
                    creep.memory.minerLab = creep.room.storage.id;
                }
            }
            let target = Game.getObjectById(creep.memory.minerLab);
            if (target) {
                if (creep.transfer(target, creep.memory.miningType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target) / 2, visualizePathStyle: { stroke: '#ffff00' } });
                }
            }
        }
        else { //----mining----
            var target = Game.getObjectById(creep.memory.workingSlot);
            if (creep.room.name != creep.memory.loc) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.loc), { reusePath: 20 });
            } else {
                if (creep.room.storage.store[creep.memory.miningType] < 300000) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target) / 2, visualizePathStyle: { stroke: '#ffff00' } });
                    }
                    if (target.mineralAmount == 0) {
                        if (creep.pos.getRangeTo(creep.room.storage) <= 3) {
                            creep.suicide();
                        }
                        else if (!creep.memory.path) {
                            let target = creep.room.storage;
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        creep.moveByPath(creep.memory.path);
                    }
                }
            }
        }
    }
};

module.exports = roleMiner;