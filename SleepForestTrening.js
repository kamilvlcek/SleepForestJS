// TRENING - nastaveni sekvence dvoji ctvercu
var SquarePairs=Array();
// poradi dvojic ctvercu podle fazi treningu - tohle pole urcuje delku treningu
SquarePairs=[['A','B'], ['F','C'], ['E','D'], ['I','H'], ['D','G'], ['B','C'], ['H','G'], ['E','F'],
             ['C','B'], ['D','E'], ['B','A'], ['G','H'], ['F','E'], ['H','I'], ['G','D'], ['C','F'], 
             ['I','H'], ['B','C'], ['E','D'], ['H','G'], ['F','C'], ['A','B'], ['D','G'], ['E','F'],
             ['C','B'], ['G','H'], ['F','E'], ['G','D'], ['H','I'], ['C','F'], ['D','E'], ['B','A']];
  
// nova sekvence 29.8.2017 -Alena - ctverce v ruznem poradi (AB i BA), neopakuji se za sebou, kratky pocet ukolu

// jednoducha sekvence na projiti vsech ctvercu             
//SquarePairs=[['A','B'],['B','C'],['C','F'],['F','E'],['E','D'],['D','G'],['G','H'],['H','I']];                
  

// TRENING nastaveni sekvence zvirat v kazde dvojici ctvercu
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
// porad jedna sekvence
AnimalSequence=[[0,10,1,11]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

// kratka sekvence na testovani skriptu
//AnimalSequence=[/*debug*/[0,1,0,1,10,11,10,11]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

var DoTest = false;   // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");
