// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverDatDankskud = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var SlavedriverDatDankskud = (function() {
  function SlavedriverDatDankskud(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverDatDankskud.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
    this.bitmaps = [];
    for (var i = 0; i < 8; i++) {
      this.bitmaps.push(new BitmapT(this._io, this, this._root));
    }
  }

  var HeaderT = SlavedriverDatDankskud.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.width = this._io.readU4be();
      this.height = this._io.readU4be();
      this.padding = this._io.readBytes(6400);
    }

    return HeaderT;
  })();

  var BitmapT = SlavedriverDatDankskud.BitmapT = (function() {
    function BitmapT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitmapT.prototype._read = function() {
      this.bitmap = [];
      for (var i = 0; i < (this._root.header.width * this._root.header.height); i++) {
        this.bitmap.push(new BitmapEntryT(this._io, this, this._root));
      }
    }

    return BitmapT;
  })();

  var BitmapEntryT = SlavedriverDatDankskud.BitmapEntryT = (function() {
    function BitmapEntryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitmapEntryT.prototype._read = function() {
      this.a = this._io.readBitsIntBe(1) != 0;
      this.b = this._io.readBitsIntBe(5);
      this.g = this._io.readBitsIntBe(5);
      this.r = this._io.readBitsIntBe(5);
    }

    return BitmapEntryT;
  })();

  return SlavedriverDatDankskud;
})();
return SlavedriverDatDankskud;
}));
