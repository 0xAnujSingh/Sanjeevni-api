class Transaction {

    constructor(
      id,
      u_id,
      o_id,
      item,
      mode,
      amount,
      created_at,
      modified_at,
      deleted_at
    ) {
      (this.id = id),
        (this.u_id = u_id),
        (this.o_id = o_id),
        (this.item = item),
        (this.mode = mode),
        (this.amount = amount),
        (this.created_at = created_at),
        (this.modified_at = modified_at),
        (this.deleted_at = deleted_at);
    }
  }
  
  module.exports = Transaction;
  