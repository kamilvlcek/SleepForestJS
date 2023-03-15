// TRENING - nastaveni sekvence dvoji ctvercu
var SquarePairs=Array();
// poradi dvojic ctvercu podle fazi treningu - tohle pole urcuje delku treningu
// 31.1.2023 
SquarePairs=[['A','B'], ['F','C'], ['E','D'], ['G','H'], 
             ['D','E'], ['B','A'], ['H','G'], ['C','F'], 
             ['E','D'], ['H','G'], ['F','C'], ['A','B'],  
             ['G','H'], ['C','F'], ['D','E'], ['B','A'] ];// 16 neprekryvajicich se dvojic, kazda dvojice 2x (dopredu + dozadu)
/*SquarePairs=[ ['I','H'], ['D','G'], ['B','C'], ['E','F'],
              ['C','B'], ['F','E'], ['H','I'], ['G','D'],  
              ['I','H'], ['B','C'], ['D','G'], ['E','F'],
              ['C','B'], ['F','E'], ['G','D'], ['H','I'] ];// 16 neprekryvajicich se dvojic, kazda dvojice 2x(dopredu + dozadu)
              */
// nova sekvence 29.8.2017 -Alena - ctverce v ruznem poradi (AB i BA), neopakuji se za sebou, kratky pocet ukolu
// 2022-11-25 -sekvence zmena z S na spiralu. EF->IF, 2022-12-16 - zmena zpatky FI, IF na EF,FE
  
// jednoducha sekvence na projiti vsech ctvercu             
//SquarePairs=[['A','B'],['B','C'],['C','F'],['F','E'],['E','D'],['D','G'],['G','H'],['H','I']];                
 
// prekrekryvajici se dvojice                                                                                                
//SquarePairs=[['A','B'],['C','F'],['E','D'],['G','H']];
//SquarePairs=[['B','C'],['F','E'],['D','G'],['H','I']];


// TRENING nastaveni sekvence zvirat v kazde dvojici ctvercu
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
// porad jedna sekvence
AnimalSequence=[[0,10]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi 
// 2017-10-12 - jen jedno zvire v kazdem ctverci  ,1,11
var AnimalSequenceBackup = AnimalSequence; // zaloha puvodniho AnimalSequence, protoze to se meni v NextInSequence, ale nefunguje, nejak se zahadne samo meni
// pokud se zmeni AnimalSequence, je tedy treba opravit hodnotu i v NextInSequence()

// kratka sekvence na testovani skriptu
//AnimalSequence=[/*debug*/[0,1,0,1,10,11,10,11]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi

var DoTest = false;   // tohle rozhoduje, jestli se jedna o test nebo trening

experiment.includeScript(".//SleepForest.js");