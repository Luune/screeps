/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fighter');
 * mod.thing == 'a thing'; // true
 */

var roleMelee = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, dismantleTargetId) {
        if (!Memory.whitelist) {
            Memory.whitelist = {};
        }
        // Memory.whitelist['Jerdaz'] = true;
        // Memory.whitelist['Fatoribo'] = true;

        // console.log('⚔️ F: whitelist' + Memory.whiteList);
        // creep.memory.destiny = 'W5N28';
        if (creep.room.name != creep.memory.destiny) {
            creep.say('F' + creep.memory.destiny);
            creep.moveTo(new RoomPosition(25, 25, creep.memory.destiny));
        } else {
            //----attack creep----
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var targets = hostiles.filter(hostile => !Memory.whitelist[hostile.owner.username]);
            if (targets.length > 0) {
                var closestTarget = creep.pos.findClosestByRange(targets);
                creep.say('⚔️ ' + closestTarget.owner.username);
                creep.attack(closestTarget);
                creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ff00ff' } });
            }
            else { //----attack structure----
                var targets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER
                            || structure.structureType == STRUCTURE_NUKER
                            || structure.structureType == STRUCTURE_INVADER_CORE
                            || structure.structureType == STRUCTURE_SPAWN);
                    }
                });
                if (targets.length > 0) {
                    var closestTarget = creep.pos.findClosestByRange(targets);
                    creep.say('🔥 ' + closestTarget.owner.username);
                    if (creep.attack(closestTarget) != 0) {
                            creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ff00ff' } });
                    }
                }
                else if (dismantleTargetId != '') {
                        var target = Game.getObjectById(dismantleTargetId);
                        if (target.room.name == creep.memory.destiny) {
                            if (creep.attack(target) != 0) { 
                                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ff00ff' } });
                            }
                        }
                    }
                else { //----heal----
                    var closestWoundedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS,
                        { filter: (creep) => creep.hits < creep.hitsMax });
                    creep.say('💉 ' + closestWoundedCreep);
                    if (closestWoundedCreep) {
                        creep.moveTo(closestWoundedCreep, { visualizePathStyle: { stroke: '#ff00ff' } });
                        if (creep.pos.isNearTo(closestWoundedCreep)) { creep.heal(closestWoundedCreep); }
                        else { creep.rangedHeal(closestWoundedCreep); }
                    }
                    
                    else {
                        creep.moveTo(Game.rooms[creep.memory.loc].controller, { range: 5, visualizePathStyle: { stroke: '#ff00ff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleMelee;