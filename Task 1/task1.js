
var Task1 = window.Task1 || {};
(
    function () {

        const sendEmail = function (object) {
            return new Promise(function (resolve, reject) {
                fetch('https://prod-06.uksouth.logic.azure.com:443/workflows/b38fca59a82a48d985a37efe5688399c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zJoQRvJd8jHsdMFpRFqTOBTwjGy6bSM5L5KBekXE5zE', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(object)

                }).then((response) => {
                    console.log(response)
                    resolve(response.status)
                }, (error) => {
                    console.log(error)
                    reject(error)
                })
            })
        }

        function getValueFromContext(context, value) {
            const v = context.getAttribute(value).getValue()
            return v == null ? '' : v
        }

        function loadBirthDate(executionContext) {
            return getValueFromContext(executionContext.getFormContext(), 'birthdate')
        }


        let date;
        const minDate = new Date(1990, 0, 1);
        const locale = locales.getLocale('task1');

        this.birthdayValidator = function (executionContext) {

            function preventSave() {
                executionContext.getEventArgs().preventDefault()
            }
            //

            let newDate = getValueFromContext(executionContext.getFormContext(), 'birthdate')

                if (newDate !== '' && newDate < minDate) {
                    preventSave()
                    alert(locale.minimum_birthday_date)
                } else if (newDate !== '' && newDate > new Date()) {
                    preventSave()
                    alert(locale.date_cant_be_bigger)
                } else {
                    date = loadBirthDate(executionContext)
                }

        }

        this.birthdayToday = function (executionContext) {
            const formContext = executionContext.getFormContext()
            const c = new Date()

              parent.Xrm.WebApi.retrieveRecord('contact', formContext.data.entity._entityId.guid, '?$select=crafd_dateofthelastbirthdaycongratulations')
                  .then((resolve) => {
                          if (resolve.crafd_dateofthelastbirthdaycongratulations == null && date.getDate() === c.getDate() && date.getMonth() === c.getMonth()) {
                              let mailBody = locale.mail_body
                              .replace('$firstname', getValueFromContext(formContext, 'firstname'))
                              .replace('$lastname', getValueFromContext(formContext, 'lastname'))
                              let email = getValueFromContext(formContext, 'emailaddress1')

                             if (email!=='') {
                                 sendEmail({
                                     To: email,
                                     Subject: locale.mail_subject,
                                     Body: mailBody
                                 }).then(
                                     message => {
                                         console.log(message)
                                         alert(locale.birthday_alert)
                                         parent.Xrm.WebApi.updateRecord('contact', formContext.data.entity._entityId.guid, {crafd_dateofthelastbirthdaycongratulations: c.toISOString().split('T')[0]}).then((result) => {
                                             console.log(result)
                                         }, (reject) => console.log(reject))
                                     }, error => {
                                         console.log(error);
                                         alert(error)
                                     }
                                 );
                             }else{
                                 alert(locale.it_seems_birthday_but)
                             }
                          }
                  }, reject => alert(reject))
        }
    }

).call(Task1);