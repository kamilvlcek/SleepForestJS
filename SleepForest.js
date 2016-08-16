// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_CTVEREC = 5;   // cislo dvojice ctvercu
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci

// ctverce ABCDEFGHI, v kazdem stany 1-6
var SquarePairs=Array();
SquarePairs=[['E','D'],['D','A']];  // poradi dvojic ctvercu podle fazi treningu
SquarePassage=[[4,2],[1,3]]; // který z plotù se má odstranit pro prùchod mezi ètverci, napr PlotE4 a PlotD2 pro pruchod mezi D a E
 
var AnimalSequence=Array();   // poradi zvirat podle fazi treningu
AnimalSequence=[[4,6,4,6,12,16,12,16],[2,13,6,15,13,6,15,2]]; // n<10 - prvni ctverec v poradi, n>10 druhy ctverec v poradi
 
var AnimalNames= {E4:'KOCKU',E6:'VLKA',D2:'PRASE',D6:'MEDVEDA',A3:'REJNOKA',A5:'ZRALOKA'}; // ceske pojmenovani zvirat podle jmen ctvercu a cisel stanu
var AnimalPictures = {E4:"Obrazky.cat",E6:"Obrazky.wolf",D2:"Obrazky.boar",D6:"Obrazky.bear",A3:"Obrazky.ray",A5:"Obrazky.shark"}; // jmena textur - obrazku zvirat  zobrazeni
var PlotyPozice = {
    A2:{x:-286,y:369}, A3:{x:-350,y:361},
    D1:{x:-378,y:363}, D2:{x:-278,y:1549}, D2:{x:-332,y:1557},
    E1:{x:1588,y:348},E2:{x:1688,y:1534},E3:{x:1624,y:1542},E4:{x:378,y:1524}
};

var AimName = 'Aim'; //jmeno cile - zacatek ActiveAimName  
var PlotName = 'Plot'; // zacatek jmena kazdeho plotu

var iPhase = 0;   // aktualni cislo faze 
var iSequence = 0;  // aktualni cislo stanu/zvirete ve fazi 
var ActiveAimName = 'AimE4'; // jmeno aktualniho aktivniho cile  - AimName+SquareName+AimNo
var ActiveTeepee = 'E4'; // oznaceni aktualniho ctverce k navigaci
var AnimalPicturesHandles = {}; // pole handelu obrazku zvirat - jestli byla uz pouzita textura nebo ne 
var AnimalHandleLast = 0; // posledni prirazeny handle obrazku v  AnimalPicturesUsed
var InactiveNames = ['AimE6']; // jmena vsechn neaktivnich zvirat, kam dojit je chyba
var InactiveEntered = ''; // jmeno mista, do ktereho vstoupil omylem
var ErrorsNumber = 0;       // pocet chyb v sekvenci

