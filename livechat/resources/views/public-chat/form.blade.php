@extends('layouts.app')

@section('routes')
var fetchChatURL = "{{ route('fetch-public.chat', $chatRoom->id) }}";
var postChatURL = "{{ route('public.chat.store', $chatRoom->id) }}";
@endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Public Chat</div>
                <div class="panel-body">
                    <form id="group-chat" class="form-horizontal" role="form" method="POST" @submit.prevent="sendMessage">
                        {{ csrf_field() }}
                        <div id="messages">
                            <div v-if="messages.length" v-cloak>
                                <message v-for="message in messages" key="message.id" :sender="message.sender.name" :message="message.message" :createdat="message.created_at"></message>
                            </div>
                            <div v-cloak v-else>
                                <div class="alert alert-warning" v-cloak>No chat yet!</div>
                            </div>
                        </div>
                        <span class="typing" v-if="isTyping"><i><span>@{{ isTyping }}</span> is typing</i></span>
                        <hr/>
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }} chat-box">
                            <div class="col-md-10">
                                <textarea v-model="message" type="textarea" class="form-control" name="message" @keyup.enter="sendMessage" @keypress="userIsTyping({{$chatRoom->id}})" required autofocus></textarea>

                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                            </div>
                            <div class="col-md-2 chat-btn">
                                <button type="submit" class="btn btn-primary" :disabled="!message">
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">Online users</div>
                <div class="panel-body">
                    <ul v-if="onlineUsers">
                        <li v-for="onlineUser in onlineUsers">@{{ onlineUser }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<script>
    window.Echo.join(`room-events-{{$chatRoom->id}}`)
    .here((users) => {
        users.forEach(function(user) {
            app.onlineUsers.push(user.name);
        });
    }).joining((user) => {
        app.onlineUsers.push(user.name);
        $.notify(user.name + " joined.", "success");
    }).leaving((user) => {
        var i = app.onlineUsers.indexOf(user.name);
        app.onlineUsers.splice(i, 1);
        $.notify(user.name + " left.", "error");
    });

    window.Echo.channel(`public-chat-room-{{$chatRoom->id}}`)
    .listen('PublicMessageEvent', (e) => {
        app.updateChat(e);
    });

    window.Echo.private(`typing-room-{{$chatRoom->id}}`)
    .listenForWhisper('typing', (e) => {
        app.isTyping = e.name;
        setTimeout(function() {
            app.isTyping = '';
        }, 1000);
    });
</script>
@endsection
