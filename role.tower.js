var roleTower = {

    /** @param {tower} tower **/
    run: function (tower, storageStorage) {
        // console.log(storageStorage);
        if (storageStorage == 0) {
            storageStorage = 500;
        }
        console.log('W>> energy: ' + tower.store.getUsedCapacity(RESOURCE_ENERGY) + ' / ' + tower.store.getCapacity(RESOURCE_ENERGY));
        //----attact----
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
            console.log('W>> ********attack: ' + closestHostile);
        }
        else {
            //----heal----
            var closestWoundedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,
                { filter: (creep) => creep.hits < creep.hitsMax });
            if (closestWoundedCreep) {
                console.log('W>> healing: ' + closestWoundedCreep);
                tower.heal(closestWoundedCreep);
            }
            else {
                //----fix structure----
                // if (tower.store.getFreeCapacity(RESOURCE_ENERGY) < 30) {
                //     //----all structure----
                //     var structures = tower.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.hits < structure.hitsMax)
                //             && (structure.hits < storageStorage * 10);
                //         }
                //     });
                //     var closestDamagedStructure = _.sortBy(structures, s => s.hits)[0];
                // } else { //----except wall & rampart----
                var structures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax
                            && structure.structureType != STRUCTURE_WALL
                            && structure.hits < storageStorage * 10)
                            ||
                            (structure.hits < structure.hitsMax
                                && structure.structureType == STRUCTURE_WALL
                                && structure.hits < 50000);
                    }
                });
                var closestDamagedStructure = _.sortBy(structures, s => s.hits)[0];

                if (closestDamagedStructure) {
                    console.log('W>> fixing: ' + closestDamagedStructure.structureType + ' -> ' + closestDamagedStructure.hits + ' / ' + closestDamagedStructure.hitsMax);
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = roleTower;