
$(function () {
    // Game variables
    let comp = [];
    let player = [];
    let count = 0;
    let j = 0;
    let strict = false;
    const colorsArray = ['white', 'yellow', 'pink', 'blue'];
    const whiteAudio = new Audio('sounds/sound1.wav');
    const yellowAudio = new Audio('sounds/sound2.wav');
    const pinkAudio = new Audio('sounds/sound3.wav');
    const blueAudio = new Audio('sounds/sound4.wav');
    
    // jQuery variables
    const startButton = $('#start');
    const strictButton = $('#strict');
    let colors = $('.colors');
    const display = $('#display');
    const white = $('#white');
    const yellow = $('#yellow');
    const pink = $('#pink');
    const blue = $('#blue');
    
    // Reset colors
    function resetColor() {
      white.css('background', 'radial-gradient(#ffffff61, #ffffffe8)');
      yellow.css('background', 'radial-gradient(#efe89566, #e9e293d9)');
      pink.css('background', 'radial-gradient(#ef82c554, #ef82c5d9)');
      blue.css('background', 'radial-gradient(rgba(136, 237, 241, 0.329), rgba(86, 250, 255, 0.9))');
    }
    
    // Random color picker
    function randomizer() { 
      count++;    
      display.val(count);
      const length = colors.length;
      const random = Math.floor(Math.random() * length);
      comp.push(colorsArray[random]);
      displaySet(comp);
    }
    
    // Current color animation
    function currentDisplay(color) {
      switch (color) {
        case 'white':
          white.css({
            'background': '#ffffff',
            'box-shadow': '2px 1px 45px -3px #ffffff',
            'border': '2px solid #fff'
          });
          whiteAudio.play();
          break;
        case 'yellow':
          yellow.css({
            'box-shadow': '2px 1px 45px -3px #fffcdc',
            'border': '2px solid #fffde7',
            'background': 'radial-gradient(#ffffff, #fff587)'
          });
          yellowAudio.play();
          break;
        case 'pink':
          pink.css({
            'box-shadow': '2px 1px 45px -3px #ef82c5',
            'border': '2px solid #f9d4eb',
            'background': 'radial-gradient(#ffffff, #ef82c5)'
          });
          pinkAudio.play();
          break;
        case 'blue':
          blue.css({
            'box-shadow': '2px 1px 45px -3px #c6f5f7',
            'border': '2px solid #5efaff',
            'background': 'radial-gradient(#ffffff, #92edf0)' 
          });
          blueAudio.play();
          break;
      }
      window.setTimeout(function() {
        resetColor();
      }, 300);
    }
    
    // Run the color list
    function displaySet(array) {
      let i = 0;
      let interval = setInterval(function() {
        currentDisplay(array[i]);
        i++;
        if (i >= array.length) {
          clearInterval(interval);
        }
      }, 900);
    }
    
    // Checks player action
    function checkIds() {
      colors.click(function() {
        let ID = $(this).attr('id');
        currentDisplay(ID);
        player.push(ID);
        
        if (ID !== comp[j]) {
          j = 0;
          display.val('XX');
          colors.off();
          if(strict){
            return false;
          }
          setTimeout(function() {
            display.val(count);
            displaySet(comp);
            checkIds();
          }, 1000);
  
        } else if (typeof comp[20] !== 'undefined'){
          colors.off();
          display.val('WIN');
        } 
        else if (typeof comp[j+1] === 'undefined'){
          colors.off();
          setTimeout(function() {
            j=0;
            randomizer();
            checkIds();
          }, 1000);
        }
        else{
          j++;
        }
      });
    } 
    //Start the game
    function start(){
      resetColor();
      colors.off();
      comp = []; 
      count = 0; 
      j = 0; 
      player = [];
      randomizer();
      displaySet(comp);
      checkIds();
    }
    
    // Normal mode button
    startButton.on('click', function (){
      strict = false;
      start();
      $(this).addClass('active-start');
      strictButton.removeClass('active-strict');
    });
    
    // Strict mode button
    strictButton.on('click', function (){
      strict = true;
      start();
      $(this).addClass('active-strict');
      startButton.removeClass('active-start');
    });

    //Reset settings on page reload
    if(location.reload){
      count = 0;
      display.val('--');   
    }
  });
  