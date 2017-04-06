// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_CTVEREC = 5;   // cislo dvojice ctvercu
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci
var TXT_INSTRUKCE = 6; // instrukce uprostred obrazovky


// ctverce ABCDEFGHI, v kazdem z nich stany 1-6
var AnimalNames= {  // ceske pojmenovani zvirat podle jmen ctvercu a cisel stanu
    A3:'REJNOKA',A5:'ZRALOKA', B2:'KOLIBRIKA', B6:'SOJKU',C2:'ZEBRU',C5:'JELENA', 
    D3:'PRASE',D6:'MEDVEDA',E4:'KOCKU',E6:'VLKA',F2:'KROKODYLA',F4:'ZELVU',
    G1:'MOTYLA',G5:'VAZKU',H1:'MROZE',H4:'VELRYBU', I1:'TUCNAKA',I3:'KACHNU'
}; 
var AnimalPictures = { // jmena textur - obrazku zvirat  zobrazeni
    A3:"Obrazky.ray",A5:"Obrazky.shark",B2:"Obrazky.hummingbird",B6:"Obrazky.jay",C2:"Obrazky.zebra",C5:"Obrazky.deer",
    D3:"Obrazky.boar",D6:"Obrazky.bear", E4:"Obrazky.cat",E6:"Obrazky.wolf",F2:"Obrazky.crocodile",F4:"Obrazky.turtle",  
    G1:"Obrazky.butterfly", G5:"Obrazky.dragonfly", H1:"Obrazky.walrus", H4:"Obrazky.whale", I1:"Obrazky.penguin", I3:"Obrazky.duck"
}; 

// pozice zvirete v TEST-SleepForest Edo12box.ut2: -5386,852,916, kamera -5355 801 954

var PlotyPozice = {    // pozice plotu zvedaneho pri pruchodu mezi ctverci
    A2:{x:-24,y:-172}, A3:{x:-303,y:-23},
    B2:{x:1960,y:-161},    B3:{x:1639,y:-33},    B4:{x:129,y:-172},
    C3:{x:3498,y:39},    C4:{x:2077,y:-189},
    D1:{x:-298,y:161},    D2:{x:-15,y:1725},    D3:{x:-266,y:2011},
    E1:{x:1530,y:73},    E2:{x:1953,y:1678},    E3:{x:1624,y:1894},    E4:{x:195,y:1721},
    F1:{x:3509,y:214},    F3:{x:3518,y:1957},    F4:{x:2079,y:1659},
    G1:{x:-257,y:2146},    G2:{x:16,y:3522},
    H1:{x:1596,y:2034},    H2:{x:1959,y:3549},    H4:{x:154,y:3511},
    I1:{x:3524,y:2129},    I4:{x:2146,y:3533}
};

