var initSheet = [{'id': 'upLeft', 'color': '575aFa', 'row': '0', 'column': '0'},
                 {'id': 'lowLeft', 'color': 'bf75a7', 'row': '2', 'column': '0'},
                 {'id': 'upRight', 'color': 'dddddd', 'row': '0', 'column': '2'},
                 {'id': 'lowRight', 'color': '000000', 'row': '2', 'column': '2'}];

var colorSheet = d3.select('#color-sheet').style({'height': 720});

colorSheet.selectAll('.swatch')
          .data(initSheet).enter()
          .append('div')
          .attr({
            'class': 'swatch',
            'id': ƒ('id')
          }).style({
            'background': function(d) {return chroma(d.color)},
            'color': function(d) {return lumaContrast(d.color)},
            'left': function(d) {return `${d.column * 33.33333}%`},
            'top': function(d) {return `${d.row * 720/3}px`},
            'width': function(d) {return '33.33333%'},
            'height': function(d) {return 720/3 + 'px'}
          }).append('input')
          .property({
            'className': 'hex-input',
            'type': 'text',
            'value': ƒ('color'),
            'size': 6
          }).style({
            'color': function(d) {return lumaContrast(d.color)}
          }).on('keyup', function() {
            var regex = /^[a-f\d]{6}\b|^[a-f\d]{3}\b/i,
                checkInput = regex.exec(this.value) ? true : false;

            if (checkInput) {
              this.style.color = lumaContrast(this.value);
              this.parentElement.style.background = chroma(this.value);
              this.parentElement.style.color = lumaContrast(this.value);
            }
          });

function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.45 ? 0 : 1;
  return chroma(c).luminance(flip);
}
