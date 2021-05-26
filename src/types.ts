// Should be a 2 player turn based game
export interface BoardGameState {
    player1Turn: boolean;
}

export interface Game<State extends BoardGameState> {
    initialState: State;
    getAllNextStates: (state: State) => Array<State>; // pure function

    // position better for player1 => eval bigger
    // position equal => eval 0
    getHeuristic: (state: State) => number; // pure function
}

export interface Continuation<State> {
    evaluation: number;
    state: State;
}