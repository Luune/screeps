var roleTransporter = {
    run: function (creep, roomName, sortedEnergys, tombstones, order) {
        // console.log('T>> dropped energy: '+sortedEnergys);
        //----set status----
        if (creep.memory.transporting && creep.store.getUsedCapacity() == 0) {
            creep.memory.transporting = false;
            delete creep.memory.target;
            delete creep.memory.targetResource;
            delete creep.memory.path;
            creep.say('🚛 loot');
        }
        if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
            creep.memory.transporting = true;
            delete creep.memory.target;
            delete creep.memory.targetResource;
            delete creep.memory.path;
            creep.say('🚚 transport');
        }

        // var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // var emptyExtensions = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_EXTENSION
        //             || structure.structureType == STRUCTURE_SPAWN)
        //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //     }
        // });
        if (!creep.memory.extensions) {
            // 获取房间内所有储存energy的容器
            let containersWithEnergy = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_POWER_SPAWN);
                }
            });
            // 将容器的id写入creep的memory中
            creep.memory.extensions = containersWithEnergy.map(container => container.id);
        }
        // var emptyTowerLabs = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return ((structure.structureType == STRUCTURE_TOWER
        //             || structure.structureType == STRUCTURE_LAB)
        //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 100)
        //             || (structure.structureType == STRUCTURE_FACTORY
        //                 && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 200);
        //     }
        // });
        if (!creep.memory.towerLabs) {
            // 获取房间内所有储存energy的容器
            let containersWithEnergy = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER 
                    || structure.structureType == STRUCTURE_LAB
                    || structure.structureType == STRUCTURE_FACTORY
                    || structure.structureType == STRUCTURE_NUKER);
                }
            });
            // 将容器的id写入creep的memory中
            creep.memory.towerLabs = containersWithEnergy.map(container => container.id);
        }
        // var containersToFill = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return structure.structureType == STRUCTURE_CONTAINER
        //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 800;
        //     }
        // });
        // var containersToLoot = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_CONTAINER)
        //             && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
        //     }
        // });
        if (!creep.memory.containers) {
            // 获取房间内所有储存energy的容器
            let containersWithEnergy = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });
            // 将容器的id写入creep的memory中
            creep.memory.containers = containersWithEnergy.map(container => container.id);
        }
        // var linksToLoot = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_LINK)
        //             && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 400;
        //     }
        // });
        if (!creep.memory.linksToLoot) {
            // 获取房间内所有储存energy的容器
            let containersWithEnergy = Game.rooms[creep.memory.loc].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK);
                }
            });
            // 将容器的id写入creep的memory中
            creep.memory.linksToLoot = containersWithEnergy.map(container => container.id);
        }
        if (!creep.memory.roomStorage) {
            creep.memory.roomStorage = Game.rooms[creep.memory.loc].storage.id;
        }
        if (!creep.memory.roomTerminal) {
            creep.memory.roomTerminal = Game.rooms[creep.memory.loc].terminal.id;
        }
        if (Game.getObjectById(creep.memory.roomTerminal)) {
            var terminal1 = Game.getObjectById(creep.memory.roomTerminal);
            var terminalEn = terminal1.store.getUsedCapacity(RESOURCE_ENERGY);
        }

        //----trans----
        if (creep.memory.transporting) {
            if (!creep.memory.target) {
                delete creep.memory.targetResource;
                delete creep.memory.path;
                //----store minerals----
                let emptyStorage = Game.getObjectById(creep.memory.roomStorage);
                findTargetToFill:
                for (let resourceType of Object.keys(creep.store)) {
                    // console.log('T>> carrying: ' + resourceType + ': ' + creep.store[resourceType]);
                    if (resourceType != RESOURCE_ENERGY && emptyStorage) {
                        creep.memory.target = creep.memory.roomStorage;
                        creep.memory.targetResource = resourceType;
                        // console.log('🚚 T>> resources to storage: ' + emptyStorage.id);
                        break findTargetToFill;
                    }
                    //----store energy----
                    else {
                        //----fill extension----
                        let emptyExtensions = creep.memory.extensions;
                        if (emptyExtensions.length > 0) {
                            for (let id of emptyExtensions) {
                                let container = Game.getObjectById(id);
                                if (container && container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                                    creep.memory.target = id;
                                    creep.memory.targetResource = RESOURCE_ENERGY;
                                    break findTargetToFill;
                                }
                            }
                            // console.log('🚚 T>> to extension: ' + emptyExtensions[0].id);
                        }
                        //----fill tower/lab/factory----
                        let emptyTowerLabs = creep.memory.towerLabs;
                        if (emptyTowerLabs.length > 0) {
                            for (let id of emptyTowerLabs) {
                                let container = Game.getObjectById(id);
                                if ((container.structureType == STRUCTURE_TOWER
                                || container.structureType == STRUCTURE_LAB)
                                && container.store.getFreeCapacity(RESOURCE_ENERGY) >= 100) {
                                    creep.memory.target = id;
                                    creep.memory.targetResource = resourceType;
                                    // console.log('T>> to tower/lab: ' + target.id);
                                    break findTargetToFill;
                                }
                                else if (container.structureType == STRUCTURE_FACTORY
                                && container.store[RESOURCE_ENERGY] < 200) {
                                    creep.memory.target = id;
                                    creep.memory.targetResource = resourceType;
                                    // console.log('T>> to tower/lab: ' + target.id);
                                    break findTargetToFill;
                                }
                                else if (container.structureType == STRUCTURE_NUKER) {
                                    creep.memory.target = id;
                                    creep.memory.targetResource = resourceType;
                                    // console.log('T>> to tower/lab: ' + target.id);
                                    break findTargetToFill;
                                }
                            }
                        }
                        //----trade cost----
                        if (terminalEn < 8000) {
                            creep.memory.target = terminal1.id;
                            creep.memory.targetResource = resourceType;
                            // console.log('🚚 T>> to terminal EN: ' + terminal1.id);
                            break;
                        }
                        //----fill container----
                        else if (creep.memory.containers.length > 0) {
                            let containerIds = creep.memory.containers;
                            // 根据容器ID获取容器对象，并计算储量
                            let containerStores = containerIds.map(id => {
                                let container = Game.getObjectById(id);
                                let stores = container.store[RESOURCE_ENERGY];
                                return { id: id, stores: stores };
                            });
                            // 按照储量对容器进行排序
                            containerStores.sort((a, b) => a.stores - b.stores);
                            let containersToFill = containerStores.map(container => container.id);
                            for (let id of containersToFill) {
                                let eContainer = Game.getObjectById(id);
                                if (eContainer.store[RESOURCE_ENERGY] < 1200) {
                                    creep.memory.target = id;
                                    creep.memory.targetResource = resourceType;
                                    // console.log('T>> to container: ' + creep.memory.target);
                                    break findTargetToFill;
                                }
                            }
                            //----fill storage----
                            if (!creep.memory.target && emptyStorage) {
                                // creep.memorytarget = creep.pos.findClosestByRange(emptyStorages).id;
                                creep.memory.target = emptyStorage.id;
                                creep.memory.targetResource = resourceType;
                                // console.log('T>> to storage: ' + target.id);
                                break findTargetToFill;
                            }
                        }
                        
                    }
                }
            }

            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target) {
                var result = creep.transfer(target, targetResource);
                // console.log('🚚 T>> ' + creep.name + ' to ' + target.id + ' ' + targetResource + ' ' + result);
                if (result == ERR_NOT_IN_RANGE) {
                    // if (!creep.memory.path) {
                    //     creep.memory.path = creep.pos.findPathTo(target);
                    // }
                    // else {
                    //     // 获取creep的路线
                    //     let path = creep.memory.path;
                    //     // 获取下一步位置
                    //     let nextStep = new RoomPosition(path[0].x, path[0].y, roomName);
                    //     // 在下一步位置查找所有对象
                    //     let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                    //     if (objects.length > 0) {
                    //         delete creep.memory.path;
                    //     }
                    // }
                    // creep.moveByPath(creep.memory.path);
                    creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#00ff00' } });
                    creep.say('🚚 ' + target.pos.x + ',' + target.pos.y);
                    creep.room.visual.line(creep.pos, target.pos, {color: '#00ff00', width:0.1, lineStyle: 'dashed'});
                }
                else {
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
            }
            else {
                delete creep.memory.target;
                delete creep.memory.targetResource;
                delete creep.memory.path;
            }
        }
        //----loot----
        else {
            if (!creep.memory.target) {
                delete creep.memory.targetResource;
                delete creep.memory.path;
                //----pick biggest drop----
                if (sortedEnergys.length > 0) {
                    // let bigdrop = _.sortBy(sortedEnergys, s => -s.amount)[0];
                    let bigdrop = creep.pos.findClosestByPath(sortedEnergys);
                    if (bigdrop && bigdrop.amount > creep.pos.findPathTo(bigdrop).length) {
                        // console.log('🚛 T>> from drop ' + bigdrop.id);
                        creep.memory.target = bigdrop.id;
                        creep.memory.targetResource = ' ';
                    }
                }
                //----pick tomb----
                else if (tombstones.length > 0) {
                    // console.log('🚛 T>> from tomb: ' + tombstones[0].id);
                    for (let resourceType in tombstones[0].store) {
                        creep.memory.target = tombstones[0].id;
                        creep.memory.targetResource = resourceType;
                    }
                }
                //----pick terminal extra energy----
                else if (terminal1 && terminalEn > 8500) {
                    creep.memory.target = terminal1.id;
                    creep.memory.targetResource = RESOURCE_ENERGY;
                }
                
                else {
                    //----pick link----
                    let linksToLoot = creep.memory.linksToLoot;
                    // 遍历容器id列表
                    for (let id of linksToLoot) {
                        let container = Game.getObjectById(id);
                        if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) > 400) {
                            creep.memory.target = id;
                            creep.memory.targetResource = RESOURCE_ENERGY;
                            break;
                        }
                    }
                    if (!creep.memory.target) {
                        //----pick container----
                        let containerIds = creep.memory.containers;
                        let containerStores = containerIds.map(id => {
                            let container = Game.getObjectById(id);
                            let stores = container.store[RESOURCE_ENERGY];
                            return { id: id, stores: stores };
                        });
                        // 按照储量对容器进行排序
                        containerStores.sort((a, b) => b.stores - a.stores);
                        let containersToLoot = containerStores.map(container => container.id);
                        // 遍历容器id列表
                        for (let id of containersToLoot) {
                            let container = Game.getObjectById(id);
                            if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) > 50) {
                                creep.memory.target = id;
                                creep.memory.targetResource = RESOURCE_ENERGY;
                                break;
                            }
                        }
                    }
                    if (!creep.memory.target) {
                        //----pick storage----
                        let storage = Game.getObjectById(creep.memory.roomStorage);
                        let emptyExtensions = creep.memory.extensions;
                        if (storage.store[RESOURCE_ENERGY] > 10000) {
                            for (let id of emptyExtensions) {
                                let container = Game.getObjectById(id);
                                if (container && container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                                    creep.memory.target = storage.id;
                                    creep.memory.targetResource = RESOURCE_ENERGY;
                                    break;
                                }
                            }
                            // //----没得捡了就存掉----
                            // if (creep.store.getFreeCapacity(RESOURCE_ENERGY) < creep.store.getCapacity() / 2) {
                            //     creep.memory.transporting = true;
                            //     creep.say('🚛 transport');
                            // }
                        }
                    }
                    
                }
            }
            var target = Game.getObjectById(creep.memory.target);
            var targetResource = creep.memory.targetResource;
            if (target && (target.amount > 0 || target.store[targetResource] > 0)) {
                // console.log('🚛 T>> ' + creep.name + ' from ' + creep.memory.target + ' ' + targetResource);
                if (creep.withdraw(target, targetResource) == ERR_NOT_IN_RANGE || creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // if (!creep.memory.path) {
                    //     creep.memory.path = creep.pos.findPathTo(target);
                    // }
                    // else {
                    //     // 获取creep的路线
                    //     let path = creep.memory.path;
                    //     // 获取下一步位置
                    //     let nextStep = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                    //     // 在下一步位置查找所有对象
                    //     let objects = creep.room.lookForAt(LOOK_CREEPS, nextStep.x, nextStep.y);
                    //     if (objects.length > 0) {
                    //         delete creep.memory.path;
                    //     }
                    // }
                    // creep.moveByPath(creep.memory.path);
                    creep.moveTo(target, { reusePath: creep.pos.getRangeTo(target)/2, visualizePathStyle: { stroke: '#00ff00' } });
                    creep.say('🚛' + target.pos.x + ',' + target.pos.y);
                    creep.room.visual.line(creep.pos, target.pos, {color: '#00ff00', width:0.1, lineStyle: 'dashed'});
                }
                else {
                    delete creep.memory.target;
                    delete creep.memory.targetResource;
                    delete creep.memory.path;
                }
            }
            else {
                delete creep.memory.target;
                delete creep.memory.targetResource;
                delete creep.memory.path;
            }
        }
    }
};

module.exports = roleTransporter;
