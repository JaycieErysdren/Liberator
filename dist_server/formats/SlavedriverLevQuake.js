// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.SlavedriverLevQuake = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var SlavedriverLevQuake = (function() {
  function SlavedriverLevQuake(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  SlavedriverLevQuake.prototype._read = function() {
    this._raw_skyData = this._io.readBytes(131104);
    var _io__raw_skyData = new KaitaiStream(this._raw_skyData);
    this.skyData = new SkyDataT(_io__raw_skyData, this, this._root);
    this.header = new HeaderT(this._io, this, this._root);
    this.sectors = [];
    for (var i = 0; i < this.header.numSectors; i++) {
      this.sectors.push(new SectorT(this._io, this, this._root));
    }
    this.planes = [];
    for (var i = 0; i < this.header.numPlanes; i++) {
      this.planes.push(new PlaneT(this._io, this, this._root));
    }
    this.tiles = [];
    for (var i = 0; i < this.header.numTiles; i++) {
      this.tiles.push(new TileT(this._io, this, this._root));
    }
    this.vertices = [];
    for (var i = 0; i < this.header.numVertices; i++) {
      this.vertices.push(new VertexT(this._io, this, this._root));
    }
    this.quads = [];
    for (var i = 0; i < this.header.numQuads; i++) {
      this.quads.push(new QuadT(this._io, this, this._root));
    }
    this.entities = [];
    for (var i = 0; i < this.header.numEntities; i++) {
      this.entities.push(new EntityT(this._io, this, this._root, i));
    }
    this.entityPolylinks = [];
    for (var i = 0; i < this.header.numEntityPolylinks; i++) {
      this.entityPolylinks.push(new EntityPolylinkT(this._io, this, this._root));
    }
    this._raw_entityPolylinkData1 = this._io.readBytes((this.header.numEntityPolylinkData1Segments * 2));
    var _io__raw_entityPolylinkData1 = new KaitaiStream(this._raw_entityPolylinkData1);
    this.entityPolylinkData1 = new EntityPolylinkData1T(_io__raw_entityPolylinkData1, this, this._root);
    this._raw_entityPolylinkData2 = this._io.readBytes((this.header.numEntityPolylinkData2Segments * 4));
    var _io__raw_entityPolylinkData2 = new KaitaiStream(this._raw_entityPolylinkData2);
    this.entityPolylinkData2 = new EntityPolylinkData2T(_io__raw_entityPolylinkData2, this, this._root);
    this._raw_entityData = this._io.readBytes(this.header.lenEntityData);
    var _io__raw_entityData = new KaitaiStream(this._raw_entityData);
    this.entityData = new EntityDataT(_io__raw_entityData, this, this._root);
    this._raw_tileTextureData = this._io.readBytes(this.header.lenTileTextureData);
    var _io__raw_tileTextureData = new KaitaiStream(this._raw_tileTextureData);
    this.tileTextureData = new TileTextureDataT(_io__raw_tileTextureData, this, this._root);
    this._raw_tileColorData = this._io.readBytes(this.header.lenTileColorData);
    var _io__raw_tileColorData = new KaitaiStream(this._raw_tileColorData);
    this.tileColorData = new TileColorDataT(_io__raw_tileColorData, this, this._root);
    this.unknown = [];
    for (var i = 0; i < this.header.numUnknown; i++) {
      this.unknown.push(this._io.readBytes(128));
    }
    this.resources = new ResourcesT(this._io, this, this._root);
    this.unknown0 = new LenAndUnknownT(this._io, this, this._root);
    this.levelName = KaitaiStream.bytesToStr(this._io.readBytes(32), "ASCII");
    this.unknown1 = [];
    for (var i = 0; i < 9; i++) {
      this.unknown1.push(this._io.readU4be());
    }
    this.unknown2 = new LenAndUnknownT(this._io, this, this._root);
    this.unknown3 = new LenAndUnknownT(this._io, this, this._root);
  }

  var TileTextureDataT = SlavedriverLevQuake.TileTextureDataT = (function() {
    function TileTextureDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TileTextureDataT.prototype._read = function() {
      this.data = this._io.readBytes(this._parent.header.lenTileTextureData);
    }

    return TileTextureDataT;
  })();

  var EntityDataT = SlavedriverLevQuake.EntityDataT = (function() {
    function EntityDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EntityDataT.prototype._read = function() {
      this.data = this._io.readBytes(this._parent.header.lenEntityData);
    }

    return EntityDataT;
  })();

  var Resource0x6cT = SlavedriverLevQuake.Resource0x6cT = (function() {
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

  var SectorT = SlavedriverLevQuake.SectorT = (function() {
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
      this.position = [];
      for (var i = 0; i < 3; i++) {
        this.position.push(this._io.readU2be());
      }
      this.distance = this._io.readU2be();
      this.planeStartIndex = this._io.readU2be();
      this.planeEndIndex = this._io.readU2be();
      this.unknown = [];
      for (var i = 0; i < 6; i++) {
        this.unknown.push(this._io.readU2be());
      }
    }

    return SectorT;
  })();

  var ResourcesPrefixT = SlavedriverLevQuake.ResourcesPrefixT = (function() {
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

  var SoundT = SlavedriverLevQuake.SoundT = (function() {
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

  var EntityT = SlavedriverLevQuake.EntityT = (function() {
    function EntityT(_io, _parent, _root, index) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this.index = index;

      this._read();
    }
    EntityT.prototype._read = function() {
      this.entType = this._io.readU2be();
      this.ofsEntityData = this._io.readU2be();
    }
    Object.defineProperty(EntityT.prototype, 'getEntityData', {
      get: function() {
        if (this._m_getEntityData !== undefined)
          return this._m_getEntityData;
        if (this.ofsEntityData < this._root.header.lenEntityData) {
          var io = this._root.entityData._io;
          var _pos = io.pos;
          io.seek(this.ofsEntityData);
          switch (this.entType) {
          case 146:
            this._m_getEntityData = new EntityPolymoverT(io, this, this._root);
            break;
          default:
            this._m_getEntityData = new EntityGenericT(io, this, this._root);
            break;
          }
          io.seek(_pos);
        }
        return this._m_getEntityData;
      }
    });

    return EntityT;
  })();

  var ResourcesT = SlavedriverLevQuake.ResourcesT = (function() {
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

  var VertexT = SlavedriverLevQuake.VertexT = (function() {
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

  var HeaderT = SlavedriverLevQuake.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.unknown01 = this._io.readU4be();
      this.unknown02 = this._io.readU4be();
      this.numSectors = this._io.readU4be();
      this.numPlanes = this._io.readU4be();
      this.numVertices = this._io.readU4be();
      this.numQuads = this._io.readU4be();
      this.lenTileTextureData = this._io.readU4be();
      this.numTiles = this._io.readU4be();
      this.lenTileColorData = this._io.readU4be();
      this.numEntities = this._io.readU4be();
      this.lenEntityData = this._io.readU4be();
      this.numEntityPolylinks = this._io.readU4be();
      this.numEntityPolylinkData1Segments = this._io.readU4be();
      this.numEntityPolylinkData2Segments = this._io.readU4be();
      this.numUnknown = this._io.readU4be();
    }

    return HeaderT;
  })();

  var Resource0x34T = SlavedriverLevQuake.Resource0x34T = (function() {
    function Resource0x34T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Resource0x34T.prototype._read = function() {
      this.unknown0 = this._io.readU2be();
      this.bitmap = [];
      for (var i = 0; i < 1024; i++) {
        this.bitmap.push(this._io.readBitsIntBe(8));
      }
    }

    return Resource0x34T;
  })();

  var EntityPolymoverT = SlavedriverLevQuake.EntityPolymoverT = (function() {
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

  var LenAndUnknownT = SlavedriverLevQuake.LenAndUnknownT = (function() {
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

  var QuadT = SlavedriverLevQuake.QuadT = (function() {
    function QuadT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadT.prototype._read = function() {
      this.vertexIndices = [];
      for (var i = 0; i < 4; i++) {
        this.vertexIndices.push(this._io.readU1());
      }
      this.textureIndex = this._io.readU1();
    }

    return QuadT;
  })();

  var TextureT = SlavedriverLevQuake.TextureT = (function() {
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

  var PaletteEntryT = SlavedriverLevQuake.PaletteEntryT = (function() {
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

  var EntityPolylinkData1T = SlavedriverLevQuake.EntityPolylinkData1T = (function() {
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

  var EntityPolylinkData2T = SlavedriverLevQuake.EntityPolylinkData2T = (function() {
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

  var ResourceT = SlavedriverLevQuake.ResourceT = (function() {
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
      case 52:
        this.data = new Resource0x34T(this._io, this, this._root);
        break;
      case 106:
        this.data = new Resource0x6aT(this._io, this, this._root);
        break;
      case 108:
        this.data = new Resource0x6cT(this._io, this, this._root);
        break;
      }
    }

    return ResourceT;
  })();

  var TileT = SlavedriverLevQuake.TileT = (function() {
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
    Object.defineProperty(TileT.prototype, 'getColorData', {
      get: function() {
        if (this._m_getColorData !== undefined)
          return this._m_getColorData;
        var io = this._root.tileColorData._io;
        var _pos = io.pos;
        io.seek(this.ofsColorData);
        this._m_getColorData = [];
        for (var i = 0; i < ((this.width + 1) * (this.height + 1)); i++) {
          this._m_getColorData.push(io.readU1());
        }
        io.seek(_pos);
        return this._m_getColorData;
      }
    });
    Object.defineProperty(TileT.prototype, 'getTileTextureData', {
      get: function() {
        if (this._m_getTileTextureData !== undefined)
          return this._m_getTileTextureData;
        var io = this._root.tileTextureData._io;
        var _pos = io.pos;
        io.seek(this.ofsTextureData);
        this._m_getTileTextureData = [];
        for (var i = 0; i < ((this.height * this.width) * 2); i++) {
          this._m_getTileTextureData.push(io.readU1());
        }
        io.seek(_pos);
        return this._m_getTileTextureData;
      }
    });

    return TileT;
  })();

  var EntityPolylinkT = SlavedriverLevQuake.EntityPolylinkT = (function() {
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
    Object.defineProperty(EntityPolylinkT.prototype, 'getdata1', {
      get: function() {
        if (this._m_getdata1 !== undefined)
          return this._m_getdata1;
        var io = this._root.entityPolylinkData1._io;
        var _pos = io.pos;
        io.seek((this.ofsEntityPolylinkData1[0] * 2));
        this._m_getdata1 = [];
        for (var i = 0; i < (((this.ofsEntityPolylinkData1[1] - this.ofsEntityPolylinkData1[0]) + 1) * 2); i++) {
          this._m_getdata1.push(io.readU1());
        }
        io.seek(_pos);
        return this._m_getdata1;
      }
    });
    Object.defineProperty(EntityPolylinkT.prototype, 'getdata2', {
      get: function() {
        if (this._m_getdata2 !== undefined)
          return this._m_getdata2;
        var io = this._root.entityPolylinkData2._io;
        var _pos = io.pos;
        io.seek((this.ofsEntityPolylinkData2[0] * 4));
        this._m_getdata2 = [];
        for (var i = 0; i < (((this.ofsEntityPolylinkData2[1] - this.ofsEntityPolylinkData2[0]) + 1) * 4); i++) {
          this._m_getdata2.push(io.readU1());
        }
        io.seek(_pos);
        return this._m_getdata2;
      }
    });

    return EntityPolylinkT;
  })();

  var PlaneT = SlavedriverLevQuake.PlaneT = (function() {
    function PlaneT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PlaneT.prototype._read = function() {
      this.vertexIndices = [];
      for (var i = 0; i < 4; i++) {
        this.vertexIndices.push(this._io.readU2be());
      }
      this.sectorIndex = this._io.readU2be();
      this.flags = this._io.readU2be();
      this.collisionFlags = this._io.readU2be();
      this.tileIndex = this._io.readU2be();
      this.unknownIndex = this._io.readU2be();
      this.quadStartIndex = this._io.readU2be();
      this.quadEndIndex = this._io.readU2be();
      this.vertexStartIndex = this._io.readU2be();
      this.vertexEndIndex = this._io.readU2be();
      this.normal = [];
      for (var i = 0; i < 3; i++) {
        this.normal.push(this._io.readS2be());
      }
      this.distance = this._io.readS2be();
      this.angle = this._io.readS2be();
      this.reserved = [];
      for (var i = 0; i < 2; i++) {
        this.reserved.push(this._io.readU2be());
      }
    }

    return PlaneT;
  })();

  var SkyBitmapT = SlavedriverLevQuake.SkyBitmapT = (function() {
    function SkyBitmapT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SkyBitmapT.prototype._read = function() {
      this.image = this._io.readBytes(2048);
    }

    return SkyBitmapT;
  })();

  var EntityGenericT = SlavedriverLevQuake.EntityGenericT = (function() {
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

  var Resource0x6aT = SlavedriverLevQuake.Resource0x6aT = (function() {
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

  var SkyDataT = SlavedriverLevQuake.SkyDataT = (function() {
    function SkyDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SkyDataT.prototype._read = function() {
      this.palette = [];
      for (var i = 0; i < 16; i++) {
        this.palette.push(new PaletteEntryT(this._io, this, this._root));
      }
      this.bitmaps = [];
      for (var i = 0; i < 64; i++) {
        this.bitmaps.push(new SkyBitmapT(this._io, this, this._root));
      }
    }

    return SkyDataT;
  })();

  var TileColorDataT = SlavedriverLevQuake.TileColorDataT = (function() {
    function TileColorDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TileColorDataT.prototype._read = function() {
      this.data = this._io.readBytes(this._parent.header.lenTileColorData);
    }

    return TileColorDataT;
  })();

  return SlavedriverLevQuake;
})();
return SlavedriverLevQuake;
}));
