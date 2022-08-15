// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverLevPowerslave = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var SlavedriverLevPowerslave = (function() {
  function SlavedriverLevPowerslave(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverLevPowerslave.prototype._read = function() {
    this.skyData = new SkyDataT(this._io, this, this._root);
    this.unknown01 = this._io.readBytes(1284);
    this.header = new HeaderT(this._io, this, this._root);
    this.sectors = [];
    for (var i = 0; i < this.header.numSectors; i++) {
      this.sectors.push(new SectorT(this._io, this, this._root));
    }
    this.planes = [];
    for (var i = 0; i < this.header.numPlanes; i++) {
      this.planes.push(new PlaneT(this._io, this, this._root));
    }
    this.vertices = [];
    for (var i = 0; i < this.header.numPlanes; i++) {
      this.vertices.push(new VertexT(this._io, this, this._root));
    }
    this.quads = [];
    for (var i = 0; i < this.header.numQuads; i++) {
      this.quads.push(new QuadT(this._io, this, this._root));
    }
  }

  var Resource0x6cT = SlavedriverLevPowerslave.Resource0x6cT = (function() {
    function Resource0x6cT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Resource0x6cT.prototype._read = function() {
      this.unknown0 = this._io.readU2be();
      this.lenData = this._io.readU2be();
      this.data = this._io.readBytes(this.lenData);
    }

    return Resource0x6cT;
  })();

  var SectorT = SlavedriverLevPowerslave.SectorT = (function() {
    function SectorT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SectorT.prototype._read = function() {
      this.reserved = [];
      for (var i = 0; i < 2; i++) {
        this.reserved.push(this._io.readU2be());
      }
      this.unknown01 = [];
      for (var i = 0; i < 4; i++) {
        this.unknown01.push(this._io.readU2be());
      }
      this.planeStartIndex = this._io.readS2be();
      this.planeEndIndex = this._io.readS2be();
      this.unknown02 = this._io.readU2be();
      this.flags = this._io.readU2be();
      this.unknown03 = this._io.readU2be();
      this.unknown04 = this._io.readU2be();
    }

    return SectorT;
  })();

  var ResourcesPrefixT = SlavedriverLevPowerslave.ResourcesPrefixT = (function() {
    function ResourcesPrefixT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ResourcesPrefixT.prototype._read = function() {
      this.numValues = this._io.readU4be();
      this.values = [];
      for (var i = 0; i < this.numValues; i++) {
        this.values.push(this._io.readS2be());
      }
    }

    return ResourcesPrefixT;
  })();

  var Unknown02BlockT = SlavedriverLevPowerslave.Unknown02BlockT = (function() {
    function Unknown02BlockT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Unknown02BlockT.prototype._read = function() {
      this.lenData = this._io.readS4be();
      this.data = this._io.readBytes(this.lenData);
    }

    return Unknown02BlockT;
  })();

  var SoundT = SlavedriverLevPowerslave.SoundT = (function() {
    function SoundT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SoundT.prototype._read = function() {
      this.lenSamples = this._io.readS4be();
      this.maybePitchAdjust = this._io.readS4be();
      this.bits = this._io.readS4be();
      this.loopPoint = this._io.readS4be();
      this.samples = this._io.readBytes(this.lenSamples);
    }

    /**
     * from comparing the extracted sounds with the sounds in the game
     * (see https://www.youtube.com/watch?v=Wse8iFMM-jg&t=207s and E1L1.LEV
     * sound 0), i think this is a speed/pitch adjust. 0x7000 seems to be
     * the nominal value, with sounds with that value sounding the same. but
     * notably door and elevator sound pitches sound different in game, and
     * they have a different value here. however, i havent managed to find
     * a consistent correlation between these values and the pitch change.
     * -- vfig
     */

    /**
     * bits per sample; 8 or 16.
     */

    /**
     * index of sample (or possibly byte offset; with 8 bit sounds its the
     * same) from which to loop after reaching the end of the sound the
     * first time. 0 means the entire sample loops; -1 means no loop.
     */

    return SoundT;
  })();

  var EntityT = SlavedriverLevPowerslave.EntityT = (function() {
    function EntityT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityT.prototype._read = function() {
      this.entType = this._io.readU4be();
      this.ofsEntityData = this._io.readU4be();
    }

    return EntityT;
  })();

  var ResourcesT = SlavedriverLevPowerslave.ResourcesT = (function() {
    function ResourcesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ResourcesT.prototype._read = function() {
      this.prefix = new ResourcesPrefixT(this._io, this, this._root);
      this.numSounds = this._io.readU4be();
      this.sounds = [];
      for (var i = 0; i < this.numSounds; i++) {
        this.sounds.push(new SoundT(this._io, this, this._root));
      }
      this.lenUnknown = this._io.readU4be();
      this.unknown = this._io.readBytes(this.lenUnknown);
      this.lenPalette = this._io.readU4be();
      this.palette = [];
      for (var i = 0; i < Math.floor(this.lenPalette / 2); i++) {
        this.palette.push(new PaletteEntryT(this._io, this, this._root));
      }
      this.numResources = this._io.readU4be();
      this.resources = [];
      for (var i = 0; i < this.numResources; i++) {
        this.resources.push(new ResourceT(this._io, this, this._root));
      }
    }

    return ResourcesT;
  })();

  var VertexT = SlavedriverLevPowerslave.VertexT = (function() {
    function VertexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VertexT.prototype._read = function() {
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readS2be());
      }
      this.colorLookup = this._io.readU1();
      this.reserved = this._io.readU1();
    }

    return VertexT;
  })();

  var HeaderT = SlavedriverLevPowerslave.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.numSectors = this._io.readU4be();
      this.numPlanes = this._io.readU4be();
      this.numVertices = this._io.readU4be();
      this.numQuads = this._io.readU4be();
      this.unknown01 = this._io.readU4be();
      this.unknown02 = this._io.readU4be();
      this.unknown03 = this._io.readU4be();
      this.unknown04 = this._io.readU4be();
      this.unknown05 = this._io.readU4be();
      this.unknown06 = this._io.readU4be();
      this.unknown07 = this._io.readU4be();
      this.unknown08 = this._io.readU4be();
      this.unknown09 = this._io.readU4be();
      this.unknown10 = this._io.readU4be();
    }

    return HeaderT;
  })();

  var Resource0x2cT = SlavedriverLevPowerslave.Resource0x2cT = (function() {
    function Resource0x2cT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Resource0x2cT.prototype._read = function() {
      this.unknown = this._io.readU4be();
      this.lenData = this._io.readU2be();
      this.data = this._io.readBytes(this.lenData);
    }

    return Resource0x2cT;
  })();

  var Resource0x34T = SlavedriverLevPowerslave.Resource0x34T = (function() {
    function Resource0x34T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Resource0x34T.prototype._read = function() {
      this.unknown01 = this._io.readU2be();
      this.unknown02 = this._io.readBytes(1024);
    }

    return Resource0x34T;
  })();

  var EntityPolymoverT = SlavedriverLevPowerslave.EntityPolymoverT = (function() {
    function EntityPolymoverT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityPolymoverT.prototype._read = function() {
      this.polylinkId = this._io.readS2be();
      this.data = [];
      for (var i = 0; i < 20; i++) {
        this.data.push(this._io.readS2be());
      }
    }

    return EntityPolymoverT;
  })();

  var LenAndUnknownT = SlavedriverLevPowerslave.LenAndUnknownT = (function() {
    function LenAndUnknownT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LenAndUnknownT.prototype._read = function() {
      this.lenData = this._io.readU4be();
      this.data = this._io.readBytes(this.lenData);
    }

    return LenAndUnknownT;
  })();

  var QuadT = SlavedriverLevPowerslave.QuadT = (function() {
    function QuadT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadT.prototype._read = function() {
      this.vertexIndices = [];
      for (var i = 0; i < 4; i++) {
        this.vertexIndices.push(this._io.readU2be());
      }
      this.unknown01 = this._io.readBitsIntBe(8);
      this.unknown02 = this._io.readBitsIntBe(8);
    }

    return QuadT;
  })();

  var TextureT = SlavedriverLevPowerslave.TextureT = (function() {
    function TextureT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextureT.prototype._read = function() {
      this.palette = [];
      for (var i = 0; i < 16; i++) {
        this.palette.push(new PaletteEntryT(this._io, this, this._root));
      }
      this.bitmap = [];
      for (var i = 0; i < (64 * 64); i++) {
        this.bitmap.push(this._io.readBitsIntBe(4));
      }
    }

    return TextureT;
  })();

  var Unknown02T = SlavedriverLevPowerslave.Unknown02T = (function() {
    function Unknown02T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Unknown02T.prototype._read = function() {
      this.numBlocks = this._io.readS4be();
      this.blocks = [];
      for (var i = 0; i < this.numBlocks; i++) {
        this.blocks.push(new Unknown02BlockT(this._io, this, this._root));
      }
    }

    return Unknown02T;
  })();

  var PaletteEntryT = SlavedriverLevPowerslave.PaletteEntryT = (function() {
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

  var EntityPolylinkData1T = SlavedriverLevPowerslave.EntityPolylinkData1T = (function() {
    function EntityPolylinkData1T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityPolylinkData1T.prototype._read = function() {
      this.data = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.data.push(this._io.readU1());
        i++;
      }
    }

    return EntityPolylinkData1T;
  })();

  var EntityPolylinkData2T = SlavedriverLevPowerslave.EntityPolylinkData2T = (function() {
    function EntityPolylinkData2T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityPolylinkData2T.prototype._read = function() {
      this.data = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.data.push(this._io.readU1());
        i++;
      }
    }

    return EntityPolylinkData2T;
  })();

  var ResourceT = SlavedriverLevPowerslave.ResourceT = (function() {
    function ResourceT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ResourceT.prototype._read = function() {
      this.flags = this._io.readU1();
      this.resourceType = this._io.readU1();
      switch (this.resourceType) {
      case 130:
        this.data = new TextureT(this._io, this, this._root);
        break;
      case 42:
        this.data = new Resource0x2cT(this._io, this, this._root);
        break;
      case 44:
        this.data = new Resource0x2cT(this._io, this, this._root);
        break;
      }
    }

    return ResourceT;
  })();

  var TileT = SlavedriverLevPowerslave.TileT = (function() {
    function TileT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TileT.prototype._read = function() {
      this.ofsTextureData = this._io.readU2be();
      this.width = this._io.readU1();
      this.height = this._io.readU1();
      this.ofsColorData = this._io.readU2be();
      this.unknown = this._io.readU2be();
      this.horizontalVector = [];
      for (var i = 0; i < 3; i++) {
        this.horizontalVector.push(this._io.readS4be());
      }
      this.verticalVector = [];
      for (var i = 0; i < 3; i++) {
        this.verticalVector.push(this._io.readS4be());
      }
      this.baseVector = [];
      for (var i = 0; i < 3; i++) {
        this.baseVector.push(this._io.readS4be());
      }
    }

    return TileT;
  })();

  var EntityPolylinkT = SlavedriverLevPowerslave.EntityPolylinkT = (function() {
    function EntityPolylinkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityPolylinkT.prototype._read = function() {
      this.lead = this._io.readU2be();
      this.ofsEntityPolylinkData1 = [];
      for (var i = 0; i < 2; i++) {
        this.ofsEntityPolylinkData1.push(this._io.readU2be());
      }
      this.ofsEntityPolylinkData2 = [];
      for (var i = 0; i < 2; i++) {
        this.ofsEntityPolylinkData2.push(this._io.readU2be());
      }
      this.unknown = this._io.readU2be();
      this.reserved = [];
      for (var i = 0; i < 3; i++) {
        this.reserved.push(this._io.readU2be());
      }
    }

    return EntityPolylinkT;
  })();

  var PlaneT = SlavedriverLevPowerslave.PlaneT = (function() {
    function PlaneT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PlaneT.prototype._read = function() {
      this.normal = [];
      for (var i = 0; i < 3; i++) {
        this.normal.push(this._io.readS4be());
      }
      this.angle = this._io.readS4be();
      this.unknown01 = this._io.readS2be();
      this.unknown02 = this._io.readS2be();
      this.flags = this._io.readU2be();
      this.textureIndex = this._io.readU2be();
      this.quadStartIndex = this._io.readS2be();
      this.quadEndIndex = this._io.readS2be();
      this.vertexStartIndex = this._io.readU2be();
      this.vertexEndIndex = this._io.readU2be();
      this.vertexIndices = [];
      for (var i = 0; i < 4; i++) {
        this.vertexIndices.push(this._io.readU2be());
      }
      this.unknown03 = this._io.readS2be();
      this.lookup = this._io.readU2be();
      this.unknown04 = this._io.readS2be();
      this.unknown05 = this._io.readS2be();
    }

    return PlaneT;
  })();

  var EntityGenericT = SlavedriverLevPowerslave.EntityGenericT = (function() {
    function EntityGenericT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityGenericT.prototype._read = function() {
      this.start = this._io.readS2be();
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readS2be());
      }
    }

    return EntityGenericT;
  })();

  var Resource0x6aT = SlavedriverLevPowerslave.Resource0x6aT = (function() {
    function Resource0x6aT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Resource0x6aT.prototype._read = function() {
      this.unknown0 = this._io.readU2be();
      this.lenData = this._io.readU2be();
      this.data = this._io.readBytes(this.lenData);
    }

    return Resource0x6aT;
  })();

  var SkyDataT = SlavedriverLevPowerslave.SkyDataT = (function() {
    function SkyDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SkyDataT.prototype._read = function() {
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

    return SkyDataT;
  })();

  return SlavedriverLevPowerslave;
})();
return SlavedriverLevPowerslave;
}));