var PlotyPozice2 = {   // ploty v rozich mezi ctverci, musi zmizet pri testu
    AB1:{x:355,y:-1406}, AB2:{x:324,y:-146},AD1:{x:-1478,y:472},AD2:{x:-274,y:490},
    BC1:{x:2137,y:-1420},BC2:{x:2235,y:-173},BE1:{x:331,y:468},BE2:{x:1694,y:453},
    CF1:{x:2312,y:426},CF2:{x:3545,y:500},
    DE1:{x:298,y:492},DE2:{x:375,y:1737},DG1:{x:-1451,y:2347},DG2:{x:-176,y:2291},
    EF1:{x:2272,y:446},EF2:{x:2257,y:1697},EH1:{x:397,y:2267},EH2:{x:1687,y:2309},
    FI1:{x:2323,y:2279},FI2:{x:3565,y:2325},
    GH1:{x:405,y:2260},GH2:{x:387,y:3524},HI1:{x:2260,y:2318},HI2:{x:2170,y:3565},

    // ploty uplne na kraji, ty musi taky zmizet pri testu
    A1:{x:-244,y:-1816}, A1a:{x:-1408,y:-1604},A1b:{x:-214,y:-1444},A4:{x:-1812,y:-375},A4a:{x:-1451,y:-1582},A4b:{x:-1564,y:-380},
    B1:{x:1586,y:-1827},B1a:{x:382,y:-1440},B1b:{x:1628,y:-1444},
    C1:{x:3655,y:-1830},C1x:{x:2414,y:-1824},C1a:{x:2160,y:-1440},C1b:{x:3698,y:-1315},C2:{x:395,y:-109},C2a:{x:4191,y:-1309},C2b:{x:4087,y:-97},
    D4:{x:-1822,y:1723},D4a:{x:-1509,y:507},D4b:{x:-1500,y:1729},
    F2:{x:3905,y:1740},F2a:{x:4124,y:513},F2b:{x:4113,y:1742},
    G3:{x:-211,y:3926}, G3a:{x:-1400,y:4172},G3b:{x:-162,y:4126},G3b:{x:-209,y:3926},G4:{x:-1675,y:3569},G4a:{x:-1479,y:2371},G4b:{x:-1454,y:3597},
    H3:{x:1592,y:3920},H3a:{x:384,y:4109},H3b:{x:1630,y:4166},I2a:{x:4125,y:2339},
    I2:{x:3924,y:3554},I2a:{x:4125,y:2339},I2b:{x:4001,y:3572},I3:{x:3400,y:3889},I3a:{x:2212,y:4136},I3b:{x:3451,y:4161}
};

var SquarePassage={  // jake ploty se maji zvednout pro pruchod mezi dvojici sousedicich ctvercu
    AB:['A2','B4'],BA:['A2','B4'], AD:['A3','D1'],DA:['A3','D1'],
    BC:['B2','C4'],CB:['B2','C4'], BE:['B3','E1'],EB:['B3','E1'],
    CF:['C3','F1'],FC:['C3','F1'],
    DE:['D2','E4'],ED:['D2','E4'], DG:['D3','G1'],GD:['D3','G1'],
    EF:['E2','F4'],FE:['E2','F4'], EH:['E3','H1'],HE:['E3','H1'],
    FI:['F3','I1'],IF:['F3','I1'],
    GH:['G2','H4'],HG:['G2','H4'],
    HI:['H2','I4'],IH:['H2','I4']    
}; // který z plotù se má odstranit pro prùchod mezi ètverci, napr PlotE4 a PlotD2 pro pruchod mezi D a E

var AnimalPositions = { // ve kterych stanech jsou zvirata? - jejich cisla v tomto poli (0 nebo 1) maji odpovidat cislum v AnimalSequence
    A:[3,5],B:[2,6],C:[2,5],
    D:[3,6],E:[4,6],F:[2,4],
    G:[1,5],H:[1,4],I:[1,3]
}; 
var AnimalXYPositions = {  // TODO - pozice zvirat abych je mohl skryvat - posouvat a zase zobrazovat
    A3:{x:-866,y:-835,z:-214},A5:{x:-1353,y:-1071,z:-212}, B2:{x:1351,y:-1027,z:-206}, B6:{x:890,y:-1276,z:-219},
    C2:{x:3362,y:-1060,z:-255},C5:{x:2738,y:-1053,z:-212}, D3:{x:-848,y:1241,z:-212},D6:{x:-1184,y:760,z:-196},
    E4:{x:868,y:1250,z:-210},E6:{x:862,y:786,z:-199},F2:{x:3393,y:1007,z:-218},F4:{x:2764,y:1016,z:-260},
    G1:{x:-864,y:2816,z:-216},G5:{x:-1341,y:3064,z:-226},H1:{x:1171,y:2783,z:-218},H4:{x:854,y:3257,z:-211}, 
    I1:{x:3241,y:2799,z:-254},I3:{x:3251,y:3290,z:-220}
};
AnimalHiddenZ = -400; // vyska zvirete schovaneho - 0= nad stany, -400 = pod podlahou
PlotHiddenZ = -400;  // vyska plotu schovaneho    0= nad stany, -400 = pod podlahou -260 - da se prekrocit
PlotShownZ = -222;  // vyska plotu ukazaneho

