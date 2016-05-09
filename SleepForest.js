// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci

var OBR_1 = 1;      // obrazek aktualne hledaneho zvirete

// ctverce ABCDEFGHI, v kazdem stany 1-6
var SquarePairs=Array();
SquarePairs=[['E','D'],['C','D']];  // poradi dvojic ctvercu podle fazi treningu

var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
AnimalSequence=[[4,6,4,6,12,16,12,16],[1,11,6,17,11,6,17,1]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi
 

var AnimalNames= {E4:'KOCKU',E6:'VLKA',D2:'PRASE',D6:'MEDVEDA'}; // ceske pojmenovani zvirat podle jmen ctvercu a cisel stanu
var AimName = 'Aim'; //jmeno cile - zacatek ActiveAimName  

var iPhase = 0;   // aktualni cislo faze 
var iSequence = 0;  // aktualni cislo stanu/zvirete ve fazi 
var ActiveAimName = 'AimE4'; // jmeno aktualniho aktivniho cile  - AimName+SquareName+AimNo 

function init() {	
	experiment.setMap("TEST-SleepForest Edo12"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
}

function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		//platform.get("plosina").doRotateTime(10000,5,-1);
    text.create(TXT_UKOL, 10, 10, 255, 255,0, 4, ""); // nazev aktivniho mista - zluta      
    text.create(TXT_SEKVENCE, 800, 10, 0, 255,0, 4, ""); // cislo zvirete v sekvenci
          
    ActivateAnimal(iPhase,iSequence);          
	}
	if (key.pressed("g")){
		preference.get(ActiveAimName).setVisible(true);
	}
	if (key.pressed("h")){
		preference.get(ActiveAimName).setVisible(false);
	}
	
	if (key.pressed("t")){   // zobrazi obrazek
		  experiment.modifyScreenShape(OBR_1, true);
	}
	if (key.pressed("r")){   // skryje ohrazek
		  experiment.modifyScreenShape(OBR_1, false);
	}
	
	if (preference.get(ActiveAimName).entered()){
		 text.modify(TXT_UKOL,"VYBORNE !");
	}
	
	if (preference.get(ActiveAimName).left()){
     iSequence += 1;
     if(iSequence>=AnimalSequence[iPhase].length) {
      iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
     }
     text.modify(TXT_SEKVENCE,iSequence);
		 ActivateAnimal(iPhase,iSequence);   
	}
	
}

function ActivateAnimal(iPhase,iSequence){
     AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
     SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  // 
     AimNo %= 10; // zbytek po deleni 10ti 
     
     ActiveAimName = AimName+SquareName+AimNo;
     debug.log('ActiveAimName: '+ActiveAimName); 
     
     preference.get(ActiveAimName).setActive(true);
     text.modify(TXT_UKOL,"Najdi "+AnimalNames[SquareName+AimNo]);
      
     // zobrazim obrazek
     // experiment.addScreenShape(OBR_1, 10, 10, 255, 255, 255, 256, 256, 0, false, "ASochy.cat");
     // muzu zmenit aktivni obrazek?  
}

function toInt(n){ // prevede float to int
  return ~~n; 
}