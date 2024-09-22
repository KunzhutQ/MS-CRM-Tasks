


var PlaceholderUpdate = window.PlaceholderUpdate || {};
(
    function () {
        this.update = function () {
            parent.Xrm.Page.getControl("WebResource_Placeholder").getObject().contentWindow.location.reload()

        }
    }
).call(PlaceholderUpdate)