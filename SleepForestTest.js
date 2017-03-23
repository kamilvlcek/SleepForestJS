// TEST - nastaveni sekvence ctverctu a zvirat v nich
var TestSequence = [ 
['C','F',1],
['G','I',1],
['B','E',0],
['I','F',0],
['G','D',1],
['A','C',0],
['E','H',1],
['A','D',0],
['H','G',1],
['F','A',1],
['D','I',0],
['C','G',0],
['I','A',0],
]; 
// sekvence ctvercu a cisel zvirat. Cisla zvirat jsou indexy v AnimalPositions
var DoTest = true;        // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");