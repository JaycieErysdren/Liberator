meta:
    id: ms3dmm_chunky
    file-extension: 3th
    endian: le
    bit-endian: le

doc: Microsoft 3D Movie Maker Chunky File.
doc-ref: https://github.com/foone/lib3dmm/blob/master/lib3dmm.py

seq:
  - id: file_header
    type: file_header_t
  - id: chunk_data
    size: file_header.ofs_file_index - 128 # file header is 128 bytes
  - id: file_index
    type: file_index_t
  - id: chunks
    type: chunks_t
    size: file_index.len_chunks
  - id: chunk_datalinks
    type: chunk_datalink_t
    repeat: expr
    repeat-expr: file_index.num_chunks

types:
  file_header_t:
    seq:
      - id: magic
        contents: [0x43, 0x48, 0x4e, 0x32] # "CHN2" in ASCII
      - id: author_program
        type: str
        encoding: ASCII
        size: 4
      - id: chunky_version_current
        type: u2
      - id: chunky_version_minimum
        type: u2
      - id: byte_order
        type: u2
      - id: author_system
        type: u2
      - id: len_file
        type: u4
      - id: ofs_file_index
        type: u4
      - id: len_file_index
        type: u4
      - id: ofs_free_space_map
        type: u4
      - id: len_free_space_map
        type: u4
      - id: reserved
        type: u4
        repeat: expr
        repeat-expr: 23

  file_index_t:
    seq:
      - id: byte_order
        type: u2
      - id: author_system
        type: u2
      - id: num_chunks
        type: u4
      - id: len_chunks
        type: u4
      - id: un1
        type: s4
      - id: un2
        type: s4

  chunks_t:
    seq:
      - id: definitions
        type: chunk_t
        repeat: expr
        repeat-expr: _root.file_index.num_chunks

  chunk_unknown: {}

  chunk_t:
    seq:
      - id: author_program
        type: str
        encoding: ASCII
        size: 4
      - id: chunk_id
        type: u4
      - id: ofs_references
        type: u4
      - id: references
        type: chunk_references_t
        if: ofs_references > 0 and ofs_references != 65536

  chunk_references_t:
    seq:
      - id: mode
        type: u1
      - id: len_references
        type: b24
      - id: references_to_others
        type: u2
      - id: references_to_this
        type: u2

  chunk_datalink_t:
    seq:
      - id: ofs_chunk_data
        type: u4
      - id: len_chunk_data
        type: u4
    instances:
      get_chunk_data:
        pos: ofs_chunk_data
        size: len_chunk_data