meta:
    id: descent_pig
    file-extension: pig
    endian: le
    bit-endian: le

seq:
  - id: num_bitmaps
    type: u4
  - id: num_sounds
    type: u4
  - id: bitmaps
    type: bitmap_header_t
    repeat: expr
    repeat-expr: num_bitmaps
  - id: sounds
    type: sound_header_t
    repeat: expr
    repeat-expr: num_sounds

types:
  bitmap_header_t:
    seq:
      - id: name
        type: strz
        size: 8
        encoding: ascii
      - id: dflags
        type: u1
      - id: width
        type: u1
      - id: height
        type: u1
      - id: flags
        type: u1
      - id: average_color
        type: u1
      - id: ofs_data
        type: u4
    instances:
      get:
        pos: ofs_data + (17 * _root.num_bitmaps) + (20 * _root.num_sounds) + 8
        size: (width * height) * 2

  sound_header_t:
    seq:
      - id: name
        type: strz
        size: 8
        encoding: ascii
      - id: length
        type: u4
      - id: len_data
        type: u4
      - id: ofs_data
        type: u4
    instances:
      get:
        pos: ofs_data
        size: len_data
