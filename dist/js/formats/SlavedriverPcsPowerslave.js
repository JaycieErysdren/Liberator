// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverPcsPowerslave = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var SlavedriverPcsPowerslave = (function() {
  function SlavedriverPcsPowerslave(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverPcsPowerslave.prototype._read = function() {
    this.lenBitmaps = this._io.readU4be();
    this.bitmaps = [];
    for (var i = 0; i < Math.floor(this.lenBitmaps / 77328); i++) {
      this.bitmaps.push(new BitmapT(this._io, this, this._root));
    }
  }

  var BitmapT = SlavedriverPcsPowerslave.BitmapT = (function() {
    function BitmapT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitmapT.prototype._read = function() {
      this.numBitmap = this._io.readU4be();
      this.width = this._io.readU4be();
      this.height = this._io.readU4be();
      this.bitmap = [];
      for (var i = 0; i < this.numBitmap; i++) {
        this.bitmap.push(this._io.readBitsIntBe(8));
      }
      this._io.alignToByte();
      this.paddingBottom = this._io.readU4be();
      this.palette = [];
      for (var i = 0; i < 256; i++) {
        this.palette.push(new PaletteEntryT(this._io, this, this._root));
      }
    }

    return BitmapT;
  })();

  var PaletteEntryT = SlavedriverPcsPowerslave.PaletteEntryT = (function() {
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

  return SlavedriverPcsPowerslave;
})();
return SlavedriverPcsPowerslave;
}));
