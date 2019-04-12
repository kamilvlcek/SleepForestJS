/* 2019_04_03: code at lines 81 to 89 edited: changed default positions of animals
*/


/*##############################################################################################*/
// treningova faze - uceni se zviratum v postupnych dvojicich ctvercu
var TXT_UKOL = 1;   // text soucasneho ukolu - najdi kocku napriklad
var TXT_CTVEREC = 5;   // cislo dvojice ctvercu
var TXT_SEKVENCE = 2; // cislo zvirete v sekvenci
var TXT_CHYBPOCET = 3; // cislo zvirete v sekvenci
var TXT_CHYBA = 4; // cislo zvirete v sekvenci
var TXT_INSTRUKCE = 6; // instrukce uprostred obrazovky
var TXT_INSTRUKCE_MALE = 7; // instrukce uprostred obrazovky
var TXT_SEKUNDY = 8; // cas do ukonceni prozkoumavani dvojice ctvercu
var TXT_DEBUG = 9; // text o aktualnim a cilovem ctverci - je pro ucely zkouseni testu
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
    AB:{x:106,y:-2354}, AD:{x:491,y:46}, 
    BC:{x:2117,y:-2381}, BE:{x:2489,y:50}, 
    CF:{x:4484,y:47}, DE:{x:106,y:-353}, DG:{x:491,y:2052}, 
    EF:{x:2117,y:-347}, EH:{x:2489,y:2055}, 
    FI:{x:4484,y:2056}, GH:{x:106,y:1656}, HI:{x:2117,y:1650}
};

var PlotyPozice2 = { // ploty na kraji, ktere musi zmizet pri testu  
    A1:{x:491,y:-1947}, A2:{x:-1878,y:-2359}, 
    B:{x:2489,y:-1949}, C1:{x:4484,y:-1949}, C2:{x:4109,y:-2371}, 
    F:{x:4109,y:-363}, D:{x:-1878,y:-353}, 
    G2:{x:-1878,y:1650}, G1:{x:491,y:4064}, 
    H:{x:2489,y:4066}, I2:{x:4109,y:1650}, I1:{x:4484,y:4069}
};

var SquarePassage={  // jake ploty se maji zvednout pro pruchod mezi dvojici sousedicich ctvercu
    AB:['AB'],	BA:['AB'], AD:['AD'],	DA:['AD'], 
    BC:['BC'],	CB:['BC'], BE:['BE'],	EB:['BE'], 
    CF:['CF'],	FC:['CF'], 
    DE:['DE'],	ED:['DE'], DG:['DG'],	GD:['DG'], 
    EF:['EF'],	FE:['EF'], EH:['EH'],	HE:['EH'], 
    FI:['FI'],	IF:['FI'], 
    GH:['GH'],	HG:['GH'], HI:['HI'],	IH:['HI']   
}; // který z plotù se má odstranit pro prùchod mezi ètverci, napr PlotE4 a PlotD2 pro pruchod mezi D a E

var SquareDirections={ // jakym smerem se prochazi mezi dvema ploty, S Z J V - svetove strany
    AB:['V'],	  BA:['Z'], AD:['J'],	DA:['S'], 
    BC:['V'],	  CB:['Z'], BE:['J'],	EB:['S'], 
    CF:['J'],	  FC:['S'], 
    DE:['V'],	  ED:['Z'], DG:['J'],	GD:['S'], 
    EF:['V'],	  FE:['Z'], EH:['J'],	HE:['S'], 
    FI:['J'],	  IF:['S'], 
    GH:['V'],	  HG:['Z'], HI:['V'],	IH:['Z']  
}
var AnimalPositions = { // ve kterych stanech jsou zvirata? - jejich cisla v tomto poli (0 nebo 1) maji odpovidat cislum v AnimalSequence
    A:[3,5],B:[2,6],C:[2,5],
    D:[3,6],E:[4,6],F:[2,4],
    G:[1,5],H:[1,4],I:[1,3]
}; 
var AnimalPositionsActive = { // ktera zvirata jsou aktivni - maji se pouzivat pri testu
    A:[3],B:[2],C:[2],
    D:[3],E:[4],F:[2],
    G:[1],H:[4],I:[1]        
}; 

var AnimalXYPositions = { // pozice zvirat abych je mohl skryvat - posouvat a zase zobrazovat
    A3:{x:-970,y:-764,z:-214},A5:{x:-1353,y:-1071,z:-212}, B2:{x:1041,y:-725,z:-206}, B6:{x:890,y:-1276,z:-219},
    C2:{x:3021,y:-743,z:-255},C5:{x:2738,y:-1053,z:-212}, D3:{x:-966,y:1302,z:-212},D6:{x:-1184,y:760,z:-196},
    E4:{x:1124,y:1241,z:-210},E6:{x:862,y:786,z:-199},F2:{x:3037,y:1290,z:-218},F4:{x:2932,y:1249,z:-208},
    G1:{x:-873,y:3319,z:-216},G5:{x:-1341,y:3064,z:-226},H1:{x:1171,y:2783,z:-218},H4:{x:1011,y:3192,z:-211}, 
    I1:{x:3063,y:3242,z:-254},I3:{x:3251,y:3290,z:-220}


};


var AnimalHiddenZ = -400; // vyska zvirete schovaneho - 0= nad stany, -400 = pod podlahou
var PlotHiddenZ = -854;  // vyska plotu schovaneho    0= nad stany, -400 = pod podlahou -260 - da se prekrocit
var PlotShownZ = -654;  // vyska plotu ukazaneho  -222;
var TestCas = 90; // kolik vterin ma hrac na nalezeni cile v testu
var Debug = 0; // pokud 1, zobrazuje se aktualni ctverec a pozice cile - pro ucely ladeni experimentu

