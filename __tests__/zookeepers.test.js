const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const {zookeepers} = require('../data/zookeepers.json');

jest.mock('fs');
test("creates a zookeeper object",()=>{
    const zookeeper = createNewZookeeper(
        {name:"Darlene", id:"jhgd"},zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgd");
});

test("filters by query",()=>{
    const startingZookeepers = [
        {
            id:"2",
            name:"Raksha",
            age:31,
            favouriteAnimal: "penguin",
        },
        {
            id:"3",
            name:"Isabella",
            age:67,
            favouriteAnimal:"bear",
        },
    ];

    const updatedZookeepers = filterByQuery({age:31}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id",()=>{
    const startingZookeepers = [
        {
            id:"2",
            name:"Raksha",
            age:31,
            favouriteAnimal: "penguin",
        },
        {
            id:"3",
            name:"Isabella",
            age:67,
            favouriteAnimal:"bear",
        },
    ];

    const result = findById("3",startingZookeepers);

    expect(result.name).toBe("Isabella");
});

test("validates age", ()=>{
    const zookeeper = {
        id:"2",
        name:"Raksha",
        age:31,
        favouriteAnimal: "penguin",
    };

    const invalidZookeper = {
        id:"3",
        name:"Isabella",
        age:"67",
        favouriteAnimal:"bear",

    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});