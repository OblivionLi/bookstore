package com.balaur.bookstore.backend.model.email;

public interface EmailService {
    String sendSimpleMail(EmailDetails emailDetails);
    String sendMailWithAttachment(EmailDetails emailDetails);
    String sendHtmlMail(EmailDetails emailDetails);
}
