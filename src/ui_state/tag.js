/**
 * This is an enum for managing tag states.
 */
export const TAGSTATES = {
    UNSELECTED: 'unselected',
    INCLUDED: 'included',
    EXCLUDED: 'excluded'
};

/**
 * This class primarily acts as a wrapper to allow
 * a doubly linked list structure in a 2D array. This
 * is used so we can easily iterate and generate an
 * array of the data without duplication.
 * 
 * This class also handles the state of the tag, for
 * convenience when rendering.
 * 
 * This class primarily acts like a struct in C++. It
 * only really stores just data.
 */
export default class Tag {

    /**
     * Contructor. It also initializes 2 fields. The
     * next and previous pointers. This is used for
     * the linked list built into the class. There
     * is also a state field for easy rendering of
     * the state information.
     * 
     * @param {string} tagName 
     * @param {number} row 
     * @param {number} column 
     * @param {string} state 
     * @param {Tag} [next] 
     * @param {Tag} [prev] 
     * 
     * NOTE
     *  I have row and column stored here as duplicate values because the primary
     *  key is actually the row and column position. The linked list doesn't have
     *  access to it normally, so I need to store it in the linked list class as
     *  well.
     */
    constructor(name, row, column, state = "unselected", next = null, prev = null) {
        this.name = name;
        this.row = row;
        this.column = column;
        this.state = state;
        this.next = next;
        this.prev = prev;
    }

    /**
     * This is a simple function that returns a copy
     * of this object. This is for easily resetting the
     * head pointer for the state object to trigger 
     * state updates.
     */
    copy() {
        return new Tag(this.name, this.row, this.column, this.state, this.next, this.prev);
    }
}