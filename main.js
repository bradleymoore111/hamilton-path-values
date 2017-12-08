// Assuming complete graph.
var array = ['a','b','c','d','e'];
// Corresponding values (duplicated cause laziness).
var data = {
	ab: 3,
	ac: 8,
	ad: 4,
	ae: 7,
	ba: 3,
	bc: 10,
	bd: 9,
	be: 2,
	ca: 8,
	cb: 10,
	cd: 6,
	ce: 5,
	da: 4,
	db: 9,
	dc: 6,
	de: 1,
	ea: 7,
	eb: 2,
	ec: 5,
	ed: 1,
};

var perms = [];

function permute( array, l, r ){
    var i;
    if( l == r ){
		console.log( array );
		perms[perms.length] = [];
		for(var i=0;i<array.length;i++){
			perms[perms.length-1][i] = array[i];
        }
    }else{
        for(var i=l;i<=r;i++){
			var temp = array[l];
			array[l] = array[i];
			array[i] = temp;

            permute( array, l+1, r );
			
            var temp = array[l];
			array[l] = array[i];
			array[i] = temp;
        }
    }
}

permute( array, 0, array.length - 1 );
 
Array.prototype.shift = function(n) {
	this.push.apply(this, this.splice(0,n));
};

var actualPerms = [];
for(var i=0;i<perms.length;i++){
	// Check if it's in actualPerms
	var isIn = false;
	for(var j=0;j<actualPerms.length;j++){
		// Check all orderings.
		for(var k=0;k<actualPerms[j].length; k++){
			var s = actualPerms[j].join(',');
			actualPerms[j].shift(1);

			if( s == perms[i].join(',') ){
				isIn = true;
            }
			
        }
		actualPerms[j].reverse();

		for(var k=0;k<actualPerms[j].length; k++){
			var s = actualPerms[j].join(',');
			actualPerms[j].shift(1);

			if( s == perms[i].join(',') ){
				isIn = true;
            }
        }

		actualPerms[j].reverse();
    }

	if( ! isIn ){
		actualPerms[actualPerms.length] = [];
		for(var j=0;j<perms[i].length;j++){
			actualPerms[actualPerms.length - 1][j] = perms[i][j];
        }
    }
}

for(var i=0;i<actualPerms.length;i++){
	var s = actualPerms[i].join('->') + "->" + actualPerms[i][0] + ": ";
	var sum = 0;
	if( i == 1 ){
		console.log( actualPerms[i] );
	}
	for(var j=0;j<actualPerms[i].length-1;j++){
		if( i == 1 ){
			console.log( data[actualPerms[i][j] + actualPerms[i][j+1]] );

			if( data[actualPerms[i][j] + actualPerms[i][j+1]] == undefined ){
				console.log( actualPerms[i][j] + actualPerms[i][j+1] );
			}
		}
		sum += data[actualPerms[i][j] + actualPerms[i][j+1]];
    }

	sum += data[actualPerms[i][0] + actualPerms[i][actualPerms[i].length - 1]];

	s += sum;
	console.log( s );
}

