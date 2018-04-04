var colors = require('colors');

module.exports = {
    core_ask_wrong_input: "Wrong input, please type Y or N.",
    task_init_env_exists: 'The env file already exists, override? [Y/n]',

    task_init_gen_env: "\nGenerating \"" + colors.green('qdt-env.js') + "\" configs!\n",
    task_init_keep_env: 'You decided to save the existing configs!!',
    task_init_override_env: 'You decided to overwrite the existing configs!',

    serv_plat_unknown: "Selected server platform not exists or is disabled.\n",
    serv_path_unknown: "Please specify server path or switch the platform.\n",

    source_add_unk_name: "Please specify name!\n",
    source_add_exists_name: "Source with same name, already exists!\n",

    source_add_done: "\nSource \"[name]\" added!\n",

    source_remove_unk_name: "Please specify name!\n",
    source_remove_sample_name: "You can't, remove \"sample\" source!\n",
    source_remove_not_found_name: "Source \"[name]\" not found!\n",

    source_remove_done: "\nSource \"[name]\" removed!\n"
};