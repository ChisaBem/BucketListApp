const mongodb = require('mongodb');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');


// Get bucketlist item
router.get('/', async (req, res) => {
    try {
        const items = await loadItemsCollection();
        res.json({ success: true, data: await items.find({}).toArray()});
    } catch(error) {
        res.json({ sucess: false, message: error.message });
    }
});

// Get bucketlist item
router.get('/:id', async (req, res) => {
    try {
        const items = await loadItemsCollection();
        const item = await items.findOne({ _id: req.params.id });
        if (item)
            return res.json(item);
        return res.status(404).json({ success: false, message: 'No item found with this id'})

    } catch(error) {
        res.status(500).json({ sucess: false });
    }
});
  
  // Add bucketlist item
router.post('/', async (req, res) => {
    try {
        const items = await loadItemsCollection();
        await items.insertOne({
            _id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            createdAt: new Date()
        });
        res.status(201).json({ success: true });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

// update buckelist item
router.put('/:id', async (req, res) => {
    try {
        const items = await loadItemsCollection();
        let data = {};
        if (req.body.title) data['title'] = req.body.title;
        if (req.body.description) data['description'] = req.body.description;

        await items.updateOne({ _id: req.params.id }, 
            { $set: data })
        res.json({ success: true });
    } catch(error) {
        res.status(500).json({ sucess: false });
    }
});
  
// Delete Bucketlist item
router.delete('/:id', async (req, res) => {
    try {
        const items = await loadItemsCollection();
        await items.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    } catch(err) {
        res.status(500).json({ success: false });
    }
});

async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect(
      process.env.DB,
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('bucketlist').collection('items');
}

module.exports = router;
