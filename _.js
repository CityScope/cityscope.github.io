var container;
var camera, scene, renderer;
var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var pointLight;

init();
animate();

function init() {
    // loader
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };

    // model
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(Math.round(percentComplete, 2) + "% downloaded");
        }
    };
    material = new THREE.MeshStandardMaterial({
        color: "white"
    });
    var onError = function(xhr) {};
    var loader = new THREE.OBJLoader(manager);
    loader.load(
        "lego.obj",
        function(object) {
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });
            clone = object.clone();
            many(object);
        },
        onProgress,
        onError
    );

    //--------------------------------------------

    // test if this is stable!
    var logoLoader = new THREE.OBJLoader(manager);
    loader.load(
        "mlcs.obj",
        function(object) {
            // the mother is the Geometry to accumulate the
            // clones.
            var motherGeom = new THREE.Geometry();

            var mlcsMesh = new THREE.Mesh();

            // still not sure this is the right way
            // to cast object -> Mesh
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    mlcsMesh = child;
                }
            });

            // loaded geometry is a BufferedGeometry,
            // convert to normal Geometry.
            var mlcsGeom = new THREE.Geometry().fromBufferGeometry(
                mlcsMesh.geometry
            );

            mlcsGeom.scale(0.25, 0.25, 0.25);

            for (let i = 0; i < 400; i++) {
                let clone = mlcsGeom.clone();
                clone.translate(rnd(-50, 50), rnd(-50, 50), rnd(-50, 50));
                clone.rotateX(rnd(-50, 50));
                clone.rotateY(rnd(-50, 50));
                clone.rotateZ(rnd(-50, 50));
                motherGeom.merge(clone);
            }

            let motherMesh = new THREE.Mesh(motherGeom, material);
            scene.add(motherMesh);
        },
        onProgress,
        onError
    );
    //-------------------------------------------

    function many(object) {
        for (let i = 0; i < 400; i++) {
            clone = object.clone();
            clone.position.set(rnd(-50, 50), rnd(-50, 50), rnd(-50, 50));
            clone.rotation.set(rnd(-50, 50), rnd(-50, 50), rnd(-50, 50));

            scene.add(clone);
        }
    }

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    //
    window.addEventListener("resize", onWindowResize, false);
}

//
function animate() {
    requestAnimationFrame(animate);
    render();
}
