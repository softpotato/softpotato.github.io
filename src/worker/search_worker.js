import PostStorage from "../state/post_storage";
import SearchInput from "../state/search_input";
/**
 * WEB WORKER NOTES
 * Reference: https://webpack.js.org/guides/web-workers/
 * 
 * There are a few tutorials online about creating web workers
 * in react or JavaScript. However, some of them are for just
 * JavaScript (e.g. we don't need to deal with webpack) or
 * just old and outdated solution (e.g. webpack already has
 * a method for creating web workers). As referenced in the
 * docs above, if we follow webpack's method for creating
 * web workers, we can easily import all necessary classes
 * and files directly into the web worker. 
 * 
 * IMPLEMENTATION
 * This web worker handles initialization of the search
 * pool, search function calls, and some LRU caching.
 * 
 * Also, just to add a note. We'll be using a lot of self
 * references in this implementation, due to me storing
 * some fields in the thread's global state. 
 */

/**
 * Global fields for the web worker. We can assume
 * that the initialization will come first, and that
 * will trigger the self.initialized field.
 */
// eslint-disable-next-line no-restricted-globals
self.initialized = false;
// eslint-disable-next-line no-restricted-globals
self.postStore = null;

/**
 * This is the primary web worker thread. It's
 * a single event caller that will run all passed
 * in actions in a queue.
 * 
 * @param {Object} param0 
 */
// eslint-disable-next-line no-restricted-globals
self.onmessage = (message) => {

    /**
     * Initialization Sequence. Registers all JSON objects
     * into the pool.
     */
    // eslint-disable-next-line no-restricted-globals
    if (!self.initialized) {

        // eslint-disable-next-line no-restricted-globals
        self.initialized = true;
        // eslint-disable-next-line no-restricted-globals
        self.postStore = new PostStorage(message.data);

        // eslint-disable-next-line no-restricted-globals
        postMessage(self.postStore.getTags()); // returns the generated tag groups

        /**
         * Search Query Process. Will return the corresponding post information.
         */
    } else {

        // Note: we needed to convert the passed in object, since passing
        // objects copy their field, but lose their methods.

        // eslint-disable-next-line no-restricted-globals
        const result = self.postStore.search(SearchInput.addMethodsToDummy(message.data));

        // eslint-disable-next-line no-restricted-globals
        postMessage({key: message.data, value: result});
    }

};