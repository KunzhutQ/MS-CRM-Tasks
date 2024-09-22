

var Sdk = window.Sdk || {};
(
    function () {

        this.openDialog = function () {

            Xrm.Navigation.navigateTo({
                pageType: "webresource",
                webresourceName: "crafd_task3_dialogWindow"
            }, {
                target: 2,
                title: 'Batch birthday'
            })

        }
    }
).call(Sdk)