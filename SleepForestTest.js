// TEST - nastaveni sekvence ctverecku a zvirat v nich
var TestSequence = [ 
['A','B',0,1,1,1], 
['C','D',0,0,0,1],
['A','E',0,1,1,0],  // sekvence ctvercu a cisel zvirat. Cisla zvirat (1. cislo) jsou indexy v AnimalPositions (0 nebo 1)
['D','I',0,1,0,0],  // 2. cislo urcuje ze ktereho ctverce se startuje 0=prvni (v tomto radku D), 1=druhy (v tomto radku I)
['A','C',0,0,1,1],  // 3.a 4. cislo urcuje co je videt 3. je kompas (sipka), 4. jsou 4 orientacni znacky (stromy aj).  
['B','H',0,1,1,1],
['C','F',0,1,1,1],
['B','I',0,0,1,1],
['D','F',0,0,1,1],
['C','E',0,0,1,1],
['F','I',0,1,1,1],
['A','H',0,1,1,1],
['G','I',0,0,1,1],
['B','E',0,1,1,1],
['D','H',0,1,1,1],
['F','E',0,0,1,1],
['B','D',0,0,1,1],
['C','H',0,1,1,1],
['B','F',0,1,1,1],
['H','I',0,1,1,1],
['D','F',0,0,1,1],
['A','G',0,1,1,1],
['F','H',0,1,1,1],
['A','C',0,0,1,1],
['G','H',0,0,1,1],
['A','F',0,0,1,1],
['B','G',0,1,1,1],
['I','E',0,0,1,1],
['F','G',0,0,1,1],
['B','C',0,0,1,1],
['G','I',0,1,1,1],
['E','D',0,0,1,1],
['A','I',0,0,1,1],
['D','F',0,1,1,1],
['E','H',0,1,1,1],
['A','C',0,0,1,1],
['D','G',0,0,1,1],
['C','I',0,0,1,1],
['E','G',0,1,1,1],
['A','D',0,1,1,1]
]; 

var DoTest = true;        // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");