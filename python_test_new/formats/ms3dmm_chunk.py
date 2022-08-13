# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class Ms3dmmChunk(KaitaiStruct):
    """Microsoft 3D Movie Maker Chunk File.
    
    .. seealso::
       Source - https://github.com/foone/lib3dmm/blob/master/lib3dmm.py
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.file_header = Ms3dmmChunk.FileHeaderT(self._io, self, self._root)
        self._raw_chunk_data = self._io.read_bytes((self.file_header.ofs_file_index - 128))
        _io__raw_chunk_data = KaitaiStream(BytesIO(self._raw_chunk_data))
        self.chunk_data = Ms3dmmChunk.ChunkDataT(_io__raw_chunk_data, self, self._root)
        self.file_index = Ms3dmmChunk.FileIndexT(self._io, self, self._root)
        self._raw_chunks = self._io.read_bytes(self._root.file_index.len_chunks)
        _io__raw_chunks = KaitaiStream(BytesIO(self._raw_chunks))
        self.chunks = Ms3dmmChunk.ChunksT(_io__raw_chunks, self, self._root)
        self.chunk_index = []
        for i in range(self.file_index.num_chunks):
            self.chunk_index.append(Ms3dmmChunk.ChunkIndexT(self._io, self, self._root))


    class FileHeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.magic = self._io.read_bytes(4)
            if not self.magic == b"\x43\x48\x4E\x32":
                raise kaitaistruct.ValidationNotEqualError(b"\x43\x48\x4E\x32", self.magic, self._io, u"/types/file_header_t/seq/0")
            self.author_program = (self._io.read_bytes(4)).decode(u"ASCII")
            self.chunk_version_current = self._io.read_u2le()
            self.chunk_version_minimum = self._io.read_u2le()
            self.byte_order = self._io.read_u2le()
            self.author_system = self._io.read_u2le()
            self.len_file = self._io.read_u4le()
            self.ofs_file_index = self._io.read_u4le()
            self.len_file_index = self._io.read_u4le()
            self.ofs_free_space_map = self._io.read_u4le()
            self.len_free_space_map = self._io.read_u4le()
            self.reserved = []
            for i in range(23):
                self.reserved.append(self._io.read_u4le())



    class ChunkDataT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = []
            i = 0
            while not self._io.is_eof():
                self.data.append(self._io.read_u1())
                i += 1



    class ChunkT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.author_program = (self._io.read_bytes(4)).decode(u"ASCII")
            self.chunk_number = self._io.read_u4le()
            self.ofs_chunk_data = self._io.read_u4le()
            self.grfcrp = self._io.read_bits_int_le(8)
            self.len_chunk_data = self._io.read_bits_int_le(24)
            self._io.align_to_byte()
            self.num_owned_chunks = self._io.read_u2le()
            self.num_owner_chunks = self._io.read_u2le()
            self.remaining_data = self._io.read_bytes_full()

        @property
        def chunk_data(self):
            if hasattr(self, '_m_chunk_data'):
                return self._m_chunk_data

            io = self._root._io
            _pos = io.pos()
            io.seek(self.ofs_chunk_data)
            self._raw__m_chunk_data = io.read_bytes(self.len_chunk_data)
            _io__raw__m_chunk_data = KaitaiStream(BytesIO(self._raw__m_chunk_data))
            self._m_chunk_data = Ms3dmmChunk.ChunkDataT(_io__raw__m_chunk_data, self, self._root)
            io.seek(_pos)
            return getattr(self, '_m_chunk_data', None)


    class FileIndexT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.byte_order = self._io.read_u2le()
            self.author_system = self._io.read_u2le()
            self.num_chunks = self._io.read_u4le()
            self.len_chunks = self._io.read_u4le()
            self.un1 = self._io.read_s4le()
            self.un2 = self._io.read_s4le()


    class ChunksT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes_full()


    class ChunkIndexT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.ofs_chunk = self._io.read_u4le()
            self.len_chunk = self._io.read_u4le()

        @property
        def chunk(self):
            if hasattr(self, '_m_chunk'):
                return self._m_chunk

            io = self._root.chunks._io
            _pos = io.pos()
            io.seek(self.ofs_chunk)
            self._raw__m_chunk = io.read_bytes(self.len_chunk)
            _io__raw__m_chunk = KaitaiStream(BytesIO(self._raw__m_chunk))
            self._m_chunk = Ms3dmmChunk.ChunkT(_io__raw__m_chunk, self, self._root)
            io.seek(_pos)
            return getattr(self, '_m_chunk', None)



