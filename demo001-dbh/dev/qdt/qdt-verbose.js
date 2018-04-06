var colors = require('colors');

module.exports = {
    core_ask_wrong_input: "Wrong input, please type Y or N.",
    task_init_env_exists: 'The file "qdt-env.json" already exists, override? [Y/n]',

    task_init_gen_env: "\nGenerating \"" + colors.green('qdt-env.json') + "\" configs!\n",
    task_init_keep_env: 'You choice to keep existing configs!',
    task_init_override_env: 'Override existsing settings!',

    serv_plat_unknown: "Selected server platfrom not exists or is disabled.\n",
    serv_path_unknown: "Please specify server path or switch platform.\n",

    source_add_unk_name: "Please specify name!\n",
    source_add_exists_name: "Source with same name, already exists!\n",

    source_add_done: "\nSource \"[name]\" added!\n",

    source_remove_unk_name: "Please specify name!\n",
    source_remove_sample_name: "You can't, remove \"sample\" source!\n",
    source_remove_not_found_name: "Source \"[name]\" not found!\n",

    source_remove_done: "\nSource \"[name]\" removed!\n"
};