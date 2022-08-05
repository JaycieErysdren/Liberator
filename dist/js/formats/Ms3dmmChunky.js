// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Ms3dmmChunky = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Microsoft 3D Movie Maker Chunky File.
 * @see {@link https://github.com/foone/lib3dmm/blob/master/lib3dmm.py|Source}
 */

var Ms3dmmChunky = (function() {
  function Ms3dmmChunky(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Ms3dmmChunky.prototype._read = function() {
    this.fileHeader = new FileHeaderT(this._io, this, this._root);
    this.chunkData = this._io.readBytes((this.fileHeader.ofsFileIndex - 128));
    this.fileIndex = new FileIndexT(this._io, this, this._root);
    this._raw_chunks = this._io.readBytes(this.fileIndex.lenChunks);
    var _io__raw_chunks = new KaitaiStream(this._raw_chunks);
    this.chunks = new ChunksT(_io__raw_chunks, this, this._root);
    this.chunkDatalinks = [];
    for (var i = 0; i < this.fileIndex.numChunks; i++) {
      this.chunkDatalinks.push(new ChunkDatalinkT(this._io, this, this._root));
    }
  }

  var FileHeaderT = Ms3dmmChunky.FileHeaderT = (function() {
    function FileHeaderT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FileHeaderT.prototype._read = function() {
      this.magic = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.magic, [67, 72, 78, 50]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([67, 72, 78, 50], this.magic, this._io, "/types/file_header_t/seq/0");
      }
      this.authorProgram = KaitaiStream.bytesToStr(this._io.readBytes(4), "ASCII");
      this.chunkyVersionCurrent = this._io.readU2le();
      this.chunkyVersionMinimum = this._io.readU2le();
      this.byteOrder = this._io.readU2le();
      this.authorSystem = this._io.readU2le();
      this.lenFile = this._io.readU4le();
      this.ofsFileIndex = this._io.readU4le();
      this.lenFileIndex = this._io.readU4le();
      this.ofsFreeSpaceMap = this._io.readU4le();
      this.lenFreeSpaceMap = this._io.readU4le();
      this.reserved = [];
      for (var i = 0; i < 23; i++) {
        this.reserved.push(this._io.readU4le());
      }
    }

    return FileHeaderT;
  })();

  var ChunkDatalinkT = Ms3dmmChunky.ChunkDatalinkT = (function() {
    function ChunkDatalinkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkDatalinkT.prototype._read = function() {
      this.ofsChunkData = this._io.readU4le();
      this.lenChunkData = this._io.readU4le();
    }
    Object.defineProperty(ChunkDatalinkT.prototype, 'getChunkData', {
      get: function() {
        if (this._m_getChunkData !== undefined)
          return this._m_getChunkData;
        var _pos = this._io.pos;
        this._io.seek(this.ofsChunkData);
        this._m_getChunkData = this._io.readBytes(this.lenChunkData);
        this._io.seek(_pos);
        return this._m_getChunkData;
      }
    });

    return ChunkDatalinkT;
  })();

  var ChunkT = Ms3dmmChunky.ChunkT = (function() {
    function ChunkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkT.prototype._read = function() {
      this.authorProgram = KaitaiStream.bytesToStr(this._io.readBytes(4), "ASCII");
      this.chunkId = this._io.readU4le();
      this.ofsReferences = this._io.readU4le();
      if ( ((this.ofsReferences > 0) && (this.ofsReferences != 65536)) ) {
        this.references = new ChunkReferencesT(this._io, this, this._root);
      }
    }

    return ChunkT;
  })();

  var ChunkUnknown = Ms3dmmChunky.ChunkUnknown = (function() {
    function ChunkUnknown(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkUnknown.prototype._read = function() {
    }

    return ChunkUnknown;
  })();

  var FileIndexT = Ms3dmmChunky.FileIndexT = (function() {
    function FileIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FileIndexT.prototype._read = function() {
      this.byteOrder = this._io.readU2le();
      this.authorSystem = this._io.readU2le();
      this.numChunks = this._io.readU4le();
      this.lenChunks = this._io.readU4le();
      this.un1 = this._io.readS4le();
      this.un2 = this._io.readS4le();
    }

    return FileIndexT;
  })();

  var ChunksT = Ms3dmmChunky.ChunksT = (function() {
    function ChunksT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunksT.prototype._read = function() {
      this.definitions = [];
      for (var i = 0; i < this._root.fileIndex.numChunks; i++) {
        this.definitions.push(new ChunkT(this._io, this, this._root));
      }
    }

    return ChunksT;
  })();

  var ChunkReferencesT = Ms3dmmChunky.ChunkReferencesT = (function() {
    function ChunkReferencesT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkReferencesT.prototype._read = function() {
      this.mode = this._io.readU1();
      this.lenReferences = this._io.readBitsIntLe(24);
      this._io.alignToByte();
      this.referencesToOthers = this._io.readU2le();
      this.referencesToThis = this._io.readU2le();
    }

    return ChunkReferencesT;
  })();

  return Ms3dmmChunky;
})();
return Ms3dmmChunky;
}));
