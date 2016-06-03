var colorSheet = d3.select('#color-sheet'),
    colorInputs = d3.selectAll('.color-input').selectAll('input'),
    initColors = [];

// Initial Setup
colorInputs.forEach(function(input){
  var col = input[0].value;
  d3.select(input[0].parentNode).style({
    'background-color': chroma(col),
    'color': lumaContrast(col)
  });
  d3.select(input[0]).style({
    'color': lumaContrast(col)
  });
  initColors.push(chroma(col));
});

var initData = interpolateMatrix(initColors, 8, 9);
plotColorSheet(initData);


// Taking user inputs
colorInputs.on('keyup', function() {
    var regex = /^[a-f\d]{6}\b|^[a-f\d]{3}\b/i,
        checkInput = regex.exec(this.value) ? true : false;

    if (checkInput) {
      d3.select(this.parentNode).style({
        'background-color': chroma(this.value),
        'color': lumaContrast(this.value)
      });
      d3.select(this).style({
        'color': lumaContrast(this.value)
      });
    }
  });

// Helper functions
function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.45 ? 0 : 1;
  return chroma(c).luminance(flip);
}

function interpolateMatrix(colorList, rows, cols) {
  list = [];
  list1 = chroma.scale([colorList[0], colorList[1]]).colors(cols);

  list.push(list1);

  list2 = chroma.scale([colorList[0], colorList[2]]).colors(rows).slice(1, rows - 1);
  list3 = chroma.scale([colorList[1], colorList[3]]).colors(rows).slice(1, rows - 1);

  list2.forEach(function(d, i){
      list.push(chroma.scale([d,list3[i]]).colors(cols));
  });

  list4 = chroma.scale([colorList[2], colorList[3]]).colors(cols);
  list.push(list4);

  return list;
}

function plotColorSheet(sheetColors) {

  colorSheet.selectAll('tr')
    .data(sheetColors).enter()
    .append('tr').selectAll('td')
    .data(function(d) {return d}).enter()
    .append('td.swatch')
    .text(function(d){return d;})
    .style({
      'background': function(d) {return chroma(d)},
      'color': function(d) {return lumaContrast(d)}
    });
}
