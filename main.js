var consData = require('cons.data');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleTransporter = require('role.transporter');
var roleClaimer = require('role.claimer');
var roleFighter = require('role.fighter');
var roleMiner = require('role.miner');
var roleAlchemist = require('role.alchemist');
var roleLink = require('role.link');
// var roleDoctor = require('role.doctor');
var roleMelee = require('role.melee');

module.exports.loop = function () {
    console.log('🔻~~~~~~~~~~~~~~~~~~~~~~Tick~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~🔻');
    //----setup memory: structures----
    consData.run();

    //----setup trade----
    var orderId1 = '654b2b0c9a89e1324971dea1'; //my 6528f9dd2ffd9917b792206d
    var orderId2 = '653723e59a89e12968e00046'; //my 653723e59a89e12968e00046, 653724b69a89e1c6e2e045fd
    var orderId3 = '655b2e0ec112ef00129f12ff'; //my 6540cca79a89e13ce8143925, 653724b69a89e1c6e2e045fd
    var orderId4 = '6556d020a0ff73be3616c4ca'; //my 6556d020a0ff73be3616c4ca, 
    // Game.market.deal('6536d07f9a89e1f679c46d5a', 00, 'W2N27');
    var order1 = Game.market.getOrderById(orderId1);
    var order2 = Game.market.getOrderById(orderId2);
    var order3 = Game.market.getOrderById(orderId3);
    var order4 = Game.market.getOrderById(orderId4);

    // Game.market.createOrder({ type: ORDER_SELL, resourceType: RESOURCE_UTRIUM_HYDRIDE, price: 100, totalAmount: 1000, roomName: "W2N27" });
    // Game.market.createOrder({ type: ORDER_BUY, resourceType: RESOURCE_HYDROGEN, price: 111, totalAmount: 1000, roomName: "W2N27" });
    // Game.rooms['W5N28'].terminal.send('energy', 1000, 'W4N28');

    // let goodOrders = Game.market.getAllOrders(order => 
    //     order.resourceType == RESOURCE_OXIDANT &&
    //     order.type == ORDER_BUY &&
    //     order.remainingAmount > 1000);
    // let bestOrder = _.max(goodOrders, (order) => order.price);
    // if (bestOrder.price > 410) {
    //     Memory.bestOrder = bestOrder;
    //     Game.market.deal(bestOrder.id,1000,'W2N27');
    // }

    var room1 = 'W2N27';
    var room2 = 'W1N27';
    var room3 = 'W4N28';
    var room4 = 'W5N28';
    var room5 = 'W3N28';
    var myRooms = [];
    var reserveRooms = [];
    myRooms.push(room1);
    myRooms.push(room2);
    myRooms.push(room3);
    myRooms.push(room4);
    // myRooms.push(room5);
    reserveRooms.push(room5);
    // console.log(myRooms);
    var dismantleTarget = ''; //----recycle some buildings for builder----

    //----link----
    // if (link1.store[RESOURCE_ENERGY] >= 400 && link2.store[RESOURCE_ENERGY] < 400) {
    //     link1.transferEnergy(link2);
    // }
    roleLink.run();

    delete Memory.rooms;
    //----room wide----
    for (let roomName of myRooms) {
        //----set room order----
        switch (roomName) {
            case room1:
                var order = order1;
                break;
            case room2:
                var order = order2;
                break;
            case room3:
                var order = order3;
                break;
            case room4:
                var order = order4;
                break;
            default:
                var order = order1;
        }
        let tradeAmount = 2000;
        if (order) {
            tradeAmount = order.remainingAmount;
            var tradeCost = Game.market.calcTransactionCost(tradeAmount, 'W2N27', order.roomName);
            console.log(`Order ID: ${order.id}, Resource Type: ${order.resourceType}, Room: ${order.roomName}, Price: ${order.price}, Amount: ${order.amount}, Remaining: ${order.remainingAmount}, Cost: ${tradeCost} per ${tradeAmount}`);
        }

        let thisRoom = Game.rooms[roomName];
        console.log(roomName + thisRoom);
        if (Game.rooms[roomName] && Game.rooms[roomName].controller.my) {
            var roomLevel = Game.rooms[roomName].controller.level;
            var enAvail = Game.rooms[roomName].energyAvailable;
        }
        //----show energy----
        let controllerProgress = Game.rooms[roomName].controller.progress;
        let controllerProgressTotal = Game.rooms[roomName].controller.progressTotal;
        console.log('🏰 M>> >>>>>>>> Room: ' + roomName + ', level ' + roomLevel + ', ' + controllerProgress + '/' + controllerProgressTotal + ' = ' + Math.round(controllerProgress * 100 / controllerProgressTotal) + '%, spawn en: ' + enAvail + ' <<<<<<<<<<<<<🏰');
        //----count extensions storage----
        let extensionEnergy = 0;
        let extensions = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        if (extensions.length > 0) {
            // var extensionCount = extensions.length;
            var extensionCapacity = extensions[0].store.getCapacity(RESOURCE_ENERGY);
            // console.log(`M>> Room ${roomName} has ${extensionCount} extensions.`);
        }
        for (let extension of extensions) {
            extensionEnergy += extension.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        //----storage of storage----
        let storage = Game.rooms[roomName].storage;
        if (storage) {
            var storageStorage = storage.store.getUsedCapacity(RESOURCE_ENERGY);
        } else { storageStorage = 0; }
        // console.log('🟡 M>> stg: ' + storageStorage + ', exen: ' + extensionEnergy + '/' + extensionCount * extensionCapacity + ', ext: ' + extensionCount);
        //----container storage----
        let containerEn = 0;
        let containers = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        if (containers.length > 0){
            let containerCapacity = containers[0].store.getCapacity();
        
            for (let container of containers) {
                containerEn += container.store[RESOURCE_ENERGY];
            }
            // console.log('🟡 M>> Containers ' + containers.length + ', energy: ' + containerEn);
            console.log('🟡 M>> stg: ' + storageStorage + ', ext: ' + extensions.length + ', exen: ' + extensionEnergy + '/' + extensions.length * extensionCapacity + ', Ctn ' + containers.length + ', en: ' + containerEn + '/' + containerCapacity * containers.length);
        }
        
        //----find dropped energy----
        let droppedEnergy = Game.rooms[roomName].find(FIND_DROPPED_RESOURCES
            , {
                filter: (resource) => {
                    return resource.amount > 10;
                }
            }
        );
        let sortedEnergys = _.sortBy(droppedEnergy, (drop) => {
            if (drop.resourceType === RESOURCE_ENERGY) {
                return -drop.amount; // 能量数量越多，排序越靠前
            }
        });
        for (let drop of sortedEnergys) {
            console.log('🟡🟡 M>> energy on floor: ' + drop.room.name + ':' + drop.pos.x + ',' + drop.pos.y + ': ' + drop.amount);
            // 获取资源的位置和数量
            const { x, y } = drop.pos;
            const amount = drop.amount;

            // 在资源的位置上绘制一个圆圈
            Game.rooms[roomName].visual.circle(x, y, { radius: 0.4, fill: 'yellow', opacity: 0.5 });

            // 在资源的位置上绘制资源的数量
            Game.rooms[roomName].visual.text(amount.toString(), x, y + 0.5, { color: 'white', font: 0.5 });
        }
        //----find tombstone----
        let tombstones = Game.rooms[roomName].find(FIND_TOMBSTONES, {
            filter: (tombstone) => {
                return _.sum(tombstone.store) > 0;
            },
            // 按存储量从大到小排序
            sort: (a, b) => _.sum(b.store) - _.sum(a.store)
        }).concat(Game.rooms[roomName].find(FIND_RUINS, {
            filter: ruin => ruin.store.getUsedCapacity() > 0
        }));
        if (tombstones.length > 0) {
            console.log('🟡🟡 M>> sources in TOMB: ' + tombstones[0] + ': ' + _.sum(tombstones[0].store));
        }
        //----count available harvest spots----
        let sources = Game.rooms[roomName].find(FIND_SOURCES);
        for (let source of sources) {
            let countharvester = _.filter(Game.creeps, (creep) => creep.memory.workingSlot == source.id);
            console.log('⛏️ M>> ' + countharvester.length + ' creeps harvesting ' + source);
        }
        // sourceSpot.push({id:'5bbcaccf9099fc012e6363ed',count:1});
        // sources.push(Game.getObjectById('5bbcaccf9099fc012e6363ed'));
        // console.log(sourceSpot[2].id);

        //----miner----
        let minerals = Game.rooms[roomName].find(FIND_MINERALS);

        //----call tower----
        let towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        let towerEn = 0;
        for (let tower of towers) {
            roleTower.run(tower, storageStorage, dismantleTarget);
            towerEn += tower.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        // console.log('M>> tower EN total: ' + towerEn);

        //----clear memory----
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
                console.log('🗑️ M>> Clearing non-existing creep memory: ' + creepName);
            }
        }

        //----count creep by roles----
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.loc == roomName);
        let totalWorkParts = _.sum(_.map(harvesters, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.loc == roomName);
        let totalUpgraderParts = _.sum(_.map(upgraders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.loc == roomName);
        let totalBuildParts = _.sum(_.map(builders, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.loc == roomName);
        let totalTransporterParts = _.sum(_.map(transporter, (creep) => creep.body.filter((part) => part.type === CARRY).length));
        let claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.loc == roomName);
        let totalClaimParts = _.sum(_.map(claimers, (creep) => creep.body.filter((part) => part.type === CLAIM).length));
        let fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter' && creep.memory.loc == roomName);
        let melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee' && creep.memory.loc == roomName);
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.loc == roomName);
        let totalMineParts = _.sum(_.map(miners, (creep) => creep.body.filter((part) => part.type === WORK).length));
        let alchemists = _.filter(Game.creeps, (creep) => creep.memory.role == 'alchemist' && creep.memory.loc == roomName);
        console.log('🏷️ M>> Harvesters: ' + harvesters.length + ', WORK:' + totalWorkParts + ', energy+' + totalWorkParts * 2);
        console.log('🏷️ M>> Upgrader: ' + upgraders.length + ', WORK:' + totalUpgraderParts + ', energy-' + totalUpgraderParts + ' |️ M>> Claimer: ' + claimers.length + ', claims:' + totalClaimParts);
        console.log('🏷️ M>> Transporter: ' + transporter.length + ', CARRY:' + totalTransporterParts + ', cargo:' + totalTransporterParts * 50);
        console.log('🏷️ M>> Builder: ' + builders.length + ', WORK:' + totalBuildParts + ' |️ M>> Fighter: ' + fighters.length + ' | M>> Melee: ' + melees.length);
        console.log('🏷️ M>> Miners: ' + miners.length + ', WORK:' + totalMineParts + ' |️ M>> Alchemist: ' + alchemists.length);

        //----spawning creeps----
        let spawnName = '';
        // var spawn = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0];
        // if (spawn && Game.rooms[roomName].controller.my) {
        //     var spawnName = spawn.name;
        // } else {
        //     var spawnName = 'SpawnW4N28';
        // }
        let spawnsInRoom = Game.rooms[roomName].find(FIND_MY_SPAWNS);
        for (let s of spawnsInRoom) {
            if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).length > 0 && towerEn < 100) {
                s.memory.restTime = 0;
                spawnName = s.name;
                break;
            }
            else if (s.memory.restTime > 0) {
                s.memory.restTime--;
            }
            else if (!s.Spawning && (s.memory.restTime == 0 || !s.memory.restTime)) { // && (s.memory.restTime == 0 || !s.memory.restTime)
                spawnName = s.name;
                break;
            }
        }
        if (spawnsInRoom.length == 0) {
            spawnName = 'Spawn1';
        }
        else if (!spawnName || spawnName == '') {
            spawnName = spawnsInRoom[0].name;
        }
        // else if (spawn && Game.rooms[roomName].controller.my) {
        //     var spawnName = 'SpawnW4N28';
        // }
        let spawn = Game.spawns[spawnName];
        console.log(spawnName + ':' + spawn.memory.restTime);

        if (spawn.memory.restTime > 0) {
            // spawn.memory.restTime--;
        } else {
            // console.log('M>> ----spawner: ' + spawnName);
            if (totalWorkParts < sources.length * 5 && Game.rooms[roomName].controller.my) { //----harvester----
                if (enAvail >= 900) {
                    let newName = roomName + 'Hv' + Game.time;
                    console.log('M>> Spawning new harvester: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 183;
                } else if (enAvail >= 700) {
                    let newName = roomName + 'Hv' + Game.time;
                    console.log('M>> Spawning new harvester: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 177;
                } else if (enAvail >= 500) {
                    let newName = roomName + 'Hv' + Game.time;
                    console.log('M>> Spawning new harvester: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                    spawn.memory.restTime = 171;
                } else {
                    let newName = roomName + 'Hv' + Game.time;
                    console.log('M>> Spawning new harvester: ' + newName);
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', loc: roomName } });
                }
            }
            else if (upgraders.length < 1 && Game.rooms[roomName].controller.my) { //----upgrader----
                if (enAvail >= 1500 && sources.length > 1) {
                    let newName = roomName + 'Up' + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 204;
                } else if (enAvail >= 900) {
                    let newName = roomName + 'Up' + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 183;
                } else if (enAvail >= 650) {
                    let newName = roomName + 'Up' + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 174;
                } else if (enAvail >= 500) {
                    let newName = roomName + 'Up' + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                    spawn.memory.restTime = 171;
                } else {
                    let newName = roomName + 'Up' + Game.time;
                    console.log('M>> Spawning new upgrader: ' + newName);
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader', loc: roomName } });
                }
            }
            else if (builders.length < 1 && Game.rooms[roomName].controller.my) { //----builder----
                if (enAvail >= 1600) {
                    let newName = roomName + 'Bd' + Game.time;
                    console.log('M>> Spawning new builder: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 213;
                }
                else if (enAvail >= 1200) {
                    let newName = roomName + 'Bd' + Game.time;
                    console.log('M>> Spawning new builder: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 198;
                }
                else if (enAvail >= 900) {
                    let newName = roomName + 'Bd' + Game.time;
                    console.log('M>> Spawning new builder: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 186;
                }
                else if (enAvail >= 500) {
                    let newName = roomName + 'Bd' + Game.time;
                    console.log('M>> Spawning new builder: ' + newName);
                    spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                    spawn.memory.restTime = 171;
                }
                else {
                    let newName = roomName + 'Bd' + Game.time;
                    console.log('M>> Spawning new builder: ' + newName);
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'builder', loc: roomName } });
                }
            }
            else if (transporter.length < 2 && Game.rooms[roomName].controller.my) { //----transporter----
                if (enAvail >= 1500) {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 210;
                } else if (enAvail >= 1000) {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 198;
                } else if (enAvail >= 800) {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 186;
                } else if (enAvail >= 600) {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 180;
                } else if (enAvail >= 400) {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                    spawn.memory.restTime = 174;
                } else {
                    let newName = roomName + 'Tr' + Game.time;
                    console.log('M>> Spawning new transporter: ' + newName);
                    spawn.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'transporter', loc: roomName } });
                }
            }
            //----claimer----
            if (!Game.rooms[roomName].controller.my) {
                if (claimers.length < 1) {
                    let newName = roomName + 'Cl' + Game.time;
                    console.log('M>> Spawning new claimer: ' + newName);
                    spawn.spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', loc: roomName } });
                    spawn.memory.restTime = 156;
                }
            }
            //----fighter----
            if ((Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).length > 0 || Game.rooms[roomName].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_INVADER_CORE)}})) && towerEn < 100) {
                if (fighters.length < 1) {
                    if (enAvail >= 550) {
                        let newName = roomName + 'Ft' + Game.time;
                        console.log('M>> Spawning new fighter: ' + newName);
                        spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK], newName, { memory: { role: 'fighter', loc: roomName , destiny: roomName} });
                        // Game.spawns['SpawnW4N28'].spawnCreep([MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK], 'FighterW5N28', { memory: { role: 'fighter', loc: 'W4N28', destiny:'W5N28' } });
                    } else {
                        let newName = roomName + 'Ft' + Game.time;
                        console.log('M>> Spawning new fighter: ' + newName);
                        spawn.spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'fighter', loc: roomName } });
                    }
                }
            }

            // 遍历每个矿物
            for (let mineral of minerals) {
                // 判断矿物上是否已经建造了Extractor
                let extractors = mineral.pos.lookFor(LOOK_STRUCTURES, { filter: { structureType: STRUCTURE_EXTRACTOR } });
                if (extractors.length > 0 && mineral.mineralAmount > 0) {
                    console.log(`M>> 矿物 ${mineral.mineralType} 可以采集 ${mineral.mineralAmount}`);
                    if (miners.length < 1) {
                        if (enAvail >= 1600) {
                            let newName = roomName + 'Mn' + Game.time;
                            console.log('M>> Spawning new miner: ' + newName);
                            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'miner', loc: roomName } });
                            spawn.memory.restTime = 195;
                        }
                        else if (enAvail >= 800) {
                            let newName = roomName + 'Mn' + Game.time;
                            console.log('M>> Spawning new miner: ' + newName);
                            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'miner', loc: roomName } });
                            spawn.memory.restTime = 177;
                        }
                    }
                } else {
                    console.log(`M>> 矿物 ${mineral.mineralType} 上尚未建造Extractor`);
                }
            }
            //----alchemist----
            let labs = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LAB;
                }
            });
            if (alchemists.length < 1 && labs.length > 0) {
                let newName = roomName + 'Al' + Game.time;
                console.log('M>> Spawning new alchemist: ' + newName);
                spawn.spawnCreep([CARRY, CARRY, MOVE], newName, { memory: { role: 'alchemist', loc: roomName } });
                spawn.memory.restTime = 159;
            }
        }

        //----show spawning----
        if (spawn.spawning) {
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        }

        //----find oldest creep----
        var age = 1500;
        //----call creeps to work----
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];
            //----find oldest creep----
            let life = creep.ticksToLive;
            if (life < age) {
                age = life;
                var oldest = creep;
            }
            if (creep.memory.loc == roomName) {
                Game.rooms[roomName].memory[creepName] = life;
                //----call creeps to work----
                switch (creep.memory.role) {
                    case 'harvester':
                        var workResult = roleHarvester.run(creep, roomName, sources);
                        break;
                    case 'upgrader':
                        var workResult = roleUpgrader.run(creep, roomName, enAvail, storageStorage);
                        break;
                    case 'builder':
                        var workResult = roleBuilder.run(creep, roomName, enAvail, storageStorage, dismantleTarget);
                        break;
                    case 'transporter':
                        var workResult = roleTransporter.run(creep, roomName, sortedEnergys, tombstones, order);
                        break;
                    case 'claimer':
                        var workResult = roleClaimer.run(creep, roomName, 'my');
                        break;
                    case 'fighter':
                        var workResult = roleFighter.run(creep, roomName, dismantleTarget);
                        break;
                    case 'miner':
                        var workResult = roleMiner.run(creep, roomName, minerals);
                        break;
                    case 'alchemist':
                        var workResult = roleAlchemist.run(creep, roomName, order, tradeAmount, tradeCost);
                        break;
                    case 'melee':
                        var workResult = roleMelee.run(creep, roomName, dismantleTarget);
                        break;
                }
            }

        }
    } //----room wide end----

    //----reserve room wide----
    // for (let roomName of reserveRooms) {
    //     //----count creep by roles----
    //     var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.loc == roomName);
    //     var totalClaimParts = _.sum(_.map(claimers, (creep) => creep.body.filter((part) => part.type === CLAIM).length));
    //     let fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter' && creep.memory.loc == roomName);
    //     console.log('🏷️ M>> Claimer: ' + claimers.length + ', claims:' + totalClaimParts);


    //     //----spawning creeps----
    //     let spawnsInRoom = Game.rooms[roomName].find(FIND_MY_SPAWNS);
    //     let spawn = spawnsInRoom[0];
    //     if (spawn && Game.rooms[roomName].controller.my) {
    //         var spawnName = spawn.name;
    //     } else {
    //         var spawnName = 'SpawnW4N28';
    //     }
    //     //----claimer----
    //     if (!Game.rooms[roomName].controller.my) {
    //         if (claimers.length < 1) {
    //             var newName = 'Claimer' + roomName + Game.time;
    //             console.log('M>> Spawning new claimer: ' + newName);
    //             Game.spawns[spawnName].spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', loc: roomName } });
    //         }
    //     }
    //     //----fighter----
    //     if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).length > 0 && towerEn < 100) {
    //         if (fighters.length < 1) {
    //             if (enAvail >= 550) {
    //                 let newName = roomName + 'Ft' + Game.time;
    //                 console.log('M>> Spawning new fighter: ' + newName);
    //                 spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK], newName, { memory: { role: 'fighter', loc: roomName } });
    //                 // Game.spawns['SpawnW4N28'].spawnCreep([MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK,MOVE, ATTACK, ATTACK], 'FighterW5N28', { memory: { role: 'fighter', loc: 'W4N28', destiny:'W5N28' } });
    //             } else {
    //                 let newName = roomName + 'Ft' + Game.time;
    //                 console.log('M>> Spawning new fighter: ' + newName);
    //                 spawn.spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'fighter', loc: roomName } });
    //             }
    //         }
    //     }

    //     //----find oldest creep----
    //     var age2 = 1500;
    //     //----call creeps to work----
    //     for (let creepName in Game.creeps) {
    //         let creep = Game.creeps[creepName];
    //         //----find oldest creep----
    //         let life = creep.ticksToLive;
    //         if (life < age2) {
    //             age2 = life;
    //             var oldest = creep;
    //         }
    //         //----call creeps to work----
    //         if (creep.memory.role == 'claimer' && creep.memory.loc == roomName) {
    //             roleClaimer.run(creep, roomName, 'my');
    //         }
    //     }
    // }
    //----reserve room wide end----

    console.log(`⚰️ M>>>> ${oldest} has ${age} ticks life>>>>`);

    //----test----
    // console.log('container ' + Game.getObjectById('650040e2dbe835a751c7c705').storage.store[RESOURCE_ENERGY] );
    // console.log(Game.getObjectById('65052ea2c34196660d3e9925').store[RESOURCE_OXYGEN]);

    // var lab1 = Game.getObjectById(Memory.structures.lab1.id);
    // var lab2 = Game.getObjectById(Memory.structures.lab2.id);
    // var lab3 = Game.getObjectById(Memory.structures.lab3.id);
    // lab3.runReaction(lab1, lab2);
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }
    //----test end----
}