// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.DescentPal = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * @see 2D/PALETTE.C
 */

var DescentPal = (function() {
  function DescentPal(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  DescentPal.prototype._read = function() {
    this.palette = [];
    for (var i = 0; i < 256; i++) {
      this.palette.push(new PaletteEntryT(this._io, this, this._root));
    }
    this.fadeTable = [];
    for (var i = 0; i < (256 * 34); i++) {
      this.fadeTable.push(this._io.readU1());
    }
  }

  var PaletteEntryT = DescentPal.PaletteEntryT = (function() {
    function PaletteEntryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PaletteEntryT.prototype._read = function() {
      this.r = this._io.readU1();
      this.g = this._io.readU1();
      this.b = this._io.readU1();
    }

    return PaletteEntryT;
  })();

  var PaletteFadeEntryT = DescentPal.PaletteFadeEntryT = (function() {
    function PaletteFadeEntryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PaletteFadeEntryT.prototype._read = function() {
      this.entry = [];
      for (var i = 0; i < 34; i++) {
        this.entry.push(this._io.readU1());
      }
    }

    return PaletteFadeEntryT;
  })();

  return DescentPal;
})();
return DescentPal;
}));
