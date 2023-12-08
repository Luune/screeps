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
    run: function (creep, roomName, dismantleTargetId) {
        if (!creep.memory.destiny) {
            creep.memory.destiny = creep.memory.loc;
        }
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
                            || structure.structureType == STRUCTURE_NUKER
                            || structure.structureType == STRUCTURE_INVADER_CORE
                            || structure.structureType == STRUCTURE_SPAWN);
                    }
                });
                if (targets.length > 0) {
                    var closestTarget = creep.pos.findClosestByRange(targets);
                    creep.say('🔥 ' + closestTarget.owner.username);
                    if (creep.rangedAttack(closestTarget) != 0) {
                        // 如果没有敌对creep在射程范围内，请移动到最近的敌对creep附近并保持3格距离
                        var distanceToTarget = creep.pos.getRangeTo(closestTarget);
                        if (distanceToTarget > 3) {
                            // 如果creep与敌对creep的距离大于3，请向敌对creep移动并保持3格距离
                            creep.moveTo(closestTarget, { range: 3, visualizePathStyle: { stroke: '#ff00ff' } });
                        }
                    }
                }
                else if (dismantleTargetId != '') {
                        var target = Game.getObjectById(dismantleTargetId);
                        if (target.room.name == creep.memory.destiny) {
                            if (creep.attack(target) != 0) { //creep.rangedAttack(target) != 0 || 
                                // 如果没有敌对creep在射程范围内，请移动到最近的敌对creep附近并保持3格距离
                                var distanceToTarget = creep.pos.getRangeTo(target);
                                if (distanceToTarget > 0) {
                                    // 如果creep与敌对creep的距离大于3，请向敌对creep移动并保持3格距离
                                    creep.moveTo(target, { range: 0, visualizePathStyle: { stroke: '#ff00ff' } });
                                }
                            }
                        }
                    }
                else { //----heal----
                    var closestWoundedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS,
                        { filter: (creep) => creep.hits < creep.hitsMax });
                    if (closestWoundedCreep) {
                        creep.say('💉 ' + closestWoundedCreep);
                        creep.moveTo(closestWoundedCreep, { visualizePathStyle: { stroke: '#ff00ff' } });
                        if (creep.pos.isNearTo(closestWoundedCreep)) { creep.heal(closestWoundedCreep); }
                        else { creep.rangedHeal(closestWoundedCreep); }
                    }
                    
                    else {
                        creep.moveTo(Game.rooms[creep.memory.destiny].controller, { range: 6, visualizePathStyle: { stroke: '#ff00ff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleFighter;