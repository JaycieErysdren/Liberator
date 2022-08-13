# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class IdPak(KaitaiStruct):
    """id Software PAK.
    
    .. seealso::
       Source - https://quakewiki.org/wiki/.pak
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.header = IdPak.HeaderT(self._io, self, self._root)

    class HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.magic = self._io.read_bytes(4)
            if not self.magic == b"\x50\x41\x43\x4B":
                raise kaitaistruct.ValidationNotEqualError(b"\x50\x41\x43\x4B", self.magic, self._io, u"/types/header_t/seq/0")
            self.ofs_file_table = self._io.read_u4le()
            self.len_file_table = self._io.read_u4le()


    class FileTableT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.filepath = (self._io.read_bytes_term(0, False, True, True)).decode(u"ASCII")

        @property
        def ofs_file_data(self):
            if hasattr(self, '_m_ofs_file_data'):
                return self._m_ofs_file_data

            _pos = self._io.pos()
            self._io.seek(56)
            self._m_ofs_file_data = self._io.read_u4le()
            self._io.seek(_pos)
            return getattr(self, '_m_ofs_file_data', None)

        @property
        def len_file_data(self):
            if hasattr(self, '_m_len_file_data'):
                return self._m_len_file_data

            _pos = self._io.pos()
            self._io.seek(60)
            self._m_len_file_data = self._io.read_u4le()
            self._io.seek(_pos)
            return getattr(self, '_m_len_file_data', None)


    @property
    def get_file_table(self):
        if hasattr(self, '_m_get_file_table'):
            return self._m_get_file_table

        _pos = self._io.pos()
        self._io.seek(self.header.ofs_file_table)
        self._raw__m_get_file_table = []
        self._m_get_file_table = []
        for i in range(self.header.len_file_table // 64):
            self._raw__m_get_file_table.append(self._io.read_bytes(64))
            _io__raw__m_get_file_table = KaitaiStream(BytesIO(self._raw__m_get_file_table[i]))
            self._m_get_file_table.append(IdPak.FileTableT(_io__raw__m_get_file_table, self, self._root))

        self._io.seek(_pos)
        return getattr(self, '_m_get_file_table', None)


