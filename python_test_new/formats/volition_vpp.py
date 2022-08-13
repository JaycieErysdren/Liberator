# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class VolitionVpp(KaitaiStruct):
    """Volition VPP.
    
    .. seealso::
       Source - https://github.com/gibbed/Gibbed.Volition/tree/master/projects/Gibbed.Volition.FileFormats
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.magic = self._io.read_bytes(4)
        if not self.magic == b"\xCE\x0A\x89\x51":
            raise kaitaistruct.ValidationNotEqualError(b"\xCE\x0A\x89\x51", self.magic, self._io, u"/seq/0")
        self.version = self._io.read_u4le()
        _on = self.version
        if _on == 3:
            self.header = VolitionVpp.Headerv3T(self._io, self, self._root)
        self._raw_directories = self._io.read_bytes(2048)
        _io__raw_directories = KaitaiStream(BytesIO(self._raw_directories))
        self.directories = VolitionVpp.DirectoriesT(_io__raw_directories, self, self._root)
        self._raw_names = self._io.read_bytes(2048)
        _io__raw_names = KaitaiStream(BytesIO(self._raw_names))
        self.names = VolitionVpp.NamesT(_io__raw_names, self, self._root)
        self._raw_data = self._io.read_bytes_full()
        _io__raw_data = KaitaiStream(BytesIO(self._raw_data))
        self.data = VolitionVpp.DataT(_io__raw_data, self, self._root)

    class DirectoriesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.entries = []
            for i in range(self._root.header.num_directories):
                self.entries.append(VolitionVpp.DirectoryT(self._io, self, self._root))



    class DataT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes_full()


    class DirectoryT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.ofs_name = self._io.read_u4le()
            self.ofs_runtime = self._io.read_u4le()
            self.ofs_data = self._io.read_u4le()
            self.name_hash = self._io.read_u4le()
            self.uncompressed_size = self._io.read_u4le()
            self.compressed_size = self._io.read_u4le()
            self.ptr_package = self._io.read_u4le()

        @property
        def data(self):
            if hasattr(self, '_m_data'):
                return self._m_data

            io = self._root.data._io
            _pos = io.pos()
            io.seek(self.ofs_data)
            self._m_data = io.read_bytes(self.uncompressed_size)
            io.seek(_pos)
            return getattr(self, '_m_data', None)

        @property
        def name(self):
            if hasattr(self, '_m_name'):
                return self._m_name

            io = self._root.names._io
            _pos = io.pos()
            io.seek(self.ofs_name)
            self._m_name = (io.read_bytes_term(0, False, True, True)).decode(u"ascii")
            io.seek(_pos)
            return getattr(self, '_m_name', None)


    class NamesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes(self._root.header.len_names)


    class Headerv3T(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.name = (self._io.read_bytes(65)).decode(u"ascii")
            self.path = (self._io.read_bytes(256)).decode(u"ascii")
            self.padding1 = self._io.read_bytes(3)
            self.flags = self._io.read_u4le()
            self.un1 = self._io.read_u4le()
            self.num_directories = self._io.read_u4le()
            self.len_package = self._io.read_u4le()
            self.len_directories = self._io.read_u4le()
            self.len_names = self._io.read_u4le()
            self.uncompressed_size = self._io.read_u4le()
            self.compressed_size = self._io.read_u4le()
            self.ptr_directories = self._io.read_u4le()
            self.ptr_names = self._io.read_u4le()
            self.ptr_data = self._io.read_u4le()
            self.padding2 = self._io.read_bytes(1672)



