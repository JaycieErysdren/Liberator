// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.DescentPof = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var DescentPof = (function() {
  function DescentPof(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  DescentPof.prototype._read = function() {
    this.magic = this._io.readBytes(4);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [80, 83, 80, 79]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([80, 83, 80, 79], this.magic, this._io, "/seq/0");
    }
    this.version = this._io.readU2le();
    this.chunks = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.chunks.push(new PofChunkT(this._io, this, this._root));
      i++;
    }
  }

  var PofSubObjectHeaderT = DescentPof.PofSubObjectHeaderT = (function() {
    function PofSubObjectHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofSubObjectHeaderT.prototype._read = function() {
      this.index = this._io.readU2le();
      this.parents = this._io.readU2le();
      this.normals = [];
      for (var i = 0; i < 3; i++) {
        this.normals.push(this._io.readU4le());
      }
      this.points = [];
      for (var i = 0; i < 3; i++) {
        this.points.push(this._io.readU4le());
      }
      this.offsets = [];
      for (var i = 0; i < 3; i++) {
        this.offsets.push(this._io.readU4le());
      }
      this.radius = this._io.readU4le();
      this.ofsData = this._io.readU4le();
    }
    Object.defineProperty(PofSubObjectHeaderT.prototype, 'get', {
      get: function() {
        if (this._m_get !== undefined)
          return this._m_get;
        var io = this._root.chunks[-1]._io;
        var _pos = io.pos;
        io.seek(this.ofsData);
        this._m_get = io.readBytes(4);
        io.seek(_pos);
        return this._m_get;
      }
    });

    return PofSubObjectHeaderT;
  })();

  var PofChunkT = DescentPof.PofChunkT = (function() {
    function PofChunkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofChunkT.prototype._read = function() {
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytes(4), "ascii");
      this.lenData = this._io.readU4le();
      switch (this.identifier) {
      case "TXTR":
        this.data = new PofTexturesT(this._io, this, this._root);
        break;
      case "IDTA":
        this.data = new PofIdtaT(this._io, this, this._root);
        break;
      case "SOBJ":
        this.data = new PofSubObjectHeaderT(this._io, this, this._root);
        break;
      case "ANIM":
        this.data = new PofAnimationsT(this._io, this, this._root);
        break;
      case "OHDR":
        this.data = new PofObjectHeaderT(this._io, this, this._root);
        break;
      case "GUNS":
        this.data = new PofGunsT(this._io, this, this._root);
        break;
      }
    }

    return PofChunkT;
  })();

  var PofGunT = DescentPof.PofGunT = (function() {
    function PofGunT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofGunT.prototype._read = function() {
      this.id = this._io.readU2le();
      this.submodel = this._io.readU2le();
      this.points = [];
      for (var i = 0; i < 3; i++) {
        this.points.push(this._io.readU4le());
      }
      if (this._root.version >= 7) {
        this.direction = [];
        for (var i = 0; i < 3; i++) {
          this.direction.push(this._io.readU4le());
        }
      }
    }

    return PofGunT;
  })();

  var PofModelAnimationT = DescentPof.PofModelAnimationT = (function() {
    function PofModelAnimationT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofModelAnimationT.prototype._read = function() {
      this.frames = [];
      for (var i = 0; i < this._parent.numFrames; i++) {
        this.frames.push(this._io.readBytes(6));
      }
    }

    return PofModelAnimationT;
  })();

  var PofAnimationsT = DescentPof.PofAnimationsT = (function() {
    function PofAnimationsT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofAnimationsT.prototype._read = function() {
      this.numFrames = this._io.readU2le();
      this.modelAnimations = [];
      for (var i = 0; i < this._root.chunks[1].data.numModels; i++) {
        this.modelAnimations.push(new PofModelAnimationT(this._io, this, this._root));
      }
    }

    return PofAnimationsT;
  })();

  var PofObjectHeaderT = DescentPof.PofObjectHeaderT = (function() {
    function PofObjectHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofObjectHeaderT.prototype._read = function() {
      this.numModels = this._io.readU4le();
      this.radius = this._io.readU4le();
      this.minSizes = [];
      for (var i = 0; i < 3; i++) {
        this.minSizes.push(this._io.readU4le());
      }
      this.maxSize = [];
      for (var i = 0; i < 3; i++) {
        this.maxSize.push(this._io.readU4le());
      }
    }

    return PofObjectHeaderT;
  })();

  var PofGunsT = DescentPof.PofGunsT = (function() {
    function PofGunsT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofGunsT.prototype._read = function() {
      this.numGuns = this._io.readU4le();
      this.guns = [];
      for (var i = 0; i < this.numGuns; i++) {
        this.guns.push(new PofGunT(this._io, this, this._root));
      }
    }

    return PofGunsT;
  })();

  var PofTexturesT = DescentPof.PofTexturesT = (function() {
    function PofTexturesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofTexturesT.prototype._read = function() {
      this.numTextures = this._io.readU2le();
      this.textures = [];
      for (var i = 0; i < this.numTextures; i++) {
        this.textures.push(KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii"));
      }
    }

    return PofTexturesT;
  })();

  var PofIdtaT = DescentPof.PofIdtaT = (function() {
    function PofIdtaT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PofIdtaT.prototype._read = function() {
      this.data = this._io.readBytesFull();
    }

    return PofIdtaT;
  })();

  return DescentPof;
})();
return DescentPof;
}));
