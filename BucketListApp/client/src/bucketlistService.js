import axios from 'axios';

const url = 'api/items/';

class BucketListService {
    // get items
    static getItems() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data.data;
                resolve(
                    data.map(item => ({
                        ...item,
                        createdAt: new Date(item.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    };

    // get item
    static getitem(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + id);
                const data = res.data;
                resolve(
                    data.createdAt = new Date(data.createdAt)
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    // update an item
    static updateItem(id, title, description) {
        return axios.put(url + id, {
            title,
            description
        });
    };

    // create an item
    static postItem(title, description) {
        return axios.post(url, {
            title,
            description
        });
    };

    // delete post
    static deleteItem(id) {
        return axios.delete(url + id);
    }
}

export default BucketListService;
