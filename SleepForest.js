var TXT_VSTUP = 1;

function init() {	
	experiment.setMap("TEST-SleepForest Edo11h"); //   TEST-SleepForest Edo3   TEST-drf3aapaOCDCube     TEST-SleepForest Minimal
}

function run() {
	if (experiment.isStarted()){
		experiment.setCollisionCylinder(20,88);
		experiment.setWalk(false);
		experiment.setTrackRate(0.3);
		experiment.setPlayerSpeed(440);
		
		preference.get("Kocka").setActive(true);
		//platform.get("plosina").doRotateTime(10000,5,-1);
          text.create(TXT_VSTUP, 10, 10, 255, 255,0, 4, "nic"); // nazev aktivniho mista - zluta
          //experiment.addScreenShape(0, 10, 10, 255, 255, 255, 256, 256, 0, false, "PsuAVCR.icon-circle");
          
	}
	if (key.pressed("g")){
		preference.get("Kocka").setVisible(true);
	}
	if (key.pressed("h")){
		preference.get("Kocka").setVisible(false);
	}
	
	if (key.pressed("t")){
		//void modifyScreenShape(0, true);
	}
	if (key.pressed("r")){
		//void modifyScreenShape(0, false);
	}
	
	if (preference.get("Kocka").entered()){
		text.modify(TXT_VSTUP,"Hura");
	}
	
	if (preference.get("Kocka").left()){
		text.modify(TXT_VSTUP,"nic");
	}
	
	
	
	
}
