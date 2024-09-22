

var Task5 = window.Task5 || {};
(
    function () {

        this.openNewWindow = function () {
            window.open(`https://orgc0fc7715.crm11.dynamics.com/WebResources/crafd_task5_externalModification_for_task3?Data=${parent.Xrm.Utility.getGlobalContext().userSettings.languageId}`, "_blank")
        }
    }
).call(Task5)

