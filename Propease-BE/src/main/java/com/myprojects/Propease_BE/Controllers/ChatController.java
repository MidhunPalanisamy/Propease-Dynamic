package com.myprojects.Propease_BE.Controllers;

import com.myprojects.Propease_BE.Models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message send(Message message) {
        return message;
    }
}