var StartSubjectPositions = {
    A:{x:-1053,y:-918}, B:{x:1037,y:-918}, C:{x:3081,y:-918},
    D:{x:-1053,y:834}, E:{x:1037,y:834}, F:{x:3081,y:834},
    G:{x:-1053,y:2900}, H:{x:1037,y:2900}, I:{x:3081,y:2900}    
}
var AllSquares = ['A','B','C','D','E','F','G','H','I'];
var AimName = 'Aim'; //jmeno cile - zacatek ActiveAimName  
var PlotName = 'Plot'; // zacatek jmena kazdeho plotu
var AnimalName = 'Animal'; // zacatek jmena kazdeho zvirete

var iPhase = 0;   // aktualni cislo faze 
var iSequence = 0;  // aktualni cislo stanu/zvirete ve fazi 
var ActiveAimName = 'AimE4'; // jmeno aktualniho aktivniho cile  - AimName+SquareName+AimNo
var ActiveTeepee = 'E4'; // oznaceni aktualniho ctverce k navigaci
var AnimalPicturesHandles = {}; // pole handelu obrazku zvirat - jestli byla uz pouzita textura nebo ne 
var AnimalHandleLast = 0; // posledni prirazeny handle obrazku v  AnimalPicturesUsed
//var ScreenShapeHandleLast = 0; // posledni zobrazene zvire - abych ho mohl docasne schovat
var TXT_UKOL_Last = ""; // posledni instrukce    
var InactiveNames = ['AimE6']; // jmena vsechn neaktivnich zvirat, kam dojit je chyba
var InactiveEntered = ''; // jmeno mista, do ktereho vstoupil omylem
var ErrorsNumber = 0;       // pocet chyb v sekvenci
var IsInAim = ""; // stavova promenna, znacici cil, do ktereho clovek vstoupil, nebo '' pokud v zadnem cili
 // blbne funkce left
var AimEntrances = [0,0,0,0]; // pocet vstupu do 4 mist ve dvojici ctvercu, na zacatku kazde dvojice ctvercu, budu nulovat 
var SquarePairsErrors = {}; // pole poctu chyb v kazde treningove dvojici ctvercu. V jejim poslednim vyskytu
var SquarePairsErrorsLimit = 2; // pri kolika chybach je nutne trening na teto dvojici ctvercu opakovat
var IsPauza = false; // jestli jej prave ted pauza mezi dvojicemi ctvercu v treningu

