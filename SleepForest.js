// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_CTVEREC = 5;   // cislo dvojice ctvercu
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci
var TXT_INSTRUKCE = 6; // instrukce uprostred obrazovky
var TXT_INSTRUKCE_MALE = 7; // instrukce uprostred obrazovky
var SHAPE_ZAMER = 10;     // zamerovaci krouzek 

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
    A2:{x:-24,y:-172}, A3:{x:-146,y:71},
    B2:{x:1832,y:-98},    B3:{x:1674,y:54},    B4:{x:129,y:-172},
    C3:{x:3498,y:39},    C4:{x:2019,y:-101},
    D1:{x:-85,y:245},    D2:{x:31,y:1633},    D3:{x:-134,y:1994},
    E1:{x:1702,y:233},    E2:{x:1895,y:1730},    E3:{x:1685,y:1978},    E4:{x:186,y:1698},
    F1:{x:3509,y:214},    F3:{x:3518,y:1957},    F4:{x:2082,y:1730},
    G1:{x:-82,y:2155},    G2:{x:93,y:3467},
    H1:{x:1723,y:2143},    H2:{x:1959,y:3549},    H4:{x:243,y:3499},
    I1:{x:3524,y:2129},    I4:{x:2146,y:3533}
};

var PlotyPozice2 = {   // ploty v rozich mezi ctverci, musi zmizet pri testu
    AB1:{x:355,y:-1831}, AB2:{x:454,y:55},AD1:{x:-1783,y:159},AD2:{x:6,y:416},
    BC1:{x:2129,y:-1842},BC2:{x:2267,y:40},BE1:{x:157,y:468},BE2:{x:1865,y:500},
    CF1:{x:2051,y:500},CF2:{x:3838,y:527},
    DE1:{x:483,y:230},DE2:{x:461,y:1976},DG1:{x:-1712,y:2068},DG2:{x:62,y:2240},
    EF1:{x:2272,y:216},EF2:{x:2286,y:1957},EH1:{x:214,y:2272},EH2:{x:1929,y:2329},
    FI1:{x:2112,y:2329},FI2:{x:3897,y:2350},
    GH1:{x:514,y:2142},GH2:{x:387,y:3914},HI1:{x:2300,y:2132},HI2:{x:2170,y:3904},

    // ploty uplne na kraji, ty musi taky zmizet pri testu
    A1:{x:-244,y:-1816}, A1a:{x:-1840,y:-1586},A1b:{x:-53,y:-1392},A4:{x:-1812,y:-375},A4a:{x:-1451,y:-1816},A4b:{x:-1344,y:68},
    B1:{x:1586,y:-1827},B1a:{x:101,y:-1399},B1b:{x:1805,y:-1312},
    C1:{x:3759,y:-1846},C1x:{x:2576,y:-1849},C1a:{x:1993,y:-1317},C1b:{x:3698,y:-1315},C2:{x:3808,y:-73},C2b:{x:4087,y:-22},
    D4:{x:-1739,y:1687},D4a:{x:-1299,y:243},D4b:{x:-1365,y:1993},
    F2:{x:3864,y:1754},F2a:{x:4100,y:204},F2b:{x:4113,y:1938},
    G3:{x:-211,y:3926}, G3a:{x:-1639,y:3897},G3b:{x:-121,y:4054},G4:{x:-1682,y:3300},G4a:{x:-1309,y:2152},G4b:{x:-1441,y:3925},
    H3:{x:1592,y:3920},H3a:{x:273,y:4100},H3b:{x:1987,y:4125},
    I2:{x:3924,y:3554},I2a:{x:4097,y:2114},I2b:{x:4000,y:3876},I3:{x:3393,y:3909},I3a:{x:2175,y:4123},I3b:{x:3955,y:4081}
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
    E4:{x:868,y:1250,z:-210},E6:{x:862,y:786,z:-199},F2:{x:3391,y:1014,z:-218},F4:{x:2932,y:1249,z:-208},
    G1:{x:-864,y:2816,z:-216},G5:{x:-1341,y:3064,z:-226},H1:{x:1171,y:2783,z:-218},H4:{x:854,y:3257,z:-211}, 
    I1:{x:3241,y:2799,z:-254},I3:{x:3251,y:3290,z:-220}
};
var AnimalHiddenZ = -400; // vyska zvirete schovaneho - 0= nad stany, -400 = pod podlahou
var PlotHiddenZ = -400;  // vyska plotu schovaneho    0= nad stany, -400 = pod podlahou -260 - da se prekrocit
var PlotShownZ = -222;  // vyska plotu ukazaneho
var TestCas = 120; // kolik vterin ma hrac na nalezeni cile v testu

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
var ActiveAimNameText = ""; // jmeno aktualniho zvirate, napriklad KOCKU
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
var TestEntrances = 0; // kolik uspesnych vstupu co cile v testu 
var SquarePairsErrors = {}; // pole poctu chyb v kazde treningove dvojici ctvercu. V jejim poslednim vyskytu
var SquarePairsErrorsLimit = 2; // pri kolika chybach je nutne trening na teto dvojici ctvercu opakovat
var IsPauza = false; // jestli jej prave ted pauza mezi dvojicemi ctvercu v treningu
var Ukazal = true; // stavova promenna ukazani na cil v testu. V okamziku kdy je false, subjekt se nehybe z mista a musi ukazat

