import {getMaxIndex, getMinIndex} from "./utils/math";
import {BoardGameState, Continuation, Game} from "./types";

const INITIAL_DEPTH = 0;

function minMax<State extends BoardGameState>(game: Game<State>, maxDepth: number = 9): Continuation<State> {
    const {getAllNextStates, getHeuristic} = game;
    if (maxDepth < INITIAL_DEPTH) {
        throw new Error(`maxDepth ${maxDepth} is out of bounds`);
    }

    // recursion initial trigger
    return getBestContinuation(game.initialState, 0, maxDepth);

    // recursive minMax function
    function getBestContinuation(state: State, currentDepth: number = 0, maxDepth: number = 0): Continuation<State> {
        if (currentDepth === maxDepth) {
            return {state, evaluation: getHeuristic(state)};
        } else {
            const allNextStates = getAllNextStates(state);
            if (allNextStates.length === 0) {
                return {state, evaluation: getHeuristic(state)};
            }

            const allNextContinuations = allNextStates.map((nextState) => (getBestContinuation(nextState, currentDepth + 1, maxDepth)));
            const allNextEvaluations = allNextContinuations.map((nextEvaluation) => nextEvaluation.evaluation);
            const bestEvaluationIndex = state.player1Turn ? getMaxIndex(allNextEvaluations) : getMinIndex(allNextEvaluations);
            const bestEvaluation = allNextEvaluations[bestEvaluationIndex];
            const bestContinuation = allNextContinuations[bestEvaluationIndex];
            return currentDepth === 0 ? bestContinuation : {state, evaluation: bestEvaluation};
        }
    }
}

export default minMax;