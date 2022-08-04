# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class SlavedriverLevDuke(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.sky_data = SlavedriverLevDuke.SkyDataT(self._io, self, self._root)
        self.unknown01 = self._io.read_bytes(1280)
        self.unknown02 = SlavedriverLevDuke.Unknown02T(self._io, self, self._root)
        self.header = SlavedriverLevDuke.HeaderT(self._io, self, self._root)
        self.sectors = []
        for i in range(self.header.num_sectors):
            self.sectors.append(SlavedriverLevDuke.SectorT(self._io, self, self._root))

        self.planes = []
        for i in range(self.header.num_planes):
            self.planes.append(SlavedriverLevDuke.PlaneT(self._io, self, self._root))

        self.tiles = []
        for i in range(self.header.num_tiles):
            self.tiles.append(SlavedriverLevDuke.TileT(self._io, self, self._root))

        self.vertices = []
        for i in range(self.header.num_vertices):
            self.vertices.append(SlavedriverLevDuke.VertexT(self._io, self, self._root))

        self.quads = []
        for i in range(self.header.num_quads):
            self.quads.append(SlavedriverLevDuke.QuadT(self._io, self, self._root))

        self.entities = []
        for i in range(self.header.num_entities):
            self.entities.append(SlavedriverLevDuke.EntityT(self._io, self, self._root))

        self.entity_polylinks = []
        for i in range(self.header.num_entity_polylinks):
            self.entity_polylinks.append(SlavedriverLevDuke.EntityPolylinkT(self._io, self, self._root))

        self._raw_entity_polylink_data1 = self._io.read_bytes((self.header.num_entity_polylink_data1_segments * 2))
        _io__raw_entity_polylink_data1 = KaitaiStream(BytesIO(self._raw_entity_polylink_data1))
        self.entity_polylink_data1 = SlavedriverLevDuke.EntityPolylinkData1T(_io__raw_entity_polylink_data1, self, self._root)
        self._raw_entity_polylink_data2 = self._io.read_bytes((self.header.num_entity_polylink_data2_segments * 4))
        _io__raw_entity_polylink_data2 = KaitaiStream(BytesIO(self._raw_entity_polylink_data2))
        self.entity_polylink_data2 = SlavedriverLevDuke.EntityPolylinkData2T(_io__raw_entity_polylink_data2, self, self._root)
        self.entity_data = self._io.read_bytes(self.header.len_entity_data)
        self._raw_tile_texture_data = self._io.read_bytes(self.header.len_tile_texture_data)
        _io__raw_tile_texture_data = KaitaiStream(BytesIO(self._raw_tile_texture_data))
        self.tile_texture_data = SlavedriverLevDuke.TileTextureDataT(_io__raw_tile_texture_data, self, self._root)
        self._raw_tile_color_data = self._io.read_bytes(self.header.len_tile_color_data)
        _io__raw_tile_color_data = KaitaiStream(BytesIO(self._raw_tile_color_data))
        self.tile_color_data = SlavedriverLevDuke.TileColorDataT(_io__raw_tile_color_data, self, self._root)
        self.unknown = []
        for i in range(self.header.num_unknown):
            self.unknown.append(self._io.read_bytes(128))

        self.resources = SlavedriverLevDuke.ResourcesT(self._io, self, self._root)
        self.level_name = (self._io.read_bytes(32)).decode(u"ASCII")

    class TileTextureDataT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes(self._parent.header.len_tile_texture_data)


    class Resource0x6cT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown0 = self._io.read_u2be()
            self.len_data = self._io.read_u2be()
            self.data = self._io.read_bytes(self.len_data)


    class SectorT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.reserved = []
            for i in range(2):
                self.reserved.append(self._io.read_u2be())

            self.position = []
            for i in range(3):
                self.position.append(self._io.read_u2be())

            self.distance = self._io.read_u2be()
            self.plane_start_index = self._io.read_u2be()
            self.plane_end_index = self._io.read_u2be()
            self.unknown = []
            for i in range(6):
                self.unknown.append(self._io.read_u2be())



    class ResourcesPrefixT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.num_values = self._io.read_u4be()
            self.values = []
            for i in range(self.num_values):
                self.values.append(self._io.read_s2be())



    class Unknown02BlockT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_data = self._io.read_s4be()
            self.data = self._io.read_bytes(self.len_data)


    class SoundT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_samples = self._io.read_s4be()
            self.maybe_pitch_adjust = self._io.read_s4be()
            self.bits = self._io.read_s4be()
            self.loop_point = self._io.read_s4be()
            self.samples = self._io.read_bytes(self.len_samples)


    class EntityT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.ent_type = self._io.read_u4be()
            self.ofs_entity_data = self._io.read_u4be()


    class ResourcesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.prefix = SlavedriverLevDuke.ResourcesPrefixT(self._io, self, self._root)
            self.num_sounds = self._io.read_u4be()
            self.sounds = []
            for i in range(self.num_sounds):
                self.sounds.append(SlavedriverLevDuke.SoundT(self._io, self, self._root))

            self.len_unknown = self._io.read_u4be()
            self.unknown = self._io.read_bytes(self.len_unknown)
            self.len_palette = self._io.read_u4be()
            self.palette = []
            for i in range(self.len_palette // 2):
                self.palette.append(SlavedriverLevDuke.PaletteEntryT(self._io, self, self._root))

            self.num_resources = self._io.read_u4be()
            self.resources = []
            for i in range(self.num_resources):
                self.resources.append(SlavedriverLevDuke.ResourceT(self._io, self, self._root))



    class VertexT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.coords = []
            for i in range(3):
                self.coords.append(self._io.read_s2be())

            self.color_lookup = self._io.read_u1()
            self.reserved = self._io.read_u1()


    class HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown_01 = self._io.read_u4be()
            self.num_sectors = self._io.read_u4be()
            self.num_planes = self._io.read_u4be()
            self.num_vertices = self._io.read_u4be()
            self.num_quads = self._io.read_u4be()
            self.len_tile_texture_data = self._io.read_u4be()
            self.num_tiles = self._io.read_u4be()
            self.len_tile_color_data = self._io.read_u4be()
            self.num_entities = self._io.read_u4be()
            self.len_entity_data = self._io.read_u4be()
            self.num_entity_polylinks = self._io.read_u4be()
            self.num_entity_polylink_data1_segments = self._io.read_u4be()
            self.num_entity_polylink_data2_segments = self._io.read_u4be()
            self.num_unknown = self._io.read_u4be()


    class Resource0x2cT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown = self._io.read_u4be()
            self.len_data = self._io.read_u2be()
            self.data = self._io.read_bytes(self.len_data)


    class Resource0x34T(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown01 = self._io.read_u2be()
            self.unknown02 = self._io.read_bytes(1024)


    class EntityPolymoverT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.polylink_id = self._io.read_s2be()
            self.data = []
            for i in range(20):
                self.data.append(self._io.read_s2be())



    class LenAndUnknownT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_data = self._io.read_u4be()
            self.data = self._io.read_bytes(self.len_data)


    class QuadT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.vertex_indices = []
            for i in range(4):
                self.vertex_indices.append(self._io.read_u1())

            self.texture_index = self._io.read_u1()


    class TextureT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.palette = []
            for i in range(16):
                self.palette.append(SlavedriverLevDuke.PaletteEntryT(self._io, self, self._root))

            self.bitmap = []
            for i in range((64 * 64)):
                self.bitmap.append(self._io.read_bits_int_be(4))



    class Unknown02T(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.num_blocks = self._io.read_s4be()
            self.blocks = []
            for i in range(self.num_blocks):
                self.blocks.append(SlavedriverLevDuke.Unknown02BlockT(self._io, self, self._root))



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


    class EntityPolylinkData1T(KaitaiStruct):
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



    class EntityPolylinkData2T(KaitaiStruct):
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



    class ResourceT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.flags = self._io.read_u1()
            self.resource_type = self._io.read_u1()
            _on = self.resource_type
            if _on == 130:
                self.data = SlavedriverLevDuke.TextureT(self._io, self, self._root)
            elif _on == 42:
                self.data = SlavedriverLevDuke.Resource0x2cT(self._io, self, self._root)
            elif _on == 44:
                self.data = SlavedriverLevDuke.Resource0x2cT(self._io, self, self._root)


    class TileT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.ofs_texture_data = self._io.read_u2be()
            self.width = self._io.read_u1()
            self.height = self._io.read_u1()
            self.ofs_color_data = self._io.read_u2be()
            self.unknown = self._io.read_u2be()
            self.horizontal_vector = []
            for i in range(3):
                self.horizontal_vector.append(self._io.read_s4be())

            self.vertical_vector = []
            for i in range(3):
                self.vertical_vector.append(self._io.read_s4be())

            self.base_vector = []
            for i in range(3):
                self.base_vector.append(self._io.read_s4be())


        @property
        def get_color_data(self):
            if hasattr(self, '_m_get_color_data'):
                return self._m_get_color_data

            io = self._root.tile_color_data._io
            _pos = io.pos()
            io.seek(self.ofs_color_data)
            self._m_get_color_data = []
            for i in range(((self.width + 1) * (self.height + 1))):
                self._m_get_color_data.append(io.read_u1())

            io.seek(_pos)
            return getattr(self, '_m_get_color_data', None)

        @property
        def get_tile_texture_data(self):
            if hasattr(self, '_m_get_tile_texture_data'):
                return self._m_get_tile_texture_data

            io = self._root.tile_texture_data._io
            _pos = io.pos()
            io.seek(self.ofs_texture_data)
            self._m_get_tile_texture_data = []
            for i in range(((self.height * self.width) * 2)):
                self._m_get_tile_texture_data.append(io.read_u1())

            io.seek(_pos)
            return getattr(self, '_m_get_tile_texture_data', None)


    class EntityPolylinkT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.lead = self._io.read_u2be()
            self.ofs_entity_polylink_data1 = []
            for i in range(2):
                self.ofs_entity_polylink_data1.append(self._io.read_u2be())

            self.ofs_entity_polylink_data2 = []
            for i in range(2):
                self.ofs_entity_polylink_data2.append(self._io.read_u2be())

            self.unknown = self._io.read_u2be()
            self.reserved = []
            for i in range(3):
                self.reserved.append(self._io.read_u2be())



    class PlaneT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.vertex_indices = []
            for i in range(4):
                self.vertex_indices.append(self._io.read_u2be())

            self.sector_index = self._io.read_u2be()
            self.flags = self._io.read_u2be()
            self.collision_flags = self._io.read_u2be()
            self.tile_index = self._io.read_u2be()
            self.unknown_index = self._io.read_u2be()
            self.quad_start_index = self._io.read_u2be()
            self.quad_end_index = self._io.read_u2be()
            self.vertex_start_index = self._io.read_u2be()
            self.vertex_end_index = self._io.read_u2be()
            self.normal = []
            for i in range(3):
                self.normal.append(self._io.read_s2be())

            self.distance = self._io.read_s2be()
            self.angle = self._io.read_s2be()
            self.reserved = []
            for i in range(2):
                self.reserved.append(self._io.read_u2be())



    class EntityGenericT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.start = self._io.read_s2be()
            self.coords = []
            for i in range(3):
                self.coords.append(self._io.read_s2be())



    class Resource0x6aT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unknown0 = self._io.read_u2be()
            self.len_data = self._io.read_u2be()
            self.data = self._io.read_bytes(self.len_data)


    class SkyDataT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.palette = []
            for i in range(256):
                self.palette.append(SlavedriverLevDuke.PaletteEntryT(self._io, self, self._root))

            self.width = self._io.read_s4be()
            self.height = self._io.read_s4be()
            self.bitmap = []
            for i in range((self.width * self.height)):
                self.bitmap.append(self._io.read_bits_int_be(8))



    class TileColorDataT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes(self._parent.header.len_tile_color_data)



