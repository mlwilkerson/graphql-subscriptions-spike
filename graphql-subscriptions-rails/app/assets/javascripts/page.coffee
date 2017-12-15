App.room = App.cable.subscriptions.create "WebNotificationsChannel",
    received: (data) ->
        $('#messages').append data['message']