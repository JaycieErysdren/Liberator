// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Ms3dmm3th = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var Ms3dmm3th = (function() {
  function Ms3dmm3th(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Ms3dmm3th.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
    this.quadData = this._io.readBytes((this.header.ofsIndex - 32));
    this.index = new IndexT(this._io, this, this._root);
    this.quadDefs = [];
    for (var i = 0; i < this.index.numQuads; i++) {
      this.quadDefs.push(new QuadT(this._io, this, this._root));
    }
    this.quadIndex = [];
    for (var i = 0; i < this.index.numQuads; i++) {
      this.quadIndex.push(new QuadIndexT(this._io, this, this._root));
    }
  }

  var QuadIndexT = Ms3dmm3th.QuadIndexT = (function() {
    function QuadIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadIndexT.prototype._read = function() {
      this.quadOffset = this._io.readU4le();
      this.lenQuad = this._io.readU4le();
    }

    return QuadIndexT;
  })();

  var IndexT = Ms3dmm3th.IndexT = (function() {
    function IndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    IndexT.prototype._read = function() {
      this.marker = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.marker, [1, 0, 3, 3]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([1, 0, 3, 3], this.marker, this._io, "/types/index_t/seq/0");
      }
      this.numQuads = this._io.readU4le();
      this.lenQuads = this._io.readU4le();
      this.unknown01 = this._io.readU4le();
      this.unknown02 = this._io.readU4le();
    }

    return IndexT;
  })();

  var HeaderT = Ms3dmm3th.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.identifier = KaitaiStream.bytesToStr(this._io.readBytes(8), "ASCII");
      this.version = this._io.readU4le();
      this.marker = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.marker, [1, 0, 3, 3]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([1, 0, 3, 3], this.marker, this._io, "/types/header_t/seq/2");
      }
      this.lenFile = this._io.readU4le();
      this.ofsIndex = this._io.readU4le();
      this.lenIndex = this._io.readU4le();
      this.padding = this._io.readU4le();
    }

    return HeaderT;
  })();

  var QuadT = Ms3dmm3th.QuadT = (function() {
    function QuadT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadT.prototype._read = function() {
      this.type = KaitaiStream.bytesToStr(this._io.readBytes(4), "ASCII");
      this.identifier = this._io.readU4le();
      this.ofsSection = this._io.readU4le();
      if ( ((this.ofsSection > 0) && (this.ofsSection != 65536)) ) {
        this.references = new QuadReferencesT(this._io, this, this._root);
      }
    }

    return QuadT;
  })();

  var QuadReferencesT = Ms3dmm3th.QuadReferencesT = (function() {
    function QuadReferencesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    QuadReferencesT.prototype._read = function() {
      this.mode = this._io.readBitsIntLe(4);
      this._io.alignToByte();
      this.lenSection = this._io.readBytes(3);
      this.references = this._io.readU2le();
      this.referencesToThisQuad = this._io.readU2le();
    }

    return QuadReferencesT;
  })();

  return Ms3dmm3th;
})();
return Ms3dmm3th;
}));
