
function makeid(k) {
	return k.replace(/\s/g, "");
}

const buildtoggle = function(checkname)  {
    var checkbox = document.getElementById(makeid(checkname));
    var hazards = document.getElementById(makeid(checkname) + "hazards");

    if ( checkbox == null ) {
	    console.log(checkname);
    }
    if ( hazards == null ) {
	    console.log(checkname);
    }
    hazards.style.display = "none";
    checkbox.addEventListener('change', (event) => {
        var chazards = document.getElementById(makeid(checkname) + "hazards");
        if ( chazards == null) {
        	console.log(checkname);
        }
        if (event.target.checked) {
            hazards.style.display = "block";
        } else {
            hazards.style.display = "none";
        }
    });
}



function buildhl(parentEleId,hlist){

	var hlu = document.getElementById(parentEleId);
	var htmlul = "";

	for (var key of Object.keys(hlist)){
		htmlul += `<li> \
		 <input type='checkbox' \
		 name='${key}' \
		 id='${makeid(key)}' /> \
		 <label for='${makeid(key)}' >\
		 ${key} \
		 </label><ul id="${makeid(key)}hazards">`;
		 	
		for ( var prop of Object.keys(hlist[key])) {

			htmlul += "<li>" ;			
			k = hlist[key][prop];		
			htmlul += `<input type="checkbox" \
			id= ${makeid(k)} \
			name= ${k} /> \
			<label for= ${k} > \
			${k} \
			</label>`;						
			htmlul += "</li>";
		};	
	htmlul += "</ul></li>";	
}

hlu.innerHTML = htmlul;

for (var key of Object.keys(hlist)){
		buildtoggle(key);		
	}
}
