function init() {	
	experiment.setMap("TEST-tisove_bludiste");
}
var Hvezdy = ['hvezda1','hvezda2','hvezda3','hvezda4','hvezda5','hvezda6','hvezda7']; 
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
    text.create(1, 250, 50, 255, 255,0, 3,"STAR 1");
    experiment.setPlayerRotation(0,33); // musim ho otocit vertikalne na nulu, protoze se bude pohybovat jen pomoci left right klaves
	  
	}
	if(preference.get("start").entered()){
	  cas = parseFloat(preference.get("start").getPrevEnterTimeDiff());
	  caszpet += cas;
	  debug.log("cas zpet: "+caszpet+" s");
		experiment.setStop();
	}
	if (key.pressed("o")){
		preference.get(Hvezdy[cislo]).setVisible(true);
	}
	if (key.pressed("p")){
		preference.get(Hvezdy[cislo]).setVisible(false);
	}
	
	if(cislo >= 0 &&  preference.get(Hvezdy[cislo]).entered()){
			cas = parseFloat(preference.get(Hvezdy[cislo]).getPrevEnterTimeDiff());
			debug.log(Hvezdy[cislo]+": "+cas+" s");
			if(zpatky) caszpet += cas; else castam += cas;
			
			//debug.log("vzdálenost: " + preference.get(Hvezdy[cislo]).getPrevEnterDistDiff());
			//debug.log("minimální vzdálenost: " + preference.get(Hvezdy[cislo]).getMinDist());
	
    	preference.get(Hvezdy[cislo]).setVisible(false);
    	preference.get(Hvezdy[cislo]).setActive(false);
    	preference.get(Hvezdy[cislo]).beep(2); 
    	if(zpatky) cislo--; else cislo++;
    	
    	if(cislo>=Hvezdy.length){
    	  debug.log("cas tam: "+castam+" s\n");
				zpatky = 1; 
				cislo -= 2; // z 8 chci udelat 6
				text.modify(1,"STAR "+(cislo+1));
				aktivni = Hvezdy[cislo];
			} else if(cislo<0) {
				text.modify(1,"Start"); 
				aktivni = "start";
			} else {
				text.modify(1,"STAR "+(cislo+1));
				aktivni = Hvezdy[cislo];
			}
			preference.get(aktivni).setVisible(true);
    	preference.get(aktivni).setActive(true);
  } 
}
