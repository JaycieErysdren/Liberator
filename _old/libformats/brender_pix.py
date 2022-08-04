# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class BrenderPix(KaitaiStruct):
    """
    .. seealso::
       Source - https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/brenderpix.c
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.magic = self._io.read_bytes(16)
        if not self.magic == b"\x00\x00\x00\x12\x00\x00\x00\x08\x00\x00\x00\x02\x00\x00\x00\x02":
            raise kaitaistruct.ValidationNotEqualError(b"\x00\x00\x00\x12\x00\x00\x00\x08\x00\x00\x00\x02\x00\x00\x00\x02", self.magic, self._io, u"/seq/0")
        self.bitmap_type = self._io.read_s4be()
        self.header = BrenderPix.HeaderT(self._io, self, self._root)
        _on = self.header.bitmap_type
        if _on == 4:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)
        elif _on == 6:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)
        elif _on == 7:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)
        elif _on == 3:
            self.bitmap = BrenderPix.BitmapPal8(self._io, self, self._root)
        elif _on == 5:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)
        elif _on == 8:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)
        elif _on == 18:
            self.bitmap = BrenderPix.Unknown(self._io, self, self._root)

    class HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_header = self._io.read_s4be()
            self.bitmap_type = self._io.read_bits_int_be(8)
            self._io.align_to_byte()
            self.row_bytes = self._io.read_u2be()
            self.width = self._io.read_u2be()
            self.height = self._io.read_u2be()
            self.origin_x = self._io.read_u2be()
            self.origin_y = self._io.read_u2be()
            self.identifier = (self._io.read_bytes((self.len_header - 11))).decode(u"ASCII")


    class Unknown(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            pass


    class PaletteEntryT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.none = self._io.read_u1()
            self.b = self._io.read_u1()
            self.g = self._io.read_u1()
            self.r = self._io.read_u1()


    class BitmapPal8(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.bitmap_data_type = self._io.read_s4be()
            self.header = BrenderPix.HeaderT(self._io, self, self._root)
            self.palette_data_type = self._io.read_s4be()
            self.len_palette_data = self._io.read_s4be()
            self.palette_padding_top = self._io.read_bytes(8)
            self.palette_data = []
            for i in range((self.len_palette_data - 8) // 4):
                self.palette_data.append(BrenderPix.PaletteEntryT(self._io, self, self._root))

            self.palette_padding_bottom = self._io.read_bytes(8)
            self.image_data_type = self._io.read_s4be()
            self.len_image_data = self._io.read_s4be()
            self.image_padding_top = self._io.read_bytes(8)
            self.image_data = self._io.read_bytes((self.len_image_data - 8))
            self.image_padding_bottom = self._io.read_bytes(8)



