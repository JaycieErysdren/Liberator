meta:
    id: valve_vpk2
    file-extension: vpk
    endian: le
    bit-endian: le

doc: Valve Software VPK2
doc-ref: https://developer.valvesoftware.com/wiki/VPK_File_Format

# http://wiki.xentax.com/index.php/Source_VPK
# https://github.com/SteamDatabase/ValveResourceFormat/tree/master/ValveResourceFormat
# https://github.com/ValvePython/vpk/blob/master/vpk/__init__.py

seq:
  - id: header
    type: header_t
  - id: files
    type: files_t
    size: header.len_directory_tree
  - id: file_data
    size: header.vpk2_header.len_file_data
  - id: footer
    type: footer_t
    if: header.version > 1

types:
  header_t:
    seq:
      - id: magic
        contents: [0x34, 0x12, 0xaa, 0x55]
      - id: version
        type: u4
      - id: len_directory_tree
        type: u4
      - id: vpk2_header
        type: vpk2_header_t
        if: version > 1

  vpk2_header_t:
    seq:
      - id: len_file_data
        type: u4
      - id: len_checksums_external
        type: u4
      - id: len_checksums_internal
        type: u4
      - id: len_signature
        type: u4

  files_t:
    seq:
      - id: tree_extensions
        type: tree_extensions_t
        repeat: eos

  tree_extensions_t:
    seq:
      - id: extension
        type: str
        encoding: ASCII
        terminator: 0
      - id: tree_directories
        type: tree_directories_t
        repeat: eos
        terminator: 0

  tree_directories_t:
    seq:
      - id: directory
        type: str
        encoding: ASCII
        terminator: 0
      - id: tree_files
        type: tree_files_t

  tree_files_t:
    seq:
      - id: filename
        type: str
        encoding: ASCII
        terminator: 0
      - id: crc
        type: u4
      - id: len_preload_data
        type: u2
      - id: archive_index
        type: u2
      - id: ofs_entry_data
        type: u4
      - id: len_entry_data
        type: u4
      - id: terminator
        contents: [0xff, 0xff]
      - id: preload_data
        size: len_preload_data

  footer_t:
    seq:
      - id: checksums_external
        size: _root.header.vpk2_header.len_checksums_external
      - id: checksums_internal
        type: checksum_internal_t
      - id: signature
        size: _root.header.vpk2_header.len_signature

  checksums_external_t:
    seq:
      - id: entries
        type: checksum_external_t
        repeat: eos

  checksum_external_t:
    seq:
      - id: archive_index
        type: u4
      - id: ofs_checksum
        type: u4
      - id: len_checksum
        type: u4
      - id: checksum
        size: 16

  checksum_internal_t:
    seq:
      - id: tree_checksum
        size: 16
      - id: external_checksum
        size: 16
      - id: unknown
        size: 16

  signature_t:
    seq:
      - id: len_public_key
        type: u4
      - id: public_key
        size: len_public_key
      - id: len_signature
        type: u4
      - id: signature
        size: len_signature