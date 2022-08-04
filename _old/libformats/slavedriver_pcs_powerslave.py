# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class SlavedriverPcsPowerslave(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.bitmaps = []
        for i in range(2):
            self.bitmaps.append(SlavedriverPcsPowerslave.BitmapT(self._io, self, self._root))


    class BitmapT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown01 = self._io.read_u4be()
            self.num_bitmap = self._io.read_u4be()
            self.width = self._io.read_u4be()
            self.height = self._io.read_u4be()
            self.bitmap = []
            for i in range(self.num_bitmap):
                self.bitmap.append(self._io.read_bits_int_be(8))

            self._io.align_to_byte()
            self.palette = []
            for i in range(256):
                self.palette.append(SlavedriverPcsPowerslave.PaletteEntryT(self._io, self, self._root))



    class PaletteEntryT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.a = self._io.read_bits_int_be(1) != 0
            self.b = self._io.read_bits_int_be(5)
            self.g = self._io.read_bits_int_be(5)
            self.r = self._io.read_bits_int_be(5)



