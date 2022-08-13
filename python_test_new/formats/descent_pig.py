# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class DescentPig(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.num_bitmaps = self._io.read_u4le()
        self.num_sounds = self._io.read_u4le()
        self.bitmaps = []
        for i in range(self.num_bitmaps):
            self.bitmaps.append(DescentPig.BitmapHeaderT(self._io, self, self._root))

        self.sounds = []
        for i in range(self.num_sounds):
            self.sounds.append(DescentPig.SoundHeaderT(self._io, self, self._root))


    class BitmapHeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.name = (KaitaiStream.bytes_terminate(self._io.read_bytes(8), 0, False)).decode(u"ascii")
            self.dflags = self._io.read_u1()
            self.width = self._io.read_u1()
            self.height = self._io.read_u1()
            self.flags = self._io.read_u1()
            self.average_color = self._io.read_u1()
            self.ofs_data = self._io.read_u4le()

        @property
        def data_pos(self):
            if hasattr(self, '_m_data_pos'):
                return self._m_data_pos

            self._m_data_pos = (((self.ofs_data + (17 * self._root.num_bitmaps)) + (20 * self._root.num_sounds)) + 8)
            return getattr(self, '_m_data_pos', None)

        @property
        def get_linear_data(self):
            if hasattr(self, '_m_get_linear_data'):
                return self._m_get_linear_data

            _pos = self._io.pos()
            self._io.seek(self.data_pos)
            self._m_get_linear_data = self._io.read_bytes((self.width * self.height))
            self._io.seek(_pos)
            return getattr(self, '_m_get_linear_data', None)

        @property
        def get_rle_data(self):
            if hasattr(self, '_m_get_rle_data'):
                return self._m_get_rle_data

            _pos = self._io.pos()
            self._io.seek(self.data_pos)
            self._m_get_rle_data = DescentPig.RleBitmapT(self._io, self, self._root)
            self._io.seek(_pos)
            return getattr(self, '_m_get_rle_data', None)


    class RleBitmapT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.next_ofs = self._io.read_u4le()
            self.run_lengths = []
            for i in range(self._parent.height):
                self.run_lengths.append(self._io.read_u1())

            self.pixels = []
            for i in range(((self.next_ofs - self._parent.height) - 4)):
                self.pixels.append(self._io.read_u1())



    class SoundHeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.name = (KaitaiStream.bytes_terminate(self._io.read_bytes(8), 0, False)).decode(u"ascii")
            self.length = self._io.read_u4le()
            self.len_data = self._io.read_u4le()
            self.ofs_data = self._io.read_u4le()

        @property
        def data(self):
            if hasattr(self, '_m_data'):
                return self._m_data

            _pos = self._io.pos()
            self._io.seek(self.ofs_data)
            self._m_data = self._io.read_bytes(self.len_data)
            self._io.seek(_pos)
            return getattr(self, '_m_data', None)



