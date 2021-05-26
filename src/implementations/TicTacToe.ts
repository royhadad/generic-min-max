import cloneDeep from 'lodash/cloneDeep';
import {BoardGameState, Game} from "../types";

export enum Square {
    Empty = '-',
    X = 'X',
    O = 'O'
}

export type Player = Square.X | Square.O;

export type Row = [Square, Square, Square];
export type Board = [Row, Row, Row];
export type SquareLocation = [row: number, column: number];

const GET_EMPTY_ROW = (): Row => [Square.Empty, Square.Empty, Square.Empty];
const GET_EMPTY_BOARD = (): Board => [[Square.X, Square.O, Square.Empty], GET_EMPTY_ROW(), GET_EMPTY_ROW()];

export interface TicTacToeState extends BoardGameState {
    board: Board;
}

const STARTING_TicTacToe_STATE: TicTacToeState = {
    player1Turn: true,
    board: GET_EMPTY_BOARD()
}

class TicTacToeGame implements Game<TicTacToeState> {
    constructor(initialState: TicTacToeState = STARTING_TicTacToe_STATE) {
        this.initialState = initialState;
    }

    initialState: TicTacToeState;

    getAllNextStates(state: TicTacToeState): TicTacToeState[] {
        if (isSomeoneWinning(state)) {
            return [];
        }

        const allNextStates: TicTacToeState[] = [];
        state.board.forEach((row, rowIndex) => {
            row.forEach((square, columnIndex) => {
                if (square === Square.Empty) {
                    const newNextState = cloneDeep(state);
                    newNextState.board[rowIndex][columnIndex] = state.player1Turn ? Square.X : Square.O;
                    newNextState.player1Turn = !state.player1Turn;
                    allNextStates.push(newNextState);
                }
            })
        })
        return allNextStates;
    }

    getHeuristic(state: TicTacToeState): number {
        if (isXWinning(state)) {
            return 1;
        } else if (isOWinning(state)) {
            return -1;
        } else {
            return 0;
        }
    }
}

export function printState(state: any) {
    const {board} = state;
    console.log(`${board[0]}\n${board[1]}\n${board[2]}`.split(',').join(''))
}

function isSomeoneWinning(state: TicTacToeState): boolean {
    return isXWinning(state) || isOWinning(state);
}

function isXWinning(state: TicTacToeState): boolean {
    return isPlayerWinning(state, Square.X);
}

function isOWinning(state: TicTacToeState): boolean {
    return isPlayerWinning(state, Square.O);
}

function areThreeSquaresOccupiedByPlayer(board: Board, player: Player, squaresLocations: [SquareLocation, SquareLocation, SquareLocation]): boolean {
    const [squareLocation1, squareLocation2, squareLocation3] = squaresLocations;
    return board[squareLocation1[0]][squareLocation1[1]] === player &&
        board[squareLocation2[0]][squareLocation2[1]] === player &&
        board[squareLocation3[0]][squareLocation3[1]] === player;
}

function isPlayerWinning(state: TicTacToeState, player: Player): boolean {
    const {board} = state;
    return areThreeSquaresOccupiedByPlayer(board, player, [[0, 0], [0, 1], [0, 2]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[1, 0], [1, 1], [1, 2]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[2, 0], [2, 1], [2, 2]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[0, 0], [1, 0], [2, 0]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[0, 1], [1, 1], [2, 1]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[0, 2], [1, 2], [2, 2]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[0, 0], [1, 1], [2, 2]]) ||
        areThreeSquaresOccupiedByPlayer(board, player, [[0, 2], [1, 1], [2, 0]]);
}

export default TicTacToeGame;