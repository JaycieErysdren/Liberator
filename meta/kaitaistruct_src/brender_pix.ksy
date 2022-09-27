meta:
  id: brender_pix
  file-extension: pix
  endian: be

doc-ref: https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/brenderpix.c

seq:
  - id: magic
    contents: [0x0, 0x0, 0x0, 0x12, 0x0, 0x0, 0x0, 0x8, 0x0, 0x0, 0x0, 0x2, 0x0, 0x0, 0x0, 0x2]
  - id: bitmap_type # should be either 0x3 or 0x3D
    type: s4
  - id: header
    type: header_t
  - id: bitmap
    type:
      switch-on: header.bitmap_type
      cases:
        3: bitmap_pal8 # PAL8
        4: unknown # RGB555
        5: unknown # RGB565
        6: unknown # RGB24
        7: unknown # 0RGB
        8: unknown # ARGB
        18: unknown # YAS

types:
  header_t:
    seq:
      - id: len_header
        type: s4
      - id: bitmap_type
        type: b8
      - id: row_bytes
        type: u2
      - id: width
        type: u2
      - id: height
        type: u2
      - id: origin_x
        type: u2
      - id: origin_y
        type: u2
      - id: identifier
        type: str
        encoding: ASCII
        size: len_header - 11

  unknown: {}

  palette_entry_t:
    seq:
      - id: none
        type: u1
      - id: r
        type: u1
      - id: g
        type: u1
      - id: b
        type: u1

  bitmap_pal8:
    seq:
      - id: bitmap_data_type
        type: s4
      - id: header
        type: header_t
      - id: palette_data_type # should be 0x21
        type: s4
      - id: len_palette_data
        type: s4
      - id: palette_padding_top
        size: 8
      - id: palette_data
        type: palette_entry_t
        repeat: expr
        repeat-expr: (len_palette_data - 8) / 4
      - id: palette_padding_bottom
        size: 8
      - id: image_data_type
        type: s4
      - id: len_image_data
        type: s4
      - id: image_padding_top
        size: 8
      - id: image_data
        type: b8
        repeat: expr
        repeat-expr: len_image_data - 8
      - id: image_padding_bottom
        size: 8