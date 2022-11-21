import LRUCache from "./lru_cache";
import { until } from "./utils";


/**
 * This is the primary interface to the post
 * storage system. This hides the LRU caches,
 * web workers, and post storage system.
 * This is intended to be stored as a static
 * class in the root of the project.
 * 
 * Note:
 * The actual search list is not stored here.
 * This merely stores the last few queries made.
 * the actual list per page is stored on the
 * pages themselves. This class is more of
 * an interface to generate the search results.
 * 
 * Reminder:
 * By default, this class needs to generate
 * search pages for projects, tutorials, and
 * tools. These pages will query like the search
 * page, but these need to be generated on
 * initialization. The page state will remain
 * mutated for the duration of the user's 
 * stay on the page till the next time they
 * re-open the page.
 * 
 * Side Note:
 * You could make this a singleton, but that 
 * would make testability more difficult or
 * annoying. I've also heard that singletons
 * aren't that great of a pattern and they're
 * not necessary at all, so I'll just keep
 * the state at the root of the project 
 * instead and pass down a reference to all necessary
 * components.
 * 
 * Additional Note:
 * The cache in this class stores ONLY the
 * complete JSON parse result. This doesn't
 * store any intermediate results.
 * 
 * IMPORTANT NOTE:
 * Objects that get passed through the web worker
 * lose all function properties. The only thing
 * it deep copies are it's fields, but functions
 * which are stored in prototype are removed/ignored
 * on copy.
 * 
 * @param {Object} JSONObjects
 */
export default class BlogStateManager {
    constructor(JSONObjects) {

        this.cache = new LRUCache(20);
        this.messageQueue = []; // this stores the callback functions and search objects in a queue
        this.worker = new Worker(new URL('../worker/search_worker.js', import.meta.url));
        this.initialized = false; // only used to determine if the message passed is initialization or not
        this.tags = null; // tags not initialized yet

        // sets the worker's actions
        this.worker.onmessage = (message) => {
            if (!this.initialized) { // initialization
                this.initialized = true;
                this.tags = message.data; // updates stored tags
            } else { // search message queries
                const [searchInput, callback] = this.messageQueue.shift(); // inefficient since it could be O(n), but queue is small enough
                
                this.cache.insert(searchInput, message.data.value);
                callback(message.data.value);

            }
        };

        // Passes the mapping of posts to the web worker
        this.worker.postMessage(JSONObjects);
    }

    /**
     * 
     * Due to the asynchronous behavior of a web worker, we'll
     * need to pass callback functions for it to call when it
     * finalizes it's operations. We'll use a queue to store
     * callback functions and update the UI appropriately.
     * 
     * TODO: 
     *  Create test case to make sure that the queue works
     *  properly.
     * 
     * @param {SearchInput} searchInput 
     * @param {function} callback
     * 
     * Additional Note:
     *      If you're worried that the web worker will not be ready if initialized or
     *      that multiple search queries will cause race conditions, you don't have
     *      to worry. The web worker is a synchronous thread that uses a queue to
     *      queue up all messages.
     * 
     * https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
     */
    searchPosts(searchInput, callback) {

        // If the cache has a value, then 
        if (this.cache.has(searchInput)) {
            callback(this.cache.retrieve(searchInput));
            return;
        }

        // otherwise, log the callback into the queue and pass the message
        this.messageQueue.push([searchInput, callback]);
        this.worker.postMessage(searchInput);

    }

    /**
     * This might be just bad programming. Getting tags
     * is an asynchronous function till the class is
     * finally initialized in the external thread, otherwise
     * this waits untill the post storage has finally initialized.
     * 
     * citation: https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
     */
    async getTags() {
        await until(_ => this.tags != null);

        return this.tags;
    }

}