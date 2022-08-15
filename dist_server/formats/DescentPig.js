// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.DescentPig = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var DescentPig = (function() {
  function DescentPig(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  DescentPig.prototype._read = function() {
    this.numBitmaps = this._io.readU4le();
    this.numSounds = this._io.readU4le();
    this.bitmaps = [];
    for (var i = 0; i < this.numBitmaps; i++) {
      this.bitmaps.push(new BitmapHeaderT(this._io, this, this._root));
    }
    this.sounds = [];
    for (var i = 0; i < this.numSounds; i++) {
      this.sounds.push(new SoundHeaderT(this._io, this, this._root));
    }
  }

  var BitmapHeaderT = DescentPig.BitmapHeaderT = (function() {
    function BitmapHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitmapHeaderT.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(8), 0, false), "ascii");
      this.dflags = this._io.readU1();
      this.width = this._io.readU1();
      this.height = this._io.readU1();
      this.flags = this._io.readU1();
      this.averageColor = this._io.readU1();
      this.ofsData = this._io.readU4le();
    }
    Object.defineProperty(BitmapHeaderT.prototype, 'dataPos', {
      get: function() {
        if (this._m_dataPos !== undefined)
          return this._m_dataPos;
        this._m_dataPos = (((this.ofsData + (17 * this._root.numBitmaps)) + (20 * this._root.numSounds)) + 8);
        return this._m_dataPos;
      }
    });
    Object.defineProperty(BitmapHeaderT.prototype, 'getLinearData', {
      get: function() {
        if (this._m_getLinearData !== undefined)
          return this._m_getLinearData;
        var _pos = this._io.pos;
        this._io.seek(this.dataPos);
        this._m_getLinearData = this._io.readBytes((this.width * this.height));
        this._io.seek(_pos);
        return this._m_getLinearData;
      }
    });
    Object.defineProperty(BitmapHeaderT.prototype, 'getRleData', {
      get: function() {
        if (this._m_getRleData !== undefined)
          return this._m_getRleData;
        var _pos = this._io.pos;
        this._io.seek(this.dataPos);
        this._m_getRleData = new RleBitmapT(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_getRleData;
      }
    });

    return BitmapHeaderT;
  })();

  var RleBitmapT = DescentPig.RleBitmapT = (function() {
    function RleBitmapT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RleBitmapT.prototype._read = function() {
      this.nextOfs = this._io.readU4le();
      this.runLengths = [];
      for (var i = 0; i < this._parent.height; i++) {
        this.runLengths.push(this._io.readU1());
      }
      this.pixels = [];
      for (var i = 0; i < ((this.nextOfs - this._parent.height) - 4); i++) {
        this.pixels.push(this._io.readU1());
      }
    }

    return RleBitmapT;
  })();

  var SoundHeaderT = DescentPig.SoundHeaderT = (function() {
    function SoundHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SoundHeaderT.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(8), 0, false), "ascii");
      this.length = this._io.readU4le();
      this.lenData = this._io.readU4le();
      this.ofsData = this._io.readU4le();
    }
    Object.defineProperty(SoundHeaderT.prototype, 'data', {
      get: function() {
        if (this._m_data !== undefined)
          return this._m_data;
        var _pos = this._io.pos;
        this._io.seek(this.ofsData);
        this._m_data = this._io.readBytes(this.lenData);
        this._io.seek(_pos);
        return this._m_data;
      }
    });

    return SoundHeaderT;
  })();

  return DescentPig;
})();
return DescentPig;
}));
