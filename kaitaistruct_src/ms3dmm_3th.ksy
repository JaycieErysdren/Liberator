meta:
  id: ms3dmm_3th
  file-extension: 3th
  endian: le
  bit-endian: le

seq:
  - id: header
    type: header_t
  - id: quad_data
    size: header.ofs_index - 32
  - id: index
    type: index_t
  - id: quad_defs
    type: quad_t
    repeat: expr
    repeat-expr: index.num_quads
  - id: quad_index
    type: quad_index_t
    repeat: expr
    repeat-expr: index.num_quads

types:
  header_t:
    seq:
      - id: identifier
        type: str
        size: 8
        encoding: ASCII
      - id: version
        type: u4
      - id: marker
        contents: [0x01, 0x00, 0x03, 0x03]
      - id: len_file
        type: u4
      - id: ofs_index
        type: u4
      - id: len_index
        type: u4
      - id: padding
        type: u4

  quad_references_t:
    seq:
      - id: mode
        type: b4
      - id: len_section
        size: 3
      - id: references
        type: u2
      - id: references_to_this_quad
        type: u2

  quad_t:
    seq:
      - id: type
        type: str
        size: 4
        encoding: ASCII
      - id: identifier
        type: u4
      - id: ofs_section
        type: u4
      - id: references
        type: quad_references_t
        if: ofs_section > 0 and ofs_section != 65536

  quad_index_t:
    seq:
      - id: quad_offset
        type: u4
      - id: len_quad
        type: u4

  index_t:
    seq:
      - id: marker
        contents: [0x01, 0x00, 0x03, 0x03]
      - id: num_quads
        type: u4
      - id: len_quads
        type: u4
      - id: unknown01
        type: u4
      - id: unknown02
        type: u4