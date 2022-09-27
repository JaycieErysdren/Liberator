// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Ms3dmmChunk = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Microsoft 3D Movie Maker Chunk File.
 * @see {@link https://github.com/foone/lib3dmm/blob/master/lib3dmm.py|Source}
 */

var Ms3dmmChunk = (function() {
  function Ms3dmmChunk(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Ms3dmmChunk.prototype._read = function() {
    this.fileHeader = new FileHeaderT(this._io, this, this._root);
    this._raw_chunkData = this._io.readBytes((this.fileHeader.ofsFileIndex - 128));
    var _io__raw_chunkData = new KaitaiStream(this._raw_chunkData);
    this.chunkData = new ChunkDataT(_io__raw_chunkData, this, this._root);
    this.fileIndex = new FileIndexT(this._io, this, this._root);
    this._raw_chunks = this._io.readBytes(this._root.fileIndex.lenChunks);
    var _io__raw_chunks = new KaitaiStream(this._raw_chunks);
    this.chunks = new ChunksT(_io__raw_chunks, this, this._root);
    this.chunkIndex = [];
    for (var i = 0; i < this.fileIndex.numChunks; i++) {
      this.chunkIndex.push(new ChunkIndexT(this._io, this, this._root));
    }
  }

  var FileHeaderT = Ms3dmmChunk.FileHeaderT = (function() {
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
      this.chunkVersionCurrent = this._io.readU2le();
      this.chunkVersionMinimum = this._io.readU2le();
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

  var ChunkDataT = Ms3dmmChunk.ChunkDataT = (function() {
    function ChunkDataT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkDataT.prototype._read = function() {
      this.data = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.data.push(this._io.readU1());
        i++;
      }
    }

    return ChunkDataT;
  })();

  var ChunkT = Ms3dmmChunk.ChunkT = (function() {
    function ChunkT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkT.prototype._read = function() {
      this.authorProgram = KaitaiStream.bytesToStr(this._io.readBytes(4), "ASCII");
      this.chunkNumber = this._io.readU4le();
      this.ofsChunkData = this._io.readU4le();
      this.grfcrp = this._io.readBitsIntLe(8);
      this.lenChunkData = this._io.readBitsIntLe(24);
      this._io.alignToByte();
      this.numOwnedChunks = this._io.readU2le();
      this.numOwnerChunks = this._io.readU2le();
      this.remainingData = this._io.readBytesFull();
    }
    Object.defineProperty(ChunkT.prototype, 'chunkData', {
      get: function() {
        if (this._m_chunkData !== undefined)
          return this._m_chunkData;
        var io = this._root._io;
        var _pos = io.pos;
        io.seek(this.ofsChunkData);
        this._raw__m_chunkData = io.readBytes(this.lenChunkData);
        var _io__raw__m_chunkData = new KaitaiStream(this._raw__m_chunkData);
        this._m_chunkData = new ChunkDataT(_io__raw__m_chunkData, this, this._root);
        io.seek(_pos);
        return this._m_chunkData;
      }
    });

    return ChunkT;
  })();

  var FileIndexT = Ms3dmmChunk.FileIndexT = (function() {
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

  var ChunksT = Ms3dmmChunk.ChunksT = (function() {
    function ChunksT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunksT.prototype._read = function() {
      this.data = this._io.readBytesFull();
    }

    return ChunksT;
  })();

  var ChunkIndexT = Ms3dmmChunk.ChunkIndexT = (function() {
    function ChunkIndexT(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChunkIndexT.prototype._read = function() {
      this.ofsChunk = this._io.readU4le();
      this.lenChunk = this._io.readU4le();
    }
    Object.defineProperty(ChunkIndexT.prototype, 'chunk', {
      get: function() {
        if (this._m_chunk !== undefined)
          return this._m_chunk;
        var io = this._root.chunks._io;
        var _pos = io.pos;
        io.seek(this.ofsChunk);
        this._raw__m_chunk = io.readBytes(this.lenChunk);
        var _io__raw__m_chunk = new KaitaiStream(this._raw__m_chunk);
        this._m_chunk = new ChunkT(_io__raw__m_chunk, this, this._root);
        io.seek(_pos);
        return this._m_chunk;
      }
    });

    return ChunkIndexT;
  })();

  return Ms3dmmChunk;
})();
return Ms3dmmChunk;
}));
