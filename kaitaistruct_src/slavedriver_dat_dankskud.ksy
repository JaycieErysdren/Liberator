meta:
  id: slavedriver_dat_dankskud
  file-extension: dat
  endian: be
  bit-endian: be

seq:
  - id: header
    type: header_t
  - id: bitmaps
    type: bitmap_t
    repeat: expr
    repeat-expr: 8

types:
  header_t:
    seq:
      - id: width
        type: u4
      - id: height
        type: u4
      - id: padding
        size: 6400

  bitmap_t:
    seq:
      - id: bitmap
        type: bitmap_entry_t
        repeat: expr
        repeat-expr: _root.header.width * _root.header.height

  bitmap_entry_t:
    seq:
      - id: a
        type: b1
      - id: b
        type: b5
      - id: g
        type: b5
      - id: r
        type: b5