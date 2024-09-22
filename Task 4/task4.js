

var Task4 = window.Task4 || {};
(
    function () {

        function setGender(context, value){
            context.getAttribute('gendercode').setValue(value)
        }

        function getGender(firstname,lastname){
           return new Promise((resolve, reject)=>{
               try {
                   fetch(`https://v2.namsor.com/NamSorAPIv2/api2/json/gender/${firstname}/${lastname}`, {
                       "method": "GET",
                       "headers": {
                           "X-API-KEY": "729a3f259175f0a988b50e06e2b37b9e",
                           "Accept": "application/json"
                       }
                   }).then((response) => response.json()).then((json) => {
                       switch (json.likelyGender) {
                           case "male":
                               return 1
                           case "female":
                               return 2
                           default:
                               return null
                       }

                   }).then((result_value) => {
                            resolve(result_value)
                   });
               }catch (e) {
                   reject(e)
               }
           });
        }

        this.genderValidator = function (executionContext) {
            const formContext = executionContext.getFormContext()
            if (formContext.getAttribute('gendercode').getValue()==null) {
                getGender(formContext.getAttribute('firstname').getValue(), formContext.getAttribute('lastname').getValue()).then((resolve)=>{
                    setGender(formContext,resolve)
                }, reject=>alert(reject))

            }
        }

    }

).call(Task4);

