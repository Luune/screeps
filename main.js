var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleTransporter = require('role.transporter');
var consData = require('cons.data');
var roleClaimer = require('role.claimer');
var roleFighter = require('role.fighter');
var roleMiner = require('role.miner');
var roleAlchemist = require('role.alchemist');
var roleLink = require('role.link');

module.exports.loop = function () {
    console.log('~~~~~~~~~~~~~~~~~~~~~~Tick~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    //----setup trade----
    var orderId = '65224f822e5f9dc6eef6db1b';
    // Game.market.deal('', 00, 'W2N27');
    var tradeAmount = 1000;
    var order = Game.market.getOrderById(orderId);
    if (order) {
        console.log(`Order ID: ${order.id}`);
        console.log(`Resource Type: ${order.resourceType}`);
        console.log(`Room Name: ${order.roomName}`);
        console.log(`Price: ${order.price}`);
        console.log(`Amount: ${order.amount}`);
        console.log(`Remaining Amount: ${order.remainingAmount}`);
        var tradeCost = Game.market.calcTransactionCost(tradeAmount, 'W2N27', order.roomName);
        console.log('Trade Cost Energy: ' + tradeCost + ' per ' + tradeAmount);
    } else {
        console.log(`Order with ID ${orderId} not found.`);
    }
    // Game.market.createOrder({ type: ORDER_SELL, resourceType: RESOURCE_UTRIUM_HYDRIDE, price: 100, totalAmount: 1000, roomName: "W2N27" });
    // Game.market.createOrder({ type: ORDER_BUY, resourceType: RESOURCE_HYDROGEN, price: 111, totalAmount: 1000, roomName: "W2N27" });

    //----setup memory: structures----
    consData.run();
    // console.log('test memory: '+ Memory.structures.storages['id0']);
    // console.log('test memory: '+ Memory.structures.labs.lab1['resource']);

    const room1 = 'W2N27';
    const room2 = 'W1N27';
    const link1 = Game.getObjectById('650d9b1ee851c93a8cd7f1b4');
    const link2 = Game.getObjectById('650da9af3bfac34617fd5fbb');

    //----link----
    // if (link1.store[RESOURCE_ENERGY] >= 400 && link2.store[RESOURCE_ENERGY] < 400) {
    //     link1.transferEnergy(link2);
    // }
    roleLink.run();

    //----room wise----
    for (var roomName in Game.rooms) {
        var roomLevel = Game.rooms[roomName].controller.level;
        var enAvail = Game.rooms[roomName].energyAvailable;
        //----show energy----
        let controllerProgress = Game.rooms[roomName].controller.progress;
        let controllerProgressTotal = Game.rooms[roomName].controller.progressTotal;
        console.log('M>> >>>>>>>> Room:' + roomName + ', level:' + roomLevel + ', progress:' + controllerProgress + '/' + controllerProgressTotal + '=' + Math.round(controllerProgress * 100 / controllerProgressTotal) + '%, energy:' + enAvail + ' <<<<<<<<<<<<<');
        //----count extensions storage----
        var extensionEnergy = 0;
        let extensions = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var extensionCount = extensions.length;
        // console.log(`M>> Room ${roomName} has ${extensionCount} extensions.`);
        for (let extension of extensions) {
            extensionEnergy += extension.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        //----storage of storage----
        let storage = Game.rooms[roomName].storage;
        if (storage) {
            var storageStorage = storage.store.getUsedCapacity(RESOURCE_ENERGY);
        } else { storageStorage = 0; }
        console.log('M>> stg: ' + storageStorage + ', exen: ' + extensionEnergy + '/' + extensionCount * 50 + ', ext: ' + extensionCount);
        //----container storage----
        let containerEn = 0;
        let containers = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 0;
            }
        })
        for (let container of containers) {
            containerEn += container.store[RESOURCE_ENERGY];
        }
        console.log('M>> Containers ' + containers.length + ', energy: ' + containerEn);

        //----find dropped energy----
        var droppedEnergy = Game.rooms[roomName].find(FIND_DROPPED_RESOURCES
            , {
                filter: (resource) => {
                    return resource.amount > 10;
                }
            }
        );
        var sortedEnergys = _.sortBy(droppedEnergy, (drop) => {
            if (drop.resourceType === RESOURCE_ENERGY) {
                return -drop.amount; // 能量数量越多，排序越靠前
            }
        });
        for (let drop of sortedEnergys) {
            console.log('M>> energy on floor: ' + drop + ': ' + drop.amount);
        }
        //----find tombstone----
        var tombstones = Game.rooms[roomName].find(FIND_TOMBSTONES, {
            filter: (tombstone) => {
                return _.sum(tombstone.store) > 0;
            },
            // 按存储量从大到小排序
            sort: (a, b) => _.sum(b.store) - _.sum(a.store)
        });
        if (tombstones.length > 0) {
            console.log('M>> sources in TOMB: ' + tombstones[0] + ': ' + _.sum(tombstones[0].store));
        }
        //----count available harvest spots----
        var sources = Game.rooms[roomName].find(FIND_SOURCES);
        for (let source of sources) {
            let countharvester = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == source.id);
            console.log('M>> ' + countharvester.length + ' creeps harvesting ' + source);
        }

        // sourceSpot.push({id:'5bbcaccf9099fc012e6363ed',count:1});
        // sources.push(Game.getObjectById('5bbcaccf9099fc012e6363ed'));
        // console.log(sourceSpot[2].id);

        //----call tower----
        var towerEn = 0;
        for (let tower of Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })) {
            roleTower.run(tower, storageStorage);
            towerEn += tower.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        console.log('M>> tower EN total: ' + towerEn);

        //----clear memory----
        for (var creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
                console.log('M>> Clearing non-existing creep memory:', creepName);
            }
        }

        //----count creep by roles----
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.loc == roomName);
        var totalWorkParts = _.sum(_.map(harvesters, (creep) => creep.body.filter((part) => part.type === WORK).length));
        console.log('M>> Harvesters: ' + harvesters.length + ', WORK:' + totalWorkParts + ', energy+' + totalWorkParts * 2);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.loc == roomName);
        var totalUpgraderParts = _.sum(_.map(upgraders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        console.log('M>> Upgrader: ' + upgraders.length + ', WORK:' + totalUpgraderParts + ', energy-' + totalUpgraderParts);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.loc == roomName);
        var totalBuildParts = _.sum(_.map(builders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        console.log('M>> Builder: ' + builders.length + ', WORK:' + totalBuildParts);
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.loc == roomName);
        var totalTransporterParts = _.sum(_.map(transporter, (creep) => creep.body.filter((part) => part.type === CARRY).length));
        console.log('M>> Transporter: ' + transporter.length + ', CARRY:' + totalTransporterParts + ', cargo:' + totalTransporterParts * 50);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.loc == roomName);
        var totalClaimParts = _.sum(_.map(claimers, (creep) => creep.body.filter((part) => part.type === CLAIM).length));
        console.log('M>> Claimer: ' + claimers.length + ', claims:' + totalClaimParts);
        var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter' && creep.memory.loc == roomName);
        console.log('M>> Fighter: ' + fighters.length);
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.loc == roomName);
        var totalMineParts = _.sum(_.map(miners, (creep) => creep.body.filter((part) => part.type === WORK).length));
        console.log('M>> Miners: ' + miners.length + ', WORK:' + totalMineParts + ', mineral+' + totalMineParts * 2);
        var alchemists = _.filter(Game.creeps, (creep) => creep.memory.role == 'alchemist');
        console.log('M>> Alchemist: ' + alchemists.length);

        //----spawning creeps----
        var spawn = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0];
        if (spawn) {
            var spawnName = spawn.name;
        } else {
            var spawnName = 'Spawn1';
        }
        console.log('M>> ----spawner: ' + spawnName);
        if (totalWorkParts < sources.length * 5) { //----harvester----
            if (enAvail >= 900) {
                var newName = 'Harvester' + roomName + Game.time;
                console.log('M>> Spawning new harvester: ' + newName);
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
            } else if (enAvail >= 700) {
                var newName = 'Harvester' + roomName + Game.time;
                console.log('M>> Spawning new harvester: ' + newName);
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
            } else if (enAvail >= 500) {
                var newName = 'Harvester' + roomName + Game.time;
                console.log('M>> Spawning new harvester: ' + newName);
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
            } else {
                var newName = 'Harvester' + roomName + Game.time;
                console.log('M>> Spawning new harvester: ' + newName);
                Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
            }
        }
        else { //----upgrader----
            if (totalUpgraderParts < totalWorkParts - 2) {
                if (enAvail >= 700) {
                    var newName = 'Upgrader' + roomName + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                } else if (enAvail >= 500) {
                    var newName = 'Upgrader' + roomName + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                } else {
                    var newName = 'Upgrader' + roomName + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                }
            }
            else { //----builder----
                if (totalBuildParts < totalWorkParts - 2) {
                    if (enAvail >= 900) {
                        var newName = 'Builder' + roomName + Game.time;
                        console.log('M>> Spawning new builder: ' + newName);
                        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    }
                    else if (enAvail >= 500) {
                        var newName = 'Builder' + roomName + Game.time;
                        console.log('M>> Spawning new builder: ' + newName);
                        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    }
                    else {
                        var newName = 'Builder' + roomName + Game.time;
                        console.log('M>> Spawning new builder: ' + newName);
                        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    }
                }
                else { //----transporter----
                    if (totalTransporterParts < totalWorkParts) {
                        if (enAvail >= 1000) {
                            var newName = 'Transporter' + roomName + Game.time;
                            console.log('M>> Spawning new transporter: ' + newName);
                            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                        } else if (enAvail >= 600) {
                            var newName = 'Transporter' + roomName + Game.time;
                            console.log('M>> Spawning new transporter: ' + newName);
                            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                        } else if (enAvail >= 400) {
                            var newName = 'Transporter' + roomName + Game.time;
                            console.log('M>> Spawning new transporter: ' + newName);
                            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                        } else {
                            var newName = 'Transporter' + roomName + Game.time;
                            console.log('M>> Spawning new transporter: ' + newName);
                            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                        }
                    }
                }
            }
        }
        //----claimer----
        if (!Game.rooms[roomName].controller.my) {
            if (claimers.length < 1) {
                var newName = 'Claimer' + roomName + Game.time;
                console.log('M>> Spawning new claimer: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', loc: roomName } });
            }
        }
        //----fighter----
        if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).length > 0 && towerEn < 100) {
            if (fighters.length < 1) {
                if (enAvail >= 500) {
                    var newName = 'Fighter' + roomName + Game.time;
                    console.log('M>> Spawning new fighter: ' + newName);
                    Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE], newName, { memory: { role: 'fighter', loc: roomName } });
                } else {
                    var newName = 'Fighter' + roomName + Game.time;
                    console.log('M>> Spawning new fighter: ' + newName);
                    Game.spawns[spawnName].spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'fighter', loc: roomName } });
                }
            }
        }
        //----miner----
        let minerals = Game.rooms[roomName].find(FIND_MINERALS);
        // 遍历每个矿物
        for (let mineral of minerals) {
            // 判断矿物上是否已经建造了Extractor
            let extractors = mineral.pos.lookFor(LOOK_STRUCTURES, { filter: { structureType: STRUCTURE_EXTRACTOR } });
            if (extractors.length > 0 && mineral.mineralAmount > 0) {
                console.log(`矿物 ${mineral.mineralType} 可以采集`);
                if (miners.length < 1) {
                    if (enAvail >= 800) {
                        var newName = 'Miner' + roomName + Game.time;
                        console.log('M>> Spawning new miner: ' + newName);
                        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'miner', loc: roomName } });
                    }
                }
            } else {
                console.log(`矿物 ${mineral.mineralType} 上尚未建造Extractor`);
            }
        }
        //----alchemist----
        if (alchemists.length < 1) {
            let lab3 = Game.getObjectById(Memory.structures.lab3.id);
            if (lab3.mineralType) {
                Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], 'Alchemist1', {memory: {role: 'alchemist'}});
            }
        }

        //----show spawning----
        if (Game.spawns[spawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawnName].pos.x + 1,
                Game.spawns[spawnName].pos.y,
                { align: 'left', opacity: 0.8 });
        }

        //----find oldest creep----
        var age = 1500;
        //----call creeps to work----
        for (var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];
            //----find oldest creep----
            let life = creep.ticksToLive;
            if (life < age) {
                age = life;
                var oldest = creep;
            }
            //----call creeps to work----
            if (creep.memory.role == 'harvester' && creep.memory.loc == roomName) {
                roleHarvester.run(creep, roomName, sources);
            }
            if (creep.memory.role == 'upgrader' && creep.memory.loc == roomName) {
                roleUpgrader.run(creep, roomName, enAvail, storageStorage);
            }
            if (creep.memory.role == 'builder' && creep.memory.loc == roomName) {
                roleBuilder.run(creep, roomName, enAvail, storageStorage);
            }
            if (creep.memory.role == 'transporter' && creep.memory.loc == roomName) {
                roleTransporter.run(creep, roomName, sortedEnergys, tombstones, order);
            }
            if (creep.memory.role == 'claimer' && creep.memory.loc == roomName) {
                roleClaimer.run(creep, roomName);
            }
            if (creep.memory.role == 'fighter' && creep.memory.loc == roomName) {
                roleFighter.run(creep, roomName);
            }
            if (creep.memory.role == 'miner' && creep.memory.loc == roomName) {
                roleMiner.run(creep, roomName, minerals);
            }
            if (creep.memory.role == 'alchemist') {
                roleAlchemist.run(creep, order, tradeAmount, tradeCost);
            }
        }
    } //----room wise end----
    
    console.log(`M>> ${oldest} has ${age} ticks life`);

    //----test----
    // console.log('container ' + Game.getObjectById('650040e2dbe835a751c7c705').storage.store[RESOURCE_ENERGY] );
    // console.log(Game.getObjectById('65052ea2c34196660d3e9925').store[RESOURCE_OXYGEN]);

    var lab1 = Game.getObjectById(Memory.structures.lab1.id);
    var lab2 = Game.getObjectById(Memory.structures.lab2.id);
    var lab3 = Game.getObjectById(Memory.structures.lab3.id);
    lab3.runReaction(lab1, lab2);
    //----test end----
}