const express = require('express');
const data = require('../db/stores.json');
const allStores = data;

const StoreRouter = express.Router();

//מציג את כל החנויות ואת כל הפריטים שיש בכל חנות 
StoreRouter.get('/', async (req, res) => {
    res.status(200).json(allStores);
});

//  מציג את החנות הרלוונטית וכל הפריטים הקיימים בה. במידה והחנות אינה קיימת יש להציג הודעה מתאימה. 
StoreRouter.get(`/:storeId`, async (req, res) => {
    let {
        storeId
    } = req.params;

    let stores = allStores.find((s) => s.id == storeId);

    if (stores) {
        res.status(200).json(stores);
    } else {
        res.status(404).json({
            message: "store not found"
        });
    }
});
// מציג מוצר מסוים בחנות מסוימת. במידה ואין, יש להציג הודעה מתאימה. // get specific item from store
StoreRouter.get('/:storeId/:itemId', async (req, res) => {
    let {
        storeId,
        itemId
    } = req.params;

    let item = allStores.find((store) => store.id == storeId)?.items.find((item) => item.id == itemId);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({
            message: "product not found"
        });
    }
});

//הוספת חנות לקובץ json 
StoreRouter.post('/add', async (req, res) => {
    let {
        id,
        storeName,
        city,
        items
    } = req.body;

    let store = {
        id,
        storeName,
        city,
        items
    }
    allStores.push(store)
    res.status(201).json(allStores);
})

//הוספת פריט למערת הפריטים של חנות מסוימת
StoreRouter.post('/:storeId/items/add', async (req, res) => {
    let {
        storeId
    } = req.params;

    let {
        id,
        name,
        price,
        discount,
        pic
    } = req.body;

    let item = {
        id,
        name,
        price,
        discount,
        pic
    }

    let checkStore = allStores.find((item) => item.id == storeId)
    if (checkStore) {
        let CheckItem = checkStore.items.find((i) => i.name == item.name);
        if (CheckItem) {
            res.status(404).json({
                message: "this item already exist in the store"
            })
        } else {
            checkStore.items.push(item);
            res.status(201).json(item)
        }
    } else {
        res.status(404).json({
            message: "store not found"
        })
    }
})

module.exports = StoreRouter;