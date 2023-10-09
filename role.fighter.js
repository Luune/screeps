/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fighter');
 * mod.thing == 'a thing'; // true
 */

var roleFighter = {

    /** @param {Creep} creep **/
    run: function (creep, roomName) {
        //----attack creep----
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if (targets.length > 0) {
            var closestTarget = creep.pos.findClosestByRange(targets);
            if (creep.pos.inRangeTo(closestTarget, 3)) {
                // 如果creep已经在目标附近，请远程攻击对方
                creep.rangedAttack(closestTarget);
            } else {
                // 如果没有敌对creep在射程范围内，请移动到最近的敌对creep附近并保持3格距离
                var distanceToTarget = creep.pos.getRangeTo(closestTarget);
                if (distanceToTarget <= 3) {
                    // 如果creep与敌对creep的距离小于等于3，请向远离敌对creep的方向移动
                    var direction = creep.pos.getDirectionTo(closestTarget);
                    creep.move(direction + 4); // 将方向值加4，以得到相反的方向
                } else {
                    // 如果creep与敌对creep的距离大于3，请向敌对creep移动并保持3格距离
                    creep.moveTo(closestTarget, { range: 3, visualizePathStyle: { stroke: '#ff00ff' } });
                }
            }
        }
        else { //----attack structure----
            var targets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER
                        || structure.structureType == STRUCTURE_NUKER);
                }
            });
            if (targets.length > 0) {
                var closestTarget = creep.pos.findClosestByRange(targets);
                if (creep.rangedAttack() != 0) {
                    // 如果没有敌对creep在射程范围内，请移动到最近的敌对creep附近并保持3格距离
                    var distanceToTarget = creep.pos.getRangeTo(closestTarget);
                    if (distanceToTarget <= 3) {
                        // 如果creep与敌对creep的距离小于等于3，请向远离敌对creep的方向移动
                        var direction = creep.pos.getDirectionTo(closestTarget);
                        creep.move(direction + 4); // 将方向值加4，以得到相反的方向
                    } else {
                        // 如果creep与敌对creep的距离大于3，请向敌对creep移动并保持3格距离
                        creep.moveTo(closestTarget, { range: 3, visualizePathStyle: { stroke: '#ff00ff' } });
                    }
                }
            }
            else { //----heal----
                var closestWoundedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS,
                    { filter: (creep) => creep.hits < creep.hitsMax });
                if (closestWoundedCreep) {
                    creep.moveTo(closestWoundedCreep, { visualizePathStyle: { stroke: '#ff00ff' } });
                    if (creep.pos.isNearTo(closestWoundedCreep)) { creep.heal(closestWoundedCreep); }
                    else { creep.rangedHeal(closestWoundedCreep); }
                }
                else {
                    creep.moveTo(Game.rooms[roomName].controller, { range: 5, visualizePathStyle: { stroke: '#ff00ff' } });
                }
            }
        }

    }
}

module.exports = roleFighter;