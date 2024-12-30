class Order {
  constructor(
    id,
    u_id,
    quantity,
    status,
    total_amount,
    created_at,
    modified_at,
    deleted_at
  ) {
    (this.id = id),
      (this.u_id = u_id),
      (this.quantity = quantity),
      (this.status = status),
      (this.total_amount = total_amount),
      (this.created_at = created_at),
      (this.modified_at = modified_at),
      (this.deleted_at = deleted_at);
  }
}

module.exports = Order;
