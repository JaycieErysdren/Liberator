# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class DvisionUvi(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.empty1 = self._io.read_bytes(3840)
        self.pixels = []
        for i in range((57600 - 3840) // 2):
            self.pixels.append(DvisionUvi.RgbT(self._io, self, self._root))

        self.empty2 = self._io.read_bytes(256)
        self.empty3 = self._io.read_bytes(3840)
        self.palette = []
        for i in range(7424 // 2):
            self.palette.append(DvisionUvi.RgbT(self._io, self, self._root))

        self.identifier = (self._io.read_bytes_full()).decode(u"ascii")

    class RgbT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.r = self._io.read_bits_int_be(5)
            self.g = self._io.read_bits_int_be(6)
            self.b = self._io.read_bits_int_be(5)


    class PaletteEntryT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.r = self._io.read_u1()
            self.g = self._io.read_u1()
            self.b = self._io.read_u1()