function init() {	
	experiment.setMap("TEST-SleepForest Alena 03-16"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
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
        text.create(TXT_CHYBPOCET, 850, 10, 255,0,0, 4, ""); // pocet chyb
        text.create(TXT_CHYBA, 1000, 10, 255, 0,0, 4, ""); // ohlaseni chyby
        text.create(TXT_INSTRUKCE, 150, 400, 255, 255, 255, 4, "" ); // instrukce uprostred obrazovky
         
        ActivateSquares(iPhase); //    
        ActivateAnimal(iPhase,iSequence);
	}
	if (key.pressed("g")){
		preference.get(ActiveAimName).setVisible(true);
	}
	if (key.pressed("h")){
		preference.get(ActiveAimName).setVisible(false);
	}
	
	if (key.pressed('r')){
        IsInAim = '';
        debug.log('left: ANY manually');
    }
	if (IsPauza && key.pressed("space")){   // skryje instrukci
		  text.modify(TXT_INSTRUKCE,"");
      experiment.setPlayerRotationVertical(0);  // subjekt se diva nahoru do nebe            
      experiment.enablePlayerRotation(true); // zakazu i otaceni na dobu pauzy
      experiment.enablePlayerMovement(true); // zakazu chuzi na dobu pauzy
      SkryjNapisy(false);
      IsPauza = false;
	}
    // VSTUP A VYSTUP DO/Z AKTIVNIHO CILE   - vzdy jen jeden
	if (IsInAim=="" && preference.get(ActiveAimName).entered()){
      debug.log("entered Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim entrance:"+ActiveAimName);
      IsInAim = ActiveAimName;  // napriklad 'AimE4'
      // vstup do ciloveho mista
      TXT_UKOL_Last = "VYBORNE !"; 
      text.modify(TXT_UKOL,TXT_UKOL_Last);
        
           
      preference.get("AimSound"+CtverecJmeno()).beep(1.0);  // zahraju pozitivni zvuk
      experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false); // schova obrazek zvirete
      preference.get(ActiveAimName).setActive(false);
      for(iaim = 0; iaim < InactiveNames.length; iaim++){  // deaktivuju avoidance mista
        preference.get(InactiveNames[iaim]).setActive(false);
      }
      if(!DoTest){
        AimEntrances[AimNo14()] = AimEntrances[AimNo14()] + 1; // zvysim pocet vstupu do mista 
        debug.log("vstup cislo "+AimEntrances[AimNo14()]);
      } else {
        ZvirataSchovej(true); //ukaze aktivni zvire     
      }
	}
	
	if (IsInAim==ActiveAimName && preference.get(ActiveAimName).left()){
      debug.log("left Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim left:"+ActiveAimName);
      IsInAim = "";       
      iSequence += 1;
      var delkasekvence = DoTest?  1 : AnimalSequence[AnimalSequenceIndex(iPhase)].length;
      if(iSequence>=delkasekvence) {
        // pokud jsem prosel vsechna zvirata mezi ctverci, jdu na dalsi fazi
        // v testu jdu vzdy na dalsi fazi
        iPhase += 1;        
        ActivateSquares(iPhase);
        iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
      }
      text.modify(TXT_SEKVENCE,DoTest ? iPhase : iSequence);
      experiment.logToTrackLog("Entrances:" + (DoTest ? iPhase : iPhase + "/" + iSequence) );         
  	  ActivateAnimal(iPhase,iSequence); 
      
	}
  for(iaim = 0; iaim < InactiveNames.length; iaim++){
    if (IsInAim=="" && preference.get(InactiveNames[iaim]).entered()){
      // vstup do chybneho mista
      debug.log("entered Avoid: "+InactiveNames[iaim]);
      experiment.logToTrackLog("Avoid entrance:"+InactiveNames[iaim]);
      IsInAim = InactiveNames[iaim];       
      text.modify(TXT_CHYBA,"CHYBA !"); 
      //var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
      preference.get("AvoidSound"+CtverecJmeno()).beep(1.0);  // zahraju vystrazny zvuk
      if (DoTest || AimEntrances[AimNo14()] > 0){       
        ErrorsNumber +=1;  // chyby pocitam v testu a po prvni navsteve v treningu
        text.modify(TXT_CHYBPOCET,ErrorsNumber);
        debug.log("Pocet chyb: "+ErrorsNumber);
        if(!DoTest) SetSquarePairErrors(iPhase,1); // zvysim pocet chyb ve dvojici ctvercu o 1        
      }
      experiment.logToTrackLog("Errors:"+ErrorsNumber);
      InactiveEntered = InactiveNames[iaim]; 
      
    }
  }
  
  if(InactiveEntered.length>0 && IsInAim==InactiveEntered && preference.get(InactiveEntered).left() ) {
      debug.log("left Avoid: "+InactiveEntered);
      experiment.logToTrackLog("Avoid left:"+InactiveEntered);
      IsInAim = "";
      text.modify(TXT_CHYBA,""); 
      InactiveEntered = '';         
  }
	
}
function timerTask(name) {	
	if (name == "novectverce"){ 
		text.modify(TXT_INSTRUKCE,"");
	} 
} 
function ActivateSquares(iPhase){
    // iPhase je cislo uz nove faze, inkrementovano predtim
     if(DoTest){  // ****************** TEST  ******************
       ZvirataSchovej(0); // skryju vsechna zvirata - po kazdem vstupu do cile, protoze ukazuju aktivni zvire 
       if(iPhase==0) {
         PlotPosun(-1,0); // v prvni fazi skryje vsechny ploty
       }
       if(iPhase>=TestSequence.length) {
          text.modify(TXT_INSTRUKCE,"KONEC"); 
          debug.log('konec');
          experiment.logToTrackLog("Entrances:" + iPhase  ); 
          experiment.setStop();
       } 
     }  else {    // ****************** TRENING     ******************
       if(iPhase>0){
           // pokud uz druha a dalsi faze, nejdriv zase obnovim ploty
           PlotPosun(iPhase-1,1); // ukaze plot v predchozi fazi          
       }
       if(iPhase>=SquarePairs.length) {
          SquarePairsAdd();       // pokud jsou nejake dvojice ctvercu, kde bylo moc chyb, pridam je jeste na konec sekvence
       }
       if(iPhase>=SquarePairs.length) {            
          // pokud uz jsem vycerpal vsechny pary ctvercu, ukoncim experiment          
          text.modify(TXT_INSTRUKCE,"KONEC");
          debug.log('konec'); 
          experiment.logToTrackLog("Entrances:" + iPhase + "/" + iSequence ); 
          experiment.setStop();
       } else {    
         // skryju ploty mezi novymi ctverci
         PlotPosun(iPhase,0); // skryje plot v teto fazi  
         AimEntrances = [0,0,0,0];  // pocitam vstupy do oblasti znova
         PresunHrace(iPhase);
         SetSquarePairErrors(iPhase,0);                
       }      
       
       // pauza pred novou dvojici ctvercu 
         text.modify(TXT_INSTRUKCE,"NOVA DVOJICE CTVERCU");
         experiment.setPlayerRotationVertical(270);  // subjekt se diva nahoru do nebe            
         experiment.enablePlayerRotation(false); // zakazu i otaceni na dobu pauzy
         experiment.enablePlayerMovement(false); // zakazu chuzi na dobu pauzy       
         IsPauza = true;
       //timer.set("novectverce",10); // za jak dlouho tenhle napis sam zmizi
     }
     text.modify(TXT_CTVEREC,iPhase+1); // modre cislo    
}
function ActivateAnimal(iPhase,iSequence){
    // vola se po aktivaci paru ctvercu a pak po nalezeni kazdeho zvirete
    // aktivuje  oblast kolem zvirete jako cil, a ostatni zvirata z obou ctvercu jako avoidance 
     // CILOVE MISTO
     var SquareName = CtverecJmeno();  //  jmeno aktualniho ctverce ABC DEF GH nebo I
     if (DoTest){
        var AimNo16 =   AnimalPositions[SquareName][TestSequence[iPhase][2]];  // cislo cile odpovidajici cislu stanu 1-6
        PresunHrace(iPhase);
     }  else {
        var AimNo01 = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence] % 10;   // cislo cile, zbytek po deleni 10ti , 0 nebo 1
        var AimNo16 =   AnimalPositions[SquareName][AimNo01];  // cislo cile odpovidajici cislu stanu 1-6
     }
     ActiveAimName = AimName+SquareName+AimNo16;
     debug.log('ActiveAimName: '+ActiveAimName);
     experiment.logToTrackLog("Aim search:"+ActiveAimName); 
     preference.get(ActiveAimName).setActive(true);
     
     // OBRAZEK A TEXT KAM NAVIGOVAT
     TXT_UKOL_Last = "Najdi "+AnimalNames[SquareName+AimNo16];
     text.modify(TXT_UKOL,TXT_UKOL_Last);    
     if(AnimalPicturesHandles[SquareName+AimNo16]){
         experiment.modifyScreenShape(AnimalPicturesHandles[SquareName+AimNo16], true);     // ukaze jiz drive aktivovany obrazek zvirete
     } else {
         AnimalHandleLast += 1;
         experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[SquareName+AimNo16]);
         AnimalPicturesHandles[SquareName+AimNo16] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
     }
     ActiveTeepee = SquareName+AimNo16;    // napriklad 'E4'
     if(IsPauza) {
         SkryjNapisy(true);
     }
     
     
     // AVOIDANCE MISTA
     InactiveNames = [];
     var Ctverce = DoTest ? AllSquares : SquarePairs[iPhase];   // pri treningu a testu mam jine zdrojove pole ctvercu, jinak je vsechno stejne
     for (isquare = 0; isquare < Ctverce.length; isquare++){ // pro vsechny ted aktivni ctverce
        for (ianimal = 1; ianimal <= 6; ianimal++){    // pro vsech sest typi=stanu v tomto ctverci
            //aimn =  AnimalSequence[iPhase][ianimal];            
            SquareName = Ctverce[isquare];    
            Aim =  AimName+SquareName+ianimal; // jmeno jednoho z cilu , napriklad Aim + E + 1
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
     if (DoTest){
        var SquareName = TestSequence[iPhase][1]; // jmeno ctverce do ktereho je treba dojit
     } else { 
        var AimNo = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence];   // cislo cile  
        var SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  //
     }
     return SquareName;
}   
function AimNo14(){     // vrati cislo zvirete 0 - 3
     if(DoTest) return 0; // aby nevznikla chyba, ale nepotrebuju cislo
     var AimNo = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence];   // cislo cile
     var AimNo01 = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence] % 10;   // cislo cile, zbytek po deleni 10ti , 0 nebo 1
     if (AimNo < 10){
        return AimNo01;   // zvirata v prvnim ctverci budou mit cisla 0 a 1
     } else {
        return AimNo01+2; // zvirata v druhem ctverci budou mic cisla 2 a 3
     }
}

