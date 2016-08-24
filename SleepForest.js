// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_CTVEREC = 5;   // cislo dvojice ctvercu
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci
var TXT_INSTRUKCE = 6; // instrukce uprostred obrazovky


// ctverce ABCDEFGHI, v kazdem z nich stany 1-6
var AnimalNames= {  // ceske pojmenovani zvirat podle jmen ctvercu a cisel stanu
    A3:'REJNOKA',A5:'ZRALOKA', A3:'REJNOKA',B2:'KOLIBRIKA', B6:'SOJKU',C2:'ZEBRU',C5:'JELENA', 
    D2:'PRASE',D6:'MEDVEDA',E4:'KOCKU',E6:'VLKA',F1:'KROKODYLA',F5:'ZELVU',
    G1:'MOTYLA',G5:'VAZKU',H2:'MROZE',H5:'VELRYBU', I2:'TUCNAKA',I5:'KACHNU'
}; 
var AnimalPictures = { // jmena textur - obrazku zvirat  zobrazeni
    A3:"Obrazky.ray",A5:"Obrazky.shark",B2:"Obrazky.hummingbird",B6:"Obrazky.jay",C2:"Obrazky.zebra",C5:"Obrazky.deer",
    D2:"Obrazky.boar",D6:"Obrazky.bear", E4:"Obrazky.cat",E6:"Obrazky.wolf",F1:"Obrazky.crocodile",F5:"Obrazky.turtle",  
    G1:"Obrazky.butterfly", G5:"Obrazky.dragonfly", H2:"Obrazky.walrus", H5:"Obrazky.whale", I2:"Obrazky.penguin", I5:"Obrazky.duck"
}; 

// pozice zvirete v TEST-SleepForest Edo12box.ut2: -5386,852,916, kamera -5355 801 954

var PlotyPozice = {    // pozice plotu zvedaneho pri pruchodu mezi ctverci
    A2:{x:-286,y:369}, A3:{x:-350,y:-361},
    B2:{x:1685,y:-392}, B3:{x:-1621,y:-384},B4:{x:375,y:-402},
    C3:{x:3634,y:-380}, C4:{x:2388,y:-398},
    D1:{x:-367,y:363}, D2:{x:-278,y:1549}, D3:{x:-332,y:1557}, 
    E1:{x:1588,y:348}, E2:{x:1688,y:1534}, E3:{x:1624,y:1542},E4:{x:378,y:1524},
    F1:{x:3601,y:345}, F3:{x:3637,y:1539}, F4:{x:2391,y:1521},
    G1:{x:-322,y:2392}, G2:{x:-222,y:3578},  
    H1:{x:1595,y:2333}, H2:{x:1698,y:3549}, H4:{x:388,y:3539},
    I1:{x:3631,y:2399}, I4:{x:2421,y:3575}
};
var PlotyPozice2 = {   // ploty v rozich mezi ctverci, musi zmizet pri testu
    AB2:{x:324,y:-376},  BE1:{x:389,y:249},  DE1:{x:298,y:340},  AD2:{x:-291,y:289},
    BC2:{x:2312,y:-392}, CF1:{x:2414,y:262},EF1:{x:2272,y:341}, BE2:{x:1693,y:241},
    DE2:{x:324,y:-376},  EH1:{x:397,y:2231}, GH1:{x:323,y:2382}, DG2:{x:-266,y:2224},
    EF2:{x:2302,y:1543}, FI1:{x:2404,y:2241},HI1:{x:2303,y:2392},EH2:{x:1686,y:2237}
};
var SquarePassage={  // jake ploty se maji zvednou pro pruchod mezi dvojici sousedicich ctvercu
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
    D:[2,6],E:[4,6],F:[1,5],
    G:[1,5],H:[2,5],I:[2,5]
}; 
var AllSquares = ['A','B','C','D','E','F','G','H','I'];
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
var IsInAim = ""; // stavova promenna, znacici cil, do ktereho clovek vstoupil, nebo '' pokud v zadnem cili
 // blbne funkce left
var AimEntrances = [0,0,0,0]; // pocet vstupu do 4 mist ve dvojici ctvercu, na zacatku kazde dvojice ctvercu, budu nulovat 

