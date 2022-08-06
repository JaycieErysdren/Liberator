meta:
    id: id_pak
    file-extension: pak
    endian: le
    bit-endian: le

doc: id Software PAK
doc-ref: https://quakewiki.org/wiki/.pak

seq:
  - id: header
    type: header_t

types:
  header_t:
    seq:
      - id: magic
        contents: "PACK"
      - id: ofs_file_table
        type: u4
      - id: len_file_table
        type: u4

  file_table_t:
    seq:
      - id: filepath
        type: str
        encoding: ASCII
        size: 56
      - id: ofs_file_data
        type: u4
      - id: len_file_data
        type: u4
    instances:
      get_file_data:
        pos: ofs_file_data
        size: len_file_data

instances:
  get_file_table:
    pos: header.ofs_file_table
    type: file_table_t
    repeat: expr
    repeat-expr: header.len_file_table / 64