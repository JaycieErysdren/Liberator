# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class DescentHog(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.magic = self._io.read_bytes(3)
        if not self.magic == b"\x44\x48\x46":
            raise kaitaistruct.ValidationNotEqualError(b"\x44\x48\x46", self.magic, self._io, u"/seq/0")
        self.chunks = []
        i = 0
        while not self._io.is_eof():
            self.chunks.append(DescentHog.ChunkT(self._io, self, self._root))
            i += 1


    class ChunkT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.name = (KaitaiStream.bytes_terminate(self._io.read_bytes(13), 0, False)).decode(u"ascii")
            self.len_data = self._io.read_u4le()
            self.data = self._io.read_bytes(self.len_data)



