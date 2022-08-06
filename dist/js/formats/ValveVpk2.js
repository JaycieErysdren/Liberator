// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.ValveVpk2 = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Valve Software VPK2
 * @see {@link https://developer.valvesoftware.com/wiki/VPK_File_Format|Source}
 */

var ValveVpk2 = (function() {
  function ValveVpk2(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  ValveVpk2.prototype._read = function() {
    this.header = new HeaderT(this._io, this, this._root);
    this._raw_files = this._io.readBytes(this.header.lenDirectoryTree);
    var _io__raw_files = new KaitaiStream(this._raw_files);
    this.files = new FilesT(_io__raw_files, this, this._root);
    this.fileData = this._io.readBytes(this.header.vpk2Header.lenFileData);
    if (this.header.version > 1) {
      this.footer = new FooterT(this._io, this, this._root);
    }
  }

  var FooterT = ValveVpk2.FooterT = (function() {
    function FooterT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FooterT.prototype._read = function() {
      this.checksumsExternal = this._io.readBytes(this._root.header.vpk2Header.lenChecksumsExternal);
      this.checksumsInternal = new ChecksumInternalT(this._io, this, this._root);
      this.signature = this._io.readBytes(this._root.header.vpk2Header.lenSignature);
    }

    return FooterT;
  })();

  var TreeFilesT = ValveVpk2.TreeFilesT = (function() {
    function TreeFilesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TreeFilesT.prototype._read = function() {
      this.filename = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
      this.crc = this._io.readU4le();
      this.lenPreloadData = this._io.readU2le();
      this.archiveIndex = this._io.readU2le();
      this.ofsEntryData = this._io.readU4le();
      this.lenEntryData = this._io.readU4le();
      this.terminator = this._io.readBytes(2);
      if (!((KaitaiStream.byteArrayCompare(this.terminator, [255, 255]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([255, 255], this.terminator, this._io, "/types/tree_files_t/seq/6");
      }
      this.preloadData = this._io.readBytes(this.lenPreloadData);
    }

    return TreeFilesT;
  })();

  var HeaderT = ValveVpk2.HeaderT = (function() {
    function HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HeaderT.prototype._read = function() {
      this.magic = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.magic, [52, 18, 170, 85]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([52, 18, 170, 85], this.magic, this._io, "/types/header_t/seq/0");
      }
      this.version = this._io.readU4le();
      this.lenDirectoryTree = this._io.readU4le();
      if (this.version > 1) {
        this.vpk2Header = new Vpk2HeaderT(this._io, this, this._root);
      }
    }

    return HeaderT;
  })();

  var FilesT = ValveVpk2.FilesT = (function() {
    function FilesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FilesT.prototype._read = function() {
      this.treeExtensions = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.treeExtensions.push(new TreeExtensionsT(this._io, this, this._root));
        i++;
      }
    }

    return FilesT;
  })();

  var TreeExtensionsT = ValveVpk2.TreeExtensionsT = (function() {
    function TreeExtensionsT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TreeExtensionsT.prototype._read = function() {
      this.extension = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
      this._raw_treeDirectories = [];
      this.treeDirectories = [];
      var i = 0;
      while (!this._io.isEof()) {
        this._raw_treeDirectories.push(this._io.readBytesTerm(0, false, true, true));
        var _io__raw_treeDirectories = new KaitaiStream(this._raw_treeDirectories[this._raw_treeDirectories.length - 1]);
        this.treeDirectories.push(new TreeDirectoriesT(_io__raw_treeDirectories, this, this._root));
        i++;
      }
    }

    return TreeExtensionsT;
  })();

  var ChecksumExternalT = ValveVpk2.ChecksumExternalT = (function() {
    function ChecksumExternalT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChecksumExternalT.prototype._read = function() {
      this.archiveIndex = this._io.readU4le();
      this.ofsChecksum = this._io.readU4le();
      this.lenChecksum = this._io.readU4le();
      this.checksum = this._io.readBytes(16);
    }

    return ChecksumExternalT;
  })();

  var ChecksumsExternalT = ValveVpk2.ChecksumsExternalT = (function() {
    function ChecksumsExternalT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChecksumsExternalT.prototype._read = function() {
      this.entries = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.entries.push(new ChecksumExternalT(this._io, this, this._root));
        i++;
      }
    }

    return ChecksumsExternalT;
  })();

  var TreeDirectoriesT = ValveVpk2.TreeDirectoriesT = (function() {
    function TreeDirectoriesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TreeDirectoriesT.prototype._read = function() {
      this.directory = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
      this.treeFiles = new TreeFilesT(this._io, this, this._root);
    }

    return TreeDirectoriesT;
  })();

  var ChecksumInternalT = ValveVpk2.ChecksumInternalT = (function() {
    function ChecksumInternalT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChecksumInternalT.prototype._read = function() {
      this.treeChecksum = this._io.readBytes(16);
      this.externalChecksum = this._io.readBytes(16);
      this.unknown = this._io.readBytes(16);
    }

    return ChecksumInternalT;
  })();

  var Vpk2HeaderT = ValveVpk2.Vpk2HeaderT = (function() {
    function Vpk2HeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Vpk2HeaderT.prototype._read = function() {
      this.lenFileData = this._io.readU4le();
      this.lenChecksumsExternal = this._io.readU4le();
      this.lenChecksumsInternal = this._io.readU4le();
      this.lenSignature = this._io.readU4le();
    }

    return Vpk2HeaderT;
  })();

  var SignatureT = ValveVpk2.SignatureT = (function() {
    function SignatureT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SignatureT.prototype._read = function() {
      this.lenPublicKey = this._io.readU4le();
      this.publicKey = this._io.readBytes(this.lenPublicKey);
      this.lenSignature = this._io.readU4le();
      this.signature = this._io.readBytes(this.lenSignature);
    }

    return SignatureT;
  })();

  return ValveVpk2;
})();
return ValveVpk2;
}));
