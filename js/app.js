var initData = interpolateMatrix('ff9afa', 'a175ff', '333456', '001888', 8, 9);

var colorSheet = d3.select('#color-sheet');

colorSheet.selectAll('tr')
  .data(initData).enter()
  .append('tr').selectAll('td')
  .data(function(d) {return d}).enter()
  .append('td.swatch')
  .text(function(d){return d;})
  .style({
    'background': function(d) {return chroma(d)},
    'color': function(d) {return lumaContrast(d)}
  });

//           d3.select('.color-input').on('keyup', function() {
//             var regex = /^[a-f\d]{6}\b|^[a-f\d]{3}\b/i,
//                 checkInput = regex.exec(this.value) ? true : false;
//
//             if (checkInput) {
//               this.style.color = lumaContrast(this.value);
//               this.parentElement.style.background = chroma(this.value);
//               this.parentElement.style.color = lumaContrast(this.value);
//             }
//           });

function lumaContrast(c) {
  var flip = chroma(c).luminance() > 0.45 ? 0 : 1;
  return chroma(c).luminance(flip);
}

function interpolateMatrix(color1, color2, color3, color4, rows, cols) {
  list = [];
  list1 = chroma.scale([color1, color2]).colors(cols);

  list.push(list1);

  list2 = chroma.scale([color1, color3]).colors(rows).slice(1, rows - 1);
  list3 = chroma.scale([color2, color4]).colors(rows).slice(1, rows - 1);

  list2.forEach(function(d, i){
      list.push(chroma.scale([d,list3[i]]).colors(cols));
  });

  list4 = chroma.scale([color3, color4]).colors(cols);
  list.push(list4);

  return list;
}
