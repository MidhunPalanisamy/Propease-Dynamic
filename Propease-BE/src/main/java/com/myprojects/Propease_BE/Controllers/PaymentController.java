package com.myprojects.Propease_BE.Controllers;

import com.myprojects.Propease_BE.Models.Payment;
import com.myprojects.Propease_BE.Services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/recordPayment")
    public ResponseEntity<Payment> recordPayment(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            Long propertyId = Long.parseLong(request.get("propertyId").toString());
            Double amountPaid = Double.parseDouble(request.get("amountPaid").toString());

            Payment payment = paymentService.recordPayment(userId, propertyId, amountPaid);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/ownedProperties")
    public ResponseEntity<List<Map<String, Object>>> getOwnedProperties(@RequestParam Long userId) {
        try {
            List<Map<String, Object>> ownedProperties = paymentService.getOwnedProperties(userId);
            return ResponseEntity.ok(ownedProperties);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/userPayments/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable Long userId) {
        try {
            List<Payment> payments = paymentService.getUserPayments(userId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/payment/{transactionId}")
    public ResponseEntity<Payment> getPaymentByTransactionId(@PathVariable String transactionId) {
        try {
            Payment payment = paymentService.getPaymentByTransactionId(transactionId);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}