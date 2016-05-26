'use strict'

/*  Feature 1: Build a color matrix based on 4 colors and 2 steps */
// A: Color Interpolation Between 2 Color Inputs and 1 Step Input
    // 1:
    // As I type HEX color value in the input box, the input background change to the color I specified
window.onload = function(){
  appendSwatchInput('#color-sheet');
}

function appendSwatchInput(selector) {
  var input = document.createElement('input');
  input.style.background = 'transparent';
  document.querySelector(selector).appendChild(input);
  input.onkeyup = function(e){
    if (isHex(this.value)) {
      this.parentElement.style.background = '#' + this.value;
      this.style.color = lumaContrast(this.value);
    } else {
      this.parentElement.style.background = 'transparent';
    }
  };
}

function isHex(h) {
  if (h.length == 3 || h.length == 6) {
    var a = parseInt(h, 16);
    return (a.toString(16) === h.toLowerCase());
  } else {
    return false;
  }
}

function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.45 ? 0.3 : 0.7;
  return chroma(c).luminance(flip);
}

// function rever

    // 2:
    // I have 2 inputs: start and end. Both behave the same as specified in #1.

    // 3:
    // The system returns 5 colors between start and end colors, using chroma.scale(['start', 'end']).colors(5)

    // 4:
    // I can specify an integer n (n>0), the system returns n colors between start and end.

// B: Color Interpolation With 3 Color Inputs and 2 Step Inputs
    // ...

// C: Color Interpolation With 4 Color Inputs and 2 Step Inputs (Build a Color Matrix)
    // ...

/* Feature 2: ...  */
