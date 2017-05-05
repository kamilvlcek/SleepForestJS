// TEST - nastaveni sekvence ctverctu a zvirat v nich
var TestSequence = [ 
['A','E',0,1],  // sekvence ctvercu a cisel zvirat. Cisla zvirat (1. cislo) jsou indexy v AnimalPositions (0 nebo 1)
['D','I',1,1],  // 2. cislo urcuje ze ktereho ctverce se startuje 0=prvni (v tomto radku D), 1=druhy (v tomto radku I)
['A','C',0,0],
['B','H',1,1],
['C','F',0,1],
['B','I',0,0],
['D','F',1,0],
['A','B',1,1],
['C','D',1,0],
['F','I',0,1],
['A','H',1,1],
['G','I',1,0],
['B','E',1,1],
['D','H',0,1],
['F','E',0,0],
['B','D',1,0],
['C','H',0,1],
['B','F',1,1],
['H','I',1,1],
['D','F',1,0],
['A','G',0,1],
['F','H',0,1],
['A','C',0,0],
['G','H',0,0],
['A','F',1,0],
['B','G',1,1],
['I','E',0,0],
['F','G',1,0],
['B','C',0,0],
['G','I',0,1],
['E','D',1,0],
['A','I',0,0],
['C','E',0,0],
['D','F',0,1],
['E','H',1,1],
['A','C',1,0],
['D','G',0,0],
['C','I',1,0],
['E','G',1,1],
['A','D',0,1]
]; 

var DoTest = true;        // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");