function PlotPosun(iiPhase,ukaz){
     if (iiPhase >= 0){
       // kvuli pruchodu v jedne fazi treningu
       var CtverceDvojice =  SquarePairs[iiPhase][0]+ SquarePairs[iiPhase][1]; // napriklad DE 
       for(p=0;p<=1;p++){
         var CtverecName = SquarePassage[CtverceDvojice][p];    // napriklad postupne D2 a E4
         var PlotZmiz = PlotName + CtverecName;   // napriklad PlotD2        
         //mark.get(PlotZmiz).setVisible(true);
         debug.log( (ukaz?"ukaz: ":"skryj: ") + PlotZmiz );
         if (PlotyPozice[CtverecName]!=undefined){
           var CtverecPozice = PlotyPozice[CtverecName];
           mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?PlotShownZ:PlotHiddenZ) ]); // 0 bude nahore, normalni je -222
         }
       }
       if(ukaz==0) experiment.logToTrackLog("Square Pair: "+CtverceDvojice); 
    } else { // iiPhase < 0 - TEST
       // vsechny ploty kterymi hybam v treningu       
       for(var key in PlotyPozice){
          var PlotZmiz = PlotName + key;
          var CtverecPozice = PlotyPozice[key];
          mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?PlotShownZ:PlotHiddenZ) ]); // 0 bude nahore, normalni je -222  
       } 
       for(var key in PlotyPozice2){
          var PlotZmiz = PlotName + key;
          var CtverecPozice = PlotyPozice2[key];
          mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?PlotShownZ:PlotHiddenZ) ]); // 0 bude nahore, normalni je -222  
       } 
    }
}
function ZvirataSchovej(ukaz){
  // schova vsechna zvirata, nebo ukaze jen to aktivni pokud ukaz = 1
    if(!ukaz){  
      for(var key in AnimalXYPositions){
          var ZvireZmiz = AnimalName + key; // cele jmeno zvirete napr AnimalA2
          var Pozice = AnimalXYPositions[key];
          mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, AnimalHiddenZ]); // -400 bude pod podlahou, normalni je z
          debug.log("schovano: "+ZvireZmiz + " na pozici "+[Pozice.x,Pozice.y,Pozice.z]) ;
      } 
     } else {
        var Pozice = AnimalXYPositions[ActiveTeepee];
        var ZvireZmiz = AnimalName + ActiveTeepee; // cele jmeno zvirete napr AnimalA2
        mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, Pozice.z]); // -400 bude pod podlahou, normalni je z
     }
}
function PresunHrace(iiPhase){
     if(DoTest){
        SquareName = TestSequence[iiPhase][0]; // nechci jmeno aktualniho ciloveho ctverce, ale startovniho
     } else {
        SquareName = CtverecJmeno();
     }
     SubjektPozice =  StartSubjectPositions[SquareName];
     experiment.setPlayerLocation([SubjektPozice.x,SubjektPozice.y]);
     logtext =  "Player moved to: "+SquareName + ", xy=" + [SubjektPozice.x,SubjektPozice.y];
     debug.log(logtext); 
     experiment.logToTrackLog(logtext); 
}