var StartSubjectPositions = {
    A:{x:-1053,y:-918}, B:{x:1037,y:-918}, C:{x:3081,y:-918},
    D:{x:-1053,y:834}, E:{x:1037,y:834}, F:{x:3081,y:834},
    G:{x:-1053,y:2900}, H:{x:1037,y:2900}, I:{x:3081,y:2900}    
}

var SquaresBoundaries = { // hranice ctvercu pro detekci vchazeni a vychazeni 
    X: {A:[-1594,-318],B:[414,1690],C:[2392,3668], // pojmenovani sloupcu ABC - musi byt v prvni radce
        D:[-1594,-318],E:[414,1690],F:[2392,3668], 
        G:[-1594,-318],H:[414,1690],I:[2392,3668] 
        },
    Y: {A:[-1630,-346],D:[416,1700],G:[2414,3698], // pojmenovani radku ADG  - musi byt v prvni radce
        B:[-1630,-346],E:[416,1700],H:[2414,3698], 
        C:[-1630,-346],F:[416,1700],I:[2414,3698]        
        }
}
  
var AllSquares = ['A','B','C','D','E','F','G','H','I'];
var AimName = 'Aim'; //jmeno cile - zacatek ActiveAimName  
var PlotName = 'Plot'; // zacatek jmena kazdeho plotu
var AnimalName = 'Animal'; // zacatek jmena kazdeho zvirete

var iPhase = 0;   // aktualni cislo faze 
var iSequence = 0;  // aktualni cislo stanu/zvirete ve fazi 
var Nalezenych = 0;  // pocet nalezenych cilu, pokud v testu nenajde cil, nesedi to s iPhase ani iSekvence
var ActiveAimName = 'AimE4'; // jmeno aktualniho aktivniho cile  - AimName+SquareName+AimNo
var ActiveAimNameText = ""; // jmeno aktualniho zvirate, napriklad KOCKU
var ActiveTeepee = 'E4'; // oznaceni aktualniho ctverce k navigaci
var AnimalPicturesHandles = {}; // pole handelu obrazku zvirat - jestli byla uz pouzita textura nebo ne 
var AnimalHandleLast = 0; // posledni prirazeny handle obrazku v  AnimalPicturesUsed
//var ScreenShapeHandleLast = 0; // posledni zobrazene zvire - abych ho mohl docasne schovat
var TXT_UKOL_Last = ""; // posledni instrukce    
var InactiveNames = ['AimE6']; // jmena vsechn neaktivnich zvirat, kam dojit je chyba
var InactiveEntered = ''; // jmeno mista, do ktereho vstoupil omylem
var ErrorsNumber = 0;       // pocet chyb v sekvenci   - zveda se po vstupu do spatneho stanu
var IsInAim = ""; // stavova promenna, znacici cil, do ktereho clovek vstoupil, nebo '' pokud v zadnem cili
 // blbne funkce left
var IsInSquare = ""; // jmeno aktualniho ctverce A-I,ve kterem se clovek nachazi
var RunCycle = 0;  // po kolikate bezi fukce run - jen pro debug
var TimerCycle = 0;  // po kolikate byl spusten timer  SquareLeftEntered  
var TimerCyclePeriod = 1; // kolik sekund mezi volanim
var AimEntrances = [0,0,0,0]; // pocet vstupu do 4 mist ve dvojici ctvercu, na zacatku kazde dvojice ctvercu, budu nulovat
var TestEntrances = 0; // kolik uspesnych vstupu co cile v testu 
var SquarePairsErrors = {}; // pole poctu chyb v kazde treningove dvojici ctvercu. V jejim poslednim vyskytu
var SquarePairsErrorsLimit = 2; // pri kolika chybach je nutne trening na teto dvojici ctvercu opakovat
var SquarePairsErrorsLimit2 = 8; // po kolika opakovanych dvojich ctvercu jeste pridat opacko na konci, viz   SquarePairsToAdd
var SquarePairsToAdd = 8; // kole dvojic se ma na konci jeste pridat, pokud prekrocen limit na SquarePairsErrorsLimit2
var SquarePairsAdded = 0; // kolik uz bylo pridano dvojic ctvercu na konci treningu
var IsPauza = false; // jestli jej prave ted pauza  - mezi dvojicemi ctvercu v treningu nebo po uplynuti limitu pro nalezeni cile v testu
var Ukazal = true; // stavova promenna ukazani na cil v testu. V okamziku kdy je false, subjekt se nehybe z mista a musi ukazat
var RuznychDvojicCtvercu = 8; // kolik je ruznych dvojic - pouziva se na skrytu plotu a pocatecni exploraci
var CasZkoumej = 120; // cas na zacatku kazde dvojice ctvercu, kdy se clovek ma jen prochazet, bez ukolu
var CasZkoumejZbyva = 0; // kolik jeste zbyva casu na prozkoumani, nastavuje se automaticky na 60 a pak se odecita
var CasZkoumejStart = 0; //  date object zacatku pocitani

