// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverLevPowerslavePsx = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * PowerSlave (PlayStation) Level Format (.zed)
 * @see {@link https://github.com/svkaiser/PowerslaveEX/blob/master/scratchcode/scratch.cpp|Source}
 */

var SlavedriverLevPowerslavePsx = (function() {
  function SlavedriverLevPowerslavePsx(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverLevPowerslavePsx.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
    this.textureData = new ZedpadT(this._io, this, this._root, ((this.header.sizeTextureData2 << 16) | this.header.sizeTextureData1));
    this.audioData = new ZedpadT(this._io, this, this._root, this.header.sizeAudioData);
    this.hulls = [];
    for (var i = 0; i < this.header.numHulls; i++) {
      this.hulls.push(new HullT(this._io, this, this._root));
    }
  }

  var ZedpadT = SlavedriverLevPowerslavePsx.ZedpadT = (function() {
    function ZedpadT(_io, _parent, _root, x) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this.x = x;

      this._read();
    }
    ZedpadT.prototype._read = function() {
      this.data = this._io.readBytes((this.x + ((2048 - (this.x & 2047)) & 2047)));
    }

    return ZedpadT;
  })();

  var HeaderT = SlavedriverLevPowerslavePsx.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.unknown01 = this._io.readU2le();
      this.sizeTextureData1 = this._io.readU2le();
      this.sizeTextureData2 = this._io.readU2le();
      this.numAudio = this._io.readU2le();
      this.sizeAudioData = this._io.readS4le();
      this.sizeLevelData = this._io.readS4le();
      this.unknown02 = this._io.readU2le();
      this.numHulls = this._io.readU2le();
      this.numFaces = this._io.readU2le();
      this.numPolys = this._io.readU2le();
      this.numVertices = this._io.readU2le();
      this.numUvs = this._io.readU2le();
      this.numEntities = this._io.readU2le();
      this.numEvents = this._io.readU2le();
      this.numSprites = this._io.readU2le();
      this.numSpriteFrames = this._io.readU2le();
      this.numSpriteInfo = this._io.readU2le();
      this.numSpriteOffsets = this._io.readU2le();
      this.tableSpriteActors = [];
      for (var i = 0; i < 182; i++) {
        this.tableSpriteActors.push(this._io.readS2le());
      }
      this.tableHudSprites = [];
      for (var i = 0; i < 10; i++) {
        this.tableHudSprites.push(this._io.readS2le());
      }
      this.glob = [];
      for (var i = 0; i < 32312; i++) {
        this.glob.push(this._io.readBitsIntLe(4));
      }
    }

    return HeaderT;
  })();

  var HullT = SlavedriverLevPowerslavePsx.HullT = (function() {
    function HullT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HullT.prototype._read = function() {
      this.planeIndexes = [];
      for (var i = 0; i < 2; i++) {
        this.planeIndexes.push(this._io.readU2le());
      }
      this.lightLevel = this._io.readU2le();
      this.ceilingHeight = this._io.readS2le();
      this.floorHeight = this._io.readS2le();
      this.unknownIndexes = [];
      for (var i = 0; i < 2; i++) {
        this.unknownIndexes.push(this._io.readU2le());
      }
      this.ceilingSlope = this._io.readS2le();
      this.floorSlope = this._io.readS2le();
      this.unknownVector01 = [];
      for (var i = 0; i < 6; i++) {
        this.unknownVector01.push(this._io.readS2le());
      }
      this.flags = this._io.readU2le();
      this.unknownVector02 = [];
      for (var i = 0; i < 26; i++) {
        this.unknownVector02.push(this._io.readS2le());
      }
    }

    return HullT;
  })();

  return SlavedriverLevPowerslavePsx;
})();
return SlavedriverLevPowerslavePsx;
}));
