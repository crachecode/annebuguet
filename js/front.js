$(document).ready(function () {

	/*
	// *** scene ***
	
	var renderer = new THREE.WebGLRenderer({antialias: true});
	container = $('#chtulu');
	container.append(renderer.domElement);
	var width = $(window).get(0).innerWidth;
	var height = $(window).get(0).innerHeight;
	renderer.setSize(width, height);

	//renderer.setClearColorHex(0x000000, 0);
	

	var scene = new THREE.Scene();

	// *** camera ***

	ratio = width / height;
	var camera = new THREE.PerspectiveCamera(35, width/height, 1, 10000);
	if (ratio>1.8){
		cZ = (Math.pow((ratio/1.8),1.25));
		//alert(ratio+' '+cZ+' '+1580/cZ);
		camera.position.z = 1580/cZ;
	}
	else {
		camera.position.z = 1580;
	}

	// *** materials ***

	var paperTexture = THREE.ImageUtils.loadTexture('/img/paper3.jpg', {}, function() {
		runAnimation(0);
	});
	paperTexture.anisotropy = renderer.getMaxAnisotropy();
	var paper = new THREE.MeshLambertMaterial({map: paperTexture});

	var paperTexture = THREE.ImageUtils.loadTexture('/img/paper2.jpg', {}, function() {
		runAnimation(0);
	});
	paperTexture.anisotropy = renderer.getMaxAnisotropy();
	var purple = new THREE.MeshLambertMaterial({map: paperTexture});
	//paper.side = THREE.DoubleSide;

	//paper.wrapS = THREE.RepeatWrapping;
	//paper.wrapT = THREE.RepeatWrapping;
	//paper.repeat.set(1,1);
	//var paperPlane = new THREE.MeshLambertMaterial({map: paper});

	// *** shapes ***
	var gap = 1;
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0,0));
	geometry.vertices.push(new THREE.Vector3(80,0,0));
	geometry.vertices.push(new THREE.Vector3(80,18,0));
	geometry.vertices.push(new THREE.Vector3(0,-gap,-gap));
	geometry.vertices.push(new THREE.Vector3(80,18,-gap));
	geometry.vertices.push(new THREE.Vector3(80,-gap,-gap));
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(3, 4, 5));
	geometry.faceVertexUvs[0].push([
		new THREE.Vector2(0.005,0.005),
		new THREE.Vector2(0.15,0.6),
		new THREE.Vector2(0.005,0.6)
	]);
	geometry.faceVertexUvs[0].push([
		new THREE.Vector2(0.005,0.005),
		new THREE.Vector2(0.005,0.6),
		new THREE.Vector2(0.15,0.6)
	]);
	geometry.computeFaceNormals();
	var geometry2 = new THREE.Geometry();
	geometry2.vertices.push(new THREE.Vector3(0,0,0));
	geometry2.vertices.push(new THREE.Vector3(80,0,0));
	geometry2.vertices.push(new THREE.Vector3(80,18,0.0));
	geometry2.vertices.push(new THREE.Vector3(0,-gap,gap));
	geometry2.vertices.push(new THREE.Vector3(80,18,gap));
	geometry2.vertices.push(new THREE.Vector3(80,-gap,gap));
	geometry2.faces.push(new THREE.Face3(0, 2, 1));
	geometry2.faces.push(new THREE.Face3(3, 5, 4));
	geometry2.faceVertexUvs[0].push([
		new THREE.Vector2(0,0),
		new THREE.Vector2(0.8,0),
		new THREE.Vector2(0.8,0.18)
	]);
	geometry2.faceVertexUvs[0].push([
		new THREE.Vector2(0,0),
		new THREE.Vector2(0.8,0.18),
		new THREE.Vector2(0.8,0)
	]);
	geometry2.computeFaceNormals();
	triangle1 = new THREE.Mesh(geometry,purple);
	triangle2 = new THREE.Mesh(geometry2,purple);
	//triangle3 = new THREE.Mesh(geometry,paper);
	//triangle4 = new THREE.Mesh(geometry2,paper);
	triangle1.rotation.x = 45*(Math.PI/180);
	triangle2.rotation.x = 135*(Math.PI/180);
	//triangle2.scale.x = -1;
	//triangle4.position.z = -1;
	triangle1.castShadow = true;
	triangle2.castShadow = true;
	triangle1.receiveShadow = true;
	triangle2.receiveShadow = true;
	var petal = new THREE.Object3D();
	petal.add(triangle1);
	petal.add(triangle2);
	flower = new THREE.Object3D();
	ring = function (nPetals, angle, size){
		petal.rotation.y = -angle*(Math.PI/180);
		var petal2 = new THREE.Object3D();
		petal2.add(petal);
		petal2.scale.x = petal2.scale.y = petal2.scale.z = size;
		for (i=0;i<nPetals;i++){
			var tPetal2 = petal2.clone();
			tPetal2.rotation.z = i*(360/nPetals)*(Math.PI/180);
			flower.add(tPetal2);
		}
	}
	ring(12,0,1);
	ring(10,20,0.7);
	ring(7,40,0.5);
	ring(5,60,0.4);
	ring(3,80,0.4);
	//flower.setMaterial(paper);
	scene.add(flower);

	var flower2 = flower.clone();
	scene.add(flower2);

	var plane = new THREE.Mesh(
		new THREE.PlaneGeometry(2000,2000),
		paper
	);
	scene.add(plane);
	plane.position.z = -20;

	// *** lights ***

	scene.add(new THREE.AmbientLight(0xffffff));

	var spot = new THREE.SpotLight(0xffcc99, 0.1);
	spot.position.set(-400, 400, 1500);
	scene.add(spot);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	spot.shadowMapWidth = 3072;
	spot.shadowMapHeight = 2048;

	//spot.shadowCameraVisible = true;
	spot.shadowCameraNear = 500;
	spot.shadowCameraFar = 2000;
	spot.shadowDarkness = 0.07;
	//spot.shadowDarkness = 0.2;
	spot.castShadow = true;
	plane.receiveShadow = true;


	flower.position.x = (Math.random()*1200)-600;
	flower.position.y = (Math.random()*800)-400;
	flower.position.z = 400;
	flower.scale.x = flower.scale.y = flower.scale.z = (Math.random()+1)*4;
	flower2.position.x = (Math.random()*1200)-600;
	flower2.position.y = (Math.random()*800)-400;
	flower2.position.z = 400;
	flower2.scale.x = flower2.scale.y = flower2.scale.z = (Math.random()+1)*2.5;

	//flower.rotation.x = -90*(Math.PI/180);

	var IE = document.all?true:false;
	if (!IE) document.captureEvents(Event.MOUSEMOVE)
	var tempX = 0;
	var tempY = 0;
	var mouseX = 0;
	var mouseY = 0;
	$(document).mousemove(function(e){
		if (IE) { // grab the x-y pos.s if browser is IE
			tempX = event.clientX;
			tempY = event.clientY;
		}
		else {  // grab the x-y pos.s if browser is NS
			tempX = e.pageX - window.pageXOffset;
			tempY = e.pageY - window.pageYOffset;
		}  
		if (tempX < 0){tempX = 0;}
		if (tempY < 0){tempY = 0;}
		mouseX = tempX;
		mouseY = tempY;
	});

	var thisx = 0;
	var thisy = 0;
	var speed = 1.02;

	function runAnimation(t){
		thisx = mouseX+((thisx-mouseX)/speed);
		thisy = mouseY+((thisy-mouseY)/speed);
		plane.rotation.x =  (thisy-height/2)/7000;
		plane.rotation.y =  (thisx-width/2)/8000;
		flower.rotation.z = (thisy-thisx)/600;
		flower2.rotation.z = (thisy+thisx)/-300;

		flower.rotation.x =  (thisy-height/2)/1000;
		flower.rotation.y =  (thisx-width/2)/1000;
		flower2.rotation.x =  (thisy-height/2)/800;
		flower2.rotation.y =  (thisx-width/2)/800;
		renderer.render(scene, camera); // display
		requestAnimationFrame(runAnimation); // and loop
	}
	$(window).resize(function() {
	});
	*/

});

rot13 = function(str){
	return str.replace(/[a-zA-Z]/g,function(c){
		return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);
	});
}