function init() {	
	experiment.setMap("TEST-SleepForest Edo12 08-15"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
}

function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		//platform.get("plosina").doRotateTime(10000,5,-1);
        text.create(TXT_UKOL, 10, 10, 255, 255,0, 3, ""); // nazev aktivniho mista - zluta  
        text.create(TXT_CTVEREC, 600, 10, 0, 0,255, 3, ""); // cislo ctverce    
        text.create(TXT_SEKVENCE, 700, 10, 0, 255,0, 4, ""); // cislo zvirete v sekvenci
        text.create(TXT_CHYBPOCET, 800, 10, 255,0,0, 4, ""); // pocet chyb
        text.create(TXT_CHYBA, 1000, 10, 255, 0,0, 4, ""); // ohlaseni chyby
         
        ActivateSquares(iPhase); //    
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
     // vstup do ciloveho mista
      text.modify(TXT_UKOL,"VYBORNE !");
      preference.get("AimSound"+CtverecJmeno()).beep(1.0);  // zahraju pozitivni zvuk
      experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false); // schova obrazek zvirete
      preference.get(ActiveAimName).setActive(false);
      for(iaim = 0; iaim < InactiveNames.length; iaim++){
        preference.get(InactiveNames[iaim]).setActive(false);
      } 
	}
	
	if (preference.get(ActiveAimName).left()){
      iSequence += 1;
      if(iSequence>=AnimalSequence[iPhase].length) {
        // pokud jsem prosel vsechna zvirata mezi ctverci, jdu na dalsi fazi
        iPhase += 1;
        ActivateSquares(iPhase);
        iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
      }
      text.modify(TXT_SEKVENCE,iSequence);         
	  ActivateAnimal(iPhase,iSequence);   
	}
  for(iaim = 0; iaim < InactiveNames.length; iaim++){
    if (preference.get(InactiveNames[iaim]).entered()){
      // vstup do chybneho mista
      text.modify(TXT_CHYBA,"CHYBA !"); 
      var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
      preference.get("AvoidSound"+CtverecJmeno()).beep(1.0);  // zahraju vystrazny zvuk
      ErrorsNumber +=1; 
      text.modify(TXT_CHYBPOCET,ErrorsNumber);
      debug.log("Pocet chyb: "+ErrorsNumber); 
      InactiveEntered = InactiveNames[iaim]; 
      debug.log("chyba vstup: "+InactiveEntered);
    }
  }
  
  if(InactiveEntered.length>0 && preference.get(InactiveEntered).left() ) {
      text.modify(TXT_CHYBA,""); 
      InactiveEntered = '';         
  }
	
}
function ActivateSquares(iPhase){
     
     if(iPhase>0){
         // pokud uz druha a dalsi faze, nejdriv zase obnovim ploty
         for(p=0;p<=1;p++){
           var CtverecName = SquarePairs[iPhase-1][p] + SquarePassage[iPhase-1][p];
           var PlotZmiz = PlotName + CtverecName;           
           //mark.get(PlotZmiz).setVisible(true);
           debug.log("dolu: " + PlotZmiz );
           if (PlotyPozice[CtverecName]!=undefined){
             var CtverecPozice = PlotyPozice[CtverecName];
             mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y,-222]); // 0 bude nahore, normalni je -222
           }
         }
     }
     if(iPhase>=SquarePairs.length) {
        // pokud uz jsem vycerpal vsechny pary ctvercu, ukoncim experiment
        text.modify(TXT_CHYBA,"KONEC"); 
        experiment.setStop();
     } else {    
       // skryju ploty mezi novymi ctverci
       for(p=0;p<=1;p++){
         var CtverecName = SquarePairs[iPhase][p] + SquarePassage[iPhase][p];
         var PlotZmiz = PlotName + CtverecName;
         //mark.get(PlotZmiz).setVisible(false);
         debug.log("nahoru: " + PlotZmiz );
         if (PlotyPozice[CtverecName]!=undefined){
           var CtverecPozice = PlotyPozice[CtverecName];
           mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y,0]); // 0 bude nahore, normalni je -222
         }   
       }
     }
     text.modify(TXT_CTVEREC,iPhase+1); 

}
function ActivateAnimal(iPhase,iSequence){
    // vola se po aktivaci paru ctvercu a pak po nalezeni kazdeho zvirete
    // aktivuje  oblast kolem zvirete jako cil, a ostatni zvirata z obou ctvercu jako avoidance 
     var AimNo = AnimalSequence[iPhase][iSequence] % 10;   // cislo cile, zbytek po deleni 10ti 
     var SquareName = CtverecJmeno();  // 
     
     ActiveAimName = AimName+SquareName+AimNo;
     debug.log('ActiveAimName: '+ActiveAimName); 
     preference.get(ActiveAimName).setActive(true);
     
     InactiveNames = [];
     for (isquare = 0; isquare < SquarePairs[iPhase].length; isquare++){ // pro vsechny ted aktivni ctverce
        for (ianimal = 1; ianimal <= 6; ianimal++){    // pro vsech sest typi=stanu v tomto ctverci
            //aimn =  AnimalSequence[iPhase][ianimal];            
            squaren = SquarePairs[iPhase][isquare];    
            Aim =  AimName+squaren+ianimal; // jmeno jednoho z cilu , napriklad Aim + E + 1
            if(Aim ==   ActiveAimName || contains(InactiveNames,Aim)){
              //debug.log("nepouzit InactiveName " + Aim); 
              continue;                 
            } else {
              InactiveNames.push(Aim);             
            }         
        }
     }
     debug.log("InactiveNames: " + InactiveNames); 
     for(iaim = 0; iaim < InactiveNames.length; iaim++){
       Aim = InactiveNames[iaim];
       //debug.log("dalsi InactiveName "+iaim +" *" + Aim + "*");
       preference.get(Aim).setActive(true);     // aktivuju misto jako preference, avoidance nefunguje
       preference.get(Aim).beepOff(true);     // nema delat zvuk samo osobe
     }      
     
     text.modify(TXT_UKOL,"Najdi "+AnimalNames[SquareName+AimNo]);
     if(AnimalPicturesHandles[SquareName+AimNo]){
         experiment.modifyScreenShape(AnimalPicturesHandles[SquareName+AimNo], true);     // ukaze jiz drive aktivovany obrazek zvirete
     } else {
         AnimalHandleLast += 1;
         experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[SquareName+AimNo]);
         AnimalPicturesHandles[SquareName+AimNo] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
     }
     ActiveTeepee = SquareName+AimNo; 
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

function CtverecJmeno(){
// vraci jmeno aktualniho ctverce A-I
     var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile  
     var SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  //
     return    SquareName;
}