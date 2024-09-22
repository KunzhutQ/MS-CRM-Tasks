

var locales = {
    "1033": {
        "task1": {
           "minimum_birthday_date": 'Minimum Birthday date is: 01.01.1990',
            "date_cant_be_bigger": "Birthday date can't be bigger than current date",
            "mail_subject": "Our dear client",
            "mail_body": "Hello, $firstname $lastname. Happy birthday to you!",
            "birthday_alert": "Looks like it\'s the client\'s birthday today, we\'ll send him a follow-up email",
            "it_seems_birthday_but": "It seems today is client birthday, but email field is empty and we can\'t congratulate him."
        },
        "task3-5": {
            "processing_cancelled": "Processing is cancelled successfully.",
            "processing_done": "Processing is done successfully.",
            "are_use_sure_cancel": "Are you sure that you want to cancel the processing?",
            "yes": "Yes",
            "no": "No",
            "batch_email": "Batch Email",
            "Cancel": "Cancel",
            "Start": "Start",
            "successfully_sent": 'Successfully sent (congratulation e-mails): ',
            'fails': 'Fails: ',
            "select_date": "Select Date:",
            "start_date": "Start Date:",
            "end_date": "End Date:",
            "select_template": "Select Template:",
            "processed_contacts": "Processed contacts $pr from $tot",
            "you_logged_as": "You logged as",
            "logout": "Logout"
        }

    },
    "getLocale": function (task) {
        return this[parent.Xrm.Utility.getGlobalContext().userSettings.languageId][task]
    },
    "getLocaleByLanguageId": function (id,task) {
        return this[id][task]
    }
}

function localesInit() {
   console.log(locales)
   console.log('Locales successful init!')
}