function init() {	
	experiment.setMap("TEST-SleepForest Edo12 08-23"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
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
        text.create(TXT_INSTRUKCE, 150, 400, 255, 255, 255, 4, DoTest ? "" : "NOVA DVOJICE CTVERCU"); // instrukce uprostred obrazovky
         
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
	if (key.pressed("space")){   // skryje instrukci
		  text.modify(TXT_INSTRUKCE,"");
	}
    // VSTUP A VYSTUP DO/Z AKTIVNIHO CILE   - vzdy jen jeden
	if (IsInAim=="" && preference.get(ActiveAimName).entered()){
      debug.log("entered Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim entrance:"+ActiveAimName);
      IsInAim = ActiveAimName;
      // vstup do ciloveho mista
      text.modify(TXT_UKOL,"VYBORNE !");
      preference.get("AimSound"+CtverecJmeno()).beep(1.0);  // zahraju pozitivni zvuk
      experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false); // schova obrazek zvirete
      preference.get(ActiveAimName).setActive(false);
      for(iaim = 0; iaim < InactiveNames.length; iaim++){  // deaktivuju avoidance mista
        preference.get(InactiveNames[iaim]).setActive(false);
      }
      if(!DoTest){
        AimEntrances[AimNo14()] = AimEntrances[AimNo14()] + 1; // zvysim pocet vstupu do mista 
        debug.log("vstup cislo "+AimEntrances[AimNo14()]);
      }
	}
	
	if (IsInAim==ActiveAimName && preference.get(ActiveAimName).left()){
      debug.log("left Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim left:"+ActiveAimName);
      IsInAim = "";       
      iSequence += 1;
      var delkasekvence = DoTest?  1 : AnimalSequence[iPhase].length;
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
function ActivateSquares(iPhase){
    // iPhase je cislo uz nove faze, inkrementovano predtim
     if(DoTest){
       if(iPhase==0) PlotPosun(-1,0); // v prvni fazi skryje vsechny ploty
       if(iPhase>=TestSequence.length) {
          text.modify(TXT_INSTRUKCE,"KONEC"); 
          debug.log('konec');
          experiment.logToTrackLog("Entrances:" + iPhase  ); 
          experiment.setStop();
       } 
     }  else {   
       if(iPhase>0){
           // pokud uz druha a dalsi faze, nejdriv zase obnovim ploty
           PlotPosun(iPhase-1,1); // ukaze plot v predchozi fazi          
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
       }
       text.modify(TXT_INSTRUKCE,"NOVA DVOJICE CTVERCU"); 
     }
     text.modify(TXT_CTVEREC,iPhase+1); // modre cislo    
}
function ActivateAnimal(iPhase,iSequence){
    // vola se po aktivaci paru ctvercu a pak po nalezeni kazdeho zvirete
    // aktivuje  oblast kolem zvirete jako cil, a ostatni zvirata z obou ctvercu jako avoidance 
     // CILOVE MISTO
     var SquareName = CtverecJmeno();  //  jmeno aktualniho ctverce ABC DEF GH nebo I
     if (DoTest){
        var AimNo16 =   AnimalPositions[SquareName][TestSequence[iPhase][1]];  // cislo cile odpovidajici cislu stanu 1-6
     }  else {
        var AimNo01 = AnimalSequence[iPhase][iSequence] % 10;   // cislo cile, zbytek po deleni 10ti , 0 nebo 1
        var AimNo16 =   AnimalPositions[SquareName][AimNo01];  // cislo cile odpovidajici cislu stanu 1-6
     }
     ActiveAimName = AimName+SquareName+AimNo16;
     debug.log('ActiveAimName: '+ActiveAimName);
     experiment.logToTrackLog("Aim search:"+ActiveAimName); 
     preference.get(ActiveAimName).setActive(true);
     
     // OBRAZEK A TEXT KAM NAVIGOVAT
     text.modify(TXT_UKOL,"Najdi "+AnimalNames[SquareName+AimNo16]);
     if(AnimalPicturesHandles[SquareName+AimNo16]){
         experiment.modifyScreenShape(AnimalPicturesHandles[SquareName+AimNo16], true);     // ukaze jiz drive aktivovany obrazek zvirete
     } else {
         AnimalHandleLast += 1;
         experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[SquareName+AimNo16]);
         AnimalPicturesHandles[SquareName+AimNo16] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
     }
     ActiveTeepee = SquareName+AimNo16;
     
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
        var SquareName = TestSequence[iPhase][0]; 
     } else { 
        var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile  
        var SquareName = SquarePairs[iPhase][toInt(AimNo/10)];  //
     }
     return SquareName;
}   
function AimNo14(){     // vrati cislo zvirete 0 - 3
     if(DoTest) return 0; // aby nevznikla chyba, ale nepotrebuju cislo
     var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
     var AimNo01 = AnimalSequence[iPhase][iSequence] % 10;   // cislo cile, zbytek po deleni 10ti , 0 nebo 1
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
           mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?-222:-400) ]); // 0 bude nahore, normalni je -222
         }
       }
    } else {
       // vsechny ploty kterymi hybam v treningu       
       for(var key in PlotyPozice){
          var PlotZmiz = PlotName + key;
          var CtverecPozice = PlotyPozice[key];
          mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?-222:-400) ]); // 0 bude nahore, normalni je -222  
       } 
       for(var key in PlotyPozice2){
          var PlotZmiz = PlotName + key;
          var CtverecPozice = PlotyPozice2[key];
          mark.get(PlotZmiz).setLocation([CtverecPozice.x,CtverecPozice.y, (ukaz?-222:-400) ]); // 0 bude nahore, normalni je -222  
       } 
    }
}