function init() {	
	experiment.setMap("TEST-SleepForest Alena 04-06 nostatues_newfences"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
}

function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		//platform.get("plosina").doRotateTime(10000,5,-1);
        text.create(TXT_UKOL, 10, 10, 255, 255,0, 3, ""); // nazev aktivniho mista - zluta  
        text.create(TXT_CTVEREC, 700, 10, 0, 0,255, 3, ""); // cislo ctverce - KOLO     
        text.create(TXT_SEKVENCE, 700, 60, 0, 255,0, 3, ""); // cislo zvirete v sekvenci   - NALEZENO
        text.create(TXT_CHYBPOCET, 700, 110, 255,0,0, 3, ""); // pocet chyb - CHYB
        text.create(TXT_CHYBA, 1000, 10, 255, 0,0, 4, ""); // ohlaseni chyby
        text.create(TXT_INSTRUKCE, 200, 400, 255, 255, 255, 4, "" ); // instrukce uprostred obrazovky
        text.create(TXT_INSTRUKCE_MALE, 10, 400, 255, 255, 255, 3, "" ); // instrukce uprostred obrazovky - male
        Zamerovac(); // nastavi zamerovaci kruh na ukazovani smeru k cili
         
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
	  if(!DoTest){  // trening - pauza mezi dvojicemi ctvercu 
        text.modify(TXT_INSTRUKCE,"");
        experiment.setPlayerRotationVertical(0);  // subjekt se diva nahoru do nebe            
        experiment.enablePlayerRotation(true); // zakazu i otaceni na dobu pauzy
        experiment.enablePlayerMovement(true); // zakazu chuzi na dobu pauzy
        SkryjNapisy(false);
      } else { // test - pauza po uplynuti limit pro nalezeni cile
         text.modify(TXT_INSTRUKCE_MALE,"");
         experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false); // schova obrazek zvirete
         experiment.enablePlayerMovement(true); // povolim chuzi pro dalsi trial  
         NextTrial();         
         ActivateAnimal(iPhase,iSequence);
      }
      IsPauza = false;
	}
  if (!Ukazal && key.pressed("space")){   // ukazovani smerem na cil v testu
      Ukazal = true;
      experiment.enablePlayerMovement(true); // povolim zase chuzi
      //experiment.modifyScreenShape(SHAPE_ZAMER, false);  // skryju zamerovaci krouzek
      text.modify(SHAPE_ZAMER,"");
      TXT_UKOL_Last = "Najdi "+ActiveAimNameText;
      text.modify(TXT_UKOL,TXT_UKOL_Last);
      debug.log(TXT_UKOL_Last);  
      experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], true);    // radsi obrazek znovu zobrazim, nekdy se sam schova
      timer.set("testlimit_"+iPhase,TestCas); // limit na nalezeni zvirete
      debug.log("timer: testlimit_"+iPhase + " "+TestCas+"s");
  }
  
    // VSTUP A VYSTUP DO/Z AKTIVNIHO CILE   - vzdy jen jeden
	if (IsInAim=="" && preference.get(ActiveAimName).entered()){
      // vstup do ciloveho mista
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
        TestEntrances += 1;
        ZvirataSchovej(true); //ukaze aktivni zvire     
      }
	}
	
	if (IsInAim==ActiveAimName && preference.get(ActiveAimName).left()){
      // odejiti z ciloveho mista
      debug.log("left Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim left:"+ActiveAimName);
      IsInAim = "";
      NextTrial();        
      ActivateAnimal(iPhase,iSequence);      
	}
   // VSTUP DO/Z CHYBNEHO CILE
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
        text.modify(TXT_CHYBPOCET,"CHYBY: " + ErrorsNumber);
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
	} else if (name=="testlimit_"+iPhase){  // bude true, jen pokud dobehnuty timer odpovida aktivni fazi
      debug.log("Aim not found: "+ActiveAimName + ", iPhase: "+iPhase);
      experiment.logToTrackLog("Aim not found:"+ActiveAimName + ", iPhase: "+iPhase);
      TXT_UKOL_Last = "NEPOVEDLO SE VAM NAJIT CIL V CASOVEM LIMITU"; 
      text.modify(TXT_INSTRUKCE_MALE,TXT_UKOL_Last);  
      //preference.get("AimSound"+CtverecJmeno()).beep(1.0);  // zahraju pozitivni zvuk
      // nejaky zvuk prehrat, ale z jakeho mista? - mit znacku a tu presunout k hracovi?        
      
      IsPauza = true; // stisknete mezernik pro pokracovani pro pokracovani 
      experiment.enablePlayerMovement(false); // zakazu chuzi na dobu pauzy 
      
      // tohle je jen kopie z VSTUP A VYSTUP DO/Z AKTIVNIHO CILE 
      preference.get(ActiveAimName).setActive(false);
      for(iaim = 0; iaim < InactiveNames.length; iaim++){  // deaktivuju avoidance mista
        preference.get(InactiveNames[iaim]).setActive(false);
      }
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
       if(iPhase>=8){  // po osmi dvojicich ctvercu ploty zmizi
          PlotyZmiz(true); // schova vsechny ploty, jsou tam, ale neviditelne
          debug.log("Ploty neviditelne");
       }  else {
          PlotyZmiz(false); 
          debug.log("Ploty viditelne");   
       }  
       
       // pauza pred novou dvojici ctvercu 
         text.modify(TXT_INSTRUKCE,"NOVA DVOJICE CTVERCU");
         experiment.setPlayerRotationVertical(270);  // subjekt se diva nahoru do nebe            
         experiment.enablePlayerRotation(false); // zakazu i otaceni na dobu pauzy
         experiment.enablePlayerMovement(false); // zakazu chuzi na dobu pauzy       
         IsPauza = true;
       //timer.set("novectverce",10); // za jak dlouho tenhle napis sam zmizi
     }
     text.modify(TXT_CTVEREC,"KOLO: "+(iPhase+1) ); // modre cislo    
}
function ActivateAnimal(iPhase,iSequence){
    // vola se po aktivaci paru ctvercu a pak po nalezeni kazdeho zvirete
    // aktivuje  oblast kolem zvirete jako cil, a ostatni zvirata z obou ctvercu jako avoidance 
     // CILOVE MISTO
     var SquareName = CtverecJmeno();  //  jmeno aktualniho ctverce ABC DEF GH nebo I
     if (DoTest){
        var AimNo16 =   AnimalPositions[SquareName][TestSequence[iPhase][2]];  // cislo cile v ramci ctverce odpovidajici cislu stanu 1-6
        PresunHrace(iPhase);
     }  else {
        var AimNo01 = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence] % 10;   // cislo cile v ramci ctverce, zbytek po deleni 10ti , 0 nebo 1
        var AimNo16 = AnimalPositions[SquareName][AimNo01];  // cislo cile v ramci ctverce odpovidajici cislu stanu 1-6
     }
     ActiveAimName = AimName+SquareName+AimNo16;
     debug.log('ActiveAimName: '+ActiveAimName);
     experiment.logToTrackLog("Aim search:"+ActiveAimName); 
     preference.get(ActiveAimName).setActive(true);
     preference.get(ActiveAimName).beepOff(true);     // nema delat zvuk samo osobe
     ActiveAimNameText = AnimalNames[SquareName+AimNo16]; // jmeno zvirete kam navigovat, nepriklad KOCKU
     
     // OBRAZEK A TEXT KAM NAVIGOVAT
     if(DoTest) { // v testu ma nejdriv ukazat na cil
        TXT_UKOL_Last = "Ukaz na "+AnimalNames[SquareName+AimNo16];
        Ukazal = false;          
        experiment.enablePlayerMovement(false); // zakazu chuzi 
        //experiment.modifyScreenShape(SHAPE_ZAMER, true); // zobrazim zamerovaci kruh
        text.modify(SHAPE_ZAMER,"+");  
     } else {
        TXT_UKOL_Last = "Najdi "+AnimalNames[SquareName+AimNo16];
     }
     debug.log(iPhase + " " + TXT_UKOL_Last);          
     text.modify(TXT_UKOL,TXT_UKOL_Last);    
     if(AnimalPicturesHandles[SquareName+AimNo16]){
         experiment.modifyScreenShape(AnimalPicturesHandles[SquareName+AimNo16], true);     // ukaze jiz drive aktivovany obrazek zvirete
     } else {
         AnimalHandleLast += 1;
         experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[SquareName+AimNo16]);
         AnimalPicturesHandles[SquareName+AimNo16] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
     }
     ActiveTeepee = SquareName+AimNo16;    // napriklad 'E4'
     if(IsPauza && !DoTest) {
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
        var SquareName = TestSequence[iPhase][ TestSequence[iPhase][3] ]; // jmeno ctverce do ktereho je treba dojit
     } else { 
        var AimNo = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence];   // cislo cile v ramci ctverce  
        var SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  // SquarePairs se sekvence dvojic ctvercu   
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
function PlotyZmiz(skryj){
    // udela ploty neviditelne, nebo viditelne. 
    for(var key in PlotyPozice){
        var PlotZmiz = PlotName + key;
        var CtverecPozice = PlotyPozice[key];
        mark.get(PlotZmiz).setVisible(!skryj); // viditelne nebo ne, podle ukaz 
    } 
    for(var key in PlotyPozice2){
       var PlotZmiz = PlotName + key;
       var CtverecPozice = PlotyPozice2[key];
       mark.get(PlotZmiz).setVisible(!skryj);
    } 
}
function ZvirataSchovej(ukaz){
  // schova vsechna zvirata, nebo ukaze jen to aktivni pokud ukaz = 1
    if(!ukaz){  
      for(var key in AnimalXYPositions){
          var ZvireZmiz = AnimalName + key; // cele jmeno zvirete napr AnimalA2
          var Pozice = AnimalXYPositions[key];
          mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, AnimalHiddenZ]); // -400 bude pod podlahou, normalni je z
          //debug.log("schovano: "+ZvireZmiz + " na pozici "+[Pozice.x,Pozice.y,Pozice.z]) ;
      } 
     } else {
        var Pozice = AnimalXYPositions[ActiveTeepee];
        var ZvireZmiz = AnimalName + ActiveTeepee; // cele jmeno zvirete napr AnimalA2
        mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, Pozice.z]); // -400 bude pod podlahou, normalni je z
     }
}
function PresunHrace(iiPhase){
     if(DoTest){
        SquareName = TestSequence[iiPhase][ 1-TestSequence[iiPhase][3] ]; // nechci jmeno aktualniho ciloveho ctverce, ale startovniho
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
function NextTrial(){ 
    // zvysi cislo iSequence a iPhase
    iSequence += 1;
    var delkasekvence = DoTest?  1 : AnimalSequence[AnimalSequenceIndex(iPhase)].length;
    if(iSequence>=delkasekvence) {
      // pokud jsem prosel vsechna zvirata mezi ctverci, jdu na dalsi fazi
      // v testu jdu vzdy na dalsi fazi
      iPhase += 1;        
      ActivateSquares(iPhase);
      iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
    }
    text.modify(TXT_SEKVENCE,"NALEZENO:" + (DoTest ? iPhase : iSequence));
    experiment.logToTrackLog("Entrances:" + (DoTest ? TestEntrances : iPhase + "/" + iSequence) );         
}
function Zamerovac(){
  // zamerovaci kruh - 21.4.2017
   var ScreenX = experiment.getScreenX(); // 1680;//
   var ShapeSize = new Array;
    ShapeSize[640]=76; 
    ShapeSize[800]=95;      
    ShapeSize[1024]=121;
    ShapeSize[1264]=140;
    ShapeSize[1280]=140;
    ShapeSize[1440]=160; //1440 x 900 
    ShapeSize[1680]=200;
    ShapeSize[1600]=190; 
   var TXT_Krizek = new Array; // souradnice krizku
    TXT_Krizek[640]=[320,190]; 
    TXT_Krizek[800]=[400,285]; 
    TXT_Krizek[1024]=[512,384]; // 1024 * 768  - krizek je presne veprostred
    TXT_Krizek[1264]=[600,320]; // 1264 * 800  - krizek je presne veprostred
    TXT_Krizek[1280]=[600,320]; // 1264 * 800  - krizek je presne veprostred
    TXT_Krizek[1600]=[800,570]; //
    TXT_Krizek[1680]=[800,525]; // 1680 x 1050    
   if(ShapeSize[ScreenX]== undefined || TXT_Krizek[ScreenX]==undefined){
        text.modify(TXT_INSTRUKCE,"NEZNAMY ROZMER OBRAZOVKY");
        debug.log('NEZNAMY ROZMER OBRAZOVKY ' + ScreenX);
        experiment.setStop(); 
   }
   size = ShapeSize[ScreenX]*4;
   x = Math.floor(TXT_Krizek[ScreenX][0]); //-size/2.1
   y = Math.floor(TXT_Krizek[ScreenX][1]); // -size/2.2
   R=0; G=0;  B=0;
   /*
   experiment.addScreenShape(SHAPE_ZAMER, x, y, R, G,B, size,size,2,true); //cerny kruh
   experiment.modifyScreenShape(SHAPE_ZAMER, false);
   debug.log("zamerovaci kruh: ["+x+";"+y+"],"+size);
   */
   text.create(SHAPE_ZAMER, x, y, 0, 0, 255, 10, ""); // ukazovaci krizek - modra
   debug.log("zamerovaci krizek: ["+x+";"+y+"]"); // protoze kruh se v prubehu testu prestane vykreslovat, nevim vubec proc 
}