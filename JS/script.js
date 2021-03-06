document.addEventListener('DOMContentLoaded', function () {

    require.config({

        baseUrl: 'JS',
        packages:[
            
            {
               name:'physicsjs',
               location: 'physicsjs/dist',
               main: 'physicsjs-full.min.js'
        
            }

        ],

    }); 

    require([
        'physicsjs',
        'physicsjs/bodies/convex-polygon'], function( Physics ){
    
            Physics(function(world){

              var viewWidth = window.innerWidth;
              var viewHeight = window.innerHeight;

              var renderer = Physics.renderer('canvas', {
                el: 'viewport',
                width: viewWidth,
                height: viewHeight,
                meta: false, // don't display meta data
                styles: {
                    // set colors for the circle bodies
                    'circle' : {
                        strokeStyle: '#000',
                        lineWidth: 1,
                        fillStyle: '#000'
                    }
                }
              });

              // add the renderer
              world.add( renderer );
              // render on each step
              world.on('step', function(){
                world.render();
              });

              console.log(window.innerWidth);

              // bounds of the window
              var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

              // constrain objects to these bounds
              world.add(Physics.behavior('edge-collision-detection', {
                  aabb: viewportBounds,
                  restitution: 0.99,
                  cof: 0.99
              }));

              // add a circle
              world.add(
                  Physics.body('circle', {
                    x: 550, // x-coordinate
                    y: 30, // y-coordinate
                    vx: 0.5, // velocity in x-direction
                    vy: 0.01, // velocity in y-direction
                    radius: 20
                  })
              );

              world.add(
                  Physics.body('circle', {
                    x: 100, // x-coordinate
                    y: 200, // y-coordinate
                    vx: 0.2, // velocity in x-direction
                    vy: 0.41, // velocity in y-direction
                    radius: 20
                  })
              );

              world.add(
                  Physics.body('circle', {
                    x: 50, // x-coordinate
                    y: 30, // y-coordinate
                    vx: 0.1, // velocity in x-direction
                    vy: 0.01, // velocity in y-direction
                    radius: 20
                  })
              );

              // ensure objects bounce when edge collision is detected
              world.add( Physics.behavior('body-impulse-response') );

              // add some gravity
              world.add( Physics.behavior('constant-acceleration') );

              // subscribe to ticker to advance the simulation
              Physics.util.ticker.on(function( time, dt ){

                  world.step( time );
              });

              // start the ticker
              Physics.util.ticker.start();

            });


    });

});