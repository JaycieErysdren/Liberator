// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.VolitionVpp = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Volition VPP
 * @see {@link https://github.com/gibbed/Gibbed.Volition/tree/master/projects/Gibbed.Volition.FileFormats|Source}
 */

var VolitionVpp = (function() {
  function VolitionVpp(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  VolitionVpp.prototype._read = function() {
    this.magic = this._io.readBytes(4);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [206, 10, 137, 81]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([206, 10, 137, 81], this.magic, this._io, "/seq/0");
    }
    this.version = this._io.readU4le();
    switch (this.version) {
    case 3:
      this.header = new Headerv3T(this._io, this, this._root);
      break;
    }
    this._raw_directories = this._io.readBytes(2048);
    var _io__raw_directories = new KaitaiStream(this._raw_directories);
    this.directories = new DirectoriesT(_io__raw_directories, this, this._root);
    this._raw_names = this._io.readBytes(2048);
    var _io__raw_names = new KaitaiStream(this._raw_names);
    this.names = new NamesT(_io__raw_names, this, this._root);
    this._raw_data = this._io.readBytesFull();
    var _io__raw_data = new KaitaiStream(this._raw_data);
    this.data = new DataT(_io__raw_data, this, this._root);
  }

  var DirectoriesT = VolitionVpp.DirectoriesT = (function() {
    function DirectoriesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DirectoriesT.prototype._read = function() {
      this.entries = [];
      for (var i = 0; i < this._root.header.numDirectories; i++) {
        this.entries.push(new DirectoryT(this._io, this, this._root));
      }
    }

    return DirectoriesT;
  })();

  var DataT = VolitionVpp.DataT = (function() {
    function DataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DataT.prototype._read = function() {
      this.data = this._io.readBytesFull();
    }

    return DataT;
  })();

  var DirectoryT = VolitionVpp.DirectoryT = (function() {
    function DirectoryT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DirectoryT.prototype._read = function() {
      this.ofsName = this._io.readU4le();
      this.ofsRuntime = this._io.readU4le();
      this.ofsData = this._io.readU4le();
      this.nameHash = this._io.readU4le();
      this.uncompressedSize = this._io.readU4le();
      this.compressedSize = this._io.readU4le();
      this.ptrPackage = this._io.readU4le();
    }
    Object.defineProperty(DirectoryT.prototype, 'data', {
      get: function() {
        if (this._m_data !== undefined)
          return this._m_data;
        var io = this._root.data._io;
        var _pos = io.pos;
        io.seek(this.ofsData);
        this._m_data = io.readBytes(this.uncompressedSize);
        io.seek(_pos);
        return this._m_data;
      }
    });
    Object.defineProperty(DirectoryT.prototype, 'name', {
      get: function() {
        if (this._m_name !== undefined)
          return this._m_name;
        var io = this._root.names._io;
        var _pos = io.pos;
        io.seek(this.ofsName);
        this._m_name = KaitaiStream.bytesToStr(io.readBytesTerm(0, false, true, true), "ascii");
        io.seek(_pos);
        return this._m_name;
      }
    });

    return DirectoryT;
  })();

  var NamesT = VolitionVpp.NamesT = (function() {
    function NamesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NamesT.prototype._read = function() {
      this.data = this._io.readBytes(this._root.header.lenNames);
    }

    return NamesT;
  })();

  var Headerv3T = VolitionVpp.Headerv3T = (function() {
    function Headerv3T(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Headerv3T.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(this._io.readBytes(65), "ascii");
      this.path = KaitaiStream.bytesToStr(this._io.readBytes(256), "ascii");
      this.padding1 = this._io.readBytes(3);
      this.flags = this._io.readU4le();
      this.un1 = this._io.readU4le();
      this.numDirectories = this._io.readU4le();
      this.lenPackage = this._io.readU4le();
      this.lenDirectories = this._io.readU4le();
      this.lenNames = this._io.readU4le();
      this.uncompressedSize = this._io.readU4le();
      this.compressedSize = this._io.readU4le();
      this.ptrDirectories = this._io.readU4le();
      this.ptrNames = this._io.readU4le();
      this.ptrData = this._io.readU4le();
      this.padding2 = this._io.readBytes(1672);
    }

    return Headerv3T;
  })();

  return VolitionVpp;
})();
return VolitionVpp;
}));
