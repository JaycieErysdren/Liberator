// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.IdPak = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * id Software PAK
 * @see {@link https://quakewiki.org/wiki/.pak|Source}
 */

var IdPak = (function() {
  function IdPak(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  IdPak.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
  }

  var HeaderT = IdPak.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.magic = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.magic, [80, 65, 67, 75]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([80, 65, 67, 75], this.magic, this._io, "/types/header_t/seq/0");
      }
      this.ofsFileTable = this._io.readU4le();
      this.lenFileTable = this._io.readU4le();
    }

    return HeaderT;
  })();

  var FileTableT = IdPak.FileTableT = (function() {
    function FileTableT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FileTableT.prototype._read = function() {
      this.filepath = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
    }
    Object.defineProperty(FileTableT.prototype, 'ofsFileData', {
      get: function() {
        if (this._m_ofsFileData !== undefined)
          return this._m_ofsFileData;
        var _pos = this._io.pos;
        this._io.seek(56);
        this._m_ofsFileData = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_ofsFileData;
      }
    });
    Object.defineProperty(FileTableT.prototype, 'lenFileData', {
      get: function() {
        if (this._m_lenFileData !== undefined)
          return this._m_lenFileData;
        var _pos = this._io.pos;
        this._io.seek(60);
        this._m_lenFileData = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_lenFileData;
      }
    });

    return FileTableT;
  })();
  Object.defineProperty(IdPak.prototype, 'getFileTable', {
    get: function() {
      if (this._m_getFileTable !== undefined)
        return this._m_getFileTable;
      var _pos = this._io.pos;
      this._io.seek(this.header.ofsFileTable);
      this._raw__m_getFileTable = [];
      this._m_getFileTable = [];
      for (var i = 0; i < Math.floor(this.header.lenFileTable / 64); i++) {
        this._raw__m_getFileTable.push(this._io.readBytes(64));
        var _io__raw__m_getFileTable = new KaitaiStream(this._raw__m_getFileTable[i]);
        this._m_getFileTable.push(new FileTableT(_io__raw__m_getFileTable, this, this._root));
      }
      this._io.seek(_pos);
      return this._m_getFileTable;
    }
  });

  return IdPak;
})();
return IdPak;
}));
