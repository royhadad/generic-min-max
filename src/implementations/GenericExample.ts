import {BoardGameState, Game} from "../types";

interface GenericExampleState extends BoardGameState{

}

const STARTING_GENERIC_EXAMPLE_STATE: GenericExampleState = {
    player1Turn: true
}

class GENERIC_EXAMPLE_GAME implements Game<GenericExampleState> {
    constructor(initialState: GenericExampleState = STARTING_GENERIC_EXAMPLE_STATE) {
        this.initialState = initialState;
    }

    getAllNextStates(state: GenericExampleState): Array<GenericExampleState> {
        return [];
    }

    getHeuristic(state: GenericExampleState): number {
        return 0;
    }

    initialState: GenericExampleState;
}

export default GENERIC_EXAMPLE_GAME;
export {GenericExampleState};