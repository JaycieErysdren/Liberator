meta:
  id: brender_model
  file-extension: dat
  endian: be
  bit-endian: be

doc-ref: fw/formats.h

seq:
  - id: magic
    contents: [0x0, 0x0, 0x0, 0x12, 0x0, 0x0, 0x0, 0x8, 0x0, 0x0, 0xfa, 0xce, 0x0, 0x0, 0x0, 0x2]
  - id: groups
    type: group_t
    repeat: eos

types:
  group_t:
    seq:
      - id: un0
        size: 10
      - id: identifier
        type: strz
        encoding: ascii
      - id: un1
        type: u4
      - id: un2
        type: u4
      - id: num_vertices
        type: u4
      - id: vertices
        type: vertex_t
        repeat: expr
        repeat-expr: num_vertices
      - id: un3
        type: u4
      - id: un4
        type: u4
      - id: num_un5
        type: u4
      - id: un5
        size: 8
        repeat: expr
        repeat-expr: num_un5
      - id: un6
        type: u4
      - id: len_un7
        type: u4
      - id: un7
        size: len_un7
      - id: un8
        type: u4
      - id: un9
        type: u4
      - id: num_materials
        type: u4
      - id: materials
        type: strz
        encoding: ascii
        repeat: expr
        repeat-expr: num_materials
      - id: un10
        type: u4
      - id: un11
        type: u4
      - id: un12
        type: u4
      - id: un13
        type: u4
      - id: un14
        type: u2
        repeat: expr
        repeat-expr: un12
      - id: padding
        size: 8

  vertex_t:
    seq:
      - id: coords
        type: f4
        repeat: expr
        repeat-expr: 3

  uv_t:
    seq:
      - id: u
        type: f4
      - id: v
        type: f4