const { Plugin } = require("powercord/entities");
const Labs = require("../pc-settings/Components/Labs.jsx");

const orgIsExperimentEnabled = powercord.api.labs.isExperimentEnabled;

powercord.api.labs.isExperimentEnabled = function (experimentId) {
    return powercord.settings.get("labs", []).includes(experimentId);
};

module.exports = class EnableLabs extends Plugin {
    startPlugin() {
        powercord.api.settings.registerSettings("pc-labs", {
            category: "pc-labs",
            label: "Labs",
            render: Labs
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings("pc-labs");
        powercord.api.labs.isExperimentEnabled = orgIsExperimentEnabled;
    }
};
