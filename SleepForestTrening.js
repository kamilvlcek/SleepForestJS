// TRENING - nastaveni sekvence dvoji ctvercu
var SquarePairs=Array();
SquarePairs=[['E','D'],['A','B'],['I','H'],['C','F'],['H','G'],['F','I'],['B','C'],['D','A']];  // poradi dvojic ctvercu podle fazi treningu

// TRENING nastaveni sekvence zvirat v kazde dvojici ctvercu
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
AnimalSequence=[[0,1,0,1,10,11,10,11,0,10,1,11],[0,1,0,1,10,11,10,11,0,10,1,11],      // zatim stale stejne sekvence
                [0,1,0,1,10,11,10,11,0,10,1,11],[0,1,0,1,10,11,10,11,0,10,1,11],
                [0,1,0,1,10,11,10,11,0,10,1,11],[0,1,0,1,10,11,10,11,0,10,1,11],
                [0,1,0,1,10,11,10,11,0,10,1,11],[0,1,0,1,10,11,10,11,0,10,1,11]
]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

var DoTest = false;

experiment.includeScript(".//SleepForest.js");
