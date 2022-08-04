# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class SlavedriverLevPowerslavePsx(KaitaiStruct):
    """PowerSlave (PlayStation) Level Format (.zed).
    
    .. seealso::
       Source - https://github.com/svkaiser/PowerslaveEX/blob/master/scratchcode/scratch.cpp
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.header = SlavedriverLevPowerslavePsx.HeaderT(self._io, self, self._root)
        self.texture_data = SlavedriverLevPowerslavePsx.ZedpadT(((self.header.size_texture_data2 << 16) | self.header.size_texture_data1), self._io, self, self._root)
        self.audio_data = SlavedriverLevPowerslavePsx.ZedpadT(self.header.size_audio_data, self._io, self, self._root)
        self.hulls = []
        for i in range(self.header.num_hulls):
            self.hulls.append(SlavedriverLevPowerslavePsx.HullT(self._io, self, self._root))


    class ZedpadT(KaitaiStruct):
        def __init__(self, x, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self.x = x
            self._read()

        def _read(self):
            self.data = self._io.read_bytes((self.x + ((2048 - (self.x & 2047)) & 2047)))


    class HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown01 = self._io.read_u2le()
            self.size_texture_data1 = self._io.read_u2le()
            self.size_texture_data2 = self._io.read_u2le()
            self.num_audio = self._io.read_u2le()
            self.size_audio_data = self._io.read_s4le()
            self.size_level_data = self._io.read_s4le()
            self.unknown02 = self._io.read_u2le()
            self.num_hulls = self._io.read_u2le()
            self.num_faces = self._io.read_u2le()
            self.num_polys = self._io.read_u2le()
            self.num_vertices = self._io.read_u2le()
            self.num_uvs = self._io.read_u2le()
            self.num_entities = self._io.read_u2le()
            self.num_events = self._io.read_u2le()
            self.num_sprites = self._io.read_u2le()
            self.num_sprite_frames = self._io.read_u2le()
            self.num_sprite_info = self._io.read_u2le()
            self.num_sprite_offsets = self._io.read_u2le()
            self.table_sprite_actors = []
            for i in range(182):
                self.table_sprite_actors.append(self._io.read_s2le())

            self.table_hud_sprites = []
            for i in range(10):
                self.table_hud_sprites.append(self._io.read_s2le())

            self.glob = []
            for i in range(32312):
                self.glob.append(self._io.read_bits_int_le(4))



    class HullT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.plane_indexes = []
            for i in range(2):
                self.plane_indexes.append(self._io.read_u2le())

            self.light_level = self._io.read_u2le()
            self.ceiling_height = self._io.read_s2le()
            self.floor_height = self._io.read_s2le()
            self.unknown_indexes = []
            for i in range(2):
                self.unknown_indexes.append(self._io.read_u2le())

            self.ceiling_slope = self._io.read_s2le()
            self.floor_slope = self._io.read_s2le()
            self.unknown_vector01 = []
            for i in range(6):
                self.unknown_vector01.append(self._io.read_s2le())

            self.flags = self._io.read_u2le()
            self.unknown_vector02 = []
            for i in range(26):
                self.unknown_vector02.append(self._io.read_s2le())




