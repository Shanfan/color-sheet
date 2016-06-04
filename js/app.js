var colorSheet = d3.select('#color-sheet'),
    colorInputs = d3.selectAll('.color-input').selectAll('input').data(getColors()),
    rowInput = d3.select('#rows'),
    colInput = d3.select('#columns');

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
});

plotColorSheet();

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

      plotColorSheet();
    }
  });

rowInput.on('change', function() {
  d3.select('#for_rows').text(this.value);
  plotColorSheet();
});

colInput.on('change', function() {
  d3.select('#for_columns').text(this.value);
  plotColorSheet();
});

d3.select('#show_text').on('change', function(){
  if(this.checked){
    d3.selectAll('.swatch').style('color', function(d){return lumaContrast(d)});
  }else {
    d3.selectAll('.swatch').style('color', 'transparent');
  }
});



function plotColorSheet() {
  var colors = getColors(),
      rows = +document.querySelector('#rows').value,
      cols = +document.querySelector('#columns').value,
      sheetColors = interpolateMatrix(colors, rows, cols);

  var colorSheetRow =  colorSheet.selectAll('tr').data(sheetColors),
      colorSheetCol = colorSheetRow.selectAll('td').data(function(d){return d;});

  // Update the existing ones:
  colorSheetCol.text(function(d){return d;})
                .style({
                  'background': function(d) {return chroma(d)},
                  'color': function(d) {
                    if (document.querySelector('#show_text').checked) {
                      return lumaContrast(d);
                    }else {
                      return "transparent";
                    }
                  }
                });

  // If there's more columns:
  colorSheetCol.enter().append('td.swatch')
      .text(function(d){return d;})
      .style({
        'background': function(d) {return chroma(d)},
        'color': function(d) {
          if (document.querySelector('#show_text').checked) {
            return lumaContrast(d);
          }else {
            return "transparent";
          }
        }
      });

  // If there's more rows:
  colorSheetRow.enter()
    .append('tr').selectAll('td')
    .data(function(d){return d;}).enter()
    .append('td.swatch')
    .text(function(d){return d;})
    .style({
      'background': function(d) {return chroma(d)},
      'color': function(d) {
        if (document.querySelector('#show_text').checked) {
          return lumaContrast(d);
        }else {
          return "transparent";
        }
      }
    });

  colorSheetCol.exit().remove();
	colorSheetRow.exit().remove();

}


// Helper functions
function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.5 ? 0.1 : 0.9;
  return chroma(c).luminance(flip);
}

function getColors(){
  var colors = [];
  var inputs = d3.selectAll('.color-input input');

  inputs[0].forEach(function(input){
    colors.push(chroma(input.value));
  });
  return colors;
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
