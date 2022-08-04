//
// attributes
//

#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

//
// imports
//

use tauri::{CustomMenuItem, Menu, Submenu};

//
// invoked functions
//

#[tauri::command]
fn quit() {
  std::process::exit(0);
}

//
// main function
//

fn main() {

  //
  // program menu
  //

  // file menu
  let menu_item_open_file = CustomMenuItem::new("open_file".to_string(), "Open...");
  let menu_item_save_file = CustomMenuItem::new("save_file".to_string(), "Save As...");
  let menu_item_quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let menu_submenu_file = Submenu::new("File", Menu::new()
    .add_item(menu_item_open_file)
    .add_item(menu_item_save_file)
    .add_item(menu_item_quit));
  // actions menu
  let menu_item_convert = CustomMenuItem::new("convert".to_string(), "Convert");
  let menu_submenu_actions = Submenu::new("Actions", Menu::new()
    .add_item(menu_item_convert));
  // wrap it all up
  let menu = Menu::new()
    .add_submenu(menu_submenu_file)
    .add_submenu(menu_submenu_actions);

  //
  // window builder
  //

  tauri::Builder::default()
    //.menu(menu)
    //.on_menu_event(|event| {
    //  match event.menu_item_id() {
    //    "quit" => {
    //      std::process::exit(0);
    //    }
    //    "open_file" => {}
    //    _ => {}
    //  }
    //})
    .invoke_handler(tauri::generate_handler![quit])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
