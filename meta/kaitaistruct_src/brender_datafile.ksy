meta:
  id: brender_datafile
  file-extension: dat
  endian: be
  bit-endian: be

doc-ref: fw/formats.h

seq:
  - id: chunks
    type: br_datafile_chunk_t
    repeat: eos

types:
  br_datafile_chunk_t:
    seq:
      - id: type
        type: u4
      - id: len_data
        type: u4
        if: type < 65536
      - id: data
        type:
          switch-on: type
          cases:
            0: br_file_end_t # file ending
            3: br_pixelmap_t # pixelmap def
            18: br_file_index_t # file info
            22: br_material_index_t # material index
            23: br_vertex_index_t # vertices
            24: br_uv_index_t # vertex uvs
            26: br_face_material_index_t # face material assignments
            33: br_pixels_t # raw pixels
            35: br_actor_t # actor def
            53: br_face_index_t # faces
            54: br_model_t # model def
            _: br_unknown_t

  br_unknown_t:
    seq:
      - id: data
        size: _parent.len_data

  br_actor_t:
    seq:
      - id: data
        size: _parent.len_data

  br_file_end_t: {}

  br_file_index_t:
    seq:
      - id: type
        type: u4
      - id: version
        type: u4

  br_pixelmap_t:
    seq:
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
        type: strz
        encoding: ascii

  br_pixels_t:
    seq:
      - id: padding_top
        size: 8
      - id: pixel_data
        size: _parent.len_data - 8
      - id: padding_bottom
        size: 8

  br_model_t:
    seq:
      - id: flags
        type: u2
      - id: identifier
        type: strz
        encoding: ascii

  br_face_index_t:
    seq:
      - id: num_faces
        type: u4
      - id: faces
        type: br_face_t
        repeat: expr
        repeat-expr: num_faces

  br_face_t:
    seq:
      - id: vertex_indices
        type: u2
        repeat: expr
        repeat-expr: 3
      - id: smoothing
        type: u2
      - id: flags
        type: u1

  br_face_material_index_t:
    seq:
      - id: num_face_materials
        type: u4
      - id: face_materials
        type: u2
        repeat: expr
        repeat-expr: num_face_materials

  br_vertex_index_t:
    seq:
      - id: num_vertices
        type: u4
      - id: vertices
        type: br_vertex_t
        repeat: expr
        repeat-expr: num_vertices

  br_vertex_t:
    seq:
      - id: coords
        type: f4
        repeat: expr
        repeat-expr: 3

  br_uv_index_t:
    seq:
      - id: num_uvs
        type: u4
      - id: uvs
        type: br_uv_t
        repeat: expr
        repeat-expr: num_uvs

  br_uv_t:
    seq:
      - id: u
        type: f4
      - id: v
        type: f4

  br_material_index_t:
    seq:
      - id: num_materials
        type: u4
      - id: materials
        type: br_material_t
        repeat: expr
        repeat-expr: num_materials

  br_material_t:
    seq:
      - id: identifier
        type: strz
        encoding: ascii