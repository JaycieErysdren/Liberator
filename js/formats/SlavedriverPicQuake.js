// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverPicQuake = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var SlavedriverPicQuake = (function() {
  function SlavedriverPicQuake(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverPicQuake.prototype._read = function() {
    this.palette = [];
    for (var i = 0; i < 256; i++) {
      this.palette.push(new PaletteEntryT(this._io, this, this._root));
    }
    this.width = this._io.readS4be();
    this.height = this._io.readS4be();
    this.bitmap = [];
    for (var i = 0; i < (this.width * this.height); i++) {
      this.bitmap.push(this._io.readBitsIntBe(8));
    }
  }

  var PaletteEntryT = SlavedriverPicQuake.PaletteEntryT = (function() {
    function PaletteEntryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PaletteEntryT.prototype._read = function() {
      this.a = this._io.readBitsIntBe(1) != 0;
      this.b = this._io.readBitsIntBe(5);
      this.g = this._io.readBitsIntBe(5);
      this.r = this._io.readBitsIntBe(5);
    }

    return PaletteEntryT;
  })();

  return SlavedriverPicQuake;
})();
return SlavedriverPicQuake;
}));
