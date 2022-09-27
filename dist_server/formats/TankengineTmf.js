// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.TankengineTmf = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var TankengineTmf = (function() {
  function TankengineTmf(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  TankengineTmf.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
    this.textures = [];
    for (var i = 0; i < this.header.numTextures; i++) {
      this.textures.push(new TextureT(this._io, this, this._root));
    }
    this.meshes = [];
    for (var i = 0; i < this.header.numMeshes; i++) {
      this.meshes.push(new MeshT(this._io, this, this._root));
    }
  }

  var MeshHeaderT = TankengineTmf.MeshHeaderT = (function() {
    function MeshHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MeshHeaderT.prototype._read = function() {
      this.numVertices = this._io.readU2be();
      this.numQuads = this._io.readU2be();
    }

    return MeshHeaderT;
  })();

  var VertexT = TankengineTmf.VertexT = (function() {
    function VertexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VertexT.prototype._read = function() {
      this.coords = [];
      for (var i = 0; i < 3; i++) {
        this.coords.push(this._io.readS4be());
      }
    }

    return VertexT;
  })();

  var HeaderT = TankengineTmf.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.type = this._io.readS1();
      this.numTextures = this._io.readS1();
      this.numMeshes = this._io.readS1();
      this.reserved = [];
      for (var i = 0; i < 5; i++) {
        this.reserved.push(this._io.readS1());
      }
    }

    return HeaderT;
  })();

  var MeshT = TankengineTmf.MeshT = (function() {
    function MeshT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MeshT.prototype._read = function() {
      this.header = new MeshHeaderT(this._io, this, this._root);
      this.vertices = [];
      for (var i = 0; i < this.header.numVertices; i++) {
        this.vertices.push(new VertexT(this._io, this, this._root));
      }
      this.quads = [];
      for (var i = 0; i < this.header.numQuads; i++) {
        this.quads.push(new QuadT(this._io, this, this._root));
      }
    }

    return MeshT;
  })();

  var QuadT = TankengineTmf.QuadT = (function() {
    function QuadT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadT.prototype._read = function() {
      this.normal = [];
      for (var i = 0; i < 3; i++) {
        this.normal.push(this._io.readS4be());
      }
      this.vertexIndices = [];
      for (var i = 0; i < 4; i++) {
        this.vertexIndices.push(this._io.readU2be());
      }
      this.flags = this._io.readU1();
      this.textureId = this._io.readU1();
      this.reserved = [];
      for (var i = 0; i < 2; i++) {
        this.reserved.push(this._io.readU1());
      }
    }

    return QuadT;
  })();

  var TextureT = TankengineTmf.TextureT = (function() {
    function TextureT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextureT.prototype._read = function() {
      this.filename = KaitaiStream.bytesToStr(this._io.readBytes(13), "ASCII");
      this.color = [];
      for (var i = 0; i < 3; i++) {
        this.color.push(this._io.readS1());
      }
    }

    return TextureT;
  })();

  return TankengineTmf;
})();
return TankengineTmf;
}));
