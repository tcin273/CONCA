"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatVND } from "@/lib/formatCurrency";
import CancelOrderModal from "@/components/CancelOrderModal";

type OrderItem = {
  title: string;
  quantity: number;
  price: number;
  option?: string;
};

type Order = {
  id: string;
  createdAt?: string;
  username?: string;
  customerName?: string;
  items?: OrderItem[];
  totalPrice?: number;
  status?: string;
};

type OrdersTableProps = {
  initialOrders: Order[];
};

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const username = (session?.user as any)?.username;
  const userName = ((session?.user as any)?.name ?? "").toString().trim().toLowerCase();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const visibleOrders = useMemo(() => {
    if (!session?.user) return [];

    return orders.filter((order) => {
      const orderUsername = order.username?.toString().trim();
      const orderCustomerName = order.customerName?.toString().trim().toLowerCase();

      if (username && orderUsername && orderUsername === username) return true;
      if (!orderUsername && userName && orderCustomerName && orderCustomerName === userName) return true;
      return false;
    });
  }, [orders, session, username, userName]);

  const handleCancel = async (orderId: string) => {
    // kept for compatibility but not used — modal handles confirmation now
  };

  const isWithinFiveMinutes = (createdAt?: string) => {
    if (!createdAt) return false;
    const t = new Date(createdAt).getTime();
    if (Number.isNaN(t)) return false;
    return Date.now() - t <= 5 * 60 * 1000;
  };

  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const getTimeLeft = (createdAt?: string) => {
    if (!createdAt) return -1;
    const t = new Date(createdAt).getTime();
    if (Number.isNaN(t)) return -1;
    return 5 * 60 * 1000 - (now - t);
  };

  const formatMs = (ms: number) => {
    if (ms <= 0) return "00:00";
    const s = Math.ceil(ms / 1000);
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState<string | null>(null);

  const openCancelModal = (orderId: string) => {
    setModalOrderId(orderId);
    setModalOpen(true);
  };

  const handleCancelConfirm = async (reason: string) => {
    if (modalOrderId === null) return;
    if (reason.trim() === "") {
      setError("Bạn cần nhập lý do để hủy đơn.");
      return;
    }

    setError("");
    setLoadingId(modalOrderId);
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: modalOrderId, reason: reason.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders((current) =>
          current.map((order) =>
            order.id === modalOrderId
              ? { ...order, status: "Đã hủy", cancelReason: reason.trim() }
              : order
          )
        );
        setModalOpen(false);
        setModalOrderId(null);
      } else {
        setError(data.message || "Hủy đơn hàng thất bại.");
      }
    } catch (err) {
      setError("Lỗi mạng, thử lại sau.");
    } finally {
      setLoadingId(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="p-4 text-center text-gray-600">
        Đang tải lịch sử đơn hàng...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="p-4 text-center text-gray-600">
        Bạn cần đăng nhập để xem lịch sử đơn hàng.
      </div>
    );
  }

  if (visibleOrders.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Hiện chưa có đơn hàng nào của bạn.
      </div>
    );
  }

  return (
    <>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="space-y-4">
        {visibleOrders.slice().reverse().map((o) => {
          const products = Array.isArray(o.items)
            ? o.items.map((it) => `${it.title} (${it.quantity})`).join(", ")
            : "";
          const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-";
          const total = o.totalPrice ?? (Array.isArray(o.items) ? o.items.reduce((s, it) => s + it.price * it.quantity, 0) : 0);
          const timeLeft = getTimeLeft(o.createdAt);

          return (
            <div key={o.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-400">Mã đơn</div>
                  <div className="rounded bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800">{o.id}</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div>
                    <div className="text-xs text-gray-400">Ngày</div>
                    <div className="mt-1 text-sm text-gray-800">{date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Giá</div>
                    <div className="mt-1 text-sm text-gray-800">{formatVND(Number(total))}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-xs text-gray-400">Sản phẩm</div>
                    <div className="mt-1 text-sm text-gray-700 truncate">{products}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  {o.status === "Đã hủy" ? (
                    <div className="text-sm font-semibold text-red-600">Đã hủy</div>
                  ) : (
                    <div className="text-sm text-gray-700">{o.status ?? "Đang xử lí"}</div>
                  )}
                  {o.cancelReason && <div className="mt-1 text-xs text-gray-500">Lý do: {o.cancelReason}</div>}
                </div>

                <div>
                  {o.status === "Đã hủy" ? (
                    <span className="inline-block rounded px-3 py-1 text-sm text-gray-500">Đã hủy</span>
                  ) : timeLeft > 0 ? (
                    <button
                      type="button"
                      onClick={() => openCancelModal(o.id)}
                      disabled={loadingId === o.id}
                      className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      {loadingId === o.id ? "Đang hủy..." : `Hủy đơn`}
                      <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">{formatMs(timeLeft)}</span>
                    </button>
                  ) : (
                    <span className="inline-block rounded border border-gray-200 px-3 py-1 text-sm text-gray-500">Không thể hủy</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CancelOrderModal
        open={modalOpen}
        loading={loadingId !== null}
        onClose={() => {
          setModalOpen(false);
          setModalOrderId(null);
        }}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
}
