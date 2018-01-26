function init() {	
	experiment.setMap("TEST-SleepForest-pretraining2-Alena");
}
var Hvezdy = ['AimAreaA','AimAreaB','AimAreaC','AimAreaA'];  // jmena cilovych oblasti
var Cile = ['A','B','C','A'];     // pojmenovani cilu 
var cislo = 0;    // cislo hvezdy, do ktere jdu
var zpatky = 0;
var castam = 0;
var caszpet = 0;
var Ploty = [['Plot1'],['Plot2'],['Plot1','Plot2','Plot3','Plot4','Plot5'] ]; // ktere ploty se ma ji v ktere fazi schovavat
var PlotyPozice = {    // pozice plotu zvedaneho pri pruchodu mezi ctverci
    Plot1:{x:4601,y:-410}, Plot2:{x:1823,y:-2876}, 
    Plot3:{x:911,y:-450}, Plot4:{x:2830,y:-432}, 
    Plot5:{x:1824,y:-908}
};
var PlotHiddenZ = -830;  // vyska plotu schovaneho   
var PlotShownZ = -630;  // vyska plotu ukazaneho  

function run() {
	if (experiment.isStarted()) {
		experiment.setCollisionCylinder(20,200);
		//experiment.setWalk(false);
		experiment.setTrackRate(0.05);
		experiment.setPlayerSpeed(1500);
		//platform.get("plosina").doRotateTime(10000,9,-1);
    text.create(1, 250, 50, 255, 255,0, 3,"CIL A");
    //experiment.setPlayerRotation(0,33); // musim ho otocit vertikalne na nulu, protoze se bude pohybovat jen pomoci left right klaves
    preference.get(Hvezdy[cislo]).setVisible(false);
    preference.get(Hvezdy[cislo]).setActive(true);   // CIL A se aktivuje 
	  
	}
// 	if(preference.get("start").entered()){
// 	  cas = parseFloat(preference.get("start").getPrevEnterTimeDiff());
// 	  caszpet += cas;
// 	  debug.log("cas zpet: "+caszpet+" s");
// 		experiment.setStop();
// 	}
	if (key.pressed("o")){
		preference.get(Hvezdy[cislo]).setVisible(true);
	}
	if (key.pressed("p")){
		preference.get(Hvezdy[cislo]).setVisible(false);
	}
	
	if(cislo >= 0 &&  preference.get(Hvezdy[cislo]).entered()){
			cas = parseFloat(preference.get(Hvezdy[cislo]).getPrevEnterTimeDiff());   // bude to tady fungovat?
			debug.log(Hvezdy[cislo]+": "+cas+" s");  // zapis do logu
      debug.log('vstup do ' + (Hvezdy[cislo]));
			if(zpatky) caszpet += cas; else castam += cas;  // dalsi trial
			
			//debug.log("vzdálenost: " + preference.get(Hvezdy[cislo]).getPrevEnterDistDiff());
			//debug.log("minimální vzdálenost: " + preference.get(Hvezdy[cislo]).getMinDist());
	
    	preference.get(Hvezdy[cislo]).setVisible(false);
    	preference.get(Hvezdy[cislo]).setActive(false);      
    	preference.get(Hvezdy[cislo]).beep(2); 
      if(cislo>0 && cislo<Ploty.length) {
        PlotyPosun(cislo-1,1); // ukaze ploty
      }
    	if(zpatky) cislo--; else cislo++;
    	
    	if(cislo>=Hvezdy.length){
    	  debug.log("cas tam: "+castam+" s\n");
        text.modify(1,"KONEC");
        experiment.setStop();						 
			} else {
				text.modify(1,"CIL "+Cile[cislo]);
				aktivni = Hvezdy[cislo];
			}
			preference.get(aktivni).setVisible(false);
    	preference.get(aktivni).setActive(true);
      PlotyPosun(cislo-1,0);   // skryje ploty - jsou cislovane jinak, protoze pri hledani prvniho cile se neskryva zadny
  } 
}
function PlotyPosun(cisloplotu,ukaz){
   debug.log( "plotu k presunu: " + cisloplotu + ":" + Ploty[cisloplotu].length );
   for (p = 0; p<Ploty[cisloplotu].length; p++){
         var PlotZmiz = Ploty[cisloplotu][p];
         var PlotPozice = PlotyPozice[PlotZmiz];
         mark.get(PlotZmiz).setLocation([PlotPozice.x,PlotPozice.y, (ukaz?PlotShownZ:PlotHiddenZ) ]);
         debug.log( (ukaz?"ukaz: ":"skryj: ") + PlotZmiz );
   }
   

}
