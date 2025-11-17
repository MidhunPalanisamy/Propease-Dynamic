package com.myprojects.Propease_BE.Repositoy;

import com.myprojects.Propease_BE.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserIdAndStatus(Long userId, String status);
    List<Payment> findByUserId(Long userId);
    Optional<Payment> findByTransactionId(String transactionId);
}