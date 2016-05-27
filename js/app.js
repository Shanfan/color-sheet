'use strict'

/*  Feature 1: Build a color matrix based on 4 colors and 2 steps */

    // 2:
    // I have 2 inputs: start and end. Both behave the same as specified in #1.

window.onload = function(){
  createSwatchInput('#color-sheet', 'start', 'aaa');
  createSwatchInput('#color-sheet', 'end', 'bbb');
  interpolateSwatch('#start', '#end', 5);
}

// A: Color Interpolation Between 2 Color Inputs and 1 Step Input
    // 1:
    // As I type HEX color value in the input box, the input background change to the color I specified
function createSwatchInput(selector, id, color) {
  var selector = document.querySelector(selector);

  var input = document.createElement('input');
  input.className = 'hex-input';
  input.type = 'text';
  input.value = color;
  input.style.color = lumaContrast(color);

  var wrapper = document.createElement('div');
  wrapper.className = 'swatch';
  wrapper.id = id;
  wrapper.style.background = chroma(color);
  wrapper.style.color = lumaContrast(color);
  wrapper.dataset.color = chroma(color);

  selector.appendChild(wrapper).appendChild(input);

  input.onkeyup = function(e){
    var checkInput = this.value.length == 3 || this.value.length == 6 ? true : false;
    if (checkInput) {
      this.style.color = lumaContrast(this.value);
      this.parentElement.style.background = chroma(this.value);
      this.parentElement.style.color = lumaContrast(this.value);
      this.parentElement.dataset.color = chroma(this.value);
    }
  };
}

// 3:
// The system returns 5 colors between start and end colors, using chroma.scale(['start', 'end']).colors(5)
function interpolateSwatch(selector_1, selector_2, step) {
  var start = document.querySelector(selector_1);
  var end = document.querySelector(selector_2);
  var interpolationList = chroma.scale([start.dataset.color, end.dataset.color]).colors(step);

  for (var i = 0; i < step; i++){
    var co = interpolationList[i];
    var wrapper = document.createElement('div');

    wrapper.className = 'swatch-interpolated';
    wrapper.style.background = co;
    wrapper.style.color = lumaContrast(co);
    wrapper.dataset.color = co;
    wrapper.innerHTML = `<span>${co}</span>`;
    document.querySelector('#color-sheet').insertBefore(wrapper, end);
  }
}


function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.45 ? 0.3 : 0.7;
  return chroma(c).luminance(flip);
}






    // 4:
    // I can specify an integer n (n>0), the system returns n colors between start and end.

// B: Color Interpolation With 3 Color Inputs and 2 Step Inputs
    // ...

// C: Color Interpolation With 4 Color Inputs and 2 Step Inputs (Build a Color Matrix)
    // ...

/* Feature 2: ...  */