function init() {	
	experiment.setMap("TEST-SleepForest bohaty-ploty_15-9kopie"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal  
}
// --------------------------- RUN -----------------------------------------------
function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		//platform.get("plosina").doRotateTime(10000,5,-1);
        var ScreenX = experiment.getScreenX();
        text.create(TXT_UKOL, 10, 10, 255, 255,0, 3, ""); // nazev aktivniho mista - zluta  
        text.create(TXT_CTVEREC, ScreenX-500, 10, 0, 0,255, 3, ""); // cislo ctverce - KOLO     
        text.create(TXT_SEKVENCE, ScreenX-500, 60, 0, 255,0, 3, ""); // cislo zvirete v sekvenci   - NALEZENO
        text.create(TXT_CHYBPOCET, ScreenX-500, 110, 255,0,0, 3, ""); // pocet chyb - CHYB
        text.create(TXT_CHYBA, 1000, 10, 255, 0,0, 4, ""); // ohlaseni chyby
        text.create(TXT_INSTRUKCE, 200, 400, 255, 255, 255, 4, "" ); // instrukce uprostred obrazovky
        text.create(TXT_INSTRUKCE_MALE, 10, 400, 255, 255, 255, 3, "" ); // instrukce uprostred obrazovky - male
        text.create(TXT_SEKUNDY, ScreenX - 160, 10, 255, 255, 255, 3, "" ); // pocet vterin do konce - male vpravo nahore
        if(Debug)  text.create(TXT_DEBUG,   ScreenX - 150, 60, 255, 255, 255, 3, "" ); // text o aktualnim a cilovem ctverci - je pro ucely zkouseni testu
        Zamerovac(); // nastavi zamerovaci kruh na ukazovani smeru k cili
         
        ActivateSquares(iPhase); //    
        ActivateAnimal(iPhase,iSequence);
        timer.set("SquareLeftEntered",TimerCyclePeriod); 
	}
	/*
  if (key.pressed("g")){
		preference.get(ActiveAimName).setVisible(true);
	}
	if (key.pressed("h")){
		preference.get(ActiveAimName).setVisible(false);
	}
	*/
	if (key.pressed('r')){
        IsInAim = '';
        debug.log('left: ANY manually');
    }
    if (key.pressed('n')){ // takhle muzu skakat na dalsi 
        NextTrial(true);    // zvysim cislo faze  
        ActivateAnimal(iPhase,iSequence);
    }
    if (key.pressed('k')){ // ukonceni prohledavani, kvuli usetreni casu
        CasZkoumejStart.setSeconds(CasZkoumejStart.getSeconds() - CasZkoumej);  // posunu zacatek zkoumani v case dozadu  - timestamp je asi v ms
    }
    if (key.pressed("x")){
		  XX = experiment.getPlayerLocationX();
      YY = experiment.getPlayerLocationY();
      debug.log('PlayerLocation X: '+XX+', Y: '+YY);
	  } 
    
	if (IsPauza && key.pressed("space")){   
	  if(!DoTest){  // trening - pauza mezi dvojicemi ctvercu - jeji konec zmacknutim mezerniku 
        text.modify(TXT_INSTRUKCE,"");      // skryje  velkou instrukci uprostred obrazovky
        experiment.setPlayerRotationVertical(0);  // subjekt se diva zase pred sebe            
        experiment.enablePlayerRotation(true); // povolim otaceni
        experiment.enablePlayerMovement(true); // povolim chuzi po dobe pauzy 
        if(CasZkoumej > 0 && iPhase < RuznychDvojicCtvercu){  //clovek bude po CasZkoumej vterin volne prozkoumavat dvojici ctvercu - novinka 8.2017
            ActiveN =  GetActiveNames(); // vrati jmena aktivniho cile a teepee 
            ActivateGoal(ActiveN.ActiveAimName,ActiveN.ActiveTeepee,iPhase,false);  // aktivuje aktualni cil i ostatni cile jako avoidance
            text.modify(TXT_UKOL,TXT_UKOL_Last);    // vypise ukol na obrazovku smazany behem pauzy - Prozkoumej tuto dvojici ctvercu
            ShowAnimalPicture(ActiveN.ActiveTeepee, false); // skryje obrazek ciloveho zvirete
            
            //timer.set("CasZkoumej",CasZkoumej); // nastavim casovac, nez cas volneho zkoumani uplyne - 28.8.2017 - nechci mi dva ruzne casovace na to same - muzou merit cas ruzne rychle
            CasZkoumejZbyva = CasZkoumej; // zacnu odecitat cas 
            timer.set("CasZkoumejZbyva",1); // nastavim casovac na jednu vterinu 
            text.modify(TXT_SEKUNDY,CasZkoumejZbyva);
            CasZkoumejStart = new Date(); 
        } else {
            SkryjNapisy(false); // zase ukaze - po pauze -  obrazek zvirete na obrazovce a text TXT_UKOL
        } 
      } else { // test - pauza po uplynuti limitu pro nalezeni cile
         text.modify(TXT_INSTRUKCE_MALE,""); // skryju napis, ze se nepovedlo najit cil
         ShowAnimalPicture(ActiveTeepee, false); // schova obrazek zvirete
         experiment.enablePlayerMovement(true); // povolim chuzi pro dalsi trial  
         NextTrial(false);  // tady nepricitam Nalezeno       
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
      ShowAnimalPicture(ActiveTeepee, true); // radsi obrazek znovu zobrazim, nekdy se sam schova  
      timer.set("testlimit_"+iPhase,TestCas); // limit na nalezeni zvirete
      debug.log("timer: testlimit_"+iPhase + " "+TestCas+"s");
  }
  
    // VSTUP A VYSTUP DO/Z AKTIVNIHO CILE   - vzdy jen jeden
	if (IsInAim=="" && preference.get(ActiveAimName).entered() && CasZkoumejZbyva <= 0 ){
      // vstup do ciloveho mista
      debug.log("entered Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim entrance:"+ActiveAimName);
      IsInAim = ActiveAimName;  // napriklad 'AimE4'
      // vstup do ciloveho mista
      TXT_UKOL_Last = "VYBORNE !"; 
      text.modify(TXT_UKOL,TXT_UKOL_Last);        
           
      preference.get("AimSound"+CtverecJmeno()).beep(1.0);  // zahraju pozitivni zvuk
      ShowAnimalPicture(ActiveTeepee, false); // schova obrazek zvirete
      preference.get(ActiveAimName).setActive(false); // cilove misto deaktivuju
      for(iaim = 0; iaim < InactiveNames.length; iaim++){  
        preference.get(InactiveNames[iaim]).setActive(false); // deaktivuju avoidance mista
      }
      if(!DoTest){
        AimEntrances[AimNo14()] = AimEntrances[AimNo14()] + 1; // zvysim pocet vstupu do mista 
        debug.log("vstup cislo "+AimEntrances[AimNo14()]);
      } else {
        TestEntrances += 1;
        ZvirataSchovej(1); //ukaze aktivni zvire     
      }
	}
	
	if (IsInAim==ActiveAimName && preference.get(ActiveAimName).left() && CasZkoumejZbyva <= 0){
      // odejiti z ciloveho mista
      debug.log("left Aim: "+ActiveAimName);
      experiment.logToTrackLog("Aim left:"+ActiveAimName);
      IsInAim = "";
      Nalezenych++; // zvysim pocet nalezenych cilu
      NextTrial(false);  // vola i ActivateSquares      
      ActivateAnimal(iPhase,iSequence); // aktivujuju dalsi cilova mista a inactivegoals=chyby     
	}
   // VSTUP DO/Z CHYBNEHO CILE
  for(iaim = 0; iaim < InactiveNames.length; iaim++){
    Aim = InactiveNames[iaim];    
    if( (pref = PrefAim(Aim,'entered Avoid'))!=false){  // 2.3.2018 - osetreni chyby, kdy neexistuje cil k vyhybani 
      if (IsInAim=="" && pref.entered() && CasZkoumejZbyva <= 0){
        // vstup do chybneho mista
        debug.log("entered Avoid: "+InactiveNames[iaim]);
        experiment.logToTrackLog("Avoid entrance:"+InactiveNames[iaim]);
        IsInAim = InactiveNames[iaim];       
        text.modify(TXT_CHYBA,"CHYBA !"); 
        //var AimNo = AnimalSequence[iPhase][iSequence];   // cislo cile
        preference.get("AvoidSound"+CtverecJmeno()).beep(1.0);  // zahraju vystrazny zvuk
        if (DoTest || AimEntrances[AimNo14()] > 0 || CasZkoumej > 0){  // pokud je cas na zkoumani, pocitam chyby od zacatku     
          ZapocitejChybu();   
        }
        experiment.logToTrackLog("Errors:"+ErrorsNumber);
        InactiveEntered = InactiveNames[iaim]; 
      }
    }
  }
  // VYSTUP Z CHYBNEHO CILE 
  if(InactiveEntered.length>0 && IsInAim==InactiveEntered && preference.get(InactiveEntered).left() && CasZkoumejZbyva <= 0 ) {
      debug.log("left Avoid: "+InactiveEntered);
      experiment.logToTrackLog("Avoid left:"+InactiveEntered);
      IsInAim = "";
      text.modify(TXT_CHYBA,""); 
      InactiveEntered = '';         
  }
  
  RunCycle = RunCycle + 1;   // testuju, jak se spousti tenhle cyklus RUN
  debug.log("RunCycle "+RunCycle);
  
}
// -------------------- FUNKCE -----------------------------------------
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
      
      IsPauza = true; // pauza po uplynuti limitu v testu - stisknete mezernik pro pokracovani pro pokracovani 
      experiment.enablePlayerMovement(false); // zakazu chuzi na dobu pauzy 
      
      // tohle je jen kopie z VSTUP A VYSTUP DO/Z AKTIVNIHO CILE 
      preference.get(ActiveAimName).setActive(false);
      for(iaim = 0; iaim < InactiveNames.length; iaim++){  // deaktivuju avoidance mista
        preference.get(InactiveNames[iaim]).setActive(false);
      }
    } else if(name=='CasZkoumejZbyva'){    // casovac pouze na odpocitavani do konce, kazdou vterinu
      CasZkoumejTed = new Date(); // aktualni datetime
      CasZkoumejZbyva = Math.round(CasZkoumej - (CasZkoumejTed-CasZkoumejStart)/1000);  // odectu pocet vyprsenych vterin 
      if(CasZkoumejZbyva>0) {
        timer.set("CasZkoumejZbyva",1); // nastavim casovac znova
        text.modify(TXT_SEKUNDY,CasZkoumejZbyva);
      } else {
        text.modify(TXT_SEKUNDY,"");
        // kdyz vyprsi cas zkoumani dvojice ctvercu v treningu
        ActiveN =  GetActiveNames(); // vrati jmena aktivniho cile a teepee 
        TXT_UKOL_Last = "Najdi "+AnimalNames[ActiveN.ActiveTeepee]; 
        ActivateGoal(ActiveN.ActiveAimName,ActiveN.ActiveTeepee,iPhase,true);  // aktivuje aktualni cil i ostatni cile jako avoidance   
        debug.log(iPhase + " " + TXT_UKOL_Last);  // zapise ukol do logu       
        SkryjNapisy(false); // zase ukaze - po pauze -  obrazek zvirete na obrazovce a text TXT_UKOL
      }
    } else if(name='SquareLeftEntered'){
       // osetreni opusteni ctverce a vstupu do jineho
      XX = experiment.getPlayerLocationX();
      YY = experiment.getPlayerLocationY(); 
      //debug.log('timer ' +TimerCycle + ' PlayerLocation X: '+XX+', Y: '+YY)
      if(XX!=-1 && YY !=-1){
         TimerCycle++; // pricitam jen nenulove souradnice 
         if(TimerCycle>1) { // po prve je cislo 1, to jeste nechci, muze byt nespravne 
          	if(IsInSquare != ''){                   
              sleft = SquareLeft(XX,YY);
              if(sleft !=false){
                 debug.log('odesel ze ctverce '+IsInSquare+ ' na '+sleft);                 
                 ActivateAvoidace(false);  // deaktivuje vsechny stany ve ctverci, ze ktereho jsem odesel - trening i test
                 if(!DoTest && CasZkoumejZbyva <= 0 && IsPauza == false) { // TRENING a neni prozkoumavani na zacatku
                    if(SquarePairs[iPhase][0]==IsInSquare) {  // zajima me smer z jakeho do jakeho ctverce ve dvojici jde jde
                      var CtverceDvojice =  SquarePairs[iPhase][0]+ SquarePairs[iPhase][1]; // napriklad DE    
                    } else { 
                      var CtverceDvojice =  SquarePairs[iPhase][1]+ SquarePairs[iPhase][0]; // napriklad ED 
                    }
                    debug.log("CtverceDvojice: "+CtverceDvojice);
                    if(SquareDirections[CtverceDvojice]!=sleft){
                      debug.log("left in incorrect direction: "+IsInSquare + '-' + sleft);
                      experiment.logToTrackLog("Incorrect Direction: "+IsInSquare + '-' + sleft);
                      text.modify(TXT_CHYBA,"CHYBA !");
                      preference.get("AvoidSound"+CtverecJmeno()).beep(1.0);  // zahraju vystrazny zvuk  
                      ZapocitejChybu(); // vlozi chybu do  ErrorsNumber a SetSquarePairErrors
                      experiment.logToTrackLog("Errors:"+ErrorsNumber);
                    }
                 }
                 IsInSquare = ''; // uz neni ve ctverci - musim az po ActivateAvoidace(false)
                 if(Debug)  text.modify(TXT_DEBUG, IsInSquare + "-" + ActiveAimName.substring(3,5)); 
              }  
            } else {
              se = SquareEntered(XX,YY);
              if(se != false) {
                 debug.log('vesel do ctverce '+se);
                 IsInSquare = se; // uz je ve ctverci
                 ActivateAvoidace(true); // aktivuje vsechny stany v aktivnim ctverci jako avoidance - trening i test
                 text.modify(TXT_CHYBA,"");  // kdyz tam zustane napis z opusteni ctverce spatnym smerem pri treningu
                 if(Debug)  text.modify(TXT_DEBUG, IsInSquare + "-" + ActiveAimName.substring(3,5));                 
              } 
            }  
        }
      }
      timer.set("SquareLeftEntered",TimerCyclePeriod); 
    }
} 
function ActivateSquares(iPhase){
    // vola se z NextTrial
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
       ZvirataSchovej(2); // skryju nepouzivana zvirata - podle AnimalPositionsActive
       if(iPhase>0){
           // pokud uz druha a dalsi faze, nejdriv zase obnovim ploty
          PlotPosun(iPhase-1,1); // ukaze plot v predchozi fazi          
       }
        
       if(iPhase>=SquarePairs.length) {
          SquarePairsAdd();       // pokud jsou nejake dvojice ctvercu, kde bylo moc chyb, pridam je jeste na konec sekvence
       }
       if(iPhase>=SquarePairs.length && SquarePairsAdded >= SquarePairsErrorsLimit2) {
          SquarePairsAddRepeat(SquarePairsToAdd); // pridam jeste prvni osm dvojic ctvercu, aby si je jeste obcerstvili
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
       IsPauza = true; // v treningu - pauza pred novou dvojici ctvercu 
     }
     text.modify(TXT_CTVEREC,"KOLO: "+(iPhase+1) ); // modre cislo    
}
function ActivateAnimal(iPhase,iSequence){
    // vola se po aktivaci paru ctvercu a pak po nalezeni kazdeho zvirete
    // aktivuje  oblast kolem zvirete jako cil, a ostatni zvirata z obou ctvercu jako avoidance 
     // CILOVE MISTO
     ActiveN =  GetActiveNames(); // ziskam jmena aktivniho cile a teepee, nastavi ActiveAimName,ActiveTeepee,ActiveAimNameText
          
     // OBRAZEK A TEXT KAM NAVIGOVAT
     if(DoTest) { // v testu ma nejdriv ukazat na cil
        PresunHrace(iPhase);
        TXT_UKOL_Last = "Ukaz na "+AnimalNames[ActiveN.ActiveTeepee];
        Ukazal = false;          
        experiment.enablePlayerMovement(false); // zakazu chuzi 
        //experiment.modifyScreenShape(SHAPE_ZAMER, true); // zobrazim zamerovaci kruh
        text.modify(SHAPE_ZAMER,"+");
        ActivateGoal(ActiveN.ActiveAimName,ActiveN.ActiveTeepee,iPhase,true);   //aktivuj =true  
     } else if(CasZkoumej > 0 && iPhase < RuznychDvojicCtvercu && iSequence==0){ // pouze prvni opakovani dvojice ctvercu a pouze prvni trial v sekvenci
        //clovek bude po CasZkoumej vterin volne prozkoumavat dvojici ctvercu - novinka 8.2017
        TXT_UKOL_Last = "Prozkoumej tuto dvojici ctvercu";    
        ActivateGoal(ActiveN.ActiveAimName,ActiveN.ActiveTeepee,iPhase,false);   //aktivuj =false
        // casovac nastavim az po uplynuti pauzy (na zacatku nove dvojice ctvercu v treningu)
     } else {
        TXT_UKOL_Last = "Najdi "+AnimalNames[ActiveN.ActiveTeepee];
        ActivateGoal(ActiveN.ActiveAimName,ActiveN.ActiveTeepee,iPhase,true);  // aktivuje aktualni cil i ostatni cile jako avoidance
     }
     debug.log(iPhase + " " + TXT_UKOL_Last);  // zapise ukol do logu         
     text.modify(TXT_UKOL,TXT_UKOL_Last);    // vypise ukol na obrazovku
     
     if(IsPauza && !DoTest) {   // pauza - mezi dvojicemi ctvercu v treningu - nastavuje se v ActivateSquares
         SkryjNapisy(true);  // behem pauzy skryje obrazek zvirete na obrazovce a text TXT_UKOL
     }      
     
}
function GetActiveNames () {
    // vraci  objekt se jmeny aktivniho cile a teepee
    // nastavuje globalni promennou ActiveAimNameText
    var SquareName = CtverecJmeno();  //  jmeno aktualniho ctverce ABC DEF GH nebo I
     if (DoTest){
        var Zvirata = AnimalPositionsActive[SquareName]; // ma se pouzivat jedno zvire ve ctverci, nebo obe? 2017-10-12
        var AimNo16 =   Zvirata.length>1 ? Zvirata[TestSequence[iPhase][2]] : Zvirata[0];  // cislo cile v ramci ctverce odpovidajici cislu stanu 1-6
     }  else {
        var AimNo01 = AnimalSequence[AnimalSequenceIndex(iPhase)][iSequence] % 10;   // cislo cile v ramci ctverce, zbytek po deleni 10ti , 0 nebo 1
        var Zvirata = AnimalPositionsActive[SquareName]; // ma se pouzivat jedno zvire ve ctverci, nebo obe? 2017-10-12  
        var AimNo16 = Zvirata.length>1 ? AnimalPositions[SquareName][AimNo01] : Zvirata[0];  // cislo cile v ramci ctverce odpovidajici cislu stanu 1-6
     }
     // tyhle jmena bych potreboval ziskat v nejake funkci, abych ji mohl volat i po uplynuti casovace CasZkoumej 
     ActiveAimName = AimName+SquareName+AimNo16; // globalni promenna     
     if(Debug)  text.modify(TXT_DEBUG, IsInSquare + "-" + ActiveAimName.substring(3,5));  
     ActiveTeepee = SquareName+AimNo16;    // napriklad 'E4'
     ActiveAimNameText = AnimalNames[ActiveTeepee];   // jmeno zvirete kam navigovat, nepriklad KOCKU - globalni promenna
     var ActiveN = { ActiveAimName:ActiveAimName, ActiveTeepee:ActiveTeepee};
     return ActiveN;
}
function ShowAnimalPicture(ActiveTeepee, ukaz){
     // ukaze nebo skryje obrazek ciloveho zvirete - pokud poprve, prida texturu
     if(ukaz){
       // zobrazim obrazek ciloveho zvirete 
       if(AnimalPicturesHandles[ActiveTeepee]){
           experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], true);     // ukaze jiz drive aktivovany obrazek zvirete
       } else {
           AnimalHandleLast += 1;
           experiment.addScreenShape(AnimalHandleLast, 10, 80, 255, 255, 255, 256, 256, 0, false, AnimalPictures[ActiveTeepee]);
           AnimalPicturesHandles[ActiveTeepee] =   AnimalHandleLast;  // dynamicky postupne prirazuju obrazku handle
       }
     } else {
        // schova obrazek zvirete
        if(AnimalPicturesHandles[ActiveTeepee]){ // pokud handle neexistuje, tak jsem ho jeste nevytvoril a nemam tedy co schovavat
            experiment.modifyScreenShape(AnimalPicturesHandles[ActiveTeepee], false);
        } 
     }
}
function ActivateGoal(ActiveAimName,ActiveTeepee,iPhase,aktivuj){
     // presunuta cast kodu z ActivateAnimal
     
     if(aktivuj){ 
       // aktivuju aktualni cil
       debug.log('ActiveAimName on: '+ActiveAimName);      
       //ActiveSquareName = ActiveAimName.substring(3,4); // jen znak ctverce, treba E
       //debug.log('ActiveSquareName: '+ActiveSquareName);
       
       experiment.logToTrackLog("Aim search:"+ActiveAimName); // zapise do logu, ze se zacina hledat dvojice ctvercu 
       preference.get(ActiveAimName).setActive(true);         // cilova oblast se udela aktivni
       preference.get(ActiveAimName).beepOff(true);           // cilova oblast nema delat zvuk samo osobe
       
       ShowAnimalPicture(ActiveTeepee, true); // ukaze obrazek ciloveho zvirete
       if(Debug)  text.modify(TXT_DEBUG, IsInSquare + "-" + ActiveAimName.substring(3,5));  
       
       // AVOIDANCE MISTA
       ActivateAvoidace(true);
       
       // PLOTY
       if(CasZkoumej > 0 || iPhase>=RuznychDvojicCtvercu){  // po osmi dvojicich ctvercu ploty zmizi - neho hned, pokud je na zacatku prohledavani
          PlotyZmiz(true); // schova vsechny ploty, jsou tam, ale neviditelne
          debug.log("Ploty neviditelne");
       }  else {
          PlotyZmiz(false); 
          debug.log("Ploty viditelne");   
       }           
     } else {
        debug.log('ActiveAimName off: '+ActiveAimName);
        preference.get(ActiveAimName).setActive(false);         // cilova oblast se udela aktivni
        preference.get(ActiveAimName).beepOff(true);           // cilova oblast nema delat zvuk samo osobe
        ActivateAvoidace(false);
        
        PlotyZmiz(false); // zobrazi vsechny ploty 
        debug.log("Ploty viditelne"); 
     } 
}
function ActivateAvoidace(aktivuj){
      if(IsInSquare==''){
         debug.log("ActivateAvoidace: no IsInSquare" + aktivuj?'1':'0');  // v takovem pripade nemam co delat. Nejak to nastava, nevim jak. 
         return;
      }
      if(aktivuj){
          // aktivuju vsechny avoidance mista - ty stany do kterych nema chodit
          // 1. naplnim seznam cilu k aktivaci
         InactiveNames = []; // seznam cilu, ktere nejsou aktualne aktivni - globalni 
         var Ctverce = [IsInSquare]; //DoTest ? [IsInSquare]  : SquarePairs[iPhase];   // pri treningu a testu aktivuju jen aktualni ctverec
         for (isquare = 0; isquare < Ctverce.length; isquare++){ // pro vsechny ted aktivni ctverce
            SquareName = Ctverce[isquare]; 
            //if (DoTest && ActiveSquareName != SquareName){
            //          continue;  // zkouska - v testu jsou aktivni jen mista u ciloveho ctverce
            //}
            for (ianimal = 1; ianimal <= 6; ianimal++){    // pro vsech sest typi=stanu v tomto ctverci
                //aimn =  AnimalSequence[iPhase][ianimal];            
                Aim =  AimName+SquareName+ianimal; // jmeno jednoho z cilu , napriklad Aim + E + 1
                if(Aim ==   ActiveAimName || contains(InactiveNames,Aim)){
                  //debug.log("nepouzit InactiveName " + Aim); 
                  continue;  // pokud se jedna o aktualni cil nebo uz je v seznamu  InactiveNames              
                } else {                   
                  InactiveNames.push(Aim);  // pridam dalsi polozku do seznamu neaktivnich cilu - cili avoidance
                }         
            }               
         }
         debug.log("ActivateAvoidace InactiveNames: " + InactiveNames);
         // 2. ted cely seznam InactiveNames postupne aktivuju
         for(iaim = 0; iaim < InactiveNames.length; iaim++){
           Aim = InactiveNames[iaim];
           //debug.log("dalsi InactiveName "+iaim +" *" + Aim + "*");
           if( (pref = PrefAim(Aim,'ActivateAvoidace true'))!=false){ // nekdy se to nezdari ? 2017-10-17
            pref.setActive(true);     // aktivuju misto jako preference, avoidance nefunguje
            pref.beepOff(true);     // nema delat zvuk samo osobe
           }
           // zase je deaktivuju po vstupu do cile nebo po uplynuti casu
         }
       } else { // deaktivuju vsechna mista, volne prohledavani stanu  
          var Ctverce = [IsInSquare]; // DoTest ? [IsInSquare] :  SquarePairs[iPhase];  // v testu pri odchodu z ctverce, v treningu pri volnem prohledavani
          for (isquare = 0; isquare < Ctverce.length; isquare++){ // pro vsechny ted aktivni ctverce
            for (ianimal = 1; ianimal <= 6; ianimal++){    // pro vsech sest typi=stanu v tomto ctverci
               SquareName = Ctverce[isquare];    
               Aim =  AimName+SquareName+ianimal; // jmeno jednoho z cilu , napriklad Aim + E + 1
               if(Aim !=   ActiveAimName){   // nechci aktivni cil
                    if( (pref = PrefAim(Aim,'ActivateAvoidace false'))!=false){ // nekdy se to nezdari ? 2017-10-17
                      pref.setActive(false);   // deaktivuju misto 
                      pref.beepOff(true);     // nema delat zvuk samo osobe
                    }
               }
            }
          }
          debug.log("ActivateAvoidace Ctverce deaktivovany: " + Ctverce);
       }  
}
function PrefAim(Aim,label){
   a = preference.get(Aim);
   if(a == null) {
     debug.log('ActivateAvoidace: aim null '+Aim + ' ('+label+')');  //2017-10-12 - stava se to, proc?
     return false
   } else {
     return a;
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
     // schova ploty tak,ze se pres ne da chodit - zasune je pod podlahu
     if (iiPhase >= 0){
       // kvuli pruchodu v jedne fazi treningu
       var CtverceDvojice =  SquarePairs[iiPhase][0]+ SquarePairs[iiPhase][1]; // napriklad DE 
       for(p=0; p<SquarePassage[CtverceDvojice].length; p++){
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
    // udela ploty neviditelne, nebo viditelne.  - ale porad tam jsou, takze se pres ne neda chodit
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
    if(ukaz==0){
      // skryju vsechna zvirata  
      for(var key in AnimalXYPositions){
          var ZvireZmiz = AnimalName + key; // cele jmeno zvirete napr AnimalA2
          var Pozice = AnimalXYPositions[key];
          mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, AnimalHiddenZ]); // -400 bude pod podlahou, normalni je z
          //debug.log("schovano: "+ZvireZmiz + " na pozici "+[Pozice.x,Pozice.y,Pozice.z]) ;
      } 
    } else if(ukaz==1) {
        // ukazu aktivni zvire
        var Pozice = AnimalXYPositions[ActiveTeepee];
        var ZvireZmiz = AnimalName + ActiveTeepee; // cele jmeno zvirete napr AnimalA2
        mark.get(ZvireZmiz).setLocation([Pozice.x,Pozice.y, Pozice.z]); // -400 bude pod podlahou, normalni je z
    } else {   
       // ukazu vsechna zvirata, ktera se maji pouzivat a skryju ty ktere nepouzivat
       for(var Ctverec in AnimalPositions){ // ap je jmeno ctverce
          for(var j in AnimalPositions[Ctverec]){  // z je cislo zvirete ve ctverci
             var ZvireJmeno = AnimalName + Ctverec + AnimalPositions[Ctverec][j];             
             var Pozice = AnimalXYPositions[Ctverec + AnimalPositions[Ctverec][j]];
             if ( AnimalPositionsActive[Ctverec].indexOf(AnimalPositions[Ctverec][j]) < 0 ){  // zvire neni v AnimalPositionsActive - ma se schovat
                mark.get(ZvireJmeno).setLocation([Pozice.x,Pozice.y, AnimalHiddenZ]); 
                debug.log('ZvirataSchovej: schovano'+ZvireJmeno );             
             } else {
                mark.get(ZvireJmeno).setLocation([Pozice.x,Pozice.y, Pozice.z]);
                //debug.log('ZvirataSchovej: zobrazeno'+ZvireJmeno );   
             }
          }
       }
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
     IsInSquare = SquareName;   // v jakem je aktualne ctverci
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
         SquarePairsAdded++; // zvysim globalni pocet pridanych ctvercu
         SquarePairsErrors[CtverceDvojice] = 0;  // nechci tam tento par ctvercu vkladat znova, takze pocet chyb u nej vynuluju
         debug.log("SquarePairsAdd: pridan ctverec "+CtverceDvojice);           
      }
  } 
  debug.log("SquarePairsAdd: celkem pridano "+SquarePairsAdded); 
  SquarePairs = SquarePairs2;  
  return  SquarePairs.length;
}
function SquarePairsAddRepeat(pocetpridat){
  // pokud se opakovalo kvuli chybam vic nez 8 dvojic, tak se na konci jeste pridaji vsechny jednou = 8x 
  // - i kdyz se udela chyba, tak neopakovat
  var SquarePairs2 = SquarePairs;   // privadam zatim do kopie 
  isqp = SquarePairs2.length;
  for (sqp = 0; sqp < pocetpridat; sqp++){    
    SquarePairs2[isqp]=[SquarePairs[sqp][0] , SquarePairs[sqp][1]];   // na konec kopie pole nactu tuto dvojici ctvercu
    isqp++;    
    debug.log("SquarePairsAddRepeat: pridan ctverec "+ SquarePairs[sqp][0]+ SquarePairs[sqp][1]); // napriklad DE  
  }  
  SquarePairsAdded=0 // abych v pristim kole znovu nepridaval 
  SquarePairs = SquarePairs2; 
}
 
