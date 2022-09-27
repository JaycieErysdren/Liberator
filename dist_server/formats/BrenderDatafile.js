// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.BrenderDatafile = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * @see fw/formats.h
 */

var BrenderDatafile = (function() {
  function BrenderDatafile(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BrenderDatafile.prototype._read = function() {
    this.chunks = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.chunks.push(new BrDatafileChunkT(this._io, this, this._root));
      i++;
    }
  }

  var BrVertexIndexT = BrenderDatafile.BrVertexIndexT = (function() {
    function BrVertexIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrVertexIndexT.prototype._read = function() {
      this.numVertices = this._io.readU4be();
      this.vertices = [];
      for (var i = 0; i < this.numVertices; i++) {
        this.vertices.push(new BrVertexT(this._io, this, this._root));
      }
    }

    return BrVertexIndexT;
  })();

  var BrPixelmapNewT = BrenderDatafile.BrPixelmapNewT = (function() {
    function BrPixelmapNewT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrPixelmapNewT.prototype._read = function() {
      this.bitmapType = this._io.readBitsIntBe(8);
      this._io.alignToByte();
      this.rowBytes = this._io.readU2be();
      this.width = this._io.readU2be();
      this.height = this._io.readU2be();
      this.originX = this._io.readU2be();
      this.originY = this._io.readU2be();
      this.mipOffset = this._io.readU2be();
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrPixelmapNewT;
  })();

  var BrFaceIndexT = BrenderDatafile.BrFaceIndexT = (function() {
    function BrFaceIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrFaceIndexT.prototype._read = function() {
      this.numFaces = this._io.readU4be();
      this.faces = [];
      for (var i = 0; i < this.numFaces; i++) {
        this.faces.push(new BrFaceT(this._io, this, this._root));
      }
    }

    return BrFaceIndexT;
  })();

  var BrDatafileChunkT = BrenderDatafile.BrDatafileChunkT = (function() {
    function BrDatafileChunkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrDatafileChunkT.prototype._read = function() {
      this.type = this._io.readU4be();
      if (this.type < 65536) {
        this.lenData = this._io.readU4be();
      }
      switch (this.type) {
      case 61:
        this.data = new BrPixelmapNewT(this._io, this, this._root);
        break;
      case 0:
        this.data = new BrTerminatorT(this._io, this, this._root);
        break;
      case 24:
        this.data = new BrUvIndexT(this._io, this, this._root);
        break;
      case 35:
        this.data = new BrActorT(this._io, this, this._root);
        break;
      case 3:
        this.data = new BrPixelmapT(this._io, this, this._root);
        break;
      case 33:
        this.data = new BrPixelsT(this._io, this, this._root);
        break;
      case 23:
        this.data = new BrVertexIndexT(this._io, this, this._root);
        break;
      case 53:
        this.data = new BrFaceIndexT(this._io, this, this._root);
        break;
      case 36:
        this.data = new BrActorModelT(this._io, this, this._root);
        break;
      case 18:
        this.data = new BrFileIndexT(this._io, this, this._root);
        break;
      case 26:
        this.data = new BrFaceMaterialIndexT(this._io, this, this._root);
        break;
      case 54:
        this.data = new BrModelT(this._io, this, this._root);
        break;
      case 22:
        this.data = new BrMaterialIndexT(this._io, this, this._root);
        break;
      default:
        this.data = new BrUnknownT(this._io, this, this._root);
        break;
      }
    }

    return BrDatafileChunkT;
  })();

  var BrMaterialIndexT = BrenderDatafile.BrMaterialIndexT = (function() {
    function BrMaterialIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrMaterialIndexT.prototype._read = function() {
      this.numMaterials = this._io.readU4be();
      this.materials = [];
      for (var i = 0; i < this.numMaterials; i++) {
        this.materials.push(new BrMaterialT(this._io, this, this._root));
      }
    }

    return BrMaterialIndexT;
  })();

  var BrUnknownT = BrenderDatafile.BrUnknownT = (function() {
    function BrUnknownT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrUnknownT.prototype._read = function() {
      this.data = this._io.readBytes(this._parent.lenData);
    }

    return BrUnknownT;
  })();

  var BrFaceT = BrenderDatafile.BrFaceT = (function() {
    function BrFaceT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrFaceT.prototype._read = function() {
      this.vertexIndices = [];
      for (var i = 0; i < 3; i++) {
        this.vertexIndices.push(this._io.readU2be());
      }
      this.smoothing = this._io.readU2be();
      this.flags = this._io.readU1();
    }

    return BrFaceT;
  })();

  var BrPixelmapT = BrenderDatafile.BrPixelmapT = (function() {
    function BrPixelmapT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrPixelmapT.prototype._read = function() {
      this.bitmapType = this._io.readBitsIntBe(8);
      this._io.alignToByte();
      this.rowBytes = this._io.readU2be();
      this.width = this._io.readU2be();
      this.height = this._io.readU2be();
      this.originX = this._io.readU2be();
      this.originY = this._io.readU2be();
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrPixelmapT;
  })();

  var BrFileIndexT = BrenderDatafile.BrFileIndexT = (function() {
    function BrFileIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrFileIndexT.prototype._read = function() {
      this.type = this._io.readU4be();
      this.version = this._io.readU4be();
    }

    return BrFileIndexT;
  })();

  var BrUvT = BrenderDatafile.BrUvT = (function() {
    function BrUvT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrUvT.prototype._read = function() {
      this.u = this._io.readF4be();
      this.v = this._io.readF4be();
    }

    return BrUvT;
  })();

  var BrPixelsT = BrenderDatafile.BrPixelsT = (function() {
    function BrPixelsT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrPixelsT.prototype._read = function() {
      this.numPixels = this._io.readU4be();
      this.lenPixel = this._io.readU4be();
      if (this.lenPixel == 1) {
        this.dataPaletted = [];
        for (var i = 0; i < (this.lenPixel * this.numPixels); i++) {
          this.dataPaletted.push(this._io.readU1());
        }
      }
      if (this.lenPixel == 2) {
        this.dataDepth = [];
        for (var i = 0; i < Math.floor((this.lenPixel * this.numPixels) / 2); i++) {
          this.dataDepth.push(this._io.readU2be());
        }
      }
      if (this.lenPixel == 4) {
        this.dataRgb = [];
        for (var i = 0; i < Math.floor((this.lenPixel * this.numPixels) / 4); i++) {
          this.dataRgb.push(new RgbT(this._io, this, this._root));
        }
      }
    }

    return BrPixelsT;
  })();

  var BrActorModelT = BrenderDatafile.BrActorModelT = (function() {
    function BrActorModelT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrActorModelT.prototype._read = function() {
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrActorModelT;
  })();

  var BrVertexT = BrenderDatafile.BrVertexT = (function() {
    function BrVertexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrVertexT.prototype._read = function() {
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readF4be());
      }
    }

    return BrVertexT;
  })();

  var BrActorT = BrenderDatafile.BrActorT = (function() {
    function BrActorT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrActorT.prototype._read = function() {
      this.actorType = this._io.readU1();
      this.renderStyle = this._io.readU1();
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrActorT;
  })();

  var BrFaceMaterialIndexT = BrenderDatafile.BrFaceMaterialIndexT = (function() {
    function BrFaceMaterialIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrFaceMaterialIndexT.prototype._read = function() {
      this.numFaceMaterials = this._io.readU4be();
      this.lenFaceMaterial = this._io.readU4be();
      this.faceMaterials = [];
      for (var i = 0; i < this.numFaceMaterials; i++) {
        this.faceMaterials.push(this._io.readU2be());
      }
    }

    return BrFaceMaterialIndexT;
  })();

  var BrMaterialT = BrenderDatafile.BrMaterialT = (function() {
    function BrMaterialT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrMaterialT.prototype._read = function() {
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrMaterialT;
  })();

  var BrModelT = BrenderDatafile.BrModelT = (function() {
    function BrModelT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrModelT.prototype._read = function() {
      this.flags = this._io.readU2be();
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
    }

    return BrModelT;
  })();

  var BrUvIndexT = BrenderDatafile.BrUvIndexT = (function() {
    function BrUvIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrUvIndexT.prototype._read = function() {
      this.numUvs = this._io.readU4be();
      this.uvs = [];
      for (var i = 0; i < this.numUvs; i++) {
        this.uvs.push(new BrUvT(this._io, this, this._root));
      }
    }

    return BrUvIndexT;
  })();

  var RgbT = BrenderDatafile.RgbT = (function() {
    function RgbT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RgbT.prototype._read = function() {
      this.a = this._io.readU1();
      this.r = this._io.readU1();
      this.g = this._io.readU1();
      this.b = this._io.readU1();
    }

    return RgbT;
  })();

  var BrTerminatorT = BrenderDatafile.BrTerminatorT = (function() {
    function BrTerminatorT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BrTerminatorT.prototype._read = function() {
    }

    return BrTerminatorT;
  })();

  return BrenderDatafile;
})();
return BrenderDatafile;
}));
