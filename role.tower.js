var roleTower = {

    /** @param {tower} tower **/
    run: function (tower, roomName, dismantleTargetId, enemies) {
        tower.room.visual.rect(tower.pos.x - 15.5, tower.pos.y - 15.5, 31, 31, {fill: '#ffffff', opacity: 0.1, stroke: '#ffff99', strokeWidth: 0.2});
        //----attact----
        // var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0) {
            tower.attack(enemies[0]);
            // console.log('🗼🗼 塔>> ********攻击: ' + closestHostile + ' 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
        }
        else {
            //----heal----
            var closestWoundedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,
                { filter: (creep) => creep.hits < creep.hitsMax });
            if (closestWoundedCreep) {
                // console.log('🗼🗼 塔>> 治疗: ' + closestWoundedCreep + ' 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
                tower.heal(closestWoundedCreep);
            }
            else {
                //----fix structure----
                // var structures = tower.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.hits < structure.hitsMax
                //             && structure.structureType != STRUCTURE_WALL
                //             && structure.structureType != STRUCTURE_RAMPART)
                //             ||
                //             (structure.hits < structure.hitsMax
                //                 && (structure.structureType == STRUCTURE_WALL
                //                     || structure.structureType == STRUCTURE_RAMPART)
                //                 && structure.hits < tower.room.controller.level * 10000);
                //     }
                // });
                // var closestDamagedStructure = _.sortBy(structures, s => s.hits)[0];
                // if (closestDamagedStructure && tower.store.getUsedCapacity(RESOURCE_ENERGY) > 500 && closestDamagedStructure.id != dismantleTargetId) {
                //     // console.log('🗼🗼 塔>> 修理: ' + closestDamagedStructure.structureType + ' -> ' + closestDamagedStructure.hits + ' / ' + closestDamagedStructure.hitsMax + ' 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
                //     tower.repair(closestDamagedStructure);
                // }
                // else {
                //     // console.log('🗼 塔>> 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
                // }
                switch (roomName) {
                    case 'W2N27':
                        var nearbyStructures = Memory.structuresToFix['W2N27'];
                        break;
                    case 'W1N27':
                        var nearbyStructures = Memory.structuresToFix['W1N27'];
                        break;
                    case 'W4N28':
                        var nearbyStructures = Memory.structuresToFix['W4N28'];
                        break;
                    case 'W6N29':
                        var nearbyStructures = Memory.structuresToFix['W6N29'];
                        break;
                    case 'W3N28':
                        var nearbyStructures = Memory.structuresToFix['W3N28'];
                        break;
                    case 'W6N28':
                        var nearbyStructures = Memory.structuresToFix['W6N28'];
                        break;
                    case 'W4N29':
                        var nearbyStructures = Memory.structuresToFix['W4N29'];
                        break;
                }
                for (let id of nearbyStructures) {
                    let structure = Game.getObjectById(id);
                    if (structure.hits < structure.hitsMax && structure.pos.inRangeTo(tower, 15) && tower.store.getUsedCapacity(RESOURCE_ENERGY) > 700) {
                        if ((structure.structureType == STRUCTURE_WALL
                            || structure.structureType == STRUCTURE_RAMPART)
                            && structure.hits < tower.room.controller.level * 10000) {
                            tower.repair(structure);
                            break;
                        }
                        else if (structure.structureType != STRUCTURE_WALL
                            && structure.structureType != STRUCTURE_RAMPART) {
                            tower.repair(structure);
                            break;
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleTower;