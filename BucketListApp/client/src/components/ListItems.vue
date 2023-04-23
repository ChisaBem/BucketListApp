<script>
    import BucketListService from '../bucketlistService';
    import Spinner from './Spinner.vue'

    export default {
  components: { Spinner },
        name: 'ListItems',
        data() {
            return {
                title: '',
                description: '',
                items: [],
                error: '',
                loading: false,
                doingUpdate: false,
                selectedId: null
            }
        },
        async created() {
            try {
                this.loading = true;
                this.items = await BucketListService.getItems();
                this.loading = false;
            } catch(err) {
                this.error = err.message;
                this.loading = false;
            }
        },
        methods: {
            async addItem(e) {
                try {
                    this.loading = true;
                    e.preventDefault();
                    if (this.doingUpdate) {
                        await BucketListService.updateItem(this.selectedId, this.title, this.description);
                    } else {
                        await BucketListService.postItem(this.title, this.description);
                    }
                    this.title = '';
                    this.description = '';
                    this.items = await BucketListService.getItems();
                    this.loading = false;
                    this.doingUpdate = false;
                } catch(err) {
                    this.error = err.message;
                    this.loading = false;
                    this.doingUpdate = false;
                }
            },
            async updateItem(item, index) {
                try {
                    this.items.splice(index, 1);
                    this.title = item.title;
                    this.description = item.description;
                    this.selectedId = item._id;
                    this.doingUpdate = true;
                } catch(err) {
                    this.error = err.message;
                    this.loading = false;
                    this.doingUpdate = false;
                }
            },
            async deleteItem(id) {
                try {
                    this.loading = true;
                    await BucketListService.deleteItem(id);
                    this.items = await BucketListService.getItems();
                    this.loading = false;
                } catch(err) {
                    this.error = err.message;
                    this.loading = false;
                    this.doingUpdate = false;
                }
            }
        }
    }
</script>
<template>
    <div>
        <form>
            <label for="">Title</label>
            <input id="title" name="title" v-model="title" required placeholder="Enter a short title">
            <label for="">Description</label>
            <textarea name="description" v-model="description" required rows="2" placeholder="Enter a short description"></textarea> 
            <button type="submit" @click="addItem">Submit</button>
        </form>
        <p class="error" v-if="error">{{  error  }}</p>
        <Spinner :active="loading"/>
        <div class="item" 
            v-for="(item, index) in items"
            v-bind:item="item"
            v-bind:index="index"
            v-bind:key="item._id"
        >   
            <p class="topbar">
                <span>
                    <small>
                        {{ 
                            item.createdAt.toLocaleDateString('en-us', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                         }}
                    </small>
                </span>
                <span class="title">{{ item.title }}</span>
                <span class="icon">
                    <span id="edit" @click="updateItem(item, index)">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </span>
                    <span id="delete" @click="deleteItem(item._id)">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </span>
                </span>
            </p>
            <p>{{ item.description }}</p>
            
        </div>
        <div class="item" v-if="items.length === 0">
            No Items added
        </div>
    </div>
</template>

<style scoped>
    form {
    margin: 0 auto;
    margin-top: 1em;
    border: solid 1px rgb(16, 16, 56);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    width: 400px;
    background-color: #F0F0F0;
  }
  h3 {
    text-align: center;
  }
  input {
    width: 100%;
    height: 2em;
    padding: 5px;
    margin: 2px 0;
  }

  textarea {
    width: 100%;
    padding: 5px;
    margin: 2px 0;
  }

  button {
    width: 50%;
    height: 2em;
    margin: 0.3em auto;
    background-color: rgb(16, 16, 56);
    border: none;
    border-radius: 3px;
    color: #F0F0F0;
  }
    .item {
        margin: 10px auto;
        border: 1px solid grey;
        padding: 5px;
        width: 600px;
    }
    .item small {
        color: blue;
    }

    .title {
        margin-left: 5px;
        font-weight: bold;
    }
    .topbar {
        display: flex;
        justify-content: space-evenly;
    }
    .icon {
        margin-right: 2px;
        margin-left: auto;
    }

    #edit {
        margin: 10px;
        color: blue;
    }

    #delete {
        margin: 10px;
        color: red;
    }

    .error {
        margin-top: 5px;
        color: white;
        text-align: center;
        font-size: 10px;
        background-color: rgb(243, 47, 47);
        width: 100%;
        padding: 5px 10px;
    }

</style>
