let state;
let wH, wW;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    state = newRandomState(100, 100);
    wH = windowHeight;
    wW = windowWidth;
		noLoop();
}

async function draw(){
	runForever();
}

function newDeadState(width, height){
    let newState = new Array(height);

    for(let i = 0; i < height; i++){
        newState[i] = new Array(width);
    }

    for(let i = 0; i < newState.length; i++){
        for(let j = 0; j < width; j++){
            newState[i][j] = false;
        }
    }
    return newState;
}

function newRandomState(width, height){
    let newState = new Array(height);

    for(let i = 0; i < height; i++){
        newState[i] = new Array(width);
    }

    for(let i = 0; i < newState.length; i++){
        for(let j = 0; j < width; j++){
            if(Math.random() >= 0.5)
                newState[i][j] = true;
            else
                newState[i][j] = false;
        }
    }
    return newState;
}

function aliveNeighbor(state, i, j){
    let count = 0;

    for(let k = i - 1; k <= i + 1; k++){
        for(let l = j - 1; l <= j + 1; l++){
            if(k < 0 || l < 0 || k >= state.length || l >= state[k].length)
                continue;
            if(k == i && l == j)
                continue;

            if(state[k][l])
                count++;
        }
    }

    return count;
}

function nextState(initState){
    let newState = newDeadState(initState[0].length, initState.length);
    let count = 0;

    for(let i = 0; i < initState.length; i++){
        for(let j = 0; j < initState[i].length; j++){
            count = aliveNeighbor(initState, i, j);

            if(count < 2 && initState[i][j])
                newState[i][j] = false;
            else if(count == 3 && !initState[i][j])
                newState[i][j] = true;
            else if(count > 3 && initState[i][j])
                newState[i][j] = false;
						else if(count < 2 && !initState[i][j] && Math.random() < 0.001)
								newState[i][j] = true;
            else
                newState[i][j] = initState[i][j];
        }
    }

    return newState;
}

function display(state){
    strokeWeight(7);
	
    for(let i = 0; i < state.length; i++){
			
        for(let j = 0; j < state[i].length; j++){
            if(state[i][j]){
							stroke('green');
              point(250 + i * 10, 1 + j * 10);
            }
					
        }
    }
}

async function runForever(){
    while(true){
			background(255);
      await display(state);
      state = await nextState(state);
      await sleep(20);
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randRGBVal(){
	return Math.floor(Math.random() * 256);
}