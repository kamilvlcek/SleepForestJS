function init() {	
	experiment.setMap("TEST-SleepForest-pretraining2-Alena");
}
var Hvezdy = ['AimAreaA','AimAreaB','AimAreaC','AimAreaA'];  // jmena cilovych oblasti
var Cile = ['A','B','C','A'];     // pojmenovani cilu 
var cislo = 0;
var zpatky = 0;
var castam = 0;
var caszpet = 0;

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
			if(zpatky) caszpet += cas; else castam += cas;
			
			//debug.log("vzdálenost: " + preference.get(Hvezdy[cislo]).getPrevEnterDistDiff());
			//debug.log("minimální vzdálenost: " + preference.get(Hvezdy[cislo]).getMinDist());
	
    	preference.get(Hvezdy[cislo]).setVisible(false);
    	preference.get(Hvezdy[cislo]).setActive(false);
    	preference.get(Hvezdy[cislo]).beep(2); 
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
  } 
}
