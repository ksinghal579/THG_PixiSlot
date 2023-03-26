export class GameConstants {
    // symbol mapping
     static  sym1 = 0;
     static  sym2 = 1;
     static  sym3 = 2;
     static  sym4 = 3;
     static  sym5 = 4;
     static  sym6 = 5;
     static  sym7 = 6;
     static  sym8 = 7;
     static  SYMBOLS = ["hv1", "hv2", "hv3", "hv4", "lv1", "lv2", "lv3", "lv4"];
     static  WINTEXT = { x: 300, y: 800 };

     static  REELSTRIPS = [
        [1, 6, 6, 0, 0, 4, 0, 3, 4, 2, 1, 2, 7, 3, 4, 1, 7, 4, 6, 1],
        [0, 5, 6, 5, 4, 4, 7, 4, 4, 3, 6, 1, 4, 6, 0, 4, 5, 7, 6, 5],
        [4, 1, 6, 7, 2, 1, 5, 1, 1, 4, 2, 4, 0, 5, 2, 1, 3, 0, 5, 7],
        [1, 5, 2, 5, 7, 7, 2, 5, 7, 0, 4, 0, 5, 2, 5, 6, 1, 4, 2, 5],
        [6, 7, 1, 2, 3, 0, 2, 1, 1, 3, 3, 1, 5, 3, 0, 5, 0, 5, 3, 7]
    ];

     static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }

    // length of symbols in each reel 
     static  REEL_SYM_LENGTH = [15, 18, 21, 24, 27];
     static  REEL_GAP = 15;
     static  SYM_WIDTH = 256;
     static  SYM_HEIGHT = 256;
     static  REEL_X = 300;
     static  REEL_Y = 30;

     static  SPIN_BTN_X = 840;
     static  SPIN_BTN_Y = 800;

     static  PAYTABLE_DATA = {
        0: {
            3: 10,
            4: 20,
            5: 50
        },
        1: {
            3: 5,
            4: 10,
            5: 20
        },
        2: {
            3: 5,
            4: 10,
            5: 15
        },
        3: {
            3: 5,
            4: 10,
            5: 15
        },
        4: {
            3: 2,
            4: 5,
            5: 10
        },
        5: {
            3: 1,
            4: 2,
            5: 5
        },
        6: {
            3: 1,
            4: 2,
            5: 3
        },
        7: {
            3: 1,
            4: 2,
            5: 3
        }
    };
    // represents win line patterns in form of symbol row position; this won't be needed when winning data will be coming from backend
     static  WIN_LINE_DATA = [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0]
        , [0, 1, 2, 1, 0], [2, 1, 0, 1, 2]];


}