function AnimalSequenceIndex(iiPhase){
   // funkce ktera vraci index v poli  AnimalSequence
   return iiPhase  % AnimalSequence.length; // zbytek po deleni delkou - od 0 do n-1, bude se porad opakovat
}
function SkryjNapisy(skryj){
   // behem pauzy skryje obrazek zvirete na obrazovce a text TXT_UKOL
   ShowAnimalPicture(ActiveTeepee, skryj ? false : true ); // ukaze obrazek ciloveho zvirete
   if (skryj) {
      text.modify(TXT_UKOL,"");   // skryje instrukci, ale nesmaze TXT_UKOL_Last   
   } else {
      text.modify(TXT_UKOL,TXT_UKOL_Last); // obnovim drive skryte
   }
}
function NextTrial(nextPhase){
    var delkasekvence = DoTest?  1 : AnimalSequence[AnimalSequenceIndex(iPhase)].length;
    if(nextPhase) {
      // zvysi cislo iPhase - 28.8.2017 kvuli rucnimu prechodu na dalsi fazie
      iSequence += delkasekvence;
    } else {
      // zvysi cislo iSequence, pripadne i iPhase, pokud jsem na konci sekvence
      iSequence += 1;
    }
    if(iSequence>=delkasekvence) {
      // pokud jsem prosel vsechna zvirata mezi ctverci, jdu na dalsi fazi
      // v testu jdu vzdy na dalsi fazi
      iPhase += 1;        
      ActivateSquares(iPhase); // i presune hrace na novy start
      iSequence = 0;  // tahle hodnota se nepreda ven, kdyz je to uvnitr funkce
      ErrorsNumber = 0; // vymazu pocet chyb
      text.modify(TXT_CHYBPOCET,""); // smazu vypis chyb, nez clovek zase nejakou udela
      debug.log("Phase: "+iPhase);
    }
    text.modify(TXT_SEKVENCE,"NALEZENO:" + Nalezenych);
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

function SquareLeft(XX,YY) {  // vraci udaj, kterym smerem odesel ze ctverce
   x01 = SquaresBoundaries['X'][IsInSquare];
   y01 = SquaresBoundaries['Y'][IsInSquare];
   //debug.log('x01: '+x01+', y01: '+y01); 
   //debug.log('SquareLeft PlayerLocation X: '+XX+', Y: '+YY);          
   if(XX<x01[0]) {
      return 'Z'; // odesel na zapad
   } else if( XX>x01[1]){
      return 'V'; // odesel na vychod
   } else if (YY<y01[0] ){
      return 'S';  // odesel na sever
   } else if (YY>y01[1]) {
      return 'J';  // odesel na jih
   } else {
      return false; // jinak je porad uvnitr
   }
}

function SquareEntered(XX,YY){  // vraci jmeno ctverce, ve kterem clovek je, nebo false, pokud je mimo ctverec
   var SquareColumns = ['A','B','C'];
   var SquareRows = ['A','D','G'];
   var SquareI = {A:{A:'A',D:'D',G:'G'}, B: {A:'B',D:'E',G:'H'}, C: {A:'C',D:'F',G:'I'}};
   //var XX = experiment.getPlayerLocationX();
   //var YY = experiment.getPlayerLocationY();
   var foundSC = false; // sloupec ctverce-  A, B nebo C
   for(c=0;c<SquareColumns.length;c++){
     SC = SquareColumns[c];
     if(XX > SquaresBoundaries['X'][SC][0] && XX < SquaresBoundaries['X'][SC][1]) {
        foundSC = true; // ano, je mezi horni a dolni hranici sloupce 
        break; // konci cyklus uz vim SC
     }   
   }
   var foundSR = false; // radka ctverce-  A, D nebo G
   for(r=0;r<SquareRows.length;r++){
     SR = SquareRows[r];
     if(YY > SquaresBoundaries['Y'][SR][0] && YY < SquaresBoundaries['Y'][SR][1]) {
        foundSR = true;  // ano, je mezi horni a dolni hranici radky 
        break; // konci cyklus uz vim SR
     }   
   }
   //debug.log('SquareEntered SC: '+ (foundSC?SC:'') + ' SR: '+(foundSR?SR:'') ); 
   if(foundSC && foundSR){  // nasel jsem sloupec i radku, takze ve ctverci clovek je
      //debug.log('SquareEntered SC: '+ (foundSC?SC:'') + ' SR: '+(foundSR?SR:'') ); 
      SquareName = SquareI[SC][SR];
      return SquareName;
   } else {
      return false; // neni v zadnem ctverci
   }
   
}

function ZapocitejChybu(){ 
    ErrorsNumber +=1;  // chyby pocitam v testu a po prvni navsteve v treningu
    text.modify(TXT_CHYBPOCET,"CHYBY: " + ErrorsNumber);
    debug.log("Pocet chyb: "+ErrorsNumber);
    if(!DoTest) SetSquarePairErrors(iPhase,1); // zvysim pocet chyb ve dvojici ctvercu o 1       

}