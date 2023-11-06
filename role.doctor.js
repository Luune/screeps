/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fighter');
 * mod.thing == 'a thing'; // true
 */

var roleDoctor = {

    /** @param {Creep} creep **/
    run: function (creep, roomName, patient) {
        if (patient) {
            var target = patient;
        }
        else {
        //----heal----
        var target = creep.pos.findClosestByRange(FIND_MY_CREEPS,
            { filter: (creep) => creep.hits < creep.hitsMax });
        }
        if (target) {
            creep.say('🚑 '+ target);
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ff00ff' } });
            if (creep.pos.isNearTo(target)) { creep.heal(target); }
            else { creep.rangedHeal(target); }
        }
        else {
            creep.moveTo(Game.rooms[creep.memory.loc].controller, { range: 5, visualizePathStyle: { stroke: '#ff00ff' } });
        }
    }
}

module.exports = roleDoctor;