function SetSquarePairErrors(iiPhase,n){     // nastavi pocti chyb pro dvojici ctvercu - pokud n=0 tak resetuje, jinak cislo pricte k aktualni hodnote
  var CtverceDvojice =  SquarePairs[iiPhase][0]+ SquarePairs[iiPhase][1]; // napriklad DE
  if(n==0){ 
    SquarePairsErrors[CtverceDvojice] = 0;
  } else {
    SquarePairsErrors[CtverceDvojice] = SquarePairsErrors[CtverceDvojice]+n;
  }  
  debug.log("SquarePairsErrors["+CtverceDvojice+"]="+SquarePairsErrors[CtverceDvojice]);
}

function SquarePairsAdd(){ 
  // funkce ktera smaze SquarePairs a naplni je temi, kde clovek delal moc chyb
  var SquarePairs2 = SquarePairs;   // privadam zatim do kopie 
  isqp = SquarePairs2.length;
  var CtverceDvojice="";
  for (sqp = 0; sqp < SquarePairs.length; sqp++){
      CtverceDvojice =  SquarePairs[sqp][0]+ SquarePairs[sqp][1]; // napriklad DE
      if(SquarePairsErrors[CtverceDvojice]>=SquarePairsErrorsLimit){   // pokud vic chyb nez je limit
         SquarePairs2[isqp]=[SquarePairs[sqp][0] , SquarePairs[sqp][1]];   // na konec kopie pole nactu tuto dvojici ctvercu
         isqp++;
         SquarePairsErrors[CtverceDvojice] = 0;  // nechci tam tento par ctvercu vkladat znova, takze pocet chyb u nej vynuluju
         debug.log("SquarePairsAdd: pridan ctverec "+CtverceDvojice);           
      }
  }  
  SquarePairs = SquarePairs2;  
  return  SquarePairs.length;
}
 
function AnimalSequenceIndex(iiPhase){
   // funkce ktera vraci index v poli  AnimalSequence
   return iiPhase  % AnimalSequence.length; // zbytek po deleni delkou - od 0 do n-1, bude se porad opakovat
}

function SkryjNapisy(skryj){
   // behem pauzy skryje napisy a obrazek zvirete na obrazovce 
   experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], skryj ? false : true );
   if (skryj) {
      text.modify(TXT_UKOL,"");   // skryje instrukci, ale nesmaze TXT_UKOL_Last   
   } else {
      text.modify(TXT_UKOL,TXT_UKOL_Last); // obnovim drive skryte
   }
}

