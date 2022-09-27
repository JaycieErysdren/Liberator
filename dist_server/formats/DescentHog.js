// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.DescentHog = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var DescentHog = (function() {
  function DescentHog(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  DescentHog.prototype._read = function() {
    this.magic = this._io.readBytes(3);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [68, 72, 70]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([68, 72, 70], this.magic, this._io, "/seq/0");
    }
    this.chunks = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.chunks.push(new ChunkT(this._io, this, this._root));
      i++;
    }
  }

  var ChunkT = DescentHog.ChunkT = (function() {
    function ChunkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkT.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(13), 0, false), "ascii");
      this.lenData = this._io.readU4le();
      this.data = this._io.readBytes(this.lenData);
    }

    return ChunkT;
  })();

  return DescentHog;
})();
return DescentHog;
}));
