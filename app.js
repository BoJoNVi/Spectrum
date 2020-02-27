//------------------Scene & Camera & Controls------------------
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
document.addEventListener('mousemove', onDocumentMouseMove, false);

//------------------Drawables------------------
let ring = new THREE.Mesh(new THREE.RingBufferGeometry(1, 20, 100), new THREE.MeshBasicMaterial( {color: 0x000000}));
// scene.add(ring);

var listener = new THREE.AudioListener();

    // create an Audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('break.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
    });

    var analyser = new THREE.AudioAnalyser(sound, 32);

    // get the average frequency of the sound
    var data = analyser.getAverageFrequency();
    document.getElementById("button").addEventListener("click", play);

    function play() {
      sound.play();
      playing = true;
    }

starGeo = new THREE.Geometry();
     for(let i=0;i<9;i++) {
       star = new THREE.Vector3(
         Math.random() * 600 - 300,
         Math.random() * 600 - 300,
         Math.random() * 600 - 300
       );
       star.velocity = 0;
       star.acceleration = 1;
       starGeo.vertices.push(star);
     }
 
     let starMaterial = new THREE.PointsMaterial({
       color: 0xffffff,
       size: 3
     });
 
     stars = new THREE.Points(starGeo,starMaterial);
     scene.add(stars);

     window.addEventListener("resize", onWindowResize, false);

     //------------------Renderer------------------
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    let mousePos = { x: 0, y: 0 };
    let counter = true;
    let number = 0;
    let p1, p2, p3, p4, p5, p6, p7, p8;
    starGeo.vertices.forEach(p => {
        // p.y = -20
        p.z = -40;
    
        if (number == 1){
            p1 = p;
        }
        else if (number == 2){
            p2 = p;
        }
        else if (number == 3){
            p3 = p;
        }
        else if (number == 4){
            p4 = p;
        }
        else if (number == 5){
            p5 = p;
        }
        else if (number == 6){
            p6 = p;
        }
        else if (number == 7){
            p7 = p;
        }
        else if (number == 8){
            p8 = p;
        }
        number += 1;
      });
    p1.x = -35;
    p2.x = -25;
    p3.x = -15;
    p4.x = -5;
    p5.x = 5;
    p6.x = 15;
    p7.x = 25;
    p8.x = 35;

//------------------Functions------------------
function onDocumentMouseMove(mouse){
    console.log(mouse.y);
    mx = (event.clientX / window.innerWidth) * 14 - 7;
    my = - (event.clientY / window.innerHeight) * 8 + 4;  
    mousePos = {x:mx, y:my};
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
function animate() {
    // console.log(analyser.getAverageFrequency());
      console.log(analyser.getFrequencyData());
    p1.y = (analyser.getFrequencyData()[0]/8)-20;
    p2.y = (analyser.getFrequencyData()[1]/8)-20;
    p3.y = (analyser.getFrequencyData()[2]/8)-20;
    p4.y = (analyser.getFrequencyData()[3]/8)-20;
    p5.y = (analyser.getFrequencyData()[4]/8)-20;
    p6.y = (analyser.getFrequencyData()[5]/8)-20;
    p7.y = (analyser.getFrequencyData()[6]/8)-20;
    p8.y = (analyser.getFrequencyData()[7]/8)-20;
  starGeo.verticesNeedUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


animate();