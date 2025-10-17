export const filterPills = [
  {
    label: "pending",
    value: "pending",
    countKey: "total_pending_orders",
    color: 'pending',
  },
  {
    value: "processing",
    label: "processing",
    countKey: "total_processing_orders",
    color: 'processing',
  },
  {
    value: "cancelled",
    label: "cancelled",
    countKey: "total_cancelled_orders",
    color: 'cancel',
  },
  {
    value: "shipped",
    label: "shipped",
    countKey: "total_shipped_orders",
    color: 'shipped',
  },
  {
    value: "out_for_delivery",
    label: "out_for_delivery",
    countKey: "total_out_of_delivery_orders",
    color: 'out-delivery',
  },
  {
    value: "delivered",
    label: "delivered",
    countKey: "total_delivered_orders",
    color: 'completed',
  },
];
