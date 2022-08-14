// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.ValveRmf = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Valve Software VPK (versions 1 and 2)
 * @see src_main/worldcraft/mapdoc.cpp
 */

var ValveRmf = (function() {
  function ValveRmf(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  ValveRmf.prototype._read = function() {
    this.version = this._io.readF4le();
    this.identifier = KaitaiStream.bytesToStr(this._io.readBytes(3), "ascii");
    this.numVisgroups = this._io.readU4le();
    this.visgroups = [];
    for (var i = 0; i < this.numVisgroups; i++) {
      this.visgroups.push(new VisgroupT(this._io, this, this._root));
    }
    this.world = new WorldT(this._io, this, this._root);
    this.docinfo = new DocinfoT(this._io, this, this._root);
  }

  var WorldT = ValveRmf.WorldT = (function() {
    function WorldT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    WorldT.prototype._read = function() {
      this.lenIdentifier = this._io.readU1();
      this.identifier = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenIdentifier), 0, false), "ascii");
      this.un1 = this._io.readBytes(7);
      this.numObjects = this._io.readU4le();
      this.objects = [];
      for (var i = 0; i < this.numObjects; i++) {
        this.objects.push(new ObjectT(this._io, this, this._root));
      }
      this.lenClassname = this._io.readU1();
      this.classname = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenClassname), 0, false), "ascii");
      this.un2 = this._io.readBytes(4);
      this.flags = this._io.readU4le();
      this.numKeyValuePairs = this._io.readU4le();
      this.keyValuePairs = [];
      for (var i = 0; i < this.numKeyValuePairs; i++) {
        this.keyValuePairs.push(new CMapKeyValuePair(this._io, this, this._root));
      }
      this.un3 = this._io.readBytes(12);
      this.numPaths = this._io.readU4le();
      this.paths = [];
      for (var i = 0; i < this.numPaths; i++) {
        this.paths.push(new PathT(this._io, this, this._root));
      }
    }

    return WorldT;
  })();

  var CornerT = ValveRmf.CornerT = (function() {
    function CornerT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CornerT.prototype._read = function() {
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readF4le());
      }
      this.index = this._io.readU4le();
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(128), 0, false), "ascii");
      this.numKeyValuePairs = this._io.readU4le();
      this.keyValuePairs = [];
      for (var i = 0; i < this.numKeyValuePairs; i++) {
        this.keyValuePairs.push(new CMapKeyValuePair(this._io, this, this._root));
      }
    }

    return CornerT;
  })();

  var CameraT = ValveRmf.CameraT = (function() {
    function CameraT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CameraT.prototype._read = function() {
      this.eyePos = [];
      for (var i = 0; i < 3; i++) {
        this.eyePos.push(this._io.readF4le());
      }
      this.lookPos = [];
      for (var i = 0; i < 3; i++) {
        this.lookPos.push(this._io.readF4le());
      }
    }

    return CameraT;
  })();

  var CMapSolidT = ValveRmf.CMapSolidT = (function() {
    function CMapSolidT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapSolidT.prototype._read = function() {
      this.visgroupIndex = this._io.readU4le();
      this.color = new ColorT(this._io, this, this._root);
      this.un1 = this._io.readBytes(4);
      this.numFaces = this._io.readU4le();
      this.faces = [];
      for (var i = 0; i < this.numFaces; i++) {
        this.faces.push(new CMapFaceT(this._io, this, this._root));
      }
    }

    return CMapSolidT;
  })();

  var CMapTexture33T = ValveRmf.CMapTexture33T = (function() {
    function CMapTexture33T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapTexture33T.prototype._read = function() {
      this.textureName = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(256), 0, false), "ascii");
      this.un1 = this._io.readF4le();
      this.u = [];
      for (var i = 0; i < 3; i++) {
        this.u.push(this._io.readF4le());
      }
      this.shiftX = this._io.readF4le();
      this.v = [];
      for (var i = 0; i < 3; i++) {
        this.v.push(this._io.readF4le());
      }
      this.shiftY = this._io.readF4le();
      this.rotation = this._io.readF4le();
      this.scale = [];
      for (var i = 0; i < 2; i++) {
        this.scale.push(this._io.readF4le());
      }
      this.un2 = this._io.readBytes(16);
    }

    return CMapTexture33T;
  })();

  var PathT = ValveRmf.PathT = (function() {
    function PathT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PathT.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(128), 0, false), "ascii");
      this.classname = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(128), 0, false), "ascii");
      this.type = this._io.readU4le();
      this.numCorners = this._io.readU4le();
      this.corners = [];
      for (var i = 0; i < this.numCorners; i++) {
        this.corners.push(new CornerT(this._io, this, this._root));
      }
    }

    return PathT;
  })();

  var DocinfoT = ValveRmf.DocinfoT = (function() {
    function DocinfoT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DocinfoT.prototype._read = function() {
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytes(8), "ascii");
      this.cameraVersion = this._io.readF4le();
      this.activeCameraIndex = this._io.readU4le();
      this.numCameras = this._io.readU4le();
      this.cameras = [];
      for (var i = 0; i < this.numCameras; i++) {
        this.cameras.push(new CameraT(this._io, this, this._root));
      }
    }

    return DocinfoT;
  })();

  var CMapTexture21T = ValveRmf.CMapTexture21T = (function() {
    function CMapTexture21T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapTexture21T.prototype._read = function() {
      this.textureName = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(256), 0, false), "ascii");
      this.rotation = this._io.readF4le();
      this.un1 = this._io.readF4le();
      this.shift = [];
      for (var i = 0; i < 2; i++) {
        this.shift.push(this._io.readF4le());
      }
      this.scale = [];
      for (var i = 0; i < 2; i++) {
        this.scale.push(this._io.readF4le());
      }
      this.unknown = this._io.readBytes(16);
    }

    return CMapTexture21T;
  })();

  var CMapFaceT = ValveRmf.CMapFaceT = (function() {
    function CMapFaceT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapFaceT.prototype._read = function() {
      if (this._root.version < 2.2) {
        this.texInfo21 = new CMapTexture21T(this._io, this, this._root);
      }
      if (this._root.version > 2.1) {
        this.texInfo33 = new CMapTexture33T(this._io, this, this._root);
      }
      this.numVertices = this._io.readU4le();
      this.vertices = [];
      for (var i = 0; i < this.numVertices; i++) {
        this.vertices.push(new CMapVertexT(this._io, this, this._root));
      }
      this.plane = [];
      for (var i = 0; i < 3; i++) {
        this.plane.push(new CMapVertexT(this._io, this, this._root));
      }
    }

    return CMapFaceT;
  })();

  var CMapEntityT = ValveRmf.CMapEntityT = (function() {
    function CMapEntityT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapEntityT.prototype._read = function() {
      this.visgroupIndex = this._io.readU4le();
      this.color = new ColorT(this._io, this, this._root);
      this.numObjects = this._io.readU4le();
      this.objects = [];
      for (var i = 0; i < this.numObjects; i++) {
        this.objects.push(new ObjectT(this._io, this, this._root));
      }
      this.lenClassname = this._io.readU1();
      this.classname = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenClassname), 0, false), "ascii");
      this.un1 = this._io.readBytes(4);
      this.flags = this._io.readU4le();
      this.numKeyValuePairs = this._io.readU4le();
      this.keyValuePairs = [];
      for (var i = 0; i < this.numKeyValuePairs; i++) {
        this.keyValuePairs.push(new CMapKeyValuePair(this._io, this, this._root));
      }
      this.un2 = this._io.readBytes(30);
    }

    return CMapEntityT;
  })();

  var VisgroupT = ValveRmf.VisgroupT = (function() {
    function VisgroupT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VisgroupT.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(128), 0, false), "ascii");
      this.color = new ColorT(this._io, this, this._root);
      this.padding1 = this._io.readBytes(1);
      this.index = this._io.readU4le();
      this.visibility = this._io.readU1();
      this.padding2 = this._io.readBytes(3);
    }

    return VisgroupT;
  })();

  var CMapGroupT = ValveRmf.CMapGroupT = (function() {
    function CMapGroupT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapGroupT.prototype._read = function() {
      this.visgroupIndex = this._io.readU4le();
      this.color = new ColorT(this._io, this, this._root);
      this.numObjects = this._io.readU4le();
      this.objects = [];
      for (var i = 0; i < this.numObjects; i++) {
        this.objects.push(new ObjectT(this._io, this, this._root));
      }
    }

    return CMapGroupT;
  })();

  var CMapVertexT = ValveRmf.CMapVertexT = (function() {
    function CMapVertexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapVertexT.prototype._read = function() {
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readF4le());
      }
    }

    return CMapVertexT;
  })();

  var ColorT = ValveRmf.ColorT = (function() {
    function ColorT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorT.prototype._read = function() {
      this.r = this._io.readU1();
      this.g = this._io.readU1();
      this.b = this._io.readU1();
    }

    return ColorT;
  })();

  var CMapKeyValuePair = ValveRmf.CMapKeyValuePair = (function() {
    function CMapKeyValuePair(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CMapKeyValuePair.prototype._read = function() {
      this.lenKey = this._io.readU1();
      this.key = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenKey), 0, false), "ascii");
      this.lenValue = this._io.readU1();
      this.value = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenValue), 0, false), "ascii");
    }

    return CMapKeyValuePair;
  })();

  var ObjectT = ValveRmf.ObjectT = (function() {
    function ObjectT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ObjectT.prototype._read = function() {
      this.lenIdentifier = this._io.readU1();
      this.identifier = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(this.lenIdentifier), 0, false), "ascii");
      switch (this.identifier) {
      case "CMapSolid":
        this.data = new CMapSolidT(this._io, this, this._root);
        break;
      case "CMapEntity":
        this.data = new CMapEntityT(this._io, this, this._root);
        break;
      case "CMapGroup":
        this.data = new CMapGroupT(this._io, this, this._root);
        break;
      }
    }

    return ObjectT;
  })();

  return ValveRmf;
})();
return ValveRmf;
}));
