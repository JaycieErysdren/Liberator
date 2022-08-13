# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if getattr(kaitaistruct, 'API_VERSION', (0, 9)) < (0, 9):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class ValveVpk(KaitaiStruct):
    """Valve Software VPK (versions 1 and 2).
    
    .. seealso::
       Source - https://developer.valvesoftware.com/wiki/VPK_File_Format
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.header = ValveVpk.HeaderT(self._io, self, self._root)
        self._raw_files = self._io.read_bytes(self.header.len_directory_tree)
        _io__raw_files = KaitaiStream(BytesIO(self._raw_files))
        self.files = ValveVpk.FilesT(_io__raw_files, self, self._root)
        _on = self.header.version
        if _on == 1:
            self.file_data = ValveVpk.Vpk1FileData(self._io, self, self._root)
        elif _on == 2:
            self.file_data = ValveVpk.Vpk2FileData(self._io, self, self._root)
        else:
            self.file_data = ValveVpk.UnknownData(self._io, self, self._root)
        if self.header.version > 1:
            self.footer = ValveVpk.FooterT(self._io, self, self._root)


    class FileT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.crc = self._io.read_u4le()
            self.len_preload_data = self._io.read_u2le()
            self.archive_index = self._io.read_u2le()
            self.ofs_entry_data = self._io.read_u4le()
            self.len_entry_data = self._io.read_u4le()
            self.terminator = self._io.read_bytes(2)
            if not self.terminator == b"\xFF\xFF":
                raise kaitaistruct.ValidationNotEqualError(b"\xFF\xFF", self.terminator, self._io, u"/types/file_t/seq/5")
            self.preload_data = self._io.read_bytes(self.len_preload_data)


    class FooterT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.checksums_external = self._io.read_bytes(self._root.header.vpk2_header.len_checksums_external)
            self.checksums_internal = ValveVpk.ChecksumInternalT(self._io, self, self._root)
            self.signature = self._io.read_bytes(self._root.header.vpk2_header.len_signature)


    class Vpk2FileData(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes(self._root.header.vpk2_header.len_file_data)


    class Vpk1FileData(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes_full()


    class TreeFilesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.file_name = (self._io.read_bytes_term(0, False, True, True)).decode(u"ASCII")
            if self.file_name != u"":
                self.file_data = ValveVpk.FileT(self._io, self, self._root)



    class HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.magic = self._io.read_bytes(4)
            if not self.magic == b"\x34\x12\xAA\x55":
                raise kaitaistruct.ValidationNotEqualError(b"\x34\x12\xAA\x55", self.magic, self._io, u"/types/header_t/seq/0")
            self.version = self._io.read_u4le()
            self.len_directory_tree = self._io.read_u4le()
            if self.version > 1:
                self.vpk2_header = ValveVpk.Vpk2HeaderT(self._io, self, self._root)



    class FilesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.tree_extensions = []
            i = 0
            while not self._io.is_eof():
                self.tree_extensions.append(ValveVpk.TreeExtensionsT(self._io, self, self._root))
                i += 1



    class TreeExtensionsT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.file_extension = (self._io.read_bytes_term(0, False, True, True)).decode(u"ASCII")
            if self.file_extension != u"":
                self.tree_directories = []
                i = 0
                while True:
                    _ = ValveVpk.TreeDirectoriesT(self._io, self, self._root)
                    self.tree_directories.append(_)
                    if _.file_directory == u"":
                        break
                    i += 1



    class ChecksumExternalT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.archive_index = self._io.read_u4le()
            self.ofs_checksum = self._io.read_u4le()
            self.len_checksum = self._io.read_u4le()
            self.checksum = self._io.read_bytes(16)


    class ChecksumsExternalT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.entries = []
            i = 0
            while not self._io.is_eof():
                self.entries.append(ValveVpk.ChecksumExternalT(self._io, self, self._root))
                i += 1



    class TreeDirectoriesT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.file_directory = (self._io.read_bytes_term(0, False, True, True)).decode(u"ASCII")
            if self.file_directory != u"":
                self.tree_files = []
                i = 0
                while True:
                    _ = ValveVpk.TreeFilesT(self._io, self, self._root)
                    self.tree_files.append(_)
                    if _.file_name == u"":
                        break
                    i += 1



    class ChecksumInternalT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.tree_checksum = self._io.read_bytes(16)
            self.external_checksum = self._io.read_bytes(16)
            self.unknown = self._io.read_bytes(16)


    class Vpk2HeaderT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_file_data = self._io.read_u4le()
            self.len_checksums_external = self._io.read_u4le()
            self.len_checksums_internal = self._io.read_u4le()
            self.len_signature = self._io.read_u4le()


    class SignatureT(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_public_key = self._io.read_u4le()
            self.public_key = self._io.read_bytes(self.len_public_key)
            self.len_signature = self._io.read_u4le()
            self.signature = self._io.read_bytes(self.len_signature)


    class UnknownData(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            pass



