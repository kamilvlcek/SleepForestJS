// TEST - nastaveni sekvence ctverecku a zvirat v nich
var TestSequence = [ 
// sekvence ctvercu a cisel zvirat. Cisla zvirat (1. cislo) jsou indexy v AnimalPositions (0 nebo 1)
// 2. cislo urcuje ze ktereho ctverce se startuje 0=druhy (v prvnim radku A), 1=prvni (v tretim radku B)
// 3.a 4. cislo urcuje co je videt 3. je kompas (sipka), 4. jsou 4 orientacni znacky (stromy aj).  
['A','B',0,0,0,1], //1  Najdi JELENA = A
['G','I',0,0,1,0], //2  Najdi MOTYLA =G
['B','F',0,1,1,0], //3  Najdi KROKODYLA
['C','E',0,1,0,1], //4  Najdi KOCKU = E
['G','D',0,0,1,0], //5  Najdi MOTYLA = G
['D','F',0,1,0,1], //6  Najdi KROKODYLA = F
['E','G',0,1,1,0], //7  Najdi MOTYLA = G
['G','I',0,1,0,1], //8
['B','C',0,0,1,0], //9  Najdi KOLIBRIKA C->B
['I','H',0,0,0,1], //10
['G','I',0,1,1,0], //11
['B','F',0,1,0,1], //12
['D','H',0,0,1,0], //13
['H','G',0,0,0,1], //14
['A','C',0,1,1,0], //15 Najdi ZEBRU A -> C
['D','H',0,1,0,1], //16 Najdi KACHNU D -> H
['D','F',0,0,1,0], //17 Najdi PRASE F-> D
['A','B',0,0,1,0], //18
['F','E',0,1,0,1], //19
['A','C',0,1,0,1], //20
['E','H',0,0,1,0], //21
['B','E',0,0,0,1], //22
['C','F',0,0,1,0], //23
['D','F',0,1,0,1] //24
]; 
/*
, //25
, //26
, //27
, //28
, //29
, //30
, //31
, //32
['D','E',0,0,1,1], //33
['B','H',0,0,1,0], //34
['F','G',0,1,0,1], //35
['A','H',0,1,0,1], //36
['B','D',0,1,0,1], //37
['A','C',0,0,1,1], //38
['I','H',0,0,1,0], //39
['A','F',0,1,1,1], //40
['C','I',0,0,1,1], //41
['H','G',0,0,0,1], //42
['A','D',0,0,1,0], //43
['B','G',0,1,1,0], //44
['H','D',0,0,0,1], //45
['A','B',0,0,1,0], //46
['G','I',0,0,1,1], //47
['C','E',0,0,0,1], //48
['F','D',0,0,0,1], //49   
['G','E',0,1,1,0], //50
['F','I',0,1,0,1], //51
['B','D',0,1,1,1], //52
['A','I',0,0,1,0], //53
['F','D',0,1,1,1], //54
['C','I',0,1,0,1], //55
['A','D',0,1,1,1], //56
['C','F',0,0,1,0], //57
['I','E',0,0,0,1], //58
['C','H',0,1,1,1], //59
['G','I',0,0,1,0] //60
]; 
*/
var DoTest = true;        // tohle rozhoduje, jestli se jedna o test nebo trening
var AnimalSequenceBackup = []; // kvuli treningu, kde se pouziva, aby ani v testu nebyla nedefinovana
experiment.includeScript(".//SleepForest.js");