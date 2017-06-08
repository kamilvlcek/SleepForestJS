// TRENING - nastaveni sekvence dvoji ctvercu
var SquarePairs=Array();
// poradi dvojic ctvercu podle fazi treningu - tohle pole urcuje delku treningu
SquarePairs=[['A','B'], ['F','C'], ['E','D'], ['I','H'], ['D','G'], ['B','C'], ['H','G'], ['I','F'],
             ['C','B'], ['G','H'], ['C','F'], ['G','D'], ['F','I'], ['B','A'], ['D','E'], ['H','I']];
// nova sekvence 9.3.2017 - ctverce v ruzne poradi (AB i BA), neopakuji se za sebou

// jednoducha sekvence na projiti vsech ctvercu             
//SquarePairs=[['A','B'],['B','C'],['C','F'],['F','I'],['I','H'],['H','G'],['G','D'],['D','E']];                
  

// TRENING nastaveni sekvence zvirat v kazde dvojici ctvercu
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
// porad jedna sekvence
AnimalSequence=[[0,1,0,1,10,11,10,11,0,10,1,11]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

// kratka sekvence na testovani skriptu
//AnimalSequence=[/*debug*/[0,1,0,1,10,11,10,11]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

var DoTest = false;   // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");
