// TRENING - nastaveni sekvence dvoji ctvercu
var SquarePairs=Array();
// poradi dvojic ctvercu podle fazi treningu - tohle pole urcuje delku treningu
SquarePairs=[['E','D'], ['C','F'], ['I','H'], ['C','B'], ['F','I'], ['G','H'], ['B','A'],  ['H','I'],
             ['G','D'], ['F','C'], ['A','B'], ['D','G'], ['B','C'], ['D','E'], ['H','G'], ['I','F']];  
// nova sekvence 9.3.2017 - ctverce v ruzne poradi (AB i BA), neopakuji se za sebou  

// TRENING nastaveni sekvence zvirat v kazde dvojici ctvercu
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
// porad jedna sekvence
AnimalSequence=[/*debug*/[0,1,0,1,10,11,10,11]  /* Trening [0,1,0,1,10,11,10,11,0,10,1,11]*/]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

var DoTest = false;

experiment.includeScript(".//SleepForest.js");
