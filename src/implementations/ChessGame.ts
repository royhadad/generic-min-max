import {BoardGameState, Game} from "../types";

interface ChessState extends BoardGameState{

}

const STARTING_CHESS_BOARD_STATE: ChessState = {
    player1Turn: true
}

class ChessGame implements Game<ChessState> {
    constructor(initialState: ChessState = STARTING_CHESS_BOARD_STATE) {
        this.initialState = initialState;
    }

    getAllNextStates(state: ChessState): Array<ChessState> {
        return [];
    }

    getHeuristic(state: ChessState): number {
        return 0;
    }

    initialState: ChessState;
}

export default ChessGame;
export {ChessState};