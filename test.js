var fs = require('fs'),
    path = require('path'),
    Colors = require(path.join(__dirname, 'js/Colors.js'));
    Randoms = require(path.join(__dirname, 'js/Randoms.js'));
    ForestGenerator = require(path.join(__dirname, 'js/ForestGenerator.js'));
    const {execFile} = require('child_process');
	const gifsicle = require('gifsicle');

var _r = new Randoms();
var colorHelper = new Colors();
var numFrames = 100;
var forestOptions = {
        RAINBOW: false,
        NUM_TREES: _r.randomInt(30,50),
        TREE_TYPE: "deciduous",
        GRASS_DENSITY: _r.random(200,500),
        PATH_MODE: false,
        //NIGHT_MODE: true,
        EFFECT: false
    };

    var treeOptions = {
        BRANCH_R_MAX: _r.random(0.8,3),
        BRANCH_R_MIN: 0.06,
        BRANCH_L: _r.random(8,30), 
        BRANCH_P: 0.77,//_r.random(0.72, 0.83),
        CHANCE_DECAY: _r.random(0.005,0.03),
        LENGTH_MULT: _r.random(0.7, 0.9),
        ANGLE_MIN: _r.random(15, 30), 
        ANGLE_MAX: _r.random(50, 70), 
        RAINBOW: false,
        COLOR_TOP: colorHelper.randomHex(), 
        COLOR_BTM: "#002244", //colorHelper.brightenByAmt(colorHelper.randomHex(),-120), 
        //LEAF_COLS: ["#FFFFDD","#FFEEDD","#EEFFDD","#EEEEDD","#EEEECC","#FFEECC","#EEFFCC","#FFFFCC"], 
        //LEAF_COLS: ["#2A141D","#1B0005","#2A2B05","#161102","#231313","#0F0F1B","#181D11","#4E430F"], 
        // LEAF_SIZE: _pickLeafSize(),
        LEAF_DENSITY: _r.randomInt(10,20),
        LEAF_W: _r.random(0.7,1.2),
        MAX_DEPTH: 15, 
        MAX_BRANCHES_TOTAL: 1999, 
        MAX_BRANCHES_PER_NODE:  _r.randomInt(2,3)
    };

function _newForest(numFrames){    

    var gen = new ForestGenerator(forestOptions,treeOptions);

    // Make the GIF
    var filename = 'test'+Math.floor(Math.random()*999999);
    console.log("plz generate "+filename);
    var gen = new ForestGenerator(forestOptions,treeOptions);
	return(gen.generateSceneGIF(numFrames, filename));

}

function _optimize(filename) {
    _filename = filename;
    const sizeLimit = 1048576*5;
    var fileSizeInBytes = fs.statSync(filename).size;
    var nextStepDown = Math.floor(paletteSize*0.9);
    if(fileSizeInBytes > sizeLimit){
        execFile(gifsicle, ['-o', _filename+'.gif', _filename+'.gif'], err => {
		    console.log("optimized "+_filename+", "+fileSizeInBytes+" bytes.");
		});
    } else {
        console.log("wrote "+_filename+", "+fileSizeInBytes+" bytes.");
    }
    
    return filename;
}

/**
 * usage: node test 50 100
 * first param:  number of trees
 * second param: number of frames
 * 
 */
process.argv.forEach((val, index) => {
    console.log("val "+index+": "+val);
    if(index==2 && !isNaN(val)){
        forestOptions.NUM_TREES = eval(val);
        console.log("NUM_TREES: "+forestOptions.NUM_TREES);
    } else if (index==3 && !isNaN(val)){
        numFrames = eval(val);
        console.log("numFrames: "+numFrames);
    }
});

_newForest(numFrames);

