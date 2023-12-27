package com.balaur.bookstore.backend.service;

import com.balaur.bookstore.backend.model.book.Book;
import com.balaur.bookstore.backend.model.book.NormalBook;
import com.balaur.bookstore.backend.model.order.Order;
import com.balaur.bookstore.backend.model.order.OrderBillingAddress;
import com.balaur.bookstore.backend.model.order.OrderLineItem;
import com.balaur.bookstore.backend.model.order.OrderShippingAddress;
import com.balaur.bookstore.backend.model.user.User;
import com.balaur.bookstore.backend.repository.*;
import com.balaur.bookstore.backend.repository.user.UserRepository;
import com.balaur.bookstore.backend.request.order.OrderItemRequest;
import com.balaur.bookstore.backend.request.order.PlaceOrderRequest;
import com.balaur.bookstore.backend.request.order.UserBillingAddressRequest;
import com.balaur.bookstore.backend.request.order.UserShippingAddressRequest;
import com.balaur.bookstore.backend.response.order.OrderLineItemResponse;
import com.balaur.bookstore.backend.response.order.OrderResponse;
import com.balaur.bookstore.backend.response.order.PlaceOrderResponse;
import com.balaur.bookstore.backend.response.user.UserDetailsResponse;
import com.balaur.bookstore.backend.util.order.OrderStatus;
import com.balaur.bookstore.backend.util.order.OrderServiceUtil;
import com.balaur.bookstore.backend.util.payment.PaymentStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderBillingAddressRepository orderBillingAddressRepository;
    private final OrderShippingAddressRepository orderShippingAddressRepository;
    private final OrderLineItemRepository orderLineItemRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public ResponseEntity<PlaceOrderResponse> placeOrder(Authentication authentication, PlaceOrderRequest request) {
        //TODO:: Add an orderId unique for each order when created
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() + " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() + " not found.");
        }

        if (request.getOrderItems().isEmpty()) {
            log.warn("[UserService] " + new Date() + " | Can't place an order with no order line items.");
            throw new RuntimeException("Can't place an order with no order line items.");
        }

        Order newOrder = new Order();
        orderRepository.save(newOrder);

        String orderId = "BK_" + newOrder.getId() + "_" + UUID.randomUUID().toString().substring(0, 6);
        newOrder.setOrderId(orderId);

        List<OrderLineItem> orderLineItems = getMappedOrderLineItems(newOrder, request.getOrderItems());
        orderLineItemRepository.saveAll(orderLineItems);

        newOrder.setUser(user);
        newOrder.setOrderDate(java.sql.Date.valueOf(LocalDate.now()));

        double orderLineItemsSubtotal = OrderServiceUtil.calculateOrderLineItemsSubtotal(orderLineItems);
        newOrder.setSubtotal(orderLineItemsSubtotal);

        // TODO:: set taxAmount and shippingCost dynamically
        double taxAmount = 10;
        newOrder.setTaxAmount(taxAmount);
        double shippingCost = 10;
        newOrder.setShippingCost(shippingCost);
        double orderTotal = OrderServiceUtil.calculateOrderLineItemsTotal(orderLineItems) + taxAmount + shippingCost;
        newOrder.setTotalPrice(orderTotal);

        newOrder.setStatus(OrderStatus.NEW);
        newOrder.setPaymentStatus(PaymentStatus.PENDING);
        newOrder.setOrderLineItems(orderLineItems);
        newOrder.setNotes(request.getDeliveryNotes());

        OrderShippingAddress orderShippingAddress = getMappedOrderShippingAddress(request.getUserShippingAddress());
        newOrder.setOrderShippingAddress(orderShippingAddress);

        OrderBillingAddress orderBillingAddress = getMappedOrderBillingAddress(request.getUserBillingAddress());
        newOrder.setOrderBillingAddress(orderBillingAddress);

        try {
            orderRepository.save(newOrder);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(
                            PlaceOrderResponse.builder()
                                    .id(newOrder.getId())
                                    .orderId(newOrder.getOrderId())
                                    .orderTotal(newOrder.getTotalPrice())
                                    .recipientName(newOrder.getOrderShippingAddress().getRecipientName())
                                    .billingName(newOrder.getOrderBillingAddress().getBillingName())
                                    .country(newOrder.getOrderShippingAddress().getCountry())
                                    .city(newOrder.getOrderShippingAddress().getCity())
                                    .state(newOrder.getOrderShippingAddress().getState())
                                    .street(newOrder.getOrderShippingAddress().getStreet())
                                    .zipcode(newOrder.getOrderShippingAddress().getZipcode())
                                    .phoneNumber(newOrder.getOrderShippingAddress().getPhoneNumber())
                                    .taxAmount(newOrder.getTaxAmount())
                                    .shippingCost(newOrder.getShippingCost())
                                    .build()
                    );
        } catch (Exception ex) {
            log.warn("[UserService] " + new Date() + " | Couldn't place order. Error: " + ex.getMessage());
            throw new RuntimeException("Couldn't place order. Error: " + ex.getMessage());
        }
    }

    private OrderShippingAddress getMappedOrderShippingAddress(UserShippingAddressRequest shippingAddressRequest) {
        OrderShippingAddress orderShippingAddress = orderShippingAddressRepository.findByZipcode(shippingAddressRequest.getZipcode());
        if (orderShippingAddress == null) {
            orderShippingAddress = new OrderShippingAddress();
            orderShippingAddress.setCity(shippingAddressRequest.getCity());
            orderShippingAddress.setCountry(shippingAddressRequest.getCountry());
            orderShippingAddress.setState(shippingAddressRequest.getState());
            orderShippingAddress.setStreet(shippingAddressRequest.getStreet());
            orderShippingAddress.setZipcode(shippingAddressRequest.getZipcode());
            orderShippingAddress.setPhoneNumber(shippingAddressRequest.getPhoneNumber());
            orderShippingAddress.setRecipientName(shippingAddressRequest.getRecipientName());

            orderShippingAddressRepository.save(orderShippingAddress);
        }

        return orderShippingAddress;
    }

    private OrderBillingAddress getMappedOrderBillingAddress(UserBillingAddressRequest billingAddressRequest) {
        OrderBillingAddress orderBillingAddress = orderBillingAddressRepository.findByZipcode(billingAddressRequest.getZipcode());
        if (orderBillingAddress == null) {
            orderBillingAddress = new OrderBillingAddress();
            orderBillingAddress.setCity(billingAddressRequest.getCity());
            orderBillingAddress.setCountry(billingAddressRequest.getCountry());
            orderBillingAddress.setState(billingAddressRequest.getState());
            orderBillingAddress.setStreet(billingAddressRequest.getStreet());
            orderBillingAddress.setZipcode(billingAddressRequest.getZipcode());
            orderBillingAddress.setPhoneNumber(billingAddressRequest.getPhoneNumber());
            orderBillingAddress.setBillingName(billingAddressRequest.getBillingName());

            orderBillingAddressRepository.save(orderBillingAddress);
        }

        return orderBillingAddress;
    }

    private List<OrderLineItem> getMappedOrderLineItems(Order newOrder, List<OrderItemRequest> orderItemRequests) {
        List<OrderLineItem> orderLineItems = new ArrayList<>();
        for (OrderItemRequest orderItemRequest : orderItemRequests) {
            OrderLineItem orderLineItem = new OrderLineItem();
            Book book = bookRepository.findBookById(orderItemRequest.getItemId());

            orderLineItem.setBook(book);
            orderLineItem.setOrder(newOrder);

            double orderLineItemTotal;
            if (book instanceof NormalBook) {
                orderLineItem.setQuantity(orderItemRequest.getQuantity());
                double discountAmount = (orderItemRequest.getQuantity() * orderItemRequest.getItemPrice()) * ((double) orderItemRequest.getDiscount() / 100);
                orderLineItemTotal = (orderItemRequest.getQuantity() * orderItemRequest.getItemPrice()) - discountAmount;
            } else {
                double discountAmount = orderItemRequest.getItemPrice() * ((double) orderItemRequest.getDiscount() / 100);
                orderLineItemTotal = orderItemRequest.getItemPrice() - discountAmount;
            }

            orderLineItem.setTotalPrice(orderLineItemTotal);
            orderLineItem.setPricePerUnit(orderItemRequest.getItemPrice());
            orderLineItem.setDiscount(orderItemRequest.getDiscount());

            orderLineItems.add(orderLineItem);
        }

        return orderLineItems;
    }

    public ResponseEntity<List<OrderResponse>> getOrders(Authentication authentication) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() + " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() + " not found.");
        }

        List<Order> orders = orderRepository.findByUser(user);
        if (orders.isEmpty()) {
            log.warn("[UserService] " + new Date() + " | User didn't place any order as of yet.");
            return null;
        }

        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            orderResponses.add(getMappedOrderResponse(order));
        }

        return ResponseEntity.status(HttpStatus.OK).body(orderResponses);
    }

    private OrderResponse getMappedOrderResponse(Order order) {
        List<OrderLineItemResponse> orderLineItemResponses = new ArrayList<>();
        for (OrderLineItem orderLineItem : order.getOrderLineItems()) {
            orderLineItemResponses.add(
                    OrderLineItemResponse.builder()
                            .id(orderLineItem.getOrder().getId())
                            .bookTitle(orderLineItem.getBook().getTitle())
                            .pricePerUnit(orderLineItem.getPricePerUnit())
                            .totalPrice(orderLineItem.getTotalPrice())
                            .discount(orderLineItem.getDiscount())
                            .bookType(getLineItemType(orderLineItem))
                            .quantity(orderLineItem.getQuantity())
                            .build()
            );
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        return OrderResponse.builder()
                .id(order.getId())
                .orderId(order.getOrderId())
                .notes(order.getNotes())
                .orderDate(dateFormat.format(order.getOrderDate()))
                .shippingCost(order.getShippingCost())
                .taxAmount(order.getTaxAmount())
                .orderStatus(order.getStatus().getDisplayName())
                .paymentStatus(order.getPaymentStatus().getPaymentStatus())
                .subtotal(order.getSubtotal())
                .totalPrice(order.getTotalPrice())
                .orderShippingAddress(order.getOrderShippingAddress())
                .orderBillingAddress(order.getOrderBillingAddress())
                .orderLineItems(orderLineItemResponses)
                .build();
    }

    private String getLineItemType(OrderLineItem orderLineItem) {
        if (orderLineItem.getBook() instanceof NormalBook) {
            return "physical";
        }
        return "virtual";
    }


    public void deleteOrders() {
        orderRepository.deleteAll();
    }

    public ResponseEntity<OrderResponse> getOrder(Authentication authentication, Long id) {
        User user = userRepository.findByEmail((((UserDetailsResponse) authentication.getPrincipal()).getEmail()));

        if (user == null) {
            log.warn("[UserService] " + new Date() + " | User: " + authentication.getName() + " not found.");
            throw new UsernameNotFoundException("User: " + authentication.getName() + " not found.");
        }

        Optional<Order> order = orderRepository.findById(id);
        if (order.isEmpty()) {
            log.warn("[UserService] " + new Date() + " | Couldn't find order.");
            return null;
        }

        OrderResponse orderResponse = getMappedOrderResponse(order.get());
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
}
