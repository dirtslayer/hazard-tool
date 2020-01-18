// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

var canvas = null;
var signaturePad = null;
var spaddiv = null;
var currentsig = '00';
var sigs = null;
var origpadh = "200px";



function showpad() {
	spaddiv.style.height = origpadh;
	signaturePad.clear();
/*	signaturePad = new SignaturePad(canvas, {
	backgroundColor: 'rgb(255, 255, 255)'
	});
	resizeCanvas();*/
}
function hidepad(){
	spaddiv.style.height = "0px"; 
	spaddiv.style.overflow = "hidden";
}

function showsigele(ele) {
	sigs.childNodes.forEach(
		function (lele) {
			lele.style.height = "40px";
		});
}

function hidesigele(ele) {
	sigs.childNodes.forEach( function (lele) {
	console.log('hide '+ typeof lele + "-" + lele);
		lele.style.height = "0px"; 
		lele.style.overflow = "hidden";
		
	});
	currentsig = ele.id;
}

function addnewsigele() {
	nsigs = sigs.childNodes.length -1;
	lastsigid = Number(sigs.childNodes[nsigs].id);
	if (lastsigid == Number(currentsig)) {
		newNode = sigs.childNodes[0].cloneNode();
		newNode.id = lastsigid + 1;
		newNode.setAttribute('src', "img/signhere.jpg");
		sigs.appendChild(newNode);
		newNode.addEventListener('click', function () {
		hidesigele(this);
		showpad();
		});
	}
}

function setuppad() {

	canvas = document.getElementById('signature-pad');
	sigs = document.getElementById('sigs');
	spaddiv = document.getElementById('spad');
	
	
	sigele = document.getElementById(currentsig);
	sigele.addEventListener('click', function () {
		hidesigele(this);
		showpad();
	});
	
	//window.onresize = resizeCanvas;
	// resizeCanvas();

	signaturePad = new SignaturePad(canvas, {
		backgroundColor: 'rgb(255, 255, 255)'
	 });

	document.getElementById('clear').addEventListener('click', function () {
		signaturePad.clear();
	});

	document.getElementById('setimg').addEventListener('click', function () {	
		if (signaturePad.isEmpty()) {
			document.getElementById(currentsig).setAttribute(
			'src', "img/signhere.jpg");
		} else {	
			var data = signaturePad.toDataURL('image/png');	
			var cursigele = document.getElementById(currentsig);
			cursigele.setAttribute('src', data);
			showsigele(cursigele);
			hidepad();
			addnewsigele();
		
			
		}
	});

hidepad();

}