// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci

// ctverce ABCDEFGHI, v kazdem stany 1-6
var SquarePairs=Array();
SquarePairs=[['E','D'],['C','D']];  // poradi dvojic ctvercu podle fazi treningu

var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
AnimalSequence=[[4,6,4,6,12,16,12,16],[1,11,6,17,11,6,17,1]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi
 
var AnimalNames= {E4:'KOCKU',E6:'VLKA',D2:'PRASE',D6:'MEDVEDA'}; // ceske pojmenovani zvirat podle jmen ctvercu a cisel stanu
var AnimalPictures = {E4:"Obrazky.cat",E6:"Obrazky.wolf",D2:"Obrazky.boar",D6:"Obrazky.bear"}; // jmena textur - obrazku zvirat  zobrazeni

var AimName = 'Aim'; //jmeno cile - zacatek ActiveAimName  

var iPhase = 0;   // aktualni cislo faze 
var iSequence = 0;  // aktualni cislo stanu/zvirete ve fazi 
var ActiveAimName = 'AimE4'; // jmeno aktualniho aktivniho cile  - AimName+SquareName+AimNo
var ActiveTeepee = 'E4'; // oznaceni aktualniho ctverce k navigaci
var AnimalPicturesHandles = {}; // pole handelu obrazku zvirat - jestli byla uz pouzita textura nebo ne 
var AnimalHandleLast = 0; // posledni prirazeny handle obrazku v  AnimalPicturesUsed
var InactiveNames = []; // jmena vsechn neaktivnich zvirat, kam dojit je chyba
var InactiveEntered = ''; // jmeno mista, do ktereho vstoupil omylem
var ErrorsNumber = 0;       // pocet chyb v sekvenci

function init() {	
	experiment.setMap("TEST-SleepForest Edo11h"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
}

function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		//platform.get("plosina").doRotateTime(10000,5,-1);
    text.create(TXT_UKOL, 10, 10, 255, 255,0, 3, ""); // nazev aktivniho mista - zluta      
    text.create(TXT_SEKVENCE, 800, 10, 0, 255,0, 4, ""); // cislo zvirete v sekvenci
    text.create(TXT_CHYBPOCET, 900, 10, 255,0,0, 4, ""); // pocet chyb
    text.create(TXT_CHYBA, 1000, 10, 255, 0,0, 4, ""); // ohlaseni chyby    
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
     experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false); // schova obrazek zvirete
     preference.get(ActiveAimName).setActive(false);
     iSequence += 1;
     if(iSequence>=AnimalSequence[iPhase].length) {
      iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
     }
     text.modify(TXT_SEKVENCE,iSequence);
	}
	
	if (preference.get(ActiveAimName).left()){  
		 ActivateAnimal(iPhase,iSequence);   
	}
  for(iaim = 0; iaim < InactiveNames.length; iaim++){
    if (preference.get(InactiveNames[iaim]).entered()){
      text.modify(TXT_CHYBA,"CHYBA !");  
      ErrorsNumber +=1; 
      text.modify(TXT_CHYBPOCET,ErrorsNumber); 
      InactiveEntered = InactiveNames[iaim]; 
      debug.log("chyba vstup: "+InactiveEntered);
    }
  }
  if(InactiveEntered.length>0 && preference.get(InactiveEntered).left() ) {
      text.modify(TXT_CHYBA,""); 
      InactiveEntered = ''; 
  }
	
}

function ActivateAnimal(iPhase,iSequence){
     var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
     var SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  // 
     AimNo %= 10; // zbytek po deleni 10ti 
     
     ActiveAimName = AimName+SquareName+AimNo;
     debug.log('ActiveAimName: '+ActiveAimName); 
     
     InactiveNames = [];
     for (ianimal = 0; ianimal < AnimalSequence[iPhase].length; ianimal++){
            aimn =  AnimalSequence[iPhase][ianimal];            
            squaren = aimn < 10 ? SquarePairs[iPhase][0] : SquarePairs[iPhase][1];    
            Aim =  AimName+squaren+ (aimn%10); // jmeno jednoho z cilu
            if(Aim ==   ActiveAimName || contains(InactiveNames,Aim)){
              //debug.log("nepouzit InactiveName " + Aim); 
              continue;                 
            } else {
              InactiveNames.push(Aim);
              preference.get(ActiveAimName).setActive(true);
              //debug.log("dalsi InactiveName " + Aim);
            }         
     }
     debug.log("InactiveNames: " + InactiveNames);  
     preference.get(ActiveAimName).setActive(true);
     text.modify(TXT_UKOL,"Najdi "+AnimalNames[SquareName+AimNo]);
     if(AnimalPicturesHandles[SquareName+AimNo]){
         experiment.modifyScreenShape(AnimalPicturesHandles[SquareName+AimNo], true);     // ukaze jiz drive aktivovany obrazek zvirete
     } else {
         AnimalHandleLast += 1;
         experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[SquareName+AimNo]);
         AnimalPicturesHandles[SquareName+AimNo] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
     }
     ActiveTeepee = SquareName+AimNo; 
     // zobrazim obrazek
     // experiment.addScreenShape(OBR_1, 10, 10, 255, 255, 255, 256, 256, 0, false, "ASochy.cat");
     // muzu zmenit aktivni obrazek?  
}

function toInt(n){ // prevede float to int
  return ~~n; 
}

function contains(arr, obj) {
// vrati true pokud pole arr obsahuje obj
    var i = arr.length;
    while (i--) {
       if (arr[i] === obj) {
           return true;
       }
    }
    return false;
}