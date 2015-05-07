var THREE = require("three");

var FasterGeometry = function(func, slices, stacks) {

  THREE.Geometry.call( this );

  for ( var i = 0; i <= stacks; i = i + 1 ) {
    var v = i / stacks;
    for ( var j = 0; j <= slices; j = j + 1 ) {
      this.vertices.push( func( j / slices, v ) );
    }
  }

  var sliceCount = slices + 1;

  for ( var p = 0; p < stacks; p = p + 1 ) {
    for ( var q = 0; q < slices; q = q + 1 ) {
      var a = p * sliceCount + q;
      var b = p * sliceCount + q + 1;
      var c = (p + 1) * sliceCount + q + 1;
      var d = (p + 1) * sliceCount + q;
      this.faces.push( new THREE.Face3( a, b, d ) );
      this.faces.push( new THREE.Face3( b, c, d ) );
    }
  }
};

FasterGeometry.prototype = Object.create( THREE.Geometry.prototype );
FasterGeometry.prototype.constructor = FasterGeometry;

module.exports = FasterGeometry;
