

// REPLACE WITH YOUR INFO
var APP_ID = 'YOUR-APPLICATION-ID';
var USER_ID = 'ANY-USER-ID';
var ACCESS_TOKEN = null;
var CHANNEL_URL = 'ANY-CHANNEL-URL';

/**
 * INIT SENDBIRD
 */
var sb = new SendBird({appId: APP_ID});


/**
 * START HERE - DEFAULT CONNECTION WITH GIVEN USER
 */
connectToSocket();

/**
 * CONNECT TO WEBSOCKET
 */
function connectToSocket() {
    sb.connect(USER_ID, ACCESS_TOKEN, (user, error) => {
        console.log('Connected to Socket');
        /**
         * Show error or read channels
         */
        if (error) {
            consoledir(error);
            return;
        } else {
            listMessagesFromChannel(CHANNEL_URL);
        }
    });    
}

/**
 * LIST ALL MESSAGES FROM GROUP OR OPEN CHANNELS
 */
function listMessagesFromChannel(groupUrl) {
    sb.GroupChannel.getChannel(groupUrl, (groupChannel, error) => {
        if (error) {
            console.log('Error listing group channel messages:');
            console.log(error);
            return;
        } else {
            /**
             * List messages
             */
            var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
            prevMessageListQuery.limit = 100;
            prevMessageListQuery.reverse = false;
            prevMessageListQuery.includeMetaArray = true;
            prevMessageListQuery.includeReaction = true;
            /**
             * Include threading and reply
             */
            prevMessageListQuery.includeReplies = true;
            prevMessageListQuery.includeThreadInfo = true;
            prevMessageListQuery.includeParentMessageText = true;
            /**
             * Get
             */
            prevMessageListQuery.load((messages, error) => {
                if (error) {
                    console.log('Error listing messages for group channel:');
                    console.dir(error);
                    return;
                }
                console.log('Messages:'); 
                for (const msg of messages) {
                    if (msg.messageType == 'file') {
                        console.dir(msg);
                    }
                }
            });        
        }    
    });
}
