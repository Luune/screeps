var roleTower = {

    /** @param {tower} tower **/
    run: function (tower, roomName, dismantleTargetId, enemies) {
        if (!tower.memory) {
            tower.memory = {};
        };

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
                var structures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax
                            && structure.structureType != STRUCTURE_WALL
                            && structure.structureType != STRUCTURE_RAMPART)
                            ||
                            (structure.hits < structure.hitsMax
                                && (structure.structureType == STRUCTURE_WALL
                                    || structure.structureType == STRUCTURE_RAMPART)
                                && structure.hits < tower.room.controller.level * 10000);
                    }
                });
                var closestDamagedStructure = _.sortBy(structures, s => s.hits)[0];
                if (closestDamagedStructure && tower.store.getUsedCapacity(RESOURCE_ENERGY) > 500 && closestDamagedStructure.id != dismantleTargetId) {
                    // console.log('🗼🗼 塔>> 修理: ' + closestDamagedStructure.structureType + ' -> ' + closestDamagedStructure.hits + ' / ' + closestDamagedStructure.hitsMax + ' 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
                    tower.repair(closestDamagedStructure);
                }
                else {
                    // console.log('🗼 塔>> 能量: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
                }
            }
        }
    }
};

module.exports = roleTower;