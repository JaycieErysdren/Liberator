meta:
  id: slavedriver_lev_powerslave_psx
  file-extension: zed
  endian: le
  bit-endian: le

doc: PowerSlave (PlayStation) Level Format (.zed)
doc-ref: https://github.com/svkaiser/PowerslaveEX/blob/master/scratchcode/scratch.cpp

seq:
  - id: header
    type: header_t
  - id: texture_data
    type: zedpad_t((header.size_texture_data2 << 16) | header.size_texture_data1)
  - id: audio_data
    type: zedpad_t(header.size_audio_data)
  - id: hulls
    type: hull_t
    repeat: expr
    repeat-expr: header.num_hulls

types:

  zedpad_t:
    params:
      - id: x
        type: u2
    seq:
      - id: data
        size: x + ((0x800 - (x & 0x7FF)) & 0x7FF)

  header_t:
    seq:
      - id: unknown01
        type: u2
      - id: size_texture_data1
        type: u2
      - id: size_texture_data2
        type: u2
      - id: num_audio
        type: u2
      - id: size_audio_data
        type: s4
      - id: size_level_data
        type: s4
      - id: unknown02
        type: u2
      - id: num_hulls
        type: u2
      - id: num_faces
        type: u2
      - id: num_polys
        type: u2
      - id: num_vertices
        type: u2
      - id: num_uvs
        type: u2
      - id: num_entities
        type: u2
      - id: num_events
        type: u2
      - id: num_sprites
        type: u2
      - id: num_sprite_frames
        type: u2
      - id: num_sprite_info
        type: u2
      - id: num_sprite_offsets
        type: u2
      - id: table_sprite_actors
        type: s2
        repeat: expr
        repeat-expr: 182 # hardcoded?
      - id: table_hud_sprites
        type: s2
        repeat: expr
        repeat-expr: 10
      - id: glob
        type: b4
        repeat: expr
        repeat-expr: 32312 # 0x7E38

  hull_t:
    seq:
      - id: plane_indexes
        type: u2
        repeat: expr
        repeat-expr: 2
      - id: light_level
        type: u2
      - id: ceiling_height
        type: s2
      - id: floor_height
        type: s2
      - id: unknown_indexes
        type: u2
        repeat: expr
        repeat-expr: 2
      - id: ceiling_slope
        type: s2
      - id: floor_slope
        type: s2
      - id: unknown_vector01
        type: s2
        repeat: expr
        repeat-expr: 6
      - id: flags
        type: u2
      - id: unknown_vector02
        type: s2
        repeat: expr
        repeat-expr: 26
