/**
 * This class stores the data for the LRU Cache class.
 * It has 2 sets of pointers, denoted o for order and
 * h for hashMap. 
 * 
 * Order is meant for the access order pointers used to
 * maintain order of the nodes last used.
 * 
 * HashMap is meant for the custom hash map nodes that
 * it stores it in, since the hash map expects collisions.
 * It uses a doubly linked list to maintain the references.
 * 
 * Both systems use a doubly linked list pointer, since we
 * might access the Node by one set of pointers, but we'll
 * need to update both sets if we remove it.
 */
class LRUNode {
    /**
     * 
     * @param {LRUKey} key      - The key of the LRU Node
     * @param {Object[]} value  - The value stored in the node
     * @param {LRUNode} [oPrev] - the prev node in the ordered linked list
     * @param {LRUNode} [oNext] - the next node in the ordered linked list
     * @param {LRUNode} [hPrev] - The prev node in the hash map linked list
     * @param {LRUNode} [hNext] - The next node in the hash map linekd list
     */
    constructor(key, value, oPrev, oNext, hPrev, hNext) {
        this.key = key;
        this.value = value;
        this.oPrev = oPrev;
        this.oNext = oNext;
        this.hPrev = hPrev;
        this.hNext = hNext;
    }
}

/**
 * This is a Least Recently Used Cache. It's used to keep a minimal
 * storage of a pool of recently used data. It removes the least
 * recently used entry if the pool overfills. This is useful in OS,
 * but I think it's great for a simple way of preventing over caching 
 * too much information.
 * 
 * DESIGN
 * The design of this LRU cache is simple. It uses a simple linked
 * hash map. The oject keys need to have 1 parameter and 1 field,
 * the hashCode field and the equals() function. The hash map is
 * great for checking if an entry exists O(1) time. Within the hasmap
 * through is also a linked list. This doubly linked list connects
 * all stored nodes and has 2 dummy nodes at the start and end.
 * 
 * Both the hash map and the linked lists have their own set of
 * nodes in each LRU Node, but the hash map is only a unidirectional
 * linked list. the least recently used linked list is a doubly linked
 * list.
 * 
 * The doubly linked list is used to keep track of the usage sequence
 * of stored nodes.
 * 
 * 
 * This is a Least Recently Used Cache (LRU Cache) implementation.
 * This is used for storing the most important search results. This
 * isn't absolutely necessary for a client side approach, since
 * the client probably won't generate hundreds of thousands of
 * search queries. So, this is mostly better for server side, but
 * I'm adding this anyways.
 * 
 * An LRU cache is implemented with a hash table and the hash table
 * contains double linked list pointers (e.g. can go forward and
 * backward).
 * 
 * Also, another thing to note. Since our key is a compound key, and
 * we generated our own hash value. We need to be careful of collisions,
 * since we can't guarantee the key we used to insert into the Map is
 * unique.
 * 
 * There are 2 approaches that I can think of for this issue.
 *  1) create a Map object, but store all collision entries in an
 *     array (e.g. buckets. Also called separate chaining)
 *  2) array form but use linear probing to insert entries, but makes
 *     worst case checking O(n) if the size of the array is too small.
 * 
 * I'll do separate chaining again, so O(n) worst case search. Just cause
 * I haven't made it so I can rehash the whole table. 
 * 
 * ASSUMPTIONS: All inputs for the key entry requires the field 
 * "hashCode" since this class doesn't hash the value itself. It
 * relies on the external class to supply a hash value.
 */
export default class LRUCache {

    /**
     * @param {number} maxsize - The max size of the LRU cache and
     *                              the size of the hash map.
     */
    constructor(maxsize = 20) {

        // Create Nodes to maintain order of access linked list
        const startDummyNode = new LRUNode(null, null);
        const endDummyNode = new LRUNode(null, null);
        startDummyNode.oNext = endDummyNode;
        endDummyNode.oPrev = startDummyNode;

        // initialize fields
        this.maxsize = maxsize > 0 ? maxsize : 20;
        this.size = 0;
        this.table = Array(maxsize).fill(null);
        this.start = startDummyNode;
        this.end = endDummyNode

        // Initializes each array entry to have a node
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = new LRUNode(null, null);
        }

    }

    /**
     * This function inserts a value into the LRU cache and stores it.
     * It will also remove an old entry if it exceeds the maxsize.
     * 
     * @param {LRUKey} key 
     * @param {Object} value 
     */
    insert(key, value) {
        if (key == null || value == null) return;

        // we can assume that the table entry already has an entry.
        let node = this.table[this.generateHashIndex(key.hashCode)];

        while (node.hNext != null) {
            node = node.hNext;

            // If the key is already in storage
            if (node.key.equals(key)) {

                // rotate to front
                this.removeAndAddToStart(node);
                return;
            }
        }

        // we can now assume node is right before end of list, so insert in
        const newNode = new LRUNode(key, value);

        // update hash map references
        node.hNext = newNode;
        newNode.hPrev = node;

        // update order references
        this.addToLinkedListHead(newNode);
    }

    /**
     * This function is called when either inserting a duplicate
     * entry found (e.g. we put it at the head of the linked list),
     * or when we call a retrieve.
     * @param {LRUNode} node 
     */
    removeAndAddToStart(node) {

        // If not already at the start
        if (node.oPrev.key != null) {
            node.oNext.oPrev = node.oPrev;
            node.oPrev.oNext = node.oNext;
            node.oNext = this.start.oNext;
            node.oPrev = this.start;
            this.start.oNext.oPrev = node;
            this.start.oNext = node;
        }

    }

    /**
     * This function adds the node to the
     * head of the access order linked list. 
     * It assumes that the node is not already
     * in the linked list.
     * 
     * @param {LRUNode} node 
     */
    addToLinkedListHead(node) {

        // Increment size
        this.size++;

        // updates pointers
        node.oNext = this.start.oNext;
        node.oPrev = this.start;
        this.start.oNext.oPrev = node;
        this.start.oNext = node;

        // checks for overflow
        if (this.size > this.maxsize) {
            this.size--;

            // Remove the last node from it's pointers
            const lastNode = this.end.oPrev;

            // updates ordered linked list
            lastNode.oPrev.oNext = lastNode.oNext;
            lastNode.oNext.oPrev = lastNode.oPrev;

            // updates hash map linked list
            lastNode.hPrev.hNext = lastNode.hNext;
            if (lastNode.hNext != null) { // hash map linked list only has 1 dummy node, so can't assume next one has.
                lastNode.hNext.hPrev = lastNode.hPrev;
            }

        }

    }

    /**
     * This function checks if the given key exists in the 
     * map.
     * 
     * @param {LRUKey} key 
     */
    has(key) {
        if (key == null) {
            return false;
        }

        let node = this.table[this.generateHashIndex(key.hashCode)];
        while (node.hNext != null) {
            node = node.hNext;

            if (node.key.equals(key)) {
                return true;
            }
        }

        return node.key != null ? key.equals(node.key) : false;
    }

    /**
     * This function returns the stored cache information mapped to the
     * key object.
     * 
     * @param {LRUKey} key 
     * @returns 
     */
    retrieve(key) {
        
        if (key == null) {
            return null;
        }

        let node = this.table[this.generateHashIndex(key.hashCode)];

        while (node.hNext != null) {
            node = node.hNext;

            if (node.key.equals(key)) {
                this.removeAndAddToStart(node);
                return node.value;
            }
        }
        return null;
    }


    /**
     * Since we have our own built in
     * hash table, we need to map the
     * bins to their corresponding 
     * 
     * @param {number} hashCode 
     */
    generateHashIndex(hashCode) {
        return hashCode % this.maxsize;
    }


}