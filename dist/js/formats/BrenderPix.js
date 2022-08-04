// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.BrenderPix = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * @see {@link https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/brenderpix.c|Source}
 */

var BrenderPix = (function() {
  function BrenderPix(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BrenderPix.prototype._read = function() {
    this.magic = this._io.readBytes(16);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [0, 0, 0, 18, 0, 0, 0, 8, 0, 0, 0, 2, 0, 0, 0, 2]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([0, 0, 0, 18, 0, 0, 0, 8, 0, 0, 0, 2, 0, 0, 0, 2], this.magic, this._io, "/seq/0");
    }
    this.bitmapType = this._io.readS4be();
    this.header = new HeaderT(this._io, this, this._root);
    switch (this.header.bitmapType) {
    case 4:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    case 6:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    case 7:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    case 3:
      this.bitmap = new BitmapPal8(this._io, this, this._root);
      break;
    case 5:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    case 8:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    case 18:
      this.bitmap = new Unknown(this._io, this, this._root);
      break;
    }
  }

  var HeaderT = BrenderPix.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.lenHeader = this._io.readS4be();
      this.bitmapType = this._io.readBitsIntBe(8);
      this._io.alignToByte();
      this.rowBytes = this._io.readU2be();
      this.width = this._io.readU2be();
      this.height = this._io.readU2be();
      this.originX = this._io.readU2be();
      this.originY = this._io.readU2be();
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytes((this.lenHeader - 11)), "ASCII");
    }

    return HeaderT;
  })();

  var Unknown = BrenderPix.Unknown = (function() {
    function Unknown(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Unknown.prototype._read = function() {
    }

    return Unknown;
  })();

  var PaletteEntryT = BrenderPix.PaletteEntryT = (function() {
    function PaletteEntryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PaletteEntryT.prototype._read = function() {
      this.none = this._io.readU1();
      this.b = this._io.readU1();
      this.g = this._io.readU1();
      this.r = this._io.readU1();
    }

    return PaletteEntryT;
  })();

  var BitmapPal8 = BrenderPix.BitmapPal8 = (function() {
    function BitmapPal8(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitmapPal8.prototype._read = function() {
      this.bitmapDataType = this._io.readS4be();
      this.header = new HeaderT(this._io, this, this._root);
      this.paletteDataType = this._io.readS4be();
      this.lenPaletteData = this._io.readS4be();
      this.palettePaddingTop = this._io.readBytes(8);
      this.paletteData = [];
      for (var i = 0; i < Math.floor((this.lenPaletteData - 8) / 4); i++) {
        this.paletteData.push(new PaletteEntryT(this._io, this, this._root));
      }
      this.palettePaddingBottom = this._io.readBytes(8);
      this.imageDataType = this._io.readS4be();
      this.lenImageData = this._io.readS4be();
      this.imagePaddingTop = this._io.readBytes(8);
      this.imageData = this._io.readBytes((this.lenImageData - 8));
      this.imagePaddingBottom = this._io.readBytes(8);
    }

    return BitmapPal8;
  })();

  return BrenderPix;
})();
return BrenderPix;
}));
