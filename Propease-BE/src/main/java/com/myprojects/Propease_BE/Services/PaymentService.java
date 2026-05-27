package com.myprojects.Propease_BE.Services;

import com.myprojects.Propease_BE.Models.Payment;
import com.myprojects.Propease_BE.Models.Property;
import com.myprojects.Propease_BE.Repositoy.PaymentRepository;
import com.myprojects.Propease_BE.Repositoy.PropRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PropRepo propRepo;

    public Payment recordPayment(Long userId, Long propertyId, Double amountPaid) {
        String transactionId = generateTransactionId();
        Payment payment = new Payment(
            userId,
            propertyId.longValue(),
            amountPaid,
            LocalDateTime.now(),
            transactionId,
            "COMPLETED"
        );
        return paymentRepository.save(payment);
    }

    public List<Map<String, Object>> getOwnedProperties(Long userId) {
        List<Payment> payments = paymentRepository.findByUserIdAndStatus(userId, "COMPLETED");
        
        return payments.stream()
            .map(payment -> {
                Optional<Property> property = propRepo.findById(payment.getPropertyId().intValue());
                Map<String, Object> ownedProp = new HashMap<>();
                
                if (property.isPresent()) {
                    ownedProp.put("id", property.get().getId());
                    ownedProp.put("address", property.get().getAddress());
                    ownedProp.put("email", property.get().getEmail());
                    ownedProp.put("contact", property.get().getContact());
                    ownedProp.put("latitude", property.get().getLatitude());
                    ownedProp.put("longitude", property.get().getLongitude());
                }
                
                ownedProp.put("amountPaid", payment.getAmountPaid());
                ownedProp.put("paymentDate", payment.getPaymentDate());
                ownedProp.put("transactionId", payment.getTransactionId());
                
                return ownedProp;
            })
            .collect(Collectors.toList());
    }

    public Payment getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId).orElse(null);
    }

    public List<Payment> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    private String generateTransactionId() {
        return "TXN" + System.currentTimeMillis() + new Random().nextInt(10000);
    